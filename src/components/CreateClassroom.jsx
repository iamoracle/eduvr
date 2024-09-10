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
import DialogRoom from "@/components/RoomLink";
import Link from "next/link";

const CreateClassroom = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create Classroom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>New ClassRoom</DrawerTitle>
            <DrawerDescription>
              Generate a quick classroom link for immediate use or future
              scheduling from your dashboard
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DialogRoom />
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateClassroom;