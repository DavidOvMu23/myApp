import React, { useState } from "react";
import Login from "src/app/login";
import Home from "src/app/home";

export default function App() {
  const [screen, setScreen] = useState<"login" | "home">("login");

  return screen === "login" ? (
    <Login onLogin={() => setScreen("home")} />
  ) : (
    <Home />
  );
}
