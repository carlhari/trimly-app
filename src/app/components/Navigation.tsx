import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  return (
    <nav className="w-full flex items-center justify-between py-2 px-8 border-b border shadow">
      <h1 className="text-4xl font-semibold">Trimly</h1>
      <div className="flex gap-4">
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "2.5rem",
                  height: "2.5rem",
                  border: "1px solid black",
                },
              },
            }}
          />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button variant={"ghost"} className="text-lg">
              Login
            </Button>
          </SignInButton>

          <SignInButton>
            <Button className="text-lg">Get Started</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
