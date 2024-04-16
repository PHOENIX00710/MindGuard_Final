import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import "./story.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RWebShare } from "react-web-share";
import commentIcon from "../../assets/comment-icon.svg";
import shareIcon from "../../assets/share-icon.svg";
import heartLikedIcon from "../../assets/heart-icon-liked.svg";
import heartUnlikedIcon from "../../assets/heart-icon-unliked.svg";

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
            <img
              src={heartLikedIcon}
              alt="heart"
              className="text-2xl cursor-pointer"
              onClick={handleLike}
            />
          ) : (
            <img
              src={heartUnlikedIcon}
              alt="heart"
              className="text-7xl cursor-pointer"
              onClick={handleLike}
            />
          )}
          <img
            src={commentIcon}
            alt="comment"
            onClick={goToIndividualPost}
            className="text-xl cursor-pointer"
          />
          <RWebShare
            data={{
              text: "Like humans, flamingos make friends for life",
              url: `https://mind-guard-final-jet.vercel.app/indi/${props.story._id}`,
              title: "Flamingos",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <img
              src={shareIcon}
              alt="share"
              className="text-xl cursor-pointer"
            />
          </RWebShare>
        </section>
      </section>
    </div>
  );
}

export default Story;
