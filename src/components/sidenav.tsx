import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function SideNav() {
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

  const links = [
    { id: 1, name: "Dashboard", route: "/home", img: "/images/dashboard.svg" },
    {
      id: 2,
      name: "Task Category",
      route: "/taskCategory",
      img: "/images/taskCat.svg",
    },
    {
      id: 3,
      name: "Settings",
      route: "/settings",
      img: "/images/settings.svg",
    },
    { id: 4, name: "Help", route: "/help", img: "/images/help.svg" },
  ];
  return (
    <>
      <div className="">
        <div className="bg-[#FF6767] p-6 text-[#FFFFFF] h-screen relative">
          <div className=" top-0 left-1/4">
            <img
              src=""
              // {`${user?.photoURL}`}
              alt="profile-picture"
              className="rounded-3xl w-14 h-14 place-items-center"
            />
          </div>
          <div>
            <p className="text-sm text-center">{user?.displayName}</p>
            <p className="text-sm text-center">{user?.email}</p>
            <div>
              {links.map((link, index) => (
                <div key={index} className="flex gap-4 items-center my-6 px-2">
                  <img src={link.img} alt="icon" />
                  <Link to={link.route}>{link.name}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 items-center my-6 px-2 absolute bottom-0">
            <img src="/images/logout.svg" alt="logout" />
            <button onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
