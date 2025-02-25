import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import limitStringLength from '../../../pages/utils/limitStringLength';
import parse from "html-react-parser";

export default function BlogComponent(props) {
  const router = new useRouter();
  const currPage = router.pathname;

  const { data } = props;

  const styles = {
    background: `url("${
      data && data.image
        ? data.image
        : 'https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg'
    }") no-repeat`,
    height: '300px',
    width: '100%',
    WebkitBackgroundSize: 'cover',
    MozBackgroundSize: 'cover',
    OBackgroundSize: 'cover',
    backgroundSize: 'cover',
    position: 'relative',
  };

  return (
    <div className="rounded shadow-sm">
      <div style={styles}></div>
      <Link
        className="p-2 text-decoration-none text-dark text-muted"
        href={`/blog/${data.id}`}
      >
        <div className='px-2'>
        <h4>{limitStringLength(data.title, 0, 80)}</h4>
        <p>{parse(limitStringLength(data.description, 0, 140))}</p>
        </div>
      </Link>
    </div>
  );
}
