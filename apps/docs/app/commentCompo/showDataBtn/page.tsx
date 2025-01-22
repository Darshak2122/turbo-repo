'use client'
import Link from "next/link";
import '../css/main.css'
export function ShowDataBtn() {
  return (
    <Link
      href="/registration/showUserData"
      className="showBtn"
    >
      Show Users
    </Link>
  );
}
