import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function SavedArticles(props) {
  const [openOptions, setOpenOptions] = useState(false);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    try {
      const fetchArticle = async () => {
        const req = await fetch(
          `http://localhost:3000/api/v1/articles/getArticle/${props.article.article}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        if (data.success === false) return toast.error(data.message);
        setArticle(data.article);
      };
      fetchArticle();
    } catch (error) {
      toast.error(error.toString());
    }
  }, []);

  const handleUnsave = async (e) => {
    try {
      let url = `http://localhost:3000/api/v1/articles/toggleSave/${article._id}`;
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
  
  if (article) {
    return (
      <div className="relative w-80 h-96 shadow-2xl flex flex-col gap-3">
        <img src={article.image} alt="" className=" h-56 w-full" />
        <h3 className="py-1 px-2 roboto-medium">{article.overview}</h3>
        <section className="flex justify-between items-center px-2 py-2">
          <i className="absolute bottom-2">{article.title}</i>

          {openOptions ? (
            <>
              <motion.section
                className="flex absolute -right-12 -bottom-5 flex-col shadow-lg rounded-xl bg-slate-400 roboto-light "
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ ease: "easeInOut" }}
              >
                <IoMdClose
                  className="relative top-1 -right-36 text-2xl text-white cursor-pointer "
                  onClick={() => setOpenOptions((state) => !state)}
                />
                <a
                  className="hover:bg-slate-500 hover:text-white px-4 py-2 cursor-pointer"
                  target="_blank"
                  href={article.link}
                >
                  View Article
                </a>
                <p
                  className="hover:bg-slate-500 hover:text-white px-4 py-2 cursor-pointer"
                  onClick={handleUnsave}
                >
                  Remove from Saved
                </p>
              </motion.section>
            </>
          ) : (
            <HiDotsHorizontal
              className="cursor-pointer absolute bottom-2 right-2 text-lg "
              onClick={() => setOpenOptions((state) => !state)}
            />
          )}
        </section>
      </div>
    );
  }
}

export default SavedArticles;
