import { sora } from "@/lib/fonts";

export default function SpotifyButton({
  href,
  minimized = false,
}: {
  href: string;
  minimized?: boolean;
}) {
  if (minimized) {
    return (
      <a role="button" className="btn btn-sm bg-gray-800 text-gray-100 font-medium hover:bg-gray-900" href={href} target="_blank">
        <img className="h-full py-1" src="/spotify-full-logo.svg" alt="spotify link" />
      </a>
    );
  }

  return (
    <a role="button" className="btn btn-smlr bg-gray-800 text-gray-100 font-medium hover:bg-gray-900" href={href} target="_blank">
      <span className={`${sora.className} tracking-wider pt-0.5 text-xs`}>LISTEN ON</span>
      <img className="h-full py-2" src="/spotify-full-logo.svg" alt="spotify link" />
    </a>
  );
}
