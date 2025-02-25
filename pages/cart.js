import CartDetails from "../components/cartpage/CartDetails";
import Head from "next/head";

export default function cart() {
  return (
    <>
      <Head>
        <title>Cart | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Cart | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/cart" />
        <meta name="robots" content="all" />
      </Head>
      <CartDetails />
    </>
  );
}
