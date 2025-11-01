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
import QRCode from "qrcode";
export default function LinkCard({
  item,
  setSelectedItem,
  selectedItem,
  handleUpdate,
  handleQR,
}: {
  item: LinkListTypes;
  setSelectedItem: any;
  selectedItem: Array<any>;
  handleUpdate: (id: string) => void;
  handleQR: (id: string) => void;
}) {
  const date = new Date(item.createdAt).toDateString();
  const time = new Date(item.createdAt).toLocaleTimeString("pht", {
    timeStyle: "short",
  });
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
            <p>{item.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigator.clipboard.writeText(item.shortenUrl)}
            >
              Copy
            </Button>
            <Button onClick={() => handleUpdate(item.id)}>Update</Button>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col">
            <a
              href={`/${item.shortenUrl}`}
              className="text-blue-600 font-semibold"
            >
              localhost:3000/{item.shortenUrl}
            </a>
            <a href={`${item.originalUrl}`}>{item.originalUrl}</a>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8 w-full">
          <div>views: {item.views}</div>
          <div>
            {date} | {time}
          </div>
          {item.generateQR && (
            <Button variant={"link"} onClick={() => handleQR(item.id)}>
              View QR Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
