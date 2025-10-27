"use client";
import { useState, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ShortenedLink {
  id: number;
  originalUrl: string;
  generateQR: boolean;
  createdAt: string;
}

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [generateQR, setGenerateQR] = useState<boolean>(false);
  const [shortenedLinks, setShortenedLinks] = useState<ShortenedLink[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!url) return;

    const newLink: ShortenedLink = {
      id: Date.now(),
      originalUrl: url,
      generateQR: generateQR,
      createdAt: new Date().toISOString(),
    };

    setShortenedLinks([...shortenedLinks, newLink]);

    // Clear form
    setUrl("");
    setGenerateQR(false);

    // Store in localStorage for global access
    const existingLinks: ShortenedLink[] = JSON.parse(
      localStorage.getItem("shortenedLinks") || "[]",
    );
    localStorage.setItem(
      "shortenedLinks",
      JSON.stringify([...existingLinks, newLink]),
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <p className="w-[50%] mx-auto text-center text-xl">
        <strong className="text-4xl">Make link sharing effortless.</strong>
        <br />
        Instantly shorten long URLs, generate custom QR codes, and manage
        Whether you’re tracking campaign links or just keeping things tidy,
        Trimly helps you stay organized and share smarter.
      </p>
      <Card className="w-[50%] mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl">Create Shortened Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-2xl">
                Original URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-2xl"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="qr"
                checked={generateQR}
                defaultChecked={false}
                onCheckedChange={(checked) => setGenerateQR(checked === true)}
              />

              <Label htmlFor="qr" className="text-[18px]">
                Generate QR Code
              </Label>
            </div>

            <Button type="submit" className="w-full text-2xl">
              Shorten URL
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
