import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/inputGroup";
import { useAuthState } from "../context/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreement) {
      setErrors({
        ...errors,
        agreement: "You must check the newsletter checkbox",
      });
      return;
    }
    try {
      const res = await Axios.post("/auth/register", {
        email,
        password,
        username,
      });
      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
      </Head>
      <div
        className="h-screen bg-center bg-cover w-36"
        style={{
          backgroundImage: "url('/images/bricks.jpg')",
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label className="text-xs cursor-pointer" htmlFor="agreement">
                I agree to get newsletters from Read It
              </label>
              <small className="block font-medium text-red-600">
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className="mb-2"
              value={email}
              type="email"
              placeholder="Email"
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              className="mb-2"
              value={username}
              type="text"
              placeholder="Username"
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              className="mb-4"
              value={password}
              type="password"
              placeholder="Password"
              setValue={setPassword}
              error={errors.password}
            />
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
              Sign Up
            </button>
          </form>
          <small>
            Already Signed up!
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
