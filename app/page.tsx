import Image from "next/image";
import Login from "./login/page";

export default function Home() {
  return (
    <div className="w-full overflow-hidden" style={{height:"90vh" }}>
      <Login />
    </div>
  );
}
