import AlbumInfo from "@/components/search/album-info";

export default function Page({
  params,
}: {
  params: {
    id: string;
  }
}) {
  return (
    <main>
      <AlbumInfo id={params.id} />
    </main>
  );
}
