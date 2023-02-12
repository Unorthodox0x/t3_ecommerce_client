import React from "react";
import {NextPage} from "next";
import { GemstonesMain } from "@/components";
import {ItemContextProvider} from "@/context/ItemContext";

const GemstoneGallery:NextPage = () => {
  
  return (
    <div className="flex h-full w-full items-center justify-around">
      <ItemContextProvider>
        <GemstonesMain />
      </ItemContextProvider>
    </div>
  );
}

export default GemstoneGallery;