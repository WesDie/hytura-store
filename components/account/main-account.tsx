"use client";
import ResetPassword from "./forgot-password";
import Login from "./login";
import Register from "./register";
import { useEffect, useState } from "react";
import Button from "../elements/button";

export default function MainAccount() {
  const [activeSection, setActiveSection] = useState("login");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let canbeOff = false;

    if (successMessage) {
      canbeOff = false;
      setTimeout(() => {
        canbeOff = true;
        setSuccessMessage("");
      }, 5000);
    }

    return () => {
      if (canbeOff) {
        setSuccessMessage("");
      }
    };
  }, [successMessage, setActiveSection]);

  return (
    <div className="relative flex flex-col gap-2x transition-opacity group-aria-hidden:opacity-0">
      {successMessage && (
        <p className="text-heading-3xs absolute left-3x top-1x text-center text-text-green">
          {successMessage}
        </p>
      )}
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
          <Register
            setActiveSection={setActiveSection}
            setSuccessMessage={setSuccessMessage}
          />
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
