import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
// import useUser from "../../lib/useUser";
import dynamic from "next/dynamic";

import useUser from "../../lib/useUser";
import { useSession } from "next-auth/react";
var Editor = dynamic(() => import("../editor"), {
  ssr: false,
});

export default function CreateBlog() {
  const router = new useRouter();
  const currPage = router.pathname;
  const { user } = useUser();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [cloudinaryName, setCloudinaryName] = useState("");
  const [cloudinaryPreset, setCloudinaryPreset] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.isLoggedIn === false && !session) router.push("/login");
    if (user) {
      axios.get(`/api/cloudinary`).then((res) => {
        setCloudinaryName(res.data.cloudinaryName);
        setCloudinaryPreset(res.data.cloudinaryPreset);
        return setLoading(false);
      });
    }
  }, [session, user]);

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
      title,
      description,
      image,
    };

    if(!title){
      return setError("Please add a title to your blog")
    }
    if(!description){
      return setError("Please add a description to your blog")
    }
    if(!image){
      return setError("Please add an image to your blog")
    }
    setLoading(true);
    setSuccessMsg("");
    setError("");  

    axios
      .post("/api/admin/addNewBlog", payload)
      .then((res) => {
        setLoading(false);
        setSuccessMsg("Blog created successfully");
        setTimeout(() => {
          return router.push("/admin/blogs");
        }, 2000);
      })
      .catch((error) => {
        setError("Error creating blog");
        setLoading(false);
      });
  };

  const handleTextInput = (data) => {
    setDescription(data);
  };

  return (
    <div className="my-5 py-5 container-fluid">
      <h2 className=" text-center mt-3 fw-bold">Create Blog</h2>
      <div>
        <form onSubmit={processData}>
          <div className="form-group my-3">
            <div className="form-label">Title</div>
            <input
              type="text"
              required
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="form-group my-3">
            <div className="form-label">Description</div>
            <Editor
              sendDataInput={handleTextInput}
              style={{ minHeight: 300 }}
              cols={30}
              rows={15}
            />            
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
                Create Blog
              </button>
            </div>
          )}          
        </form>        
      </div>
    </div>
  );
}
