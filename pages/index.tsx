import Head from "next/head";
import { env } from "@/env.mjs";
import React from "react";
import axios from "axios";
import { type Company } from "./register";
import Link from "next/link";

export default function Home() {
  const [companies, setCompanies] = React.useState<Company[]>([]);

  React.useEffect(() => {
    axios
      .get<Company[]>(
        env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/dashboard/companies"
      )
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Head>
        <title>Carta Online</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Carta Online
        </h1>
        <div>
          <Link href="/register">Registrar un local</Link>
        </div>
        <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
        <div>
          {companies.map(({ companyName, location, phoneNumber, email }) => {
            return (
              <div key={email}>
                {companyName} queda en {location} pofavo llama a {phoneNumber}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
