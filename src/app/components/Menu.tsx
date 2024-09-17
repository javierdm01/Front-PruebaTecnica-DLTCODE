'use client'
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


export default function Menu() {
    const [menu, setMenu] = useState(false);

    const handleClickMenu = () => {
        setMenu(!menu);
        console.log(menu);
    }
    return (
        <>
            <nav className="dashboard_menu">
                <h1 className="dashboard_title">EL SANTUARIO</h1>
                <ul className="dashboard_list">
                    <li className="dashboard_list-item"><Link className="dashboard_menu-link" href="/dashboard/criaturas">Mis Criaturas</Link></li>
                    <li className="dashboard_list-item"><Link className="dashboard_menu-link"  href="/dashboard/profile/">Mi Perfil</Link></li>
                    <li className="dashboard_list-item"><Link className="dashboard_menu-link" onClick={()=> signOut({callbackUrl:'/'})}  href="#">Cerrar Session</Link></li>
                </ul>
                <FontAwesomeIcon onClick={handleClickMenu} className="dashboard_bars" icon={faBars} />
                {
                    menu && (
                        <ul className="dashboard_mobileMenu">
                            <div className="xMarkbox">
                                <FontAwesomeIcon onClick={handleClickMenu} className="xMark" icon={faXmark} />
                            </div>
                            <li className="dashboard_list-item"><Link className="dashboard_menu-link dashboard-menu-mark" href="/dashboard/criaturas" onClick={handleClickMenu}>Mis Criaturas</Link></li>
                            <li className="dashboard_list-item"><Link className="dashboard_menu-link  dashboard-menu-mark"  href="/dashboard/profile/" onClick={handleClickMenu}>Mi Perfil</Link></li>
                            <li className="dashboard_list-item"><Link className="dashboard_menu-link  dashboard-menu-mark"  href="#  " onClick={handleClickMenu}>Cerrar Session</Link></li>
                        </ul>
                    )
                }
            </nav>
        </>
    )
}