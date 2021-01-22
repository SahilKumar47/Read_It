import Axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Post } from "../types";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>ReadIt: Front page of the internet</title>
      </Head>
      <div className="container flex pt-4">
        {/* {post feed} */}
        <div className="w-160">
          {posts.map((post) => (
            <div key={post.identifier} className="flex mb-4 bg-white">
              {/* {vote section} */}
              <div className="w-10 text-center rounded-l bg-grey-200">
                <p>V</p>
              </div>
              {/* {post data section} */}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`r/${post.subName}`}>
                    <img
                      src="https://www.lakshyaskills.com/wp-content/uploads/2018/08/default-gravatar.png"
                      className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                    />
                  </Link>
                  <Link href={`r/${post.subName}`}>
                    <a className="text-xs font-bold cursor-pointer hover:underline">
                      /r/{post.subName}
                    </a>
                  </Link>
                  <p className="text-xs text-gray-500">
                    <span className="mx-1">•</span> Posted by
                    <Link href={`/u/user`}>
                      <a className="mx-1 hover:underline">/u/user</a>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {Sidebar} */}
      </div>
    </div>
  );
}
