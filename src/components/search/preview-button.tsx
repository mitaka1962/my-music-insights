'use client';

import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRef, useState } from "react";

export default function PreviewButton({
  src,
}: {
  src: string | null;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioPlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  return (
    <>
      {src ? <audio src={src} ref={audioRef} onEnded={() => setIsPlaying(false)}></audio> : null}
      <button 
        className={clsx('btn btn-block btn-outline btn-sm gap-1', { 'btn-disabled' : !src })} 
        onClick={handleAudioPlay}
      >
        {isPlaying ? <PauseIcon className="w-4" /> : <PlayIcon className="w-4" />}
        Preview
      </button>
    </>    
  );
}
