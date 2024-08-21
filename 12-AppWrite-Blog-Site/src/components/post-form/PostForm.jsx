import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, RTE, Select, Input } from "..";
import service from "../../Appwrite/mainConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, watch, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    // State for success message
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        let dbPost;
        try {
            if (post) {
                const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    service.deleteFile(post.featuredImage);
                }

                dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

            } else {
                const file = await service.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    dbPost = await service.createPost({ ...data, userId: userData.$id });
                }
            }

            if (dbPost) {
                // Set success message and reset the form fields
                setSuccessMessage("Post submitted successfully!");
                reset(); // Clear form fields

                // Clear the success message after 2 seconds and navigate
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate(`/post/${dbPost.$id}`);
                }, 2000);
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <>
            {/* Display success message if set */}
            {successMessage && (
                <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && post.featuredImage && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
}
