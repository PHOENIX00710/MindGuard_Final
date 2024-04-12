import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./myposts.css";

function IndividualRow(props) {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/indi/${props.details._id}`);
  };

  const handleRemove = async () => {
    try {
      const req = await fetch(`https://mind-guard-final-backend.vercel.app/api/v1/posts/removePost/${props.details._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
    } catch (e) {
      return toast.error(data.message);
    }
    toast.success("Post Successfully Deleted. Refresh to see changes.");
  };
  return (
    <tr className="lato-regular overflow-x-scroll">
      <td>{props.details.updatedAt.toString().split("T")[0]}</td>
      <td>{props.details.author}</td>
      <td>{props.details.content}</td>
      <td>
        <IoEyeOutline
          className="cursor-pointer text-2xl text-green-700 hover:text-green-400"
          onClick={handleView}
        />
      </td>
      <td>
        <RiDeleteBin3Fill
          className="cursor-pointer text-2xl text-red-700 hover:text-red-400"
          onClick={handleRemove}
        />
      </td>
    </tr>
  );
}

export default IndividualRow;
