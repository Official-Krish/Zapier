import { useRouter } from "next/navigation";

const ZapLogo = ({width, height, onClick} : {width: number, height: number, onClick ?: () => void}) => {
    const router = useRouter();
    return <img width={width} height={height} onClick={onClick} className="cursor-pointer" src ="https://res.cloudinary.com/zapier-media/image/upload/q_auto/v1685628568/Zapier%20logos/zapier-logo-no-space_hihmgg.svg"/>
}
export default ZapLogo;