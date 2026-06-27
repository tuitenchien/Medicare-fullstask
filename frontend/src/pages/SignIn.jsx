import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-7 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Login to your account
                </h1>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="CCCD"
                        className="w-full border rounded-lg p-3"
                    />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border rounded-lg p-3"
                        />
                    <button
                        className="w-full bg-[#0f9cdb] text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        LOGIN
                    </button>
                    <p className="text-center text-gray-600 mt-2">
                        Not registered?{" "}
                        <Link to="/signup"
                            className="text-[#0f9cdb] font-medium hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    )
}