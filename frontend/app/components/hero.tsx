"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./buttons/primaryBtn"
import { SecondaryButton } from "./buttons/secondaryBtn"
import { Features } from "./features"
import { GoogleIcon } from "./icons/google"
import { HeroVideo } from "./heroVideo"
import  Card from "./card"

export const Hero = () => {
    const router = useRouter();
    return <div>
        <div className="flex justify-center items-center">
            <div className="text-6xl font-bold text-center mt-20 max-w-4xl">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center items-center">
            <div className="text-xl font-medium text-center mt-7 max-w-3xl">
                AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>

        <div className="flex pt-8 justify-center items-center">


            {localStorage.getItem("token") !== null ?(
                <PrimaryButton size="big" onClick={() => {router.push("/dashboard")}}>
                    Go to dashboard
                </PrimaryButton>
            ):(
                <div className="flex pt-8 justify-center items-center">
                    <PrimaryButton size="big" onClick={() => {router.push("/signup")}}>
                        Start free with email
                    </PrimaryButton>
                
                    <div className="pl-4">
                        <SecondaryButton size="big" logo = {<GoogleIcon/>} onClick={() => {}}>
                            Start free with Google 
                        </SecondaryButton>
                    </div>
                </div>
            )}

            
        </div>

        <div className="flex justify-center">
            <Features title="Free forever" subtitle="for core features"></Features>
            <Features title="More apps" subtitle="than any other platform"></Features>
            <Features title="Cutting edge" subtitle="AI features"></Features>
        </div>
        <div className="pt-8">
            <HeroVideo/>
        </div>

        <div className="flex justify-center items-center pt-36">
            <div className="text-6xl font-bold max-w-5xl text-center">
                Get started quickly with these best-practice templates
            </div>
        </div>
        <div className="py-10 flex justify-center items-center">
            <div className="text-2xl font-normal max-w-5xl text-center text-slate-950">
                No need to start from scratch. In just a few minutes, you can use <a className="underline cursor-pointer">Interfaces</a>, <a className="underline cursor-pointer">Tables</a>, and <a className="underline cursor-pointer" onClick={() => {router.push("/dashboard")}}>Zaps</a> to create complete solutions and reclaim countless hours of your time.
            </div>
        </div>

        <div className="flex justify-center pt-8">
            <div>
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1718318238/Template%20Module%20Thumbnails/Thumbnail_rxpqud.png" 
                logo="https://zapier-images.imgix.net/storage/developer_cli/3a8f13d0fe5c9b2bbe7a7191a433ac1d.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Draft email replies to customers"
                />
            </div>

            <div className="pl-6">
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1718318308/Template%20Module%20Thumbnails/Thumbnail_2_nff8dw.png" 
                logo="https://zapier-images.imgix.net/storage/developer_cli/a86f51fcd659c4b311c82ba31a176e4a.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Summarize your sales call with openAI"
                />
            </div>

            <div className="pl-6">
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1705520438/Template%20Module%20Thumbnails/template-thumb_sales-05_sw0x1z.png" 
                logo="https://zapier-images.imgix.net/storage/services/9b77b8fa1180fd49a6afd22b5801d0de.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Talk to leads 24/7 with a customs sales chatbot"
                />
            </div>
            
        </div>

        <div className="flex justify-center pt-8">
            <div>
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1705520441/Template%20Module%20Thumbnails/template-thumb_support-02_hagkta.png" 
                logo="https://zapier-images.imgix.net/storage/services/9b77b8fa1180fd49a6afd22b5801d0de.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Simple FAQ AI Chatbot Template"
                />
            </div>

            <div className="pl-6">
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1705520443/Template%20Module%20Thumbnails/template-thumb_marketing-01_tcqvtc.png" 
                logo="https://zapier-images.imgix.net/storage/developer_cli/a86f51fcd659c4b311c82ba31a176e4a.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Use AI to generate relevanat content ideas"
                />
            </div>

            <div className="pl-6">
                <Card imageLink="https://res.cloudinary.com/zapier-media/image/upload/q_auto/f_auto/v1718318308/Template%20Module%20Thumbnails/Thumbnail_3_s9pudi.png" 
                logo="https://zapier-images.imgix.net/storage/developer_cli/3a8f13d0fe5c9b2bbe7a7191a433ac1d.png?auto=format&ixlib=react-9.8.1&fit=crop&q=50&w=60&h=60&dpr=2"
                title="Turn slack messages into prioritized task list"
                />
            </div>
            
        </div>
        <div className="flex justify-center pt-36">
            <img className="w-3/5" src="https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685628568/Zapier%20logos/zapier-logo-no-space_hihmgg.svg"/>
        </div>
        
    </div>
}