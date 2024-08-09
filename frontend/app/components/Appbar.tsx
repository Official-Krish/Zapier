"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkBtn"
import { PrimaryButton } from "./buttons/primaryBtn"

export const Appbar = () => {
    const router = useRouter()
    return <div className="flex border-b justify-between py-2 px-4 items-center">
        <div className="flex flex-col justify-center text-2xl font-bold">
            Zapier
        </div>

        <div className="flex px-6">
            <div className="pr-4">
                <LinkButton onClick={() => alert("Contact Sales")}>
                    Contact Sales
                </LinkButton>
            </div>
            <div className="pr-4">
                <LinkButton onClick={() => router.push("/login")}>
                    Login
                </LinkButton>
            </div>
            <PrimaryButton onClick={() => router.push("/signup")}>
                Sign up
            </PrimaryButton>

        </div>
    </div>
}