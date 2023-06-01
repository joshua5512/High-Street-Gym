import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlogpost } from "../api/blogposts";
import Nav from "../components/Nav";
import { useAuthentication } from "../hooks/authentication";

export default function CreateBlogpost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user] = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newBlogpost = {
      datetime: new Date().toISOString().slice(0, 19).replace("T", " "),
      title,
      content,
    };

    if (user && user.id) {
      newBlogpost = {
        ...newBlogpost,
        user_id: user.id,
      };
    }

    try {
      await createBlogpost(newBlogpost);
      navigate("/blogposts"); // Redirect to the blog posts list page after successful creation
    } catch (error) {
      console.error("Failed to create blog post:", error);
    }
  };

  return (
    <div className="create-blogpost-container">
      <Nav />
      <div className="container p-2 mx-auto">
        <div className="rounded border-2 border-primary p-2 w-8/12">
          <h2>Create New Blog Post</h2>
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
                Create
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/blogposts")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
