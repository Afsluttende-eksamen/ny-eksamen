import Instagram from "./Instagram";
import TikTokEmbed from "./Tiktok";
import YouTubeFeed from "./Youtube";
import InstagramFeed from "./instaAPI";

export default function SoMeEmbed() {
  return (
    <div className="grid grid-cols-1 gap-7">
      <InstagramFeed />
      {/* <Instagram
        posts={[
          "https://www.instagram.com/p/DSSZ1XaDMI_/",
          "https://www.instagram.com/p/DRkHkAZjHap/",
          "https://www.instagram.com/p/DLe8aEqsvrL/",
          "https://www.instagram.com/p/DKulEPQiGq8/",
          "https://www.instagram.com/p/DJ4MWJ-sJF8/",
          "https://www.instagram.com/p/DIv5cNrM7vU/",
        ]}
      /> */}
      <TikTokEmbed
        tiktokPosts={[
          "https://www.tiktok.com/@dansermedpiger/video/7583806874491915542",
          "https://www.tiktok.com/@dansermedpiger/video/7582973159385664790",
          "https://www.tiktok.com/@dansermedpiger/video/7581542355820432643",
          "https://www.tiktok.com/@dansermedpiger/video/7579660453069016342",
          "https://www.tiktok.com/@dansermedpiger/video/7546601530791660822",
          "https://www.tiktok.com/@dansermedpiger/video/7531763809195740438",
          "https://www.tiktok.com/@dansermedpiger/video/7527670616883727638",
          "https://www.tiktok.com/@dansermedpiger/video/7522852754495229206",
        ]}
      />
      <YouTubeFeed
        videos={[
          "https://www.youtube.com/embed/cL8sVnBQk7M?si=LzJ7xTtWQCJa3V1X",
          "https://www.youtube.com/embed/47X1M9SYqSw?si=L4yqBHoao88Qh1Q0",
          "https://www.youtube.com/embed/HIrmfSUZ4i4?si=0trDmgt3fyW894cG",
          "https://www.youtube.com/embed/URbWuLjIYaQ?si=N_whjD0DODLwrhsz",
          "https://www.youtube.com/embed/rRG8NDu-CEs?si=8AYM65mBo7H3o2Fh",
          "https://www.youtube.com/embed/3KX6b7pJQ1o?si=1j1YIY6Y9b5Z2Y4I",
        ]}
      />
    </div>
  );
}
