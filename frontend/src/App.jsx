import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [allEvents, setAllEvents] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:8000/api/v1/")
        .then((response) => {
          console.log(response.data);
          setAllEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);

  return <div></div>;
}

export default App;
