import React, { useEffect, useState } from "react";
import Story from "../Components/Story/Story";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { ClipLoader, PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

function Community() {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [addStory, setAddStory] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          "http://localhost:3000/api/v1/posts/getAllPosts",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        if (data.success === false) return toast.error(data.message);
        setStories(data.posts);
      } catch (e) {
        return toast.error(data.message);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const handleAddStory = async (e) => {
    e.preventDefault();
    if(!content)
        return toast.error("Content is Empty")
    try {
      setLoading(true);
      const req = await fetch("http://localhost:3000/api/v1/posts/createPost", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }), // HTTP only handles text data
      });
      const data = await req.json();
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
    } catch (e) {
      return toast.error(data.message);
    }
    setContent(null);
    setLoading(false);
    toast.success("Story Posted! Refresh To see result.");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-3 justify-center items-center ">
        <ClipLoader
          color={"teal"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (addStory) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <section className="relative max-h-lg p-8 min-w-unit-5xl rounded-lg shadow-lg flex flex-col gap-6">
          <IoMdClose
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={(e) => setAddStory(false)}
          />
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            required
            placeholder="Enter your story here..."
            className="p-3"
            value={content ? content : ""}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <Button color="primary" variant="shadow" onClick={handleAddStory}>
            Post
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        addStory ? "opacity-30" : "opacity-100"
      } px-20 py-10 flex flex-col justify-center items-center`}
    >
      <h1 className="roboto-bold text-4xl">Today’s Top Discussions</h1>
      <div className=" self-end">
        <Button
          color="primary"
          variant="bordered"
          startContent={<FaPlus />}
          onClick={() => setAddStory(true)}
        >
          Add Your Story
        </Button>
      </div>
      <main className="grid grid-cols-1 lg:grid-cols-2 place-items-center p-10 gap-9">
        {stories &&
          stories.map((story) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 * story._id }}
              key={story._id}
            >
              <Story story={story} />
            </motion.div>
          ))}
      </main>
    </div>
  );
}

export default Community;
