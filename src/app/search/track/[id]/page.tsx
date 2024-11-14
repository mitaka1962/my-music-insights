import TrackInfo from "@/components/search/track-info";

export default function Page({
  params,
}: {
  params: { id: string; };
}) {
  return (
    <main className="p-4">
      <TrackInfo id={params.id} />
    </main>
  );
}
