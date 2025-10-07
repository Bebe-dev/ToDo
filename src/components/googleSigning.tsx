// import { auth, googleProvider } from  ;
import { useNavigate } from "react-router-dom";
import {auth, googleProvider} from "../firebase"
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignIn  ()  {

    const navigate = useNavigate()
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;     
      console.log("User Info:", user);
      alert(`Welcome, ${user.displayName}`);
      navigate("/home")
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Failed to sign in. Try again.");
    }
  };

  return (
    <div>
      <button className=" p-4 rounded-xl cursor-pointer flex gap-2 border-2 border-black hover:text-lg ease-in-out duration-200" onClick={handleGoogleSignIn}>
        <img src="/images/google.svg" alt="google-icon" /> Sign In with Google
      </button>
    </div>
  );
};
