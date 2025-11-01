import { use } from "react";

export default function Page({ params }) {
  const { id } = use(params);
  return (
    <div className="flex w-[80%] mx-auto flex-col justify-center gap-4"></div>
  );
}
