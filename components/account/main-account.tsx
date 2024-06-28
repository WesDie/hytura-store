"use client";
import ResetPassword from "./forgot-password";
import Login from "./login";
import Register from "./register";
import { useState } from "react";
import Button from "../elements/button";

export default function MainAccount() {
  const [activeSection, setActiveSection] = useState("login");

  return (
    <div className="flex flex-col gap-2x">
      {activeSection === "login" && (
        <>
          {" "}
          <Login setActiveSection={setActiveSection} />{" "}
          <p className="text-heading-3xs mx-auto">
            Not a member yet?{" "}
            <Button
              text="Register"
              variant="link"
              onclick={() => setActiveSection("register")}
            />
          </p>
        </>
      )}
      {activeSection === "register" && (
        <>
          <Register />
          <p className="text-heading-3xs mx-auto">
            Already a member?{" "}
            <Button
              text="Login"
              variant="link"
              onclick={() => setActiveSection("login")}
            />
          </p>
        </>
      )}
      {activeSection === "forgot-password" && (
        <>
          <ResetPassword />
          <p className="text-heading-3xs mx-auto">
            Go back to{" "}
            <Button
              text="Login"
              variant="link"
              onclick={() => setActiveSection("login")}
            />
          </p>
        </>
      )}
    </div>
  );
}
