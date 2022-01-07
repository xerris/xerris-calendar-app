import { useAuth } from "@xerris/utility-app";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import moment from "moment";

export default function Root(props) {
  const authToken = useAuth();
  const [value, setValue] = useState(new Date());

  if (!authToken) {
    window.location.replace("/");
    return;
  }
  const mockEvents = [
    {
      title: "vacation",
      start: new Date(),
      end: new Date(),
      allDay: true,
      resource: null,
    },
    {
      title: "vacation",
      start: new Date(),
      end: new Date(),
      allDay: true,
      resource: null,
    },
  ];

  const localizer = momentLocalizer(moment);

  return (
    <div
      style={{
        // height: "100%",
        // position: "absolute",
        // left: "40%",
        // top: "10%",
        marginLeft: 73,
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      {/* <Calendar onChange={setValue} value={value} /> */}
      <Calendar
        localizer={localizer}
        events={mockEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "99vh" }}
      />
    </div>
  );
}
