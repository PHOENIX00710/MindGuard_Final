import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { CiShare1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "./story.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

function Story(props) {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(null);
  const [userId, setUserId] = useState(null);
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    const handleUser = () => {
      setUserId(user._id);
      setLike(props.story.likes.indexOf(user._id) != -1);
    };

    if (user) handleUser();
  }, [user]);

  const handleLike = async () => {
    console.log(like);
    try {
      const req = await fetch(
        `https://mind-guard-final-backend.vercel.app/api/v1/reactions/toggleLike/${props.story._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await req.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      if (data) {
        setLike(data.likes.indexOf(user._id) !== -1);
        setLikes(data.likes.length);
      }
    } catch (e) {
      return toast.error(data.message);
    }
    toast.success("Like Toggled");
  };

  const navigate = useNavigate();

  const goToIndividualPost = () => {
    console.log(props);
    navigate(`/indi/${props.story._id}`);
  };

  return (
    <div className="w-full md:max-w-md shadow-2xl rounded-md flex flex-col p-6">
      <section className="flex flex-col gap-5">
        <section className="flex gap-4 items-center justify-start">
          <Avatar
            src="https://www.shutterstock.com/image-photo/san-diego-california-july-22-600nw-1300933561.jpg"
            className=" bg-cover bg-center"
          />
          <div className="flex flex-col justify-center items-start roboto-bold">
            <h1 className="text-xl">{props.story.author}</h1>
          </div>
        </section>
        <p className="roboto-regular">{props.story.content}</p>
        <section className="text-md text-slate-400">
          {props.story.updatedAt.toString().split("T")[0]}
        </section>
        <section className="w-full justify-start flex items-center gap-3 border-y-2 border-slate-200 py-2">
          <p>
            <strong className="mr-0.5">
              {likes !== null ? likes : props.story.likes.length}
            </strong>
            <span className="roboto-light text-slate-500">Likes</span>
          </p>
          <p>
            <strong className="mr-0.5">{props.story.comments.length}</strong>
            <span className="roboto-light text-slate-500">Comments</span>
          </p>
        </section>
        <section className="w-full flex items-center justify-between">
          {like ? (
            <FaHeart
              className="text-2xl cursor-pointer overflow-hidden"
              style={{ color: "red" }}
              onClick={handleLike}
            />
          ) : (
            <CiHeart
              className="text-2xl cursor-pointer overflow-hidden"
              onClick={handleLike}
            />
          )}
          <FaRegComment
            className="text-3xl cursor-pointer"
            onClick={goToIndividualPost}
          />
          <CiShare1 className="text-3xl cursor-pointer" />
        </section>
      </section>
    </div>
  );
}

export default Story;
