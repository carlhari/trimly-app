import Image from "next/image";

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
      <div className="w-[50%] mx-auto">
        <img src={"./pic.png"} className="contain-content" alt="image" />
      </div>
    </div>
  );
}
