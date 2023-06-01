import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { useAuthentication } from "../hooks/authentication";
import { createBlogpost } from "../api/blogposts";
import Picker from 'emoji-picker-react'; // Import the emoji picker

export default function CreateBlogpost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user] = useAuthentication();
  
  // New state to handle the visibility of the emoji picker
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handleSubmit = async (e) => {
    // ...existing code...
  };

  // This function will be called when an emoji is selected
  const onEmojiClick = (event, emojiObject) => {
    setContent(content + emojiObject.emoji);
  };

  return (
    <div className="create-blogpost-container">
      <Nav />
      <div className="container p-2 mx-auto">
        <div className="rounded border-2 border-primary p-2 w-full">
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
              <button onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}>
                Toggle Emoji Picker
              </button>
              {isEmojiPickerVisible && (
                <Picker onEmojiClick={onEmojiClick} />
              )}
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
