import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IndividualComment from "../Components/IndividualComment";
import { ClipLoader, PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import commentIcon from "../assets/comment-icon.svg";
import shareIcon from "../assets/share-icon.svg";
import heartLikedIcon from "../assets/heart-icon-liked.svg";
import heartUnlikedIcon from "../assets/heart-icon-unliked.svg";

function IndividualPost() {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const user = useSelector((state) => state.user.userDetails);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleCommentDelete = async (id) => {
    try {
      const req = await fetch(
        `https://mind-guard-final-backend.vercel.app/api/v1/reactions/removeComment/${id}`,
        {
          method: "DELETE",
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
      let temp = comments;
      temp = temp.filter((comment) => {
        console.log(id, comment._id);
        return comment._id !== id;
      });
      console.log(temp);
      setComments(temp);
      toast.success(data.message);
    } catch (e) {
      return toast.error(data.message);
    }
  };

  const handleLike = async () => {
    console.log(like);
    try {
      const req = await fetch(
        `https://mind-guard-final-backend.vercel.app/api/v1/reactions/toggleLike/${postId}`,
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

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const req = await fetch(
          `https://mind-guard-final-backend.vercel.app/api/v1/posts/viewPost/${postId}`,
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
        setPost(data.post);
        setLike(data.liked);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };

    const fetchComments = async () => {
      setLoading(true);
      try {
        const req = await fetch(
          `https://mind-guard-final-backend.vercel.app/api/v1/reactions/getComments/${postId}`,
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
        setComments(data.comments);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };

    fetchComments();
    if (!newComment) fetchPostDetails();
  }, []);

  const goBack = () => {
    navigate("/community");
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment) return toast.error("Content is Empty");
    try {
      const req = await fetch(
        `https://mind-guard-final-backend.vercel.app/api/v1/reactions/addComment/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: newComment,
          }), // HTTP only handles text data
        }
      );
      const data = await req.json();
      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      let temp = comments;
      temp.unshift(data.newComment);
      setComments(temp);
    } catch (e) {
      return toast.error(data.message);
    }
    setNewComment(null);
    toast.success("Comment Added");
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

  if (post) {
    return (
      <div className="min-h-screen gap-3 flex flex-col py-10 px-5 md:px-20 items-center">
        <IoIosArrowRoundBack
          className="text-5xl left-6 justify-self-start self-start top-6 cursor-pointer"
          onClick={goBack}
        />
        <section className="flex flex-col gap-7">
          <section className="flex gap-8 items-center justify-start">
            <Avatar
              src="https://www.shutterstock.com/image-photo/san-diego-california-july-22-600nw-1300933561.jpg"
              className=" bg-cover bg-center"
            />
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-2xl roboto-bold">{post.author}</h1>
              <p className="font-medium text-gray-500 text-sm italic">
                {post.updatedAt.toString().split("T")[0]}
              </p>
            </div>
          </section>
          <p className="roboto-regular">{post.content}</p>
          <section className="w-full justify-start flex items-center gap-3 py-2">
            <p>
              <strong className="mr-0.5">
                {likes !== null ? likes : post.likes.length}
              </strong>
              <span className="roboto-light text-slate-500">Likes</span>
            </p>
            <p>
              <strong className="mr-0.5">
                {comments !== null ? comments.length : post.comments.length}
              </strong>
              <span className="roboto-light text-slate-500">Comments</span>
            </p>
          </section>
          <section className="w-1/3 flex items-center justify-between">
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
                className="text-4xl cursor-pointer"
                onClick={handleLike}
              />
            )}
            <img
              src={commentIcon}
              alt="comment"
              className="text-xl cursor-pointer"
            />
            <img
              src={shareIcon}
              alt="share"
              className="text-xl cursor-pointer"
            />
          </section>
          <h2 className="pl-4 self-start text-xl roboto-semibold ">
            {post.comments.length} comments
          </h2>
          <div className="max-w-1/6">
            <Button
              color="black"
              variant="bordered"
              startContent={<FaPlus />}
              onClick={() => setAddComment(true)}
            >
              Add Comment
            </Button>
          </div>

          {/* Add new Comment */}
          {addComment && (
            <section className="relative max-h-lg p-8 min-w-unit-5xl rounded-lg shadow-lg flex flex-col gap-6">
              <IoMdClose
                className="absolute top-2 right-2 text-2xl cursor-pointer"
                onClick={(e) => setAddComment(false)}
              />
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="1"
                required
                placeholder="Enter your comment here..."
                className="p-3"
                value={newComment ? newComment : ""}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="flex justify-center items-center">
                <Button
                  color="primary"
                  variant="shadow"
                  onClick={handleAddComment}
                >
                  Comment
                </Button>
              </div>
            </section>
          )}

          {comments &&
            comments.map((comment) => {
              return (
                <IndividualComment
                  key={comment._id}
                  comment={comment}
                  delete={handleCommentDelete}
                />
              );
            })}
        </section>
      </div>
    );
  }
}

export default IndividualPost;
