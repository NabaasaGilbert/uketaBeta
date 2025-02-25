import Blog from "../../components/blog/blogs/Blog";
import Head from "next/head";

export default function blog() {
  return (
    <>
      <Head>
        <title>Blogs | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Blogs | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Start teaching with us - Become an instructor and create change one module at a time on UKETA a Uganda based online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta
          property="og:url"
          content="https://uketalearning.com/blogs"
        />
        <meta name="robots" content="all" />
      </Head>
      <Blog />
    </>
  );
}
