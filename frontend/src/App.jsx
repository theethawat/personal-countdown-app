import { useEffect, useState } from "react";
import axios from "axios";
import {
  FluentProvider,
  webLightTheme,
  TabList,
  Tab,
  Subtitle1,
  Title3,
} from "@fluentui/react-components";
import useStyles from "./style";
import { Setting, Display } from "./pages";
function App() {
  const [selectedTab, setSelectedTab] = useState("display");
  const styles = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <div style={{ margin: "20px" }}>
        <Title3>นับถอยหลังกิจกรรม</Title3>
      </div>
      <TabList
        onTabSelect={(_, data) => {
          console.log("Data", data);
          setSelectedTab(data.value);
        }}
      >
        <Tab value='display'>แสดงผล</Tab>
        <Tab value='setting'>ตั้งต่า</Tab>
      </TabList>{" "}
      <div className={styles.root}>
        {selectedTab === "setting" && (
          <div>
            <Setting />
          </div>
        )}{" "}
        {selectedTab === "display" && (
          <div>
            <Display />
          </div>
        )}
      </div>
    </FluentProvider>
  );
}

export default App;
