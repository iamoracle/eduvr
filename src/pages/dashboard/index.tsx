import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NavHeader from "../../components/dashboard/NavHeader";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { useEffect, useState } from "react";
import { createCall, getStats } from "@/utils/call";
import LinkTable from "../../components/dashboard/LinkTable";
import { useRouter } from "next/router";
import { CallProps } from "@/types";
import useLoading from "@/hooks/useLoading";
  

type StatProps = {
  totalCalls: number;
  activeCalls: number;
};

export default function Dashboard() {
  const { isLoading, stopLoading } = useLoading(true);

  const [stats, setStats] = useState<StatProps>({
    totalCalls: 0,
    activeCalls: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const _getStats = async () => {
      const _stats = await getStats();
      setStats(_stats);
    };

    _getStats();
  }, []);

  return (
    isLoading && (
      <AuthMiddleware>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DashboardLayout />
        <div className="flex flex-col">
          <NavHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>New ClassRoom</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Generate a quick classroom link for immediate use or
                      future scheduling
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      onClick={async () => {
                        const call: CallProps = await createCall();
                        router.push(`/class/${call._id}`);
                      }}
                    >
                      Create Classroom
                    </Button>
                  </CardFooter>
                </Card>
                <Card x-chunk="dashboard-05-chunk-1">
                  <CardHeader className="pb-2">
                    <CardDescription>Total Link</CardDescription>
                    <CardTitle className="text-4xl">
                      {stats.totalCalls}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Links You Have Created in Total
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-2">
                  <CardHeader className="pb-2">
                    <CardDescription>Active Link</CardDescription>
                    <CardTitle className="text-4xl">
                      {stats.activeCalls}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <LinkTable />
            </div>
          </main>
        </div>
      </div>
      </AuthMiddleware>
    )
    
  );
}
