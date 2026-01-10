import React from "react";
import { Redirect } from "expo-router";

export default function Index() {
  // Use Redirect to avoid navigating before layout mounts
  return <Redirect href="/login" />;
}
