import useSWR from "swr";
import { useRouter } from "next/router";
import Head from "next/head";

import Sidebar from "../../../components/Sidebar";
import { Post, Sub } from "../../../types";
import { FormEvent, useState } from "react";
import Axios from "axios";
import { GetServerSideProps } from "next";

export default function submit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const { sub: subName } = router.query;
  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);
  if (error) router.push("/");
  console.log(sub);

  const submitPost = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") return;

    try {
      const { data: post } = await Axios.post<Post>("/posts", {
        title: title.trim(),
        body,
        sub: subName,
      });

      router.push(`/r/${sub.name}/${post.identifier}/${post.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container flex pt-5">
      <Head>
        <title>Submit to ReadIt</title>
      </Head>
      <div className="w-160">
        <div className="p-4 bg-white rounded">
          <h1 className="mb-3 text-lg">Submit post to /r/{subName}</h1>
          <form onSubmit={submitPost}>
            <div className="relative mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bordergray-300 focus:outline-none focus:border-gray-600"
                placeholder="Title"
                maxLength={300}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div
                className="absolute mb-2 text-sm text-gray-500 select-none"
                style={{ top: 11, right: 10 }}
              >
                {title.trim().length}/300
              </div>
            </div>
            <textarea
              className="w-full p-3 border-gray-300 rounded focus:outline-none focus:border-gray-600"
              value={body}
              placeholder="Text (Optional)"
              onChange={(e) => setBody(e.target.value)}
              rows={4}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="px-3 py-1 blue button"
                type="submit"
                disabled={title.trim().length === 0}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {sub && <Sidebar sub={sub} />}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");
    await Axios.get("/auth/me", { headers: { cookie } });
    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: "/login" }).end();
  }
};
