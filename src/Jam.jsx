import React, { useState, useEffect } from "react";
import "./styles/Jam.css";

const Jam = () => {
  const [jakartaTime, setJakartaTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setJakartaTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time) => {
    const options = {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const formattedTime = time.toLocaleString("id-ID", options);
    const hours = time.getHours();

    // Customize AM/PM to "siang" or "malam"
    const period = hours >= 6 && hours < 18 ? "Siang Hari" : "Malam Hari";

    return `${formattedTime} ${period}`;
  };

  return (
    <div className="jam">
      <p>{formatTime(jakartaTime)}</p>
    </div>
  );
};

export default Jam;
