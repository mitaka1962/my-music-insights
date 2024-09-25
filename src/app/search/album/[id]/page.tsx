import AlbumInfo from "@/components/search/album-info";

export default function Page({
  params,
}: {
  params: {
    id: string;
  }
}) {
  return (
    <main className="p-4">
      <AlbumInfo id={params.id} />
    </main>
  );
}
