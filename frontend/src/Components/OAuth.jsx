import React, { useState } from "react";
import { app } from "../firebase/firebase.config.js";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../features/userSlice.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const OAuth = () => {
  const [failure, setFailure] = useState(null);
  // For navigation
  const navigate = useNavigate();

  // To manage GoogleAuth
  const auth = getAuth(app);

  // For google continue we will directly signin
  const dispatch = useDispatch();

  //Signing using Google Firebase

  const googleAuth = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    // To always ask user for account preference
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      dispatch(signInStart());
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      // Submit data for database
      try {
        const res = await fetch("https://mind-guard-final-backend.vercel.app/api/v1/user/google", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: result.user.email,
            name: result.user.displayName,
          }),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure());
          return toast.error(data.message);
        }
        dispatch(signInSuccess(data.user));
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        navigate("/signin");
        return;
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/signin");
      return;
    }
    toast.success("Signin Successfull");
    navigate("/");
  };

  return (
    <>
      {/* Google Login */}

      <Button
        variant="outlined"
        color="warning"
        endIcon={<FcGoogle />}
        onClick={googleAuth}
      >
        Continue With Google
      </Button>
    </>
  );
};
