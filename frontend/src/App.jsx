import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import About from "./Pages/About/About";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Footer from "./Components/Footer";
import Articles from "./Pages/Articles";
import Dass from "./Pages/Dass";
import Community from "./Pages/Community";
import Profile from "./Pages/Profile";
import { store, persistor } from "./Redux/user.store";
import { Provider } from "react-redux";
import IndividualPost from "./Pages/IndividualPost";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const [openNavbar, setOpenNavbar] = useState(false);

  const navBarHandler = (val) => {
    setOpenNavbar(val);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header navbarHandler={navBarHandler} />
          <Routes>
            <Route path="/" element={<About open={openNavbar} />} />
            <Route path="/about" element={<About open={openNavbar} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/articles" element={<Articles />} />
              <Route path="/dass" element={<Dass />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/indi/:postId" element={<IndividualPost />} />
            </Route>
          </Routes>
          {/*<Footer />*/}
          <Toaster />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
