import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, animate } from "framer-motion";
import toast from "react-hot-toast";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../features/userSlice";
import {OAuth} from "../Components/OAuth.jsx";

function SignIn() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(signInStart());
      const req = await fetch("https://mind-guard-final-backend.vercel.app/api/v1/user/signin", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // HTTP only handles text data
      });
      const data = await req.json();
      if (data.success === false) {
        toast.error(data.message);
        return dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data.user));
        setFormData(null);
        toast.success("Signin Successfull");
        navigate("/");
        return;
      }
    } catch (e) {
      setFormData(null);
      toast.error(e.message);
      dispatch(signInFailure(e.message));
      navigate("/signin");
      return;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <main className="min-h-screen flex justify-center items-center  ">
        <form
          action=""
          className="flex flex-col gap-8 min-w-96 text-lg md:text-xl shadow-xl px-8 py-14 text-center rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl md:text-4xl roboto-bold text-blue-400">
            Login
          </h1>
          <TextField
            id="email"
            label="Email"
            name="email"
            variant="outlined"
            value={formData?.email || " "}
            color="primary"
            onChange={handleChange}
            required
            sx={{
              width: "100%",
            }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            color="primary"
            value={formData?.password || ""}
            required={true}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{}}>
            Sign In
          </Button>
          
          {/* Google Continue */}
          <OAuth />
          <section className="flex justify-between items-center">
            <i className="text-lg">Don’t have an account?</i>
            <Link to={"/signup"}>
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </Link>
          </section>
        </form>
      </main>
    </motion.main>
  );
}

export default SignIn;
