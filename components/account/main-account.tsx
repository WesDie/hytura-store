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
          <Login />{" "}
          <div className="flex flex-col gap-1x">
            <p className="text-heading-3xs mx-auto">
              Not a member yet?{" "}
              <Button
                text="Register"
                variant="link"
                onclick={() => setActiveSection("register")}
              />
            </p>
            <p className="text-heading-3xs mx-auto">
              Or{" "}
              <Button
                text="Forgot password?"
                variant="link"
                onclick={() => setActiveSection("forgot-password")}
              />
            </p>
          </div>
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
