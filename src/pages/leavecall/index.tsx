"use client";

import Link from "next/link";

import Image from "next/image";
import { Button } from "@/components/ui/button";


const Callend = () => {
  
  return (
    <>
      <div>
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
      </div>
      <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
        <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full py-20">
          <div className="pr-10 max-w-md text-center">
            <h2 className="text-4xl font-bold">You have left the classroom.</h2>
            <p className="mt-4 text-base">
              If you need to rejoin, simply click the link again to get back in.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Callend;
