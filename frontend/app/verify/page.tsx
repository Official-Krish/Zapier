"use client";
import { useState } from "react";
import { useAuth } from "../context/Context";
import { useRouter } from "next/navigation";
import { Appbar } from "../components/Appbar";
import { Input } from "../components/input";
import { PrimaryButton } from "../components/buttons/primaryBtn";
import { BACKEND_URL } from "../config";
import axios from "axios";


export default function () {
  const { token } = useAuth();

  console.log("token", token);
  const [activationCode, setActivationCode] = useState("");
  const router = useRouter();

  return (
    <div>
      <Appbar />
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
                    `${BACKEND_URL}/api/v1/user/verify-user`,
                    {
                      token: token,
                      activationCode: activationCode,
                    }
                  );
                  {res.status === 200 ? (
                    localStorage.setItem("token", res.data.token),
                    router.push("/"))
                    :(
                    alert("You have entered the wrong code. Please try again."),
                    window.location.reload()
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
    </div>
  );
}
