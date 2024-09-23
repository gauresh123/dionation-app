import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from '../Components/Events/EventList';
import { fetchEvents } from '../Redux/Actions/eventActions';

const EventPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events) || { events: [], loading: true, error: null };
  // console.log("heelooo", events)

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return <p>Loading events...</p>;
  }
  if (error) {
    return <p>Error loading events: {error}</p>;
  }
  console.log(events,"events")
  return (
    <section className='pt-[80px] 2xl:h-[800px]'>
    <div>  
      <EventList events={events} />
    </div>
    </section>
  );
};

export default EventPage;
