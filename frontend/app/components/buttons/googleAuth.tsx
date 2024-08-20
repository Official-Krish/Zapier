import { ReactNode } from "react"
import { GoogleIcon } from "../icons/google"

export const GoogleAuth = ({onClick} : { onClick: () => void}) => {
    return <div onClick={onClick} className="flex justify-center items-center bg-blue-100 text-white rounded-lg text-center py-4 cursor-pointer">
        <div className="flex justify-start pr-3">
            <GoogleIcon/>
        </div>
        Continue with Google
    </div>
}