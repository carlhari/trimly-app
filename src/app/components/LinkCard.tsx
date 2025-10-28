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
import { LinkListTypes } from "../types/LinkList";

export default function LinkCard({
  item,
  setSelectedItem,
  selectedItem,
}: {
  item: LinkListTypes;
  setSelectedItem: any;
  selectedItem: Array<any>;
}) {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              className="border border-black"
              defaultChecked={false}
              checked={selectedItem.includes(item.id)}
              onCheckedChange={() =>
                setSelectedItem((prev: any) =>
                  prev.includes(item.id)
                    ? prev.filter((id: string) => id !== item.id)
                    : [...prev, item.id],
                )
              }
            />
            <Avatar></Avatar>
            <p>{item.title}</p>
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
              {item.shortenUrl}
            </a>
            <a href="">{item.originalUrl}</a>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 w-full">
          <div>views: {item.views}</div>
          <div>{item.createdAt}</div>
          <Button variant={"link"}>View QR Code</Button>
        </div>
      </CardContent>
    </Card>
  );
}
