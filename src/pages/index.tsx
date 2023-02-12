import React from "react";
import {NextPage} from "next";
import { GalleryMain } from "@/components";
import {ItemContextProvider} from "@/context/ItemContext";

const Gallery:NextPage = () => {
  
  return (
    <div className="flex h-full w-full items-center justify-around">
      <ItemContextProvider>
        <GalleryMain />
      </ItemContextProvider>
    </div>
  );
}

export default Gallery;