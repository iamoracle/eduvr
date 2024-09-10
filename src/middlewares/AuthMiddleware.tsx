import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getProfile } from "@/utils/call";
import useLoading from "@/hooks/useLoading";
import Preloader from "@/components/Preloader";

interface AuthMiddlewareProps {
  children: ReactNode;
}
const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const router = useRouter();
  const { stopLoading, isLoading } = useLoading(true);

  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getProfile();

      if (profile === null) {
        router.push("/login");
      }
      stopLoading();
    };

    checkProfile();
  }, [router]);

  return isLoading ? <Preloader /> : <>{children}</>;
};

export default AuthMiddleware;
