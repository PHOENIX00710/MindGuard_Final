import React, { useEffect, useState } from "react";
import SavedArticles from "./Article/SavedArticles";
import { ClipLoader, PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

function SavedArticlesPage() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          "http://localhost:3000/api/v1/articles/getSavedArticles",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await req.json();
        console.log(data);
        if (data.success === false) return toast.error(data.message);
        setArticles(data);
      } catch (e) {
        return toast.error(e.message);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-3 justify-center items-center ">
        <ClipLoader
          color={"teal"}
          loading={loading}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-1 gap-y-6 place-items-center p-4 ">
      {articles &&
        articles.map((article) => {
          return <SavedArticles key={article._id} article={article} />;
        })}
    </div>
  );
}

export default SavedArticlesPage;
