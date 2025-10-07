import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserCircle, User, EyeOff, Eye } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <div className="flex justify-around">
      <div className="hidden md:block">
        <img src="/images/signup img.png" />
      </div>
      <div className="md:w-1/3">
        <p className="text-2xl font-bold mb-4">Sign Up</p>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            agree: false,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            username: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
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
                /[@$!%*?&#.]/,
                "Password must contain at least one special character"
              ),
            confirmPassword: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password")], "Passwords must match"),
            agree: Yup.boolean()
              .oneOf([true], "You must agree to the terms")
              .required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setLoading(true);
              console.log("Attempting to sign up with values:", values);

              // const usernameDoc = await getDoc(doc(db, "usernames", values.username));
              // if (usernameDoc.exists()) {
              //   alert("Username is already taken. Please choose another one.");
              //   return;
              // }
              // Create user with email and password
              const userCredential = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );
              console.log("User signed up:", userCredential);

              await updateProfile(userCredential.user, {
                displayName: values.username,
              });
              console.log("User signed up:", userCredential);

              const user = userCredential.user;

              // Store user details in Firestore
              await setDoc(doc(db, "users", user.uid), {
                name: values.username,
                email: values.email,
                uid: user.uid,
                createdAt: new Date(),
              });

              // await setDoc(doc(db, "usernames", values.username), {
              //   email: values.email,
              // });

              alert("Sign-up successful!");
              navigate("/home");
              resetForm();
            } catch (error: any) {
              if (error.code === "auth/email-already-in-use") {
                alert(
                  "This email is already registered. Please sign in instead."
                );
              } else if (error.code === "auth/weak-password") {
                alert(
                  "Your password is too weak. Please use a stronger password."
                );
              } else if (error.code === "auth/invalid-email") {
                alert("The email format is invalid. Please try again.");
              } else {
                alert("Failed to sign up. Please try again later.");
              }
              console.error("Error signing up:", error);
            } finally {
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          <Form className="flex flex-col gap-8">
            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <UserCircle />
                <Field
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  className="w-full outline-none"
                />
              </div>
              <ErrorMessage
                name="firstName"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <UserCircle />
                <Field
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full outline-none"
                />
              </div>
              <ErrorMessage
                name="lastName"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <User />
                <Field
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  className="w-full outline-none"
                />
              </div>
              <ErrorMessage
                name="username"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <img src="/images/email-icon.svg" />
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-full outline-none"
                />
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

            <div>
              <div className="flex gap-4 border-2 border-[#565454] p-2 rounded-md ">
                <img src="/images/remember-password.svg" />
                <Field
                  name="confirmPassword"
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full outline-none"
                />
                <div onClick={() => setConfirmPassword(!confirmPassword)}>{confirmPassword ? <Eye /> : <EyeOff />}</div>
              </div>

              <ErrorMessage
                name="confirmPassword"
                component="span"
                className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
              />
            </div>

            <div>
              <div>
                <div className="flex gap-4 items-center">
                  <Field type="checkbox" name="agree" />I agree to all terms
                </div>
                <ErrorMessage
                  name="agree"
                  component="span"
                  className="text-red-500 text-sm mt-1 transition duration-200 ease-in-out"
                />
              </div>

              <button
                className={`bg-[#FF9090] text-[#F8F9FB] p-4 md:w-[25%] my-2 rounded-xl hover:text-lg ease-in-out duration-200 ${
                  loading ? "hover:cursor-not-allowed" : "hover-cursor"
                }`}
                type="submit"
              >
                {loading ? "loading..." : "Register"}
              </button>
              <p>
                Already have an account?
                <span className="text-[#008BD9] hover:text-lg ease-in-out duration-200">
                  <Link to="/signin"> Sign in</Link>
                </span>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
