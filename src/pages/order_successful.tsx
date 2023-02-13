import React from "react";
import {NextPage} from "next";
import { GalleryMain } from "@/components";
import {ItemContextProvider} from "@/context/ItemContext";

export default function Confirmation () {
  
  return (
    <div className="flex h-full w-full mt-20 items-center justify-around">
      <div className="flex flex-col h-80 w-[1000px] rounded-2xl items-center justify-center bg-red-300">
         <h1 className="text-white text-4xl font-bold">
           Order Received
         </h1>
         <span className="text-lg p-8">
           Check your email for information regarding your order
         </span>
      </div>
    </div>
  );
}