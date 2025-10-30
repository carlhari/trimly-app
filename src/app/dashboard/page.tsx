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
import { useRouter } from "next/navigation";

export default function Page() {
  const [linkList, setLinkList] = useState<LinkListTypes[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const router = useRouter();
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

  const handleUpdate = async (id: string) => {
    try {
      const { data } = await axios.post("/api/link/update/check", { id: id });

      if (!data.ok) return null;

      return router.push(`/dashboard/${id}/update`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const deleteLink = await axios.post("/api/link/delete", {
        idList: selectedItem,
      });
      const data = deleteLink.data;
      if (data.ok === false) return console.error();

      setLinkList((prev) =>
        prev.filter((item) => !selectedItem.includes(item.id)),
      );
      setSelectedItem([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSort = (value: string) => {
    setLinkList((list) => {
      const sorted = [...list].sort((a, b) => {
        if (value === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });
      return sorted;
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
        <div className="flex items-center gap-4">
          {selectedItem.length !== 0 && (
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Select defaultValue="newest" onValueChange={handleDateSort}>
            <SelectTrigger>
              Show:
              <SelectValue placeholder="Newest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
                  handleUpdate={handleUpdate}
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
