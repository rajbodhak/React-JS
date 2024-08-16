import React from "react";
import service from "../Appwrite/mainConfig"
import {Link} from "react-router-dom"

function PostCard({ $id, title, featuredImage }) {
    console.log('Featured Image File ID:', featuredImage);
    const imageUrl = service.getFilePreview(featuredImage);
    console.log('Image URL:', imageUrl);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-400 rounded-lg p-4">
                <div className="w-full justify-center mb-4">
                    {featuredImage ? (
                        <img src={imageUrl} alt={title} className="rounded-xl" />
                    ) : (
                        <div className="placeholder-image rounded-xl"></div> 
                    )}
                </div>
                <h2 className="font-bold text-xl">{title}</h2>
            </div>
        </Link>
    );
}



export default PostCard