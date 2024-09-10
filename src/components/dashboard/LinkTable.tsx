import { ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { getMyCalls } from "@/utils/call";
import { CallProps } from "@/types";

const LinkTable = () => {
  const [calls, setCalls] = useState<Array<CallProps>>([]);

  useEffect(() => {
    const _getMyCalls = async () => {
      const _calls = await getMyCalls();
      setCalls(_calls);
    };

    _getMyCalls();
  }, []);
  return (
    <div className="w-full overflow-x-auto">
      <Tabs defaultValue="week">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>In-Active</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Classroom Links</CardTitle>
              <CardDescription>
                Monitor and handle recent classroom link activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead className="sm:table-cell">Link</TableHead>
                    <TableHead className="sm:table-cell">Status</TableHead>
                    <TableHead className="md:table-cell">
                      Date Created
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calls.map((data: CallProps, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell className="sm:table-cell">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{`${window.location.protocol}//${window.location.hostname}/class/${data._id}`}</div>
                        </TableCell>
                        <TableCell className="sm:table-cell">
                          <Badge className="text-xs" variant="secondary">
                            {data.status ? "active" : "inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="md:table-cell whitespace-nowrap">
                          {new Date(data.createdAt ?? "").toLocaleDateString() +
                            " at " +
                            new Date(data.createdAt ?? "").toLocaleTimeString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LinkTable;
