import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/primaryBtn"
import { Cross } from "./icons/cross"
import { Plus } from "./icons/plus"
import ZapLogo from "./logo";

interface SidebarProps {
    onClose: () => void; 
}


export const Sidebar = ({ onClose }: SidebarProps) => {
    const router = useRouter();
    return <div>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
            <div className="flex justify-end px-3 cursor-pointer" onClick={onClose}>
                <Cross/>
            </div>
            <div className="pl-7"><ZapLogo height={120} width={120}/></div>
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
            <ul className="space-y-2 font-medium">

            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg group pt-6 cursor-pointer">
                <PrimaryButton size="large" logo={<Plus/>} onClick={() => { router.push("/zap/create") }}>
                    Create
                </PrimaryButton>
                </a>
            </li>
            <li></li>

            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <span className="ms-3 text-lg cursor-pointer" onClick={() => { router.push("/dashboard") }}>Dashboard</span>
                </a>
            </li>
            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lghover:bg-gray-100  group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-lg cursor-pointer" onClick={() => { router.push("/dashboard") }}>Zaps</span>
                </a>
            </li>
            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-lg cursor-pointer">Tables</span>
                </a>
            </li>

            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-lg cursor-pointer">Services</span>
                </a>
            </li>
            <li>
                <a className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap text-lg cursor-pointer" onClick={() => {localStorage.removeItem("token");
                    window.location.reload();
                }}>Log Out</span>
                </a>
            </li>
        </ul>
    </div>
    </aside>

    </div>
}