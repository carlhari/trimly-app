"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Client Component
export default function Page({ params }) {
  const [onSuccess, setSuccess] = useState<boolean>(false);
  const [shortenUrl, setShortenUrl] = useState<string>("");
  const [qrImageString, setQRString] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const controller = new AbortController();
  //@ts-expect-error annoyig params
  const { id } = use(params);

  useEffect(() => {
    getQR(id);
  }, [id]);

  const getQR = async (id: string) => {
    setLoading(true);
    try {
      const qrdetails = axios.post("/api/link/qr", { id: id });

      const { data } = await qrdetails;
      if (!data.ok) return setSuccess(false);
      const qr = await QRCode.toDataURL(
        `http://localhost:3000/${data.shortenUrl}`,
        {
          type: "image/png",
          width: 1000,
        },
      );

      setShortenUrl(data.shortenUrl);
      setQRString(qr);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to retrieve QR data");
    } finally {
      setLoading(false);
    }
  };
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrImageString;
    link.download = `qr - ${id}.png`;
    link.click();
  };
  const handleCancel = () => {
    controller.abort();
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      {isLoading && <div>Loading...</div>}
      {onSuccess && (
        <>
          <div className="w-full justify-between items-center flex">
            <div className="text-xl font-semibold">QR Code</div>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center">
              <Image src={qrImageString} alt="image" width={500} height={500} />
              <div className="text-xl underline">
                http://localhost:3000/{shortenUrl}
              </div>
            </CardContent>

            <Button onClick={handleDownload} className="w-1/2 mx-auto text-xl">
              Download
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
