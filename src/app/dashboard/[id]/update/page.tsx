"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [shortenUrl, setShortenUrl] = useState<string>("");
  const [generateQR, setGenerateQR] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const controller = new AbortController();

  // Store original values
  const [originalValues, setOriginalValues] = useState({
    title: "",
    originalUrl: "",
    generateQR: false,
  });

  //@ts-expect-error annoying params
  const { id }: any = use(params);

  useEffect(() => {
    async function getLinkDetails() {
      try {
        setLoading(true);
        const { data } = await axios.post(
          "/api/link/update/details",
          {
            id: id,
          },
          { signal: controller.signal },
        );

        if (!data.ok) return null;

        setTitle(data.list.title);
        setOriginalUrl(data.list.originalUrl);
        setShortenUrl(data.list.shortenUrl);
        setGenerateQR(data.list.generateQR);

        // Store original values
        setOriginalValues({
          title: data.list.title,
          originalUrl: data.list.originalUrl,
          generateQR: data.list.generateQR,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getLinkDetails();
  }, [id, controller.signal]);

  // Check if any value has changed
  const hasChanged =
    title !== originalValues.title ||
    originalUrl !== originalValues.originalUrl ||
    generateQR !== originalValues.generateQR;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "/api/link/update",
        {
          id: id,
          title: title,
          originalUrl: originalUrl,
          generateQR: generateQR,
        },
        { signal: controller.signal },
      );

      if (!data.ok) return null;

      return router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex w-[80%] mx-auto flex-col justify-center gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-xl font-semibold">
          Update your Shorten Url Link
        </Label>
        <Button
          variant="secondary"
          onClick={() => {
            controller.abort();
            router.push("/dashboard");
          }}
        >
          Cancel
        </Button>
      </div>

      {isLoading ? (
        <>loading</>
      ) : (
        <form
          className="flex flex-col gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Link Details</CardTitle>
            </CardHeader>
            <CardContent className="gap-8 flex flex-col">
              <div className="flex flex-col gap-4">
                <Label className="text-xl">Destination URL</Label>

                <Input
                  name="destination"
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="text-lg"
                  placeholder="https://example.com/long_url"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="">
                <Label className="text-xl">Shortened Link</Label>
                <div className="w-full flex gap-4 items-center justify-between">
                  <Input
                    type="text"
                    className="text-lg"
                    value={`(Cannot be edited) localhost:3000/${shortenUrl}`}
                    minLength={5}
                    maxLength={20}
                    disabled
                    aria-disabled
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Label className="text-xl">Title</Label>
                <Input
                  type="text"
                  className="text-lg"
                  minLength={3}
                  maxLength={20}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Options</CardTitle>
              <div className="flex gap-2 items-center justify-start">
                <Checkbox
                  className="size-[18px]"
                  checked={generateQR}
                  onCheckedChange={(value) => setGenerateQR(!!value)}
                  disabled={isSubmitting}
                />
                <Label className="text-base">Generate QR Code</Label>
              </div>
            </CardHeader>
          </Card>
          <Button
            type="submit"
            className="w-1/2 mx-auto text-xl"
            disabled={!hasChanged || isSubmitting}
          >
            Update
          </Button>
        </form>
      )}
    </div>
  );
}
