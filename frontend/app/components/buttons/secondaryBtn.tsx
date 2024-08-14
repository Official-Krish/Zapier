import { ReactNode } from "react"

export const SecondaryButton = ({ children, onClick, size = "small", logo }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
    logo?: ReactNode
}) => {
    return <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-8 py-3"} cursor-pointer hover:shadow-md border text-black border-black rounded-full font-medium`}>
        <div className="flex justify-between items-center">
            {logo}
            <div className="pl-3">
                {children}
            </div>
        </div>
    </div>
}