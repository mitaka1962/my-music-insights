import { sora } from "@/lib/fonts";

export default function SpotifyButton({
  href,
  small = false,
}: {
  href: string;
  small?: boolean;
}) {
  if (small) {
    return (
      <a role="button" className="btn btn-sm btn-neutral font-medium hover:scale-105" href={href} target="_blank">
        <img className="h-full py-1" src="/spotify-full-logo.svg" alt="spotify link" />
      </a>
    );
  }

  return (
    <a role="button" className="btn btn-smlr btn-neutral font-medium hover:scale-105" href={href} target="_blank">
      <span className={`${sora.className} tracking-wider pt-0.5 text-xs`}>LISTEN ON</span>
      <img className="h-full py-2" src="/spotify-full-logo.svg" alt="spotify link" />
    </a>
  );
}
