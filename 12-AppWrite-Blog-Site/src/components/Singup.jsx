import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Input, Button, Logo} from "./index"
import { useForm } from "react-hook-form";
import authService from "../Appwrite/auth";
import login from "../store/authSlice"

function Singup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [register, handleSubmit] = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = authService.createAccount(data)
            if(userData) {
                const currentUserData = authService.getUserAccount()
                if(currentUserData) dispatch(login(currentUserData));
                navigate("/")

            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sing up to create an Account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                    Sing in
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input 
                            label = "Full Name: "
                            placeholder = "Enter your full name"
                            type = "text"
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input 
                            label = "Email: "
                            placehokder = "Enter your email"
                            type = "email"

                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input 
                            label = "Password: "
                            placehokder = "Enter your password"
                            type = "password"
                            {...register("password", {
                                required: true,

                            })}
                        />
                        <button type="submit" className="w-full">
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Singup