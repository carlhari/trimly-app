import { Button } from "@/components/ui/button";
import LinkCard from "../components/LinkCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-semibold">Link List</h1>
        <Button>
          <Link href="/create">Create Link</Link>
        </Button>
      </div>
      <hr />,
      <div className="w-full flex items-center justify-between">
        <div>0 Selected</div>

        <Select defaultValue="active">
          <SelectTrigger>
            Show:
            <SelectValue placeholder="Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-4">
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
      </div>
    </>
  );
}
