"use client";
import { useSession } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";
import NavbarBeforeAuth from "@/components/NavbarBeforeAuth";

export default function NavbarComponent() {
	const { data: session } = useSession();
	return <div>{session ? <Navbar /> : <NavbarBeforeAuth />}</div>;
}
