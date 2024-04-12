import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { motion, animate } from "framer-motion";
import toast from "react-hot-toast";
import {OAuth} from "../Components/OAuth.jsx";

function SignUp() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // HTTP only handles text data
      });
      const data = await req.json();
      if (data.success === false) return toast.error(data.message);
    } catch (e) {
      return toast.error(data.message);
    }
    setFormData(null);
    setLoading(false);
    toast.success("Successfull registered! Please login now.");
    navigate("/signin");
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
          onClick={handleSubmit}
        >
          <h1 className="text-xl md:text-4xl roboto-bold text-blue-400">
            Register
          </h1>
          <TextField
            id="name"
            name="name"
            type="string"
            label="Name"
            variant="outlined"
            color="primary"
            required
            value={formData?.name || ""}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            color="primary"
            required
            value={formData?.email || ""}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            color="primary"
            required
            value={formData?.password || ""}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            color="primary"
            required
            value={formData?.confirmPassword || ""}
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
          {/* Google Continue */}
          <OAuth />
          <section className="flex justify-between items-center">
            <i className="text-lg">Already have an account?</i>
            <Link to={"/signin"}>
              <span className="text-blue-500 cursor-pointer">Sign In</span>
            </Link>
          </section>
        </form>
      </main>
    </motion.main>
  );
}

export default SignUp;
