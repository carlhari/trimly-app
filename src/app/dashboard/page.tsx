"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import LinkCard from "../components/LinkCard";
import { LinkListTypes } from "../types/LinkList";

export default function Page() {
  const [linkList, setLinkList] = useState<LinkListTypes[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [isEmpty, setEmpty] = useState<boolean>(false);

  useEffect(() => {
    async function get_link_list() {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/link/get_list");
        if (data.ok === false) return console.error();
        if (data.ok && data.empty) return setEmpty(true);

        setEmpty(false);
        setLinkList(data.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    get_link_list();
  }, []);

  const handleSelectAll = () => {
    if (!linkList) return;

    setSelectedItem((prev: any) => {
      if (prev.length === linkList.length) {
        return [];
      } else {
        return linkList.map((item) => item.id);
      }
    });
  };
  return (
    <>
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl font-semibold">Link List</h1>
        <Button>
          <Link href="/dashboard/create">Create Link</Link>
        </Button>
      </div>
      <hr />,
      <div className="w-full flex items-center justify-between">
        {selectedItem.length !== 0 && (
          <Button onClick={handleSelectAll} className="fade-in">
            Select all
          </Button>
        )}
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
        {linkList &&
          linkList.map((item: LinkListTypes, key) => {
            return (
              <div key={key} className="w-full">
                <LinkCard
                  item={item}
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </div>
            );
          })}

        {isLoading && <Skeleton className="w-full h-56" />}
        {isEmpty && "Empty. Please create a link"}
      </div>
    </>
  );
}
