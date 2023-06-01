import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogpostByID, updateBlogpost } from "../api/blogposts";
import Nav from "../components/Nav";
import { useAuthentication } from "../hooks/authentication";

export default function EditBlogpost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user] = useAuthentication();

  useEffect(() => {
    getBlogpostByID(id)
      .then((blogpost) => {
        setTitle(blogpost.title);
        setContent(blogpost.content);
      })
      .catch((error) => {
        console.error("Failed to fetch blogpost:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlogpost = {
      id,
      datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
      user:user.id,
      title,
      content,
    };

    try {
      await updateBlogpost(updatedBlogpost);
      navigate("/blogposts");
    } catch (error) {
      console.error("Failed to update blogpost:", error);
    }
  };

  return (
    <div className="edit-blogpost-container">
      <Nav />
      <div className="container p-2 mx-auto">
        <div className="rounded border-2 border-primary p-2 w-full">
          <h2>Edit Blog Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="title" className="block mb-1">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="content" className="block mb-1">
                Content:
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-400 px-2 py-1 w-full"
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <button type="submit" className="btn btn-primary mr-2">
                Update
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/blogposts")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
