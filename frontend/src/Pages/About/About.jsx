import React, { useEffect, useState } from "react";
import svg from "../../assets/main_svg.svg";
import { animate, motion } from "framer-motion";
import "./about.css";
import { useNavigate } from "react-router-dom";

function About(props) {
  const openNavbar = props.open;
  const finalTitle = "Guard";
  const [visibleTitle, setVisibleTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, [openNavbar]);

  useEffect(() => {
    let currIndex = 0;
    let expanding = true;
    const expandContract = setInterval(() => {
      if (expanding) {
        currIndex++;
        setVisibleTitle(finalTitle.slice(0, currIndex));
        if (currIndex === finalTitle.length) expanding = false;
      } else {
        currIndex--;
        setVisibleTitle(finalTitle.slice(0, currIndex - 1));
        if (currIndex === 0) {
          expanding = true;
          setVisibleTitle("G");
        }
      }
    }, 300);
    return () => clearInterval(expandContract);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/articles");
  };

  return (
    <main
      className={`${
        openNavbar ? "opacity-45" : "opacity-100"
      } min-h-screen flex flex-col-reverse gap-6 lg:flex-row items-center justify-center lg:justify-around`}
    >
      <article className="flex flex-col gap-4 w-2/3 lg:w-1/2">
        <h1 className="text-4xl lg:text-7xl roboto-bold ">
          Mind<span className="text-blue-2">{visibleTitle}</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="text-sm md:text-lg space-x-0 roboto-regular-italic"
        >
          Welcome to our wellness platform, your dedicated space for mental
          well-being. Here, you can access a curated selection of articles on
          mental health, engage with the DASS-21 questionnaire to receive
          personalized insights via email, and connect with others in our
          supportive community forum. Whether you're seeking knowledge, sharing
          experiences, or finding comfort, our platform is here to support and
          enrich your journey to better mental health. Join us today and be part
          of a caring community.
        </motion.p>
        <button className="btn " onClick={handleSubmit}>
          Get Articles
        </button>
      </article>
      <motion.section
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      >
        <section
          id="image"
          className="w-48 h-48 md:h-72 md:w-72 lg:h-96 lg:w-96 rounded-full box-shadow-2 overflow-hidden"
        >
          <img src={svg} alt="Main SVG" className="bg-cover bg-center" />
        </section>
      </motion.section>
    </main>
  );
}

export default About;
