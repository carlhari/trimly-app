import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
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
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-2xl">
                Original URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very-long-url"
                className="text-2xl"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="qr" defaultChecked={false} />

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
