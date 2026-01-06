"use client";

import { useEffect, useState } from "react";
import TrackCard from "./TrackCard";

export default function SpotifyArtistSection({
  artistId,
  topTracksLimit = 10,
  market = "DK",
}) {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch(
      `/api/spotify/top-tracks?artistId=${artistId}&market=${market}&limit=${topTracksLimit}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.tracks[0]);
        setTracks(data.tracks || []);
      });
  }, [artistId, market, topTracksLimit]);

  return (
    <section className="w-full bg-black px-4 md:px-8 py-16">
      <div className="pb-16  flex flex-col items-start mx-4 justify-left text-white">
        <h2 className="text-white/80 md:text-left">
          Find os på Spotify og Apple Music
        </h2>
      </div>

      <div>
        <div className="flex h-100 md:h-115 items-center overflow-x-auto gap-2.5 whitespace-nowrap scrollbar-hide">
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
