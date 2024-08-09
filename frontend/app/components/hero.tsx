"use client"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./buttons/primaryBtn"
import { SecondaryButton } from "./buttons/secondaryBtn"
import { Features } from "./features"

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
            <PrimaryButton size="big" onClick={() => {router.push("/signup")}}>
                Start free with email
            </PrimaryButton>
            
            <div className="pl-4">
                <SecondaryButton size="big" onClick={() => {}}>
                    Start free with Google 
                </SecondaryButton>
            </div>
            
        </div>

        <div className="flex justify-center">
            <Features title="Free forever" subtitle="for core features"></Features>
            <Features title="More apps" subtitle="than any other platform"></Features>
            <Features title="Cutting edge" subtitle="AI features"></Features>
        </div>
    </div>
}