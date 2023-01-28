'use client';

import "@fortawesome/fontawesome-svg-core/styles.css";
import 'styles/dist.css';

import Head from "next/head";
import React from "react";

import { config } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false; // Prevent fontawesome from adding its CSS since we did it manually above
library.add(fas); // Add any icons you want to use here

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html>
        <Head>
            <title>Next.js App</title>
        </Head>
        <body>{children}</body>
        </html>
    );
}
