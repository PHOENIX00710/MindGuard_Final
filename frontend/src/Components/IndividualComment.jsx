import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function IndividualComment(props) {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <div className="border-t-2 pt-8 border-slate-300 flex flex-col gap-5">
      <section className="flex w-full justify-between items-center">
        <section className="flex gap-8 items-center justify-start">
          <Avatar
            src="https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg"
            className=" bg-cover bg-center"
          />
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-xl roboto-bold">{props.comment.author}</h1>
            <p className="font-medium text-gray-500 text-sm">
              {props.comment.updatedAt.toString().split("T")[0]}
            </p>
          </div>
        </section>
        {props.comment.user === user._id && (
          <MdDeleteSweep
            className="text-2xl cursor-pointer"
            onClick={() => props.delete(props.comment._id)}
          />
        )}
      </section>
      <p className=" max-w-5xl ">{props.comment.text}</p>
    </div>
  );
}

export default IndividualComment;
