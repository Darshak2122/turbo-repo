"use client";
import { Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {


  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h3> ⇒ Registration Form using react-hook-form, Zod, TypeScript</h3>
          <Button style={{ border: "1px solid wheat", color: "wheat" }}>
            <Link href="/registration">Registration Form</Link>
          </Button>
        </main>
      </div>
  );
}
