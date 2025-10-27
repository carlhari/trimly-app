"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function CreateLinkField() {
  return (
    <div className="flex w-[80%] mx-auto flex-col justify-center gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-semibold">
          Create New Shorten Url Link
        </Label>
        <Button variant="secondary">
          <a href="/dashboard">Cancel</a>
        </Button>
      </div>
      <form className="flex flex-col gap-4 justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Link Details</CardTitle>
            <CardDescription>
              Note: You have remaining 10 link creation
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-8 flex flex-col">
            <div className="flex flex-col gap-4">
              <Label className="text-xl">Destination URL</Label>
              <Input
                name="destination"
                type="text"
                className="text-lg"
                placeholder="https://example.com/long_url"
                required
              />
            </div>

            <div className="">
              <Label className="text-xl">Shorten Link</Label>
              <div className="w-full flex gap-4 items-center justify-between">
                <div>
                  {typeof window !== "undefined"
                    ? `${window.location.origin}`
                    : ""}
                  /
                </div>
                <Input
                  type="text"
                  className="text-lg"
                  placeholder="random"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label className="text-xl">Title</Label>
              <Input type="text" className="text-lg" maxLength={30} required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Addtional Options</CardTitle>
            <div className="flex gap-2 items-center justify-start">
              <Checkbox className="size-[18px]" />
              <Label className="text-base">Generate QR Code</Label>
            </div>
          </CardHeader>
        </Card>
        <Button type="submit" className="w-1/2 mx-auto text-xl">
          Create
        </Button>
      </form>
    </div>
  );
}
