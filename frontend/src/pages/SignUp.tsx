import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { register } from "../services/auth";
import axios from "axios";

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cccd: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        dateOfBirth: "",
        address: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await register(formData);
            alert(res.data.message);
            navigate("/signin");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data?.message);
            } else {
                alert("Đăng ký thất bại");
            }
        }
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-7 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Register with a new account
                </h1>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="cccd"
                        value={formData.cccd}
                        type="text"
                        placeholder="CCCD"
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="ConfirmPassword"
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        placeholder="DateofBirth"
                        className="w-full border rounded-lg p-3"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-full border rounded-lg p-3"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#0f9cdb] text-white py-3 rounded-lg hover:bg-blue-600"
                    >
                        REGISTER
                    </button>
                    <p className="text-center text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-[#0f9cdb] font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    )
}