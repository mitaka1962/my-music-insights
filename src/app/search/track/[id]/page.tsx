import TrackInfo from "@/components/search/track-info";

export default function Page({
  params,
}: {
  params: { id: string; };
}) {
  return (
    <main>
      <TrackInfo id={params.id} />
    </main>
  );
}
