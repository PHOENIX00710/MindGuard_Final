import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./article.css";
import { HiOutlineSave } from "react-icons/hi";
import toast from "react-hot-toast";

function Article(props) {

  const handleSave = async (e) => {
    try {
      let url = `http://localhost:3000/api/v1/articles/toggleSave/${props.article._id}`;
      const req = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      if (data.success === false) return toast.error(data.message);
      toast.success(data.message)
    } catch (e) {
      return toast.error(data.message);
    }
  };

  const { title, overview, image, link } = props.article;

  return (
    <div
      className="card max-w-lg shadow-xl md:max-w-max bg-cover"
      style={{ backgroundImage: `url('${image}')` }}
    >
      <div className="card-content w-full relative">
        <HiOutlineSave
          className="absolute top-2 right-1 text-white text-3xl cursor-pointer"
          onClick={handleSave}
        />
        <h2 className="text-xl md:text-3xl mt-8 roboto-bold mb-5">{title}</h2>
        <p className="card-body">{overview}</p>
        <a href={link} target="_blank">
          <FaLongArrowAltRight
            className="absolute bottom-2 text-white right-2 text-3xl cursor-pointer"
          />
        </a>
      </div>
    </div>
  );
}

export default Article;
