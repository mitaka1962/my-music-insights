import { Track, Album } from "@/lib/definitions";
import Link from "next/link";
import SearchResultCard from "./search-result-card";

export default function SearchResultCardForSearch({
  result,
}: {
  result: Track | Album;
}) {
  return (
    <Link href={`/search/${result.type}/${result.id}`}>
      <SearchResultCard result={result} />
    </Link>
  );
}
