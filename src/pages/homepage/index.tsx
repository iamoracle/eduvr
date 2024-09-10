import SchoolCav from "@/components/home/SchoolCanvas";
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import JoinClassroom from "@/components/JoinClassroom"
import HeroNav from "@/components/HeroNav";

import Link from "next/link";

const Homepage = () => {   
    return(
        <>
          <div>
            <div>
              <div className="cr_container flex flex-col">
                  <div className="cr_child circle-red"></div>
                  <div className="cr_child circle-blue"></div>
                </div>
            </div>
            <HeroNav />
          </div>
          <section className="w-full flex flex-col items-center justify-center px-6 md:px-12 py-6 mt-2">
            <div className="max-w-xl">
              <div className="text-center flex flex-col gap-y-2 mt-4">
                <h1 className="text-4xl md:text-5xl font-semibold text-slate-800">Connect to 3D classroom for everyone</h1>
                <p className="text-xl md:text-2xl text-slate-700 py-2">Connect, interact, and learn from any anywhere with EduVR - The Future of Education on Chain.</p>
              </div>
              <div className="mt-4 text-center flex flex-row gap-x-3 justify-center">
                <Link href="/signup"><Button>Get Started</Button></Link>
                <JoinClassroom />
              </div>
            </div>
          </section>
          <Toaster />
          <section className="w-full flex justify-center">
            <div className="w-full h-[600px]">
              <SchoolCav />
            </div>
          </section>
        </>
    );
}

export default Homepage;