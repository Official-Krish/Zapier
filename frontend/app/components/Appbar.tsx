"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkBtn"
import { PrimaryButton } from "./buttons/primaryBtn"

export const Appbar = () => {
    const router = useRouter()
    return (
        <div className="flex border-b justify-between py-2 px-4 items-center">
            <div className="flex flex-col justify-center text-2xl font-bold">
                Zapier
            </div>
                {localStorage.getItem("token") ? (
                    avatar()
                ) : (
                    <>
                    <div className="pr-4 flex justify-end">
                        <div className="flex justify-between pr-4">
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
                    </>
                )}
            </div>
    )
}

function avatar() {
    return (
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
            </svg>
        </div>
    )
}
