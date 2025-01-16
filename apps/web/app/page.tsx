"use client";

import styles from "./page.module.css";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import ProductList from './dates/page'

const queryClient = new QueryClient();
export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.page}>
        <main className={styles.main}>
         <ProductList/>
        </main>
      </div>
    </QueryClientProvider>
  );
}
