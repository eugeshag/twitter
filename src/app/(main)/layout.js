import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Nav />
      </div>
      <div className="scrollbar-hide border-dark-700 h-screen w-[800px] overflow-y-scroll border-x-1">
        {children}
      </div>
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}
