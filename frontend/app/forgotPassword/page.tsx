"use client";

import { useState } from "react";
import { Input } from "../components/input";
import { PrimaryButton } from "../components/buttons/primaryBtn";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function () {
    const [step, setStep] = useState(0);
    const [activationCode, setActivationCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    return <div>
        {step === 0 && 
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="pt-6 pb-6 mt-12 px-4 border rounded">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Verify your email</h1>
                    <p className="text-muted-foreground">
                        The email address you entered is already taken. Please enter a different email address to receive a
                        verification link.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div>Email</div>
                    <Input placeholder={"me@example.com"} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>
                    <PrimaryButton size="large" onClick={() => {
                        const res = axios.post(`${BACKEND_URL}/api/v1/user/send-verification-email`, {
                            email: email
                        });
                        setStep(1)
                        }}>
                        Submit
                    </PrimaryButton>
                    <button
                        className="inline-block w-full text-center text-sm underline text-muted-foreground"
                        onClick={()=> {
                            const res = axios.post(`${BACKEND_URL}/api/v1/user/send-verification-email`, {
                                email: email
                            });
                        }}
                    >
                        Resend verification email
                    </button>
                </div>
            </div>
            </div>
        </div>}

        {step === 1 && 
            <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
              <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded w-96 h-80">
                <h1 className="font-semibold text-2xl text-center ">
                  Verify your Account
                </h1>
                <div className="pt-8">We've sent a verification code to your email address. Please enter the code below to confirm your identity.</div>
                <Input
                  onChange={(e) => {
                    setActivationCode(e.target.value);
                  }}
                  label={""}
                  type="password"
                  placeholder="code"
                ></Input>
    
                <div className="pt-10">
                    <PrimaryButton
                        onClick={async () => {
                            const res = await axios.post(
                                `${BACKEND_URL}/api/v1/user/password-reset-verify`,
                                {
                                    activationCode: activationCode,
                                }
                            );
                            {res.status === 200 ? (
                                setStep(3)):(
                                <div className="text-center text-red-700">
                                    <h1>Invalid code</h1>
                                </div>
                            )}
                        }}
                    size="big"
                    >
                        Verify
                    </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        }

        {step === 2 &&
        <div>
            <div className="flex justify-center">
                <div className="flex pt-8 max-w-4xl">
                    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded w-96 h-80">
                        <h1 className="font-semibold text-2xl text-center pb-6">
                            Enter your new password
                        </h1>
                        <Input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            label={""}
                            type="password"
                            placeholder="New Password"
                        ></Input>

                        <Input
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            label={""}
                            type="password"
                            placeholder="Confirm Password"
                        ></Input>
            
                        <div className="pt-10">
                        <PrimaryButton
                            onClick={async () => {
                                if (password !== confirmPassword) {
                                    alert("Passwords do not match");
                                    window.location.reload();
                                }
                                const res = await axios.post(
                                    `${BACKEND_URL}/api/v1/user/password-reset`,
                                    {
                                        password: password,
                                        email: email,
                                    }
                                );
                                localStorage.setItem("token", res.data.token);
                                router.push("/");
                            }}
                            size="big"
                        >
                            Submit
                        </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>
}