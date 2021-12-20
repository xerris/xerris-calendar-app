import { useAuth } from "@xerris/utility-app";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Root(props) {
  const authToken = useAuth();
  const [value, setValue] = useState(new Date());

  if (!authToken) {
    window.location.replace("/");
    return;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: "40%",
        top: "10%",
      }}
    >
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}
