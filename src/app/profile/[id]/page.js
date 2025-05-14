import Nav from "@/components/Nav";
import ProfileComponent from "@/components/Profile";
import Sidebar from "@/components/Sidebar";

export default async function Profile({ params }) {
  const { id } = await params;
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Nav />
      </div>
      <div className="scrollbar-hide h-screen w-[800px] overflow-y-scroll">
        <ProfileComponent userId={id} />
      </div>
      <div className="sticky top-0 h-screen flex-1 overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}
