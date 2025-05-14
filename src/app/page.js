import Nav from "@/components/Nav";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 sticky top-0 h-screen overflow-hidden">
        <Nav />
      </div>
      <div className="w-[800px] h-screen overflow-y-scroll scrollbar-hide ">
        <Main />
      </div>
      <div className="flex-1 sticky top-0 h-screen overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}
