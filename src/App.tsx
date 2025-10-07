import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import HomePage from "./pages/homepage/home";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser:any) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
          <Route index path="/" element={<SignUp />} />
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
