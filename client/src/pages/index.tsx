import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";

import { Post } from "../types";
import PostCard from "../components/PostCard";

dayjs.extend(relativeTime);

export default function Home() {
  //SWR data fetching or fast response
  const { data: posts } = useSWR("/posts");
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
        <div className="w-160">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
        {/* {Sidebar} */}
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
