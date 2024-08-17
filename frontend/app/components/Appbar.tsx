"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkBtn"
import { PrimaryButton } from "./buttons/primaryBtn"
import { useState } from "react"
import Avatar from "./avatar"
import  Dropdown  from "./dropdown"
import { Sidebar } from "./sidebar"
import { Menu } from "./icons/menu"

export const Appbar = () => {
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
    const [sidebarOpen, setsidebarOpen] = useState<boolean>(false)

    const toggleDropdown = () => setDropdownOpen(prev => !prev)
    const toggleSideBar = () => setsidebarOpen(prev => !prev)

    return (
        <div className="flex border-b justify-between py-2 px-4 items-center" >
            <div className="flex flex-col justify-center text-2xl font-bold">
            <div className="flex">
            {localStorage.getItem("token") !== null ? (
                <>
                    <div onClick={toggleSideBar} className="cursor-pointer px-4 py-1">
                        <Menu />
                    </div>
                    {sidebarOpen && <Sidebar onClose={toggleSideBar} />}
                    <img className="w-32 pl-4 cursor-pointer" src ="https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685628568/Zapier%20logos/zapier-logo-no-space_hihmgg.svg" onClick={() => router.push("/")}/>
                </>
            ) : (
                <img className="w-32 pl-4 cursor-pointer" src ="https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685628568/Zapier%20logos/zapier-logo-no-space_hihmgg.svg" onClick={() => router.push("/")}/>
            )}
            </div>
            </div>
            {localStorage.getItem("token") !== null ? (
                <div className="pr-6">
                    <Avatar onClick={toggleDropdown} />
                    {dropdownOpen && <Dropdown />}
                </div>
            ) : (

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
            )}
        </div>
    )
}
