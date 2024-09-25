import SideSearch from "@/components/search/side-search";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex">
      <main className="w-3/4 overflow-y-auto min-h-full">
        {children}
      </main>
      <div className="w-1/4 border-l overflow-y-scroll min-h-full">
        <SideSearch />
      </div>
    </div>
  );
}