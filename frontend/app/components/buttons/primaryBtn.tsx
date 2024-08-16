import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" , logo}: { children: ReactNode, onClick: () => void, size?: "big" | "small" | "large" , logo ?: ReactNode}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-3"} 
    ${size == "large" ? "px-16 py-1 rounded-lg" : ""}
    cursor-pointer  hover:shadow-md bg-orange-600 text-white rounded-full text-center flex justify-center flex-col`} 
    >
        <div className="flex justify-center items-center">
            {logo}
            <div className="pl-3">
                {children}
            </div>
        </div>
    </div>
}