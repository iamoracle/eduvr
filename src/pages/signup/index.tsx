"use client";

import Link from "next/link";
import useSignup from "@/hooks/useSignup";
import { useAccount } from "wagmi";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

import StructureSchool from "@/components/common/Structure";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Signup = () => {
  const { signup, isLoading, error, message }: any = useSignup();
  const { isConnected } = useAccount();

  const router = useRouter();

  async function _signup(): Promise<any> {
    if (await signup()) {
      toast("Success", {
        description: "Signup Successful",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  }

  useEffect(() => {
    if (error) {
      toast("Error", {
        description: message,
      });
    }
  }, [error, message]);

  return (
    <>
      <div>
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
      </div>
      <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
        <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full items-center">
          <div className="pr-10 max-w-sm">
            <h2 className="text-4xl font-bold">
              Join EduVR <br /> Web3 Classroom
            </h2>
            <p className="mt-4 text-base">
              if you already have a passport you can <br />{" "}
              <Link href="/login" className="text-blue-600">
                Login here
              </Link>
            </p>
            <div className="mt-4">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : isConnected ? (
                <Button onClick={_signup} type="submit">
                  Sign-Up{" "}
                </Button>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
          <div className="max-w-sm flex-1">
            <section className="w-full flex justify-center">
              <div className="w-full min-h-10 h-[48vh] md:h-[400px]">
                <StructureSchool />
              </div>
            </section>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Signup;
