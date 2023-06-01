import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAll, deleteByID } from "../api/blogposts";
import { getUserByID } from "../api/user";
import Nav from "../components/Nav";
import Spinner from "../components/Spinner";
import { useAuthentication } from "../hooks/authentication";

export default function Blogposts({ refreshDependency }) {
  const navigate = useNavigate();
  const [blogposts, setBlogposts] = useState([]);
  const [user] = useAuthentication();

  useEffect(() => {
    getAll().then(async (blogposts) => {
      const blogpostsWithExtras = await Promise.all(
        blogposts.map(async (blogpost) => {
          const userID = await getUserByID(blogpost.user_id);

          return Promise.resolve({
            id: blogpost.id,
            date: new Date(blogpost.datetime).toLocaleString(),
            user: userID,
            title: blogpost.title,
            content: blogpost.content,
          });
        })
      );

      setBlogposts(blogpostsWithExtras);
    });
  }, []);

  const handleDeleteBlogpost = async (blogpostID) => {
    try {
      await deleteByID(blogpostID);
      setBlogposts((prevBlogposts) =>
        prevBlogposts.filter((blogpost) => blogpost.id !== blogpostID)
      );
    } catch (error) {
      console.error("Failed to delete blogpost:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="container p-2 mt-8  mx-auto">
        <div className="rounded border-2 border-primary items-center justify-center p-2 w-3/4 ">
        {blogposts.length === 0 ? (
  <Spinner />
) : (
  <div className="flex flex-col space-y-4">
    {blogposts.map((blogpost) => (
      <div key={blogpost.id} className="flex flex-col space-y-2 border rounded p-2">
        <div>ID: {blogpost.id}</div>
        <div>
          Posted by: {blogpost.user.firstname} {blogpost.user.lastname}
        </div>
        <div>Date: {blogpost.date}</div>
        <div>Title: {blogpost.title}</div>
        <div className="truncate">Content: {blogpost.content}</div>
        {user && (user.id === blogpost.user.id || user.role === "admin") ? (
          <div>
            <Link
              to={`/blogposts/${blogpost.id}`}
              className="btn btn-primary btn-sm mx-2"
            >
              Edit
            </Link>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleDeleteBlogpost(blogpost.id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-sm mx-2"
              style={{ backgroundColor: 'gray', color: 'white' }}
              disabled
            >
              Edit
            </button>
            <button
              className="btn btn-sm"
              style={{ backgroundColor: 'gray', color: 'white' }}
              disabled
            >
              Delete
            </button>
          </div>
        )}
      </div>
    ))}
  </div>
)}


          {user && (
            <div className="mt-4">
              <Link to="/blogposts/create" className="btn btn-primary">
                Create New Blogpost
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
