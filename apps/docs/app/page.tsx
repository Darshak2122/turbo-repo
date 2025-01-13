import { Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h3> ⇒ Registration Form using react-hook-form, Zod, TypeScript</h3>
        <Button style={{border:"1px solid wheat",color:"wheat"}}>
          <Link href='/registration'>Registration Form</Link>
        </Button>
        <h3> ⇒ Todo app using TypeScript,TanStack </h3>
        <Button style={{border:"1px solid wheat",color:"wheat"}}>
          <Link href='/todos'>Todo List</Link>
        </Button>
      </main>
    </div>
  );
}
