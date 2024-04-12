import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import toast from "react-hot-toast";
import { signOutSuccess } from "../../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function ProfileSidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  const handleSignout = async (e) => {
    let url = "http://localhost:3000/api/v1/user/signout";
    const req = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (data.success === false) return toast.error(data.message);
    dispatch(signOutSuccess());
    toast.success(data.message);
    navigate("/");
  };

  const userDetails = useSelector((state) => state.user.userDetails);
  return (
    <div className="lg:min-h-screen lg:w-96 bg-slate-200 flex flex-col gap-4 p-4">
      <Link to={"/profile?tab=savedArticles"}>
        <div className="bg-white hover:bg-slate-400 flex justify-between items-center p-3 rounded-md w-full">
          <section className="roboto-medium">Saved Articles</section>
          <section>
            <FaRegSave className="text-2xl" />
          </section>
        </div>
      </Link>
      <Link to={"/profile?tab=myPosts"}>
        <div className="bg-white hover:bg-slate-400 flex justify-between items-center p-3 rounded-md w-full">
          <section className="roboto-medium">Posts</section>
          <section>
            <IoNewspaperOutline className="text-2xl" />
          </section>
        </div>
      </Link>
      <div
        onClick={handleSignout}
        className="p-3 bg-white text-red-700 hover:text-white hover:bg-red-600 rounded-md flex justify-between"
      >
        <section className="roboto-medium">Signout</section>
        <section>
          <FaSignOutAlt className="text-2xl" />
        </section>
      </div>
    </div>
  );
}

export default ProfileSidebar;
