import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NavHeader from "../../components/dashboard/NavHeader";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import NFTList from "./data/NftList.json";

const Passport = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardLayout />
      <div className="flex flex-col">
        <NavHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="mx-auto grid w-full md:w-[53rem] md:max-w-[53rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                NFT Collection
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                Minted 1 in Total
              </Badge>
            </div>
            <div className="flex flex-col">
              <div className="w-full h-[250px] bg-black rounded-lg">
                <div className="nft_image_bg">
                  <div className="nft_image_bg_before flex items-center">
                    <div className="p-6 text-slate-50 max-w-sm flex-1">
                      <div className="text-3xl font-extrabold">
                        <h1>NFT Collection & Goal Milestone</h1>
                      </div>
                      <div>
                        <p className="text-slate-200 text-base mt-px">
                          Earn NFT everytime you complete a milestone
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3 md:gap-4 overflow-visible flex-wrap items-stretch">

              {NFTList.map((data) => {
                return(
                  <div className="w-[calc(50%-0.375rem)] md:w-[12.5rem] relative group hover:z-50 backdrop-opacity-10">
                    <Card className="overflow-visible transition-transform duration-300 transform group-hover:scale-105 md:group-hover:scale-125 hover:z-50 group-hover:z-50 hover:shadow-2xl hover:border-none _card_nft_container">
                      <CardHeader className="p-2">
                        <Image
                          alt="EduVR Passport"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={`/NFT/${data.img}`}
                          width="300"
                        />
                      </CardHeader>
                      <CardContent className="p-2 pb-4">
                        <Badge className={`px-1.5 py-px text-[0.65rem] mb-1 ${data.status ? "bg-green-500" : "bg-red-500"}`}>{data.status ? "Minted": "Locked"}</Badge>
                        <CardTitle className="text-sm text-slate-600">{data.title}</CardTitle>
                        <CardDescription className="text-xs text-slate-400">
                        {data.desc}
                        </CardDescription>
                      </CardContent>
                      {data.status ? "" : <div className="_veil_card group-hover:bg-transparent transition-all duration-300"></div> }
                    </Card>
                  </div>
                );
              })}
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Passport;
