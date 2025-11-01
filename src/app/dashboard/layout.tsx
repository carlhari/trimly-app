import { Toaster } from "react-hot-toast";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[60%] mx-auto flex justify-center flex-col gap-4 border-r border-l p-8">
      <Toaster />
      {children}
    </div>
  );
}
