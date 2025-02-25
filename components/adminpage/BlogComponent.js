import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import limitStringLength from "../../pages/utils/limitStringLength";
import axios from "axios";
import parse from "html-react-parser";

export default function BlogComponent(props) {
  const router = new useRouter();
  const currPage = router.pathname;

  const { data } = props;

  const styles = {
    background: `url("${
      data && data.image
        ? data.image
        : "https://res.cloudinary.com/daecbszah/image/upload/v1677774142/Uketa_Logo_10_llkbe1.jpg"
    }") no-repeat`,
    height: "300px",
    width: "100%",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    backgroundSize: "cover",
    // position: 'relative',
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`/api/admin/deleteBlog?id=${id}`);
      alert(res.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="border-rounded">
      <div style={styles}>
        <div className="p-1 d-flex justify-content-right">
          <div className="p-1">
            <Link
              className="btn btn-success"
              href={`/admin/editBlog/${data.id}`}
            >
              Edit
            </Link>            
          </div>
          <div className="p-1">
            <button
              className="btn btn-danger right-0"
              onClick={() => deleteBlog(data.id)}
            >
              delete
            </button>
          </div>
        </div>
      </div>
      <Link
        className="p-2 text-decoration-none text-dark text-muted"
        href={`/admin/blog/${data.id}`}
      >
        <h4>{limitStringLength(data.title, 0, 80)}</h4>
        <p>{parse(limitStringLength(data.description, 0, 140))}</p>
      </Link>
    </div>
  );
}
