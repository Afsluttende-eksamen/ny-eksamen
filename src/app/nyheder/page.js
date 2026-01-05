import NewsList from "../components/news/NewsList";
import NewsletterForm from "../components/NewsletterForm";

import { getNews } from "@/lib/api/news";

export default async function News() {
  const post = await getNews();

  const categories = ["Alle"];

  post.forEach((post) => {
    if (!categories.includes(post.category)) {
      categories.push(post.category);
    }
  });

  return (
    <div >
      <NewsList posts={post} categories={categories} />
        <NewsletterForm />
      
  
       
   
   
    </div>
  );
}
