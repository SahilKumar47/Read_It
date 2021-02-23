import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR, { useSWRInfinite } from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Post, Sub } from "../types";
import PostCard from "../components/PostCard";
import { useAuthState } from "../context/auth";

dayjs.extend(relativeTime);

export default function Home() {
  const [observedPost, setObservedPost] = useState("");
  //SWR data fetching or fast response
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");
  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];

  const { authenticated } = useAuthState();

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id != observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  //?Intersection observer for Infinite Loading

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached bottom of the post");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };
  // const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   Axios.get("/posts")
  //     .then((res) => {
  //       console.log(res.data);
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>ReadIt: Front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* {post feed} */}
        <div className="w-full px-4 md:w-160 md:p-0">
          {isValidating && <p className="text-lg text-center">Loading ...</p>}
          {posts?.map((post) => (
            <PostCard
              post={post}
              key={post.identifier}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts.length > 0 && (
            <p className="text-lg text-center">Loading More Posts...</p>
          )}
        </div>
        {/* {Sidebar} */}
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        className="rounded-full cursor-pointer"
                        src={sub.imageUrl}
                        alt="sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="ml-2 font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

//server side rendering
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get("/posts");
//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };
