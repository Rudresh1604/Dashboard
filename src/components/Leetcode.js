import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar's styles

const Leetcode = () => {
  // Attendance data: date and presence status (true = present, false = absent)
  const attendanceData = {
    "2024-09-20": true,
    "2024-09-21": false,
    "2024-09-22": true,
    // Add more dates as needed
  };

  const [date, setDate] = useState(new Date());

  // Function to format dates into 'YYYY-MM-DD' format
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Tile content to color dates based on attendance
  const tileClassName = ({ date, view }) => {
    const formattedDate = formatDate(date);
    if (view === "month") {
      if (attendanceData[formattedDate] === true) {
        return "present"; // Green for present
      } else if (attendanceData[formattedDate] === false) {
        return "absent"; // Red for absent
      }
    }
    return null;
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Attendance Calendar</h1>
      <Calendar onChange={setDate} value={date} tileClassName={tileClassName} />
      <style jsx>{`
        .present {
          background-color: #90ee90 !important; /* Light green */
        }
        .absent {
          background-color: #ff6f61 !important; /* Light red */
        }
      `}</style>
    </div>
  );
};

export default Leetcode;
