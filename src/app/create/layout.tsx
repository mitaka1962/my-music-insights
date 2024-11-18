export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex">
      <div className="w-3/4 overflow-y-auto min-h-full px-6 py-8">
        {children}
      </div>
    </div>
  );
}
