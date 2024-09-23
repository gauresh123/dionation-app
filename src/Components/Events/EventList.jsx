import React, { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const events = [
  {
    date: "2024-06-30T00:00:00.000Z",
    description: "This is the Meal Packaging & Delivery description.",
    imageUrl:
      "https://res.cloudinary.com/doue07abb/image/upload/v1719164758/events/meal-package.webp",
    place: "Kerala",
    title: "Meal Packaging & Delivery",
    _id: "66785fc643d9432f60797311",
  },

  {
    date: "2024-07-04T00:00:00.000Z",
    description: "This is the fundraiser for kids description.",
    imageUrl:
      "https://res.cloudinary.com/doue07abb/image/upload/v1719166015/events/featured-causes.jpg.webp",
    place: "Kerala",
    title: "Fundraiser for kids ",
    _id: "6678643f43d9432f6079731c",
  },
  {
    date: "2024-06-27T00:00:00.000Z",
    description: "This Sample event description.",
    imageUrl:
      "https://res.cloudinary.com/doue07abb/image/upload/v1719079398/events/istockphoto-1498170916-1024x1024.jpg",
    place: "mumbai",
    title: "Sample event",
    _id: "6678653043d9432f60797324",
  },
];

const EventList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  const chunkEvents = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents =
    chunkEvents(events, eventsPerPage)[currentPage - 1] || [];
  const placeholderImage = "https://via.placeholder.com/150";

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    const options = { month: "numeric", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2
        className="heading"
        style={{ textAlign: "center", fontSize: "2em", marginBottom: "20px" }}
      >
        Upcoming Events
      </h2>

      {/* Map through current events */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      >
        {currentEvents.map((event) => (
          <div
            key={event._id}
            style={{
              width: "calc(33.33% - 20px)", // 3 cards per row on larger screens
              maxWidth: "100%", // Full width on smaller screens
              background: "#f8f8f8",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              marginBottom: "20px",
              transition: "transform 0.3s",
              ":hover": { transform: "scale(1.05)" },
              "@media (max-width: 768px)": {
                width: "100%", // Full width on smaller screens
              },
            }}
          >
            <img
              src={event.imageUrl || placeholderImage}
              alt={event.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3
                style={{
                  fontSize: "1.2em",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </h3>
              <p style={{ fontSize: "1em", marginBottom: "10px" }}>
                {event.description}
              </p>
              <p
                style={{
                  fontSize: "0.8em",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaMapMarkerAlt style={{ marginRight: "5px" }} />
                {event.place}
              </p>
              <p
                style={{
                  fontSize: "0.8em",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaCalendarAlt style={{ marginRight: "5px" }} />
                {formatDate(event.date)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {/*<div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ margin: "0 10px" }}
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ margin: "0 10px" }}
        >
          Next
        </button>
      </div>*/}
    </div>
  );
};

export default EventList;
