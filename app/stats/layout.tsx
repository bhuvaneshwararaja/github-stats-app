import type { Metadata } from "next";
import Profile from "../components/profile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-auto" style={{height: "100vh"}}>
      <Profile />
      {children}
    </div>
  );
}
