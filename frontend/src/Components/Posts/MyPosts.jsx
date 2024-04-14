import React, { useEffect, useState } from "react";
import IndividualRow from "./IndividualRow";
import "./myposts.css";
import { ClipLoader, PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(null);
  const [userId, setUserId] = useState(null);
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const setUser = () => {
      setUserId(user?._id);
    };
    if (user) setUser();
  }, []);

  useEffect(() => {
    console.log(userId);
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          `https://mind-guard-final-backend.vercel.app/api/v1/posts/getAllPosts?userId=${user._id}`,
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
        console.log(data.posts);
        setPosts(data.posts);
      } catch (e) {
        return toast.error(data.message);
      }
      setLoading(false);
    };
    if (userId) fetchArticles();
  }, [userId]);

  const removePost = (id) => {
    let temp = posts.filter((post) => post._id !== id);
    setPosts(temp);
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

  return (
    <div className="w-full py-2 px-4">
      <table className="w-full overflow-x-scroll">
        <thead className="lato-bold text-start">
          <th>Date</th>
          <th>Title</th>
          <th>Overview</th>
          <th>View Post</th>
          <th>Delete Post</th>
        </thead>
        <tbody>
          {posts &&
            posts.map((item) => {
              return (
                <IndividualRow
                  key={item._id}
                  details={item}
                  removePost={removePost}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default MyPosts;
