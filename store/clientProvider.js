"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./clientProvider.module.css";
import { SessionProvider } from "next-auth/react";
export default function Provider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
