"use client";
import Login from "./login";
import Register from "./register";
import { useState } from "react";

export default function MainAccount() {
  const [activeSection, setActiveSection] = useState("login");

  return (
    <div className="flex flex-col gap-2x">
      {activeSection === "login" && (
        <>
          {" "}
          <Login />{" "}
          <p className="text-heading-3xs mx-auto">
            Not a member yet?{" "}
            <button
              className="text-link-sm"
              onClick={() => setActiveSection("register")}
            >
              Register
            </button>
          </p>
        </>
      )}
      {activeSection === "register" && (
        <>
          <Register />
          <p className="text-heading-3xs mx-auto">
            Already a member?{" "}
            <button
              className="text-link-sm"
              onClick={() => setActiveSection("login")}
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}
