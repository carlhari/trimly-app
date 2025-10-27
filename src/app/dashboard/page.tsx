import LinkCard from "../components/LinkCard";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-semibold">Link List</h1>
        <Link href={"/dashboard/create"}>Create Link</Link>
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
