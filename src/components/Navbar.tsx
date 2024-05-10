"use client"; //for using react component bcoz nextjs doesn't allow us to directly use the react
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { error } from "console";

const Navbar = ({ className }: { className?: string }) => {
    const [active, setActive] = useState<string | null>(null);
    const handleLogout = () => {
        axios.get('/api/users/logout', {withCredentials: true})
        .then((res) => toast.success(res.data.message))
        .catch((error) => toast.error(error.response.data.error))
    }
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Toaster 
             position="top-center"
             reverseOrder={true}
            />
            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home">

                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item="Our Courses">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href={'/courses'}>All Courses</HoveredLink>
                        <HoveredLink href={'/courses'}>Basic Music Theory</HoveredLink>
                        <HoveredLink href={'/courses'}>Advanced Composition</HoveredLink>
                        <HoveredLink href={'/courses'}>Song Writting</HoveredLink>
                        <HoveredLink href={'/courses'}>Music Production</HoveredLink>
                    </div>
                </MenuItem>
                <Link href={""} onClick={handleLogout}>
                    <MenuItem setActive={setActive} active={active} item="Logout">

                    </MenuItem>
                </Link>
            </Menu>
        </div>
    )
}

export default Navbar
