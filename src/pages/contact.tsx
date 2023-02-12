import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image"
import images from "@/Assets/index";
import { QRSelector } from "@/components";

/**
 * This component will contain a nested QR select option to choose 
 *     between insta and wechat qrs
 */
const Contact: NextPage = () => {
    const [qr, setQr] = useState<string>("Insta")
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex h-[1068px] w-[1068px] items-center justify-center p-8 rounded-[50%] bg-black">
                <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4  rounded-[50%] border-white">
                   <div className="flex h-full w-full text-left justify-start p-3 pt-3 border-4 rounded-[50%]  border-purple-600">
                       <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4 rounded-[50%]  border-blue-600">
                           <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4  rounded-[50%] border-green-600">
                               <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4 rounded-[50%] border-yellow-600">
                                   <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4  rounded-[50%] border-orange-600">
                                       <div className="flex h-full w-full text-left p-3 pt-3 justify-start border-4 rounded-[50%]  border-red-600">
                                              
                                           {/* CENTER CONTAINER */}
                                           <div className="flex flex-col items-center h-full w-full p-40 border-4 border-white rounded-xl">

                                                {/*QR SELECTOR */}
                                                <QRSelector 
                                                    qr={qr} 
                                                    setQr={setQr}
                                                 />
                                                   
                                                {/* Text */}
                                                <div className="flex flex-col h-56 w-full items-center min-w-[280px] items-left pt-16 ml-3">

                                                    <span
                                                        className="flex py-1 items-center text-white text-2xl"
                                                    >
                                                        <Image
                                                            src={images.IntsaLogo}
                                                            alt="Instagram"
                                                            className="mx-1"
                                                            height={45}
                                                            width={45}
                                                        />
                                                        SparklingmSpirit
                                                    </span>

                                                    <span
                                                        className="flex py-1 items-center text-white text-2xl"
                                                    >
                                                        <Image
                                                            src={images.WechatLogo}
                                                            alt="Wechat"
                                                            className="mx-1"
                                                            height={45}
                                                            width={45}
                                                        />
                                                        miaomiaomeile
                                                    </span>

                                                    <span className="flex ml-1 mt-1 py-1 items-center text-white text-2xl">
                                                        <Image
                                                            src={images.ProtonMailLogo}
                                                            alt="Proton Mail"
                                                            className="mx-1 mr-2"
                                                            height={45}
                                                            width={45}
                                                        />
                                                        adamantspinner@protonmail.com
                                                    </span>
                                                </div>

                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;