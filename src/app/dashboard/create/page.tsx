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
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenUrl, setShortenUrl] = useState<string>("");
  const [generateQR, setGenerateQR] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isSubmit, setSubmit] = useState<boolean>(false);

  const controller = new AbortController();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    try {
      await axios
        .post(
          "/api/link/create",
          {
            originalUrl,
            shortenUrl,
            generateQR,
            title,
          },
          { signal: controller.signal },
        )
        .finally(() => {
          setSubmit(false);
          setOriginalUrl("");
          setShortenUrl("");
          setGenerateQR(false);
          setTitle("");
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = () => {
    controller.abort();
    router.push("/dashboard");
  };

  return (
    <div className="flex w-[80%] mx-auto flex-col justify-center gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-semibold">
          Create New Shorten Url Link
        </Label>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center"
      >
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
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/long_url"
                required
              />
            </div>

            <div className="">
              <Label className="text-xl">Shortened Link</Label>
              <div className="w-full flex gap-4 items-center justify-between">
                <div>localhost:3000/</div>
                <Input
                  type="text"
                  className="text-lg"
                  placeholder="example: xQuAwS"
                  value={shortenUrl}
                  minLength={5}
                  maxLength={20}
                  onChange={(e) => setShortenUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label className="text-xl">Title</Label>
              <Input
                type="text"
                value={title}
                className="text-lg"
                onChange={(e) => setTitle(e.target.value)}
                minLength={3}
                maxLength={20}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Addtional Options</CardTitle>
            <div className="flex gap-2 items-center justify-start">
              <Checkbox
                className="size-[18px]"
                checked={generateQR}
                onCheckedChange={(value) => setGenerateQR(!!value)}
              />
              <Label className="text-base">Generate QR Code</Label>
            </div>
          </CardHeader>
        </Card>
        <Button
          type="submit"
          className="w-1/2 mx-auto text-xl"
          disabled={isSubmit}
          aria-disabled={isSubmit}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
