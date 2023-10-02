// import { useAuth, useGet } from "@xerris/utility-app";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import moment from "moment";

export default function Root(props) {
  // const authToken = useAuth();
  const [calendarDate, setCalendarDate] = useState(new Date());

  const getApiStartDate = (calDate = null) => {
    const date = moment(calDate ?? calendarDate).format("YYYY-MM-DD");
    const splitDate = date.split("-");
    return `${splitDate[0]}-${splitDate[1]}-01`;
  };

  const [startDate, setStartDate] = useState(getApiStartDate());

  const getApiEndDate = () => {
    const splitDate = startDate.split("-");
    const jsEndDate = new Date(Number(splitDate[0]), Number(splitDate[1]), 1);
    return moment(jsEndDate).add(1, "months").format("YYYY-MM-DD");
  };
  const [endDate, setEndDate] = useState(getApiEndDate());

  const [view, setView] = useState("month");
  const [timeOff, setTimeOff] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  useEffect(() => {
    setIsLoadingEvents(true);

    const incrementEndDate = (endDate: string) => {
      return moment(endDate).add(1, "days").format("YYYY-MM-DD");
    };

    const mapTimeOffToEvents = (data: any) => {
      if (data.length > 0) {
        return data.map((request) => {
          const endDate = incrementEndDate(request.end);
          return {
            title: `OOO - ${request.name}`,
            start: request.start,
            end: endDate,
            allDay:
              (request.amount.unit === "hours" &&
                Number(request.amount.amount) >= 8) ||
              (request.amount.unit === "days" &&
                Number(request.amount.amount) >= 1),
            resource: null,
          };
        });
      }
    };

    // const options = {
    //   method: "GET",
    //   params: {
    //     action: "view",
    //     type: "84",
    //   },
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Basic ${process.env.REACT_APP_BAMBOO_API_KEY}`,
    //   },
    // };

    // will need to set up a Firebase cloud function to make this call as CORS issues are blocking us and bamboo support has not been helpful in requesting CORS support
    // You will also need to request access to generate an API key as well as access to view all approved vacation and contractor vacation

    // useGet(
    //   `https://try.readme.io/https://api.bamboohr.com/api/gateway.php/xerris/v1/time_off/requests/?start=${startDate}&end=${endDate}&status=approved`,
    //   options
    // ).then((res) => {
    //   setTimeOff(mapTimeOffToEvents(res.data));
    //   setIsLoadingEvents(false);
    // });
  }, [calendarDate, view]);

  const setDatesOnDayView = (date = null) => {
    setStartDate(moment(date ?? calendarDate).format("YYYY-MM-DD"));
    setEndDate(
      moment(date ?? calendarDate)
        .add(1, "days")
        .format("YYYY-MM-DD")
    );
  };

  const setDatesOnOtherView = (date = null) => {
    setStartDate(getApiStartDate(date));
    setEndDate(getApiEndDate());
  };

  const handleDateChange = (date: Date) => {
    setCalendarDate(date);
    if (view === "day") {
      setDatesOnDayView(date);
    } else {
      setDatesOnOtherView(date);
    }
  };

  const handleViewChange = (view: string) => {
    setView(view);
    if (view === "day") {
      setDatesOnDayView();
    } else {
      setDatesOnOtherView();
    }
  };

  useEffect(() => {
    if (isLoadingEvents) {
      localStorage.setItem("isLoadingEvents", "true");
      window.dispatchEvent(new Event("storageEvent"));
    } else {
      localStorage.removeItem("isLoadingEvents");
      window.dispatchEvent(new Event("storageEvent"));
    }
  }, [isLoadingEvents]);

  // if (!authToken) {
  //   window.location.replace("/");
  //   return;
  // }

  const localizer = momentLocalizer(moment);

  return (
    <div
      style={{
        marginTop: -2,
        marginLeft: 73,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <div>Calendar App</div>
      <p>{props.pageLabel}</p>
      {/* depends on auth */}
      {/* {!isLoadingEvents && (
        <Calendar
          localizer={localizer}
          events={timeOff}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "98vh" }}
          onNavigate={handleDateChange}
          date={calendarDate}
          onView={handleViewChange}
          view={view}
        />
      )} */}
      <Calendar
        localizer={localizer}
        events={timeOff}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "98vh" }}
        onNavigate={handleDateChange}
        date={calendarDate}
        onView={handleViewChange}
        view={view}
      />
    </div>
  );
}
