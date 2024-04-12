import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  duration,
} from "@mui/material";
import { FaSearchengin } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import Article from "../Components/Article/Article";
import { motion } from "framer-motion";
import { ClipLoader, PacmanLoader } from "react-spinners";

function Articles() {
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          "http://localhost:3000/api/v1/articles/getArticles",
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
        setArticles(data.data);
      } catch (e) {
        return toast.error(data.message);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const req = await fetch(
          `http://localhost:3000/api/v1/articles/getArticles?category=${category.toLowerCase()}`,
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
        setArticles(data.data);
      } catch (e) {
        return toast.error(e.message);
      }
      setLoading(false);
    };
    if (category) fetchArticles();
  }, [category]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const req = await fetch(
        `http://localhost:3000/api/v1/articles/getArticles?searchTerm=${searchTerm.toLowerCase()}`,
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
      setArticles(data.data);
    } catch (e) {
      return toast.error(e.message);
    }
    setLoading(false);
  };

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
    <div className="flex flex-col gap-6" id="articles">
      <section className="flex w-full mx-auto lg:w-2/3 flex-col items-center gap-4 md:flex-row md:justify-between p-6 bg-gray-100 rounded-lg shadow">
        <TextField
          placeholder="Search articles..."
          variant="outlined"
          id="search-bar"
          name="searchTerm"
          value={searchTerm ? searchTerm : ""}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaSearchengin
                  className="cursor-pointer text-lg"
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "100%", // Adjust based on the layout
            md: { width: "50%" }, // Responsive adjustments
            border: "1px solid transparent",
            borderRadius: "1.9rem",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "white",
              borderColor: "primary.main",
            },
            "&.Mui-focused": {
              backgroundColor: "white",
              borderColor: "primary.main",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.9rem",
            },
          }}
        />
        <FormControl
          sx={{
            width: "100%", // Full width on mobile
            md: { width: "25%" }, // Adjust on larger screens
            backgroundColor: "white",
            border: "1px solid transparent",
            borderRadius: "1.9rem",
            "&:hover": {
              backgroundColor: "white",
              borderColor: "primary.main",
            },
            "&.Mui-focused": {
              backgroundColor: "white",
              borderColor: "primary.main",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.9rem",
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category ? category : ""}
            label="Category"
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value={"Depression"}>Depression</MenuItem>
            <MenuItem value={"Anxiety"}>Anxiety</MenuItem>
            <MenuItem value={""}>All</MenuItem>
          </Select>
        </FormControl>
      </section>
      <main className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 place-items-center p-3">
        {articles &&
          articles.map((article) => (
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: article._id * 0.5 + 0.5 }}
              key={article._id}
            >
              <Article article={article} />
            </motion.div>
          ))}
      </main>
    </div>
  );
}

export default Articles;
