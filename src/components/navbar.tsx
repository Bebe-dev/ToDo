//  import { Input } from "@mui/material";
//import { Calendar, Filter} from "tabler-icons-react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Logout } from "tabler-icons-react";

export default function Navbar() {
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Failed to log out. Try again.");
    }
  };

  const date = new Date();
  const presentDay = date.toLocaleDateString(undefined, {
    weekday: "long",
  });

  const presentDate = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className=" shadow-md flex items-center justify-between px-6 py-2 border-b-2 border-b-[#FF6767] ">
        <h1 className="text-2xl">
          <span className="text-[#FF6767]">TO</span> DO
        </h1>

        <div className="flex">
          <p className="text-3xl">
            {" "}
            Welcome back,{" "}
            <span className="text-[#FF6767]">{user?.displayName}</span>
          </p>
        </div>

        <div className="flex gap-10 items-center">
          <div>
            <p>{presentDay}</p>
            <p className="text-[#3ABEFF]">{presentDate}</p>
          </div>

          <div className="flex gap-4 items-center cursor-pointer py-2 hover:bg-[#FF6767] hover:text-white" onClick={handleLogout}>
            <div className="flex gap-2 items-center px-2">
              <Logout />
              <button >Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
