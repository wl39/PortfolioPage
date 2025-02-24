import { useState } from "react";

export default function Bar({ value, label }) {
  const [l, setL] = useState(label || "none");
  return <div>{l}</div>;
}
