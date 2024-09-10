import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

const JoinClassroomDrawer = () => {
  const router = useRouter();
  const [classroomId, setClassroomId] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassroomId(event.target.value);
  };

  const handleSubmit = () => {
    const pattern = /^[a-zA-Z0-9-]+$/;

    if (pattern.test(classroomId)) {
      router.push(`/class/${classroomId}`);
    } else {
      toast.error("Invalid Classroom ID format");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Join Classroom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Join Classroom</DrawerTitle>
            <DrawerDescription>Enter your classroom ID</DrawerDescription>
            <div className="mt-1">
              <Input type="text" placeholder="Classroom ID" value={classroomId} onChange={handleInputChange} />
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default JoinClassroomDrawer;