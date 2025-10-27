import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function LinkCard() {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-4">
            <Checkbox />
            <Avatar></Avatar>
            <p>Url Name</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Copy</Button>
            <Button variant="outline">Share</Button>
            <Button>Settings</Button>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col">
            <a href="" className="text-blue-600 font-semibold">
              https:///example.com
            </a>
            <a href="">https:///original_example.com</a>
          </div>{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 w-full">
          <div>views</div>
          <div>createdAt</div>
          <Button variant={"link"}>View QR Code</Button>
        </div>
      </CardContent>
    </Card>
  );
}
