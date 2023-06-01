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
      <div className="container p-2 mx-auto">
        <div className="rounded border-2 border-primary p-2 w-full">
          {blogposts.length === 0 ? (
            <Spinner />
          ) : (
            <div className="blogpost-container">
              {blogposts.map((blogpost) => (
                <div key={blogpost.id} className="blogpost">
                  <div>ID: {blogpost.id}</div>
                  <div>
                    Posted by: {blogpost.user.firstname} {blogpost.user.lastname}
                  </div>
                  <div>Datetime: {blogpost.date}</div>
                  <div>Title: {blogpost.title}</div>
                  <div>Content: {blogpost.content}</div>
                  <div>
                    {user && (user.id === blogpost.user.id || user.role === "admin") && (
                      <>
                        <Link
                          to={`/blogposts/${blogpost.id}/edit`}
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
                      </>
                    )}
                  </div>
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
