'use client'
import Menu from "../components/Menu";
import Image from "next/image";
import userImage from "../../assets/caretaker.png";
import masterImage from "../../assets/master.png";
import "../../styles/dashboard.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LayoutDashboard({children}: {children: React.ReactNode}) {
    const { data: session } = useSession();
    const router= useRouter()
    const [rol,setRol]=useState("")
    useEffect(() => {
        if (session) {
            console.log(session?.user?.rol)
            setRol(session?.user?.rol);
        }else{
            router.push('/')
        }
    }, [session]);
    return (
        
            <div className="dashboard_box">
                {rol=='cuidador' ?<Image className="dashboard_image" src={userImage} alt="userImage" />:<Image className="dashboard_image" src={masterImage} alt="masterImage" />}
                <div className="dashboard_center">
                    <Menu/>
                    <main className="dashboard_main">
                        {children}
                    </main>
                </div>
            </div>
    );
}