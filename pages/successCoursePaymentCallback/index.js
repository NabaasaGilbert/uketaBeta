import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useUser from '../../lib/useUser';
import { useSession } from 'next-auth/react';
import { cartState, courseDataState } from '../../atoms/atoms';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';

export default function courses() {
  const [cart, setCart] = useRecoilState(cartState);
  const resetCartState = useResetRecoilState(cartState);
  const { user } = useUser();
  const { data: session } = useSession();
  const router = new useRouter();
  const { OrderMerchantReference, OrderTrackingId } = router.query;

  useEffect(() => {
    if (user.isLoggedIn === false && !session) {
      router.push('/login');
    }
    console.log({ OrderMerchantReference, OrderTrackingId });
    if (OrderMerchantReference && OrderTrackingId) {
      axios
        .post('/api/pesapal/registerSuccessPayment', {
          OrderMerchantReference,
          OrderTrackingId,
        })
        .then(async(res) => {
          console.log(res.data);
          if(res.data.status === 200){
            await resetCartState();
            setTimeout(() => {
              router.push('/mycourses');
            },500)            
          }else{
            // router.push('/mycourses');
            console.log("Error getting courses paid")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session, user, OrderMerchantReference, OrderTrackingId]);

  return (
    <>
      <Head>
        <title>
          Success Course Payment Callback | Uketa Learning - Unlock, Understand,
          Uplift
        </title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Success Course Payment Callback| Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Select from courses taught by real-world experts, learn in-demand skills with professional video courses at your own pace, with lifetime access on mobile and desktop on Uketa an online learning and teaching platform from Uganda with courses ranging in multiple topics and skill levels from expert coaches"
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/courses" />
        <meta name="robots" content="all" />
      </Head>
      <div className="mt-5 text-center p-5">
        <h2 className="p-5 text-success">
          You have successfully Paid for this course
        </h2>
      </div>
      {/* <p className="text-center">Our top rated courses.</p> */}
      {/* <div className="mt-5"> */}

      {/* </div> */}
    </>
  );
}
