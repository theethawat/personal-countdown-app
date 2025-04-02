import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Text,
  Card,
  CardHeader,
  Body1,
  Title3,
  Subtitle2,
} from "@fluentui/react-components";
import useStyles from "../style";
import dayjs from "dayjs";
import Countdown from "react-countdown";

const Display = () => {
  const [allEvents, setAllEvents] = useState([]);
  const styles = useStyles();

  const renderer = ({ hours, minutes, seconds, completed, days }) => {
    if (completed) {
      // Render a completed state
      return <div>เกินเวลาแล้ว</div>;
    } else {
      // Render a countdown
      return (
        <Subtitle2>
          อีก {days} วัน {hours} ชั่วโมง {minutes} นาที {seconds} วินาที
        </Subtitle2>
      );
    }
  };

  const getData = async () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/events`)
      .then((response) => {
        console.log(response.data);
        setAllEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const orderByDate = (a, b) => {
    return new Date(a.date) - new Date(b.date);
  };
  const sortedEvents = allEvents?.sort(orderByDate);

  return (
    <div>
      {sortedEvents?.map((eachEvent, index) => (
        <Card key={index} className={styles.card}>
          <CardHeader
            header={<Title3> {eachEvent?.name} </Title3>}
          ></CardHeader>
          <Body1>{dayjs(eachEvent.date).format("D MMMM YYYY")}</Body1>
          <Countdown autoStart date={eachEvent.date} renderer={renderer} />
        </Card>
      ))}
    </div>
  );
};

export default Display;
