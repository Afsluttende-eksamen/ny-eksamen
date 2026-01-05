import { getInstagramPosts } from "@/lib/api/instagram";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default async function InstagramFeed() {
  const posts = await getInstagramPosts(10);

  return (
    <section className="mt-8">
      '
      <Link
        href="https://www.instagram.com/dansermedpiger/"
        target="_blank"
        className="hover:underline flex items-center gap-3"
      >
        <h3 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
          <FaInstagram /> Instagram
        </h3>
      </Link>
      <div className="flex gap-4 overflow-x-auto scroll-smooth pb-2   [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative cursor-pointer block shrink-0 w-[420px] h-[420px] rounded-2xl overflow-hidden"
          >
            {post.media_type === "VIDEO" ? (
              <video
                src={post.media_url}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover "
                autoPlay
              />
            ) : (
              <img
                src={post.media_url}
                alt={post.caption || "Instagram opslag"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
