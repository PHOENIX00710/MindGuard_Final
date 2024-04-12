import React from "react";
import { FaInstagram } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { FaFacebook } from "react-icons/fa6";
import copyright from "../../assets/Copyright © 2024 All rights reserved _ Made by MISTE.svg";

function Footer() {
  return (
    <footer
      className="flex flex-col gap-6 w-full p-10"
      style={{ color: "#4A2800", fontSize: "1.05rem", fontWeight: "600" }}
    >
      <section className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-extrabold text-3xl">
            SHRI RAM JANMABHOOMI MANDIR, AYODHYA
          </h1>
          <h5>Pincode : 05278</h5>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Contact Us</h1>
          <div>
            <p>Mail: managment@ayodhyamadir.com</p>
            <p>Ph. No. +91 9711599906</p>
          </div>
        </div>
      </section>
      <section className="flex justify-between items-center">
        <div
          className="px-4 py-2 rounded-lg text-2xl flex gap-4"
          style={{
            backgroundColor: "#FF8900",
          }}
        >
          <FaFacebook className=" text-white" />
          <FaInstagram className=" text-white" />
          <ImLinkedin className=" text-white" />
        </div>
        <img src={copyright} style={{ width: "350px" }} />
      </section>
    </footer>
  );
}

export default Footer;
