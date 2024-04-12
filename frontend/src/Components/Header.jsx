import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiBarsArrowUp } from "react-icons/hi2";
import toast from "react-hot-toast";
import { signOutSuccess } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import png from "../assets/main_png.png";

function Header(props) {
  const [openNavbar, setOpenNavbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    props.navbarHandler(openNavbar);
  }, [openNavbar]);

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

  return (
    <>
      <header className="hidden lg:flex items-center justify-between py-4 px-8 border-b-4 border-blue-400">
        <Link to={"/"}>
          {
            <section className="rounded-full overflow-hidden bg-cover bg-center">
              <img src={png} alt="" height={70} width={70} />
            </section>
          }
        </Link>
        <nav className="flex justify-around md:gap-x-12 items-center text-blue-2 roboto-medium md:text-lg">
          <Link to={"/"} className="hover:text-blue-900">
            Home
          </Link>
          <Link
            to={"/profile?tab=savedArticles"}
            className="hover:text-blue-900"
          >
            Profile
          </Link>
          <Link to={"/articles"} className="hover:text-blue-900">
            Articles
          </Link>
          <Link to={"/dass"} className="hover:text-blue-900">
            DASS-21
          </Link>
          <Link to={"/community"} className="hover:text-blue-900">
            Community
          </Link>
        </nav>
        {user ? (
          <Button onClick={handleSignout} color="warning" variant="shadow">
            Signout
          </Button>
        ) : (
          <Button
            variant="shadow"
            color="primary"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </Button>
        )}
      </header>

      {/* Mobile View */}

      <header className="flex relative lg:hidden items-center justify-between py-4 px-8 border-b-4 border-blue-400">
        <Link to={"/"}>
          <section className="text-xl md:text-3xl text-white  p-2 bg-blue-2 max-w-sm roboto-bold rounded-lg">
            MindGuard
          </section>
        </Link>
        <div className="flex items-center gap-6">
          <Link to={"/signin"}>
            <Button variant="contained">Sign In</Button>
          </Link>
          {openNavbar ? (
            <>
              <HiBarsArrowUp
                size={"39px"}
                color="#0693e3"
                className="cursor-pointer"
                onClick={() => setOpenNavbar((state) => !state)}
              />
              <nav
                className="flex absolute z-10 right-3 top-16 py-6 px-10 rounded-lg shadow-xl flex-col justify-around gap-y-4 items-center roboto-medium  text-white"
                style={{ backgroundColor: "#18191a" }}
              >
                <Link
                  to={"/"}
                  className="w-full hover:bg-gray-hover cursor-pointer py-1 px-3 rounded-lg "
                >
                  Home
                </Link>
                <Link
                  to={"/profile?tab=savedArticles"}
                  className=" w-full cursor-pointer py-1 px-3 rounded-lg hover:bg-gray-hover "
                >
                  Profile
                </Link>
                <Link
                  to={"/articles"}
                  className=" w-full cursor-pointer py-1 px-3 rounded-lg hover:bg-gray-hover "
                >
                  Articles
                </Link>
                <Link
                  to={"/dass"}
                  className=" w-full cursor-pointer py-1 px-3 rounded-lg hover:bg-gray-hover "
                >
                  DASS-42
                </Link>
                <Link
                  to={"/community"}
                  className=" w-full cursor-pointer py-1 px-3 rounded-lg hover:bg-gray-hover "
                >
                  Community
                </Link>
              </nav>
            </>
          ) : (
            <HiBarsArrowDown
              size={"39px"}
              color="#0693e3"
              className="cursor-pointer"
              onClick={() => setOpenNavbar((state) => !state)}
            />
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
