import { type ReactNode, useEffect, useState } from "react";
import { getHTTPrequest } from "./utli/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchPost, setFetchPost] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPost() {
      setIsFetching(true);
      try {
        const data = (await getHTTPrequest(
          `https://jsonplaceholder.typicode.com/posts`
        )) as RawDataBlogPost[];
        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchPost(blogPosts);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Failed to fetch posts: ${err.message}`);
        }
      }
      setIsFetching(false);
    }
    fetchPost();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error} />;
  }
  if (fetchPost) {
    content = <BlogPosts posts={fetchPost} />;
  }
  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }
  return (
    <main>
      <img src={fetchingImg} alt="abstact image depicting a data post" />
      {content}
    </main>
  );
}

export default App;
