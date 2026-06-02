"use client"
import { useEffect, useState } from "react";

const useApiFetcher = <T,>(uri: string): T | null => {
   const [data, setData] = useState<T | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const url = new URL(uri, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
            const res = await fetch(url, { method: "GET" });
            const data = await res.json();
            setData(data);
         } catch (e) {
            console.log("error from api tester", e instanceof Error ? e.message : "Unknown error");
         }
      };

      fetchData();
   }, [uri]);

   return data;
};

export default useApiFetcher;
