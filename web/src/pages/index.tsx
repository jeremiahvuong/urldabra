import type { NextPage } from "next";
import Head from "next/head";
import { Formik } from "formik";
import { useShortenMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { DOMAIN_NAME } from "../constants";

const Home: NextPage = () => {
  const [{ data }, shortenLink] = useShortenMutation();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Formik
        initialValues={{ link: "" }}
        onSubmit={async (val) => {
          await shortenLink(val);
        }}
      >
        {({ handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <input placeholder="link" name="link" onChange={handleChange} />
          </form>
        )}
      </Formik>
      <div>
        {data && (
          <>
            <p>{data.shorten.link}</p>
            <p>{DOMAIN_NAME + data.shorten.hash}</p>
          </>
        )}
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
