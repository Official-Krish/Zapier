import { ReactNode } from "react"

export const DarkButton = ({ children, onClick, size = "small" }: { children: ReactNode, onClick: () => void, size?: "big" | "small"}) => {
    return <div onClick={onClick} className="flex flex-col justify-center cursor-pointer  hover:shadow-md bg-purple-100 text-white text-center px-8 py-2">
        {children}
    </div>
}