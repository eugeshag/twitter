import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen justify-center overflow-hidden">
      <div className="sticky top-0 h-screen min-w-16 z-50">
        <Nav />
      </div>
      <div className="scrollbar-hide border-dark-700 h-screen w-[600px] overflow-y-scroll border-x-1">
        {children}
      </div>
      <div className="sticky top-0 h-screen hidden lg:block">
        <Sidebar />
      </div>
    </div>
  );
}
