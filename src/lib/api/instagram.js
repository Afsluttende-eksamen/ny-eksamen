export async function getInstagramPosts(limit = 6) {
  const url = `https://graph.instagram.com/${process.env.INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=${limit}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  const data = await res.json();
  return data.data;
}
