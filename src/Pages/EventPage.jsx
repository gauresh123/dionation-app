import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventList from "../Components/Events/EventList";
import { fetchEvents } from "../Redux/Actions/eventActions";

const EventPage = () => {
  return (
    <section className="pt-[80px] 2xl:h-[800px]">
      <div>
        <EventList />
      </div>
    </section>
  );
};

export default EventPage;
