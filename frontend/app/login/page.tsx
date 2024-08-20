"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckFeature } from "../components/checkFeature";
import { Input } from "../components/input";
import { PrimaryButton } from "../components/buttons/primaryBtn";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { GoogleAuth } from "../components/buttons/googleAuth";

export default function() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleGoogleLogin = async () => {
        try {
            window.location.href = "http://localhost:3000/api/v1/user/auth/google";
        } catch (error) {
            console.error("Failed to initiate Google login:", error);
        }
    };
    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');
    
        if (token) {
          localStorage.setItem('token', token);
    
            if (url.searchParams.has('token')) {
                url.searchParams.delete('token');
                const newUrl = url.toString().split('?')[0]; 
                router.replace(newUrl); 
            }
        }
    }, [router]);

    return <div> 
        <div className="flex justify-center">
            <div className="flex pt-8">
                <div className="flex-1 pt-20 px-4">
                    <div className="font-semibold text-4xl pb-4">
                        Automate across your teams
                    </div>
                    <div className="pb-6 pt-4">
                        <CheckFeature label={"Easy setup, no coding required"} />
                    </div>
                    <div className="pb-6">
                        <CheckFeature label={"Free forever for core features"} />
                    </div>
                    <CheckFeature label={"14-day trial of premium features & apps"} />

                </div>
                <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
                    <GoogleAuth onClick={handleGoogleLogin}></GoogleAuth>
                    <Input onChange={e => {
                        setEmail(e.target.value)
                    }} label={"Email"} type="text" placeholder="Your Email"></Input>
                    <Input onChange={e => {
                        setPassword(e.target.value)
                    }} label={"Password"} type="password" placeholder="Password"></Input>
                    <div className="pt-4">
                        <div className="text-red-500 cursor-pointer" onClick={() => {
                            router.push("/forgotPassword")
                        }}>Forgot Password?</div>
                    </div>

                    <div className="pt-4">
                        <PrimaryButton onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                                username: email,
                                password,
                            });
                            localStorage.setItem("token", res.data.token);
                            router.push("/dashboard");
                        }} size="big">Continue</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
}