import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner"

const DialogRoom = () => {
  // State to hold the link value, this is optional and can be directly used as defaultValue in Input
  const [link, setLink] = useState("https://eduVR.com/eax");

  // Function to copy the input value to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
        toast("Link copied", {
            description: "Anyone with this link can join classroom."
        });
    }).catch((error) => {
      console.error("Failed to copy the link: ", error);
    });
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Classroom</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Here is your ClassRoom joining info</DialogTitle>
          <DialogDescription>
            Share this with those you'd like to invite to the classroom. Be sure to save it for future use. Anyone with this link will be able to join the classroom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link}
              readOnly
            />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRoom;
