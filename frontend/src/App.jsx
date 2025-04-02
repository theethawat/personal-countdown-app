import { useEffect, useState } from "react";
import axios from "axios";
import {
  FluentProvider,
  webLightTheme,
  TabList,
  Tab,
} from "@fluentui/react-components";
import useStyles from "./style";

function App() {
  const [allEvents, setAllEvents] = useState("");
  const styles = useStyles();

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

  return (
    <FluentProvider theme={webLightTheme}>
      <TabList>
        <Tab value='tab1'>แสดงผล</Tab>
        <Tab value='tab2'>ตั้งต่า</Tab>
      </TabList>
    </FluentProvider>
  );
}

export default App;
