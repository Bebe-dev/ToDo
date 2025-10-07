import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, User } from "tabler-icons-react";
import GoogleSignIn from "../components/googleSigning";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";


export default function SignIn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState(false);

  return (
    <div className="flex justify-around">
      <div className="md:w-1/3 mt-10">
        <p className="text-2xl font-bold mb-4">Sign In</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            // username: Yup.string()
            //   .max(15, "Must be 15 characters or less")
            //   .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters long")
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(/[0-9]/, "Password must contain at least one number")
              .matches(
                /[@$!%*?&#]/,
                "Password must contain at least one special character"
              ),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setLoading(true)
            try {
              
              //console.log("Sign-in button clicked");
              // const usernameDoc = await getDoc(
              //   doc(db, "usernames", values.username)
              // );
              // if (!usernameDoc.exists()) {
              //   alert("Invalid username or password.");
              //   return;
              // }

              // const { email } = usernameDoc.data();

              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );

              const user = userCredential.user;

              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data();

                // Update Redux store with user details
                dispatch(
                  setUser({
                    uid: user.uid,
                    email: user.email,
                    username: userData.username,
                  })
                );

                console.log("User signed in:", userData);
              } else {
                console.error("User data not found in Firestore");
              }
              alert("Sign-in successful!");
            } catch (error) {
              console.error("Sign-in error:", error);
              alert("Failed to sign in. Check your email and password.");
            } finally {
              setLoading(false)
              setSubmitting(false);
            }
          }}
        >
          <Form className="flex flex-col gap-8">
            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <User />
                <Field name="email" type="text" placeholder="Enter email" className="w-full outline-none" />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <img src="/images/password-icon.svg" />
                <Field
                  name="password"
                  type={password ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full outline-none"
                />
                <div onClick={() => setPassword(!password)}>{password ? <Eye /> : <EyeOff />}</div>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div className="flex gap-4 items-center">
              <Field type="checkbox" name="agree" />
              Remember me
              <ErrorMessage
                name="agree"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <button
              className={`bg-[#FF9090] text-[#F8F9FB] p-4 w-[25%] my-2 rounded-xl hover:text-lg ease-in-out duration-200 ${loading? "hover:cursor-not-allowed": "hover-cursor"}`}
              type="submit"
            >
              {loading? "loading...": "Login"}
            </button>

            <p>OR</p>
            <div>
              <GoogleSignIn />
            </div>

            <p>
              Don't have an account?{" "}
              <span className="text-[#008BD9] hover:text-lg ease-in-out duration-200">
                <Link to="/">Create one</Link>
              </span>
            </p>
          </Form>
        </Formik>
      </div>

      <div className="hidden md:block" >
        <img src="/images/signin img.svg" alt="signIn image" />
      </div>
    </div>
  );
}
