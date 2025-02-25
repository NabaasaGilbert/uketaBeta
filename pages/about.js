import Head from "next/head";
import AboutInfoEl from "../components/aboutpage/AboutInfoEl";

export default function about() {
  return (
    <>
      <Head>
        <title>About | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="About | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="UKETA is an online learning platform from Uganda specialising in practical education that is suitable for present day professionals. We aim to provide the knowledge and skills necessary for our users to grow in their businesses, careers and personal lives."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/about" />
        <meta name="robots" content="all" />
      </Head>
      <AboutInfoEl />
    </>
  );
}
