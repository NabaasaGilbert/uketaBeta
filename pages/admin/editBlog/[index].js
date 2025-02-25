import Head from "next/head";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";

import useUser from "../../../lib/useUser";
import { useSession } from "next-auth/react";
var Editor = dynamic(() => import("../../../components/editor"), {
  ssr: false,
});

export default function blog() {
  const { user } = useUser();
  const { data: session } = useSession();
  const router = new useRouter();
  const blogId = router.query.index;
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    if (user) {
      axios.get(`/api/cloudinary`).then((res) => {
        setCloudinaryName(res.data.cloudinaryName);
        setCloudinaryPreset(res.data.cloudinaryPreset);
        return setLoading(false);
      });
    }
    if (blogId) {
      axios.get(`/api/admin/fetchBlog?id=${blogId}`).then((res) => {
        if (res.data.status === 200) {
          setBlog(res.data.data);
          console.log(res.data.data);
          setTitle(res.data.data.title);
          setDescription(res.data.data.description);
          setImage(res.data.data.image);
          return setLoading(false);
        }
      });
    }
  }, [blogId, user, session]);

  const openWidget = () => {
    // create the widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudinaryName,
        uploadPreset: cloudinaryPreset,
      },
      (error, result) => {
        if (
          result.event === "success" &&
          result.info.resource_type === "image"
        ) {
          console.log(result);
          // setImagePublicId(result.info.public_id);
          setImage(result.info.secure_url);
        }
      }
    );
    widget.open(); // open up the widget after creation
  };

  const processData = (e) => {
    e.preventDefault();

    const payload = {
      id: blogId,
      title,
      description,
      image,
    };

    console.log(payload);
    if (!title) {
      return setError("Please add a title to your blog");
    }
    if (!description) {
      return setError("Please add a description to your blog");
    }
    if (!image) {
      return setError("Please add an image to your blog");
    }
    setLoading(true);
    setSuccessMsg("");
    setError("");

    axios
      .post("/api/admin/editBlog", payload)
      .then((res) => {
        console.log({ res });
        setLoading(false);
        setSuccessMsg("Blog created successfully");
        setTimeout(() => {
          return router.push(`/admin/blog/${blogId}`);
        }, 2000);
      })
      .catch((error) => {
        console.log({ error });
        setError("Error editing blog");
        setLoading(false);
      });
  };

  const handleTextInput = (data) => {
    setDescription(data);
  };

  return (
    <>
      <Head>
        <title>Edit Blog | Uketa Learning - Unlock, Understand, Uplift</title>
        <meta
          name="description"
          content="Uketa is an education technology company that provides an online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches. Professional skills that position you at the top of the candidate list."
        />
        <meta
          property="og:title"
          content="Create Blog | Uketa Learning - Unlock, Understand, Uplift"
        />
        <meta
          property="og:description"
          content="Start teaching with us - Become an instructor and create change one module at a time on UKETA a Uganda based online learning and teaching platform with courses ranging in multiple topics and skill levels from expert coaches."
        />
        <meta property="og:image" content="/logo/Uketa Logo 10.jpg" />
        <meta property="og:url" content="https://uketalearning.com/blogs" />
        <meta name="robots" content="all" />
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>
      {/* <BlogPage /> */}
      <div className="d-flex">
        <div className="col-lg-8 col-xl-8 col-md-10 col-12 mx-auto p-3">
          <div className="my-5 py-5 container-fluid">
            <h2 className=" text-center mt-3 fw-bold">Edit Blog</h2>
            <div>
              <form onSubmit={processData}>
                <div className="form-group my-3">
                  <div className="form-label">Title</div>
                  <input
                    type="text"
                    value={title}
                    required
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="form-group my-3">
                  <div className="form-label">Description</div>
                  <Editor sendDataInput={handleTextInput} props={description} />
                </div>
                <div className="form-group my-3">
                  <div className="form-label">Cover Image</div>
                  <div
                    type="file"
                    required
                    className="form-control"
                    name="image"
                    accept=" image/gif, image/jpeg,image/jpg, image/png"
                    onClick={openWidget}
                  >
                    Upload Image
                  </div>
                </div>
                <div className="w-100">
                  {image && <img className="w-100" src={image} />}
                </div>
                <div className="d-flex mx-auto mb-3">
                  {error && (
                    <Badge bg="danger" className="p-3 text-center w-100" pill>
                      {error}
                    </Badge>
                  )}
                </div>

                <div className="d-flex mx-auto mb-3">
                  {successMsg && (
                    <Badge bg="success" className="p-3 text-center w-100" pill>
                      {successMsg}
                    </Badge>
                  )}
                </div>
                {loading ? (
                  <Spinner className="text-orange" />
                ) : (
                  <div className="my-3">
                    <button type="submit" className="btn btn-success">
                      Submit Blog Edits
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
