import React, { useState } from "react";
import Login from "src/app/login";
import Home from "src/app/home";
import Client from "src/app/client";

export default function App() {
  const [screen, setScreen] = useState<"login" | "home" | "client">("login");

  if (screen === "login") {
    return <Login onLogin={() => setScreen("home")} />;
  }

  if (screen === "client") {
    return <Client />;
  }

  return <Home onNavigate={(s: "login" | "home" | "client") => setScreen(s)} />;
}
