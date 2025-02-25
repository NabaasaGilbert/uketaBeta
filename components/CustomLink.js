// components/CustomLink.js
import { useRouter } from 'next/router';
import Link from 'next/link';

const Index = ({ href, children, ...props }) => {
  const router = useRouter();
  const query = router.query;

  // Append the query parameters to the href
  const updatedHref = {
    pathname: href,
    query,
  };

  return (
    <Link href={updatedHref} {...props}>
      {children}
    </Link>
  );
};

export default Index;
