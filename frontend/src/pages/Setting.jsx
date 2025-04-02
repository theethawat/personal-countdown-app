import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  Text,
  Button,
  Card,
  CardHeader,
  Body1,
  CardFooter,
} from "@fluentui/react-components";
import useStyles from "../style";
import EventForm from "../components/EventForm";

const Setting = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const styles = useStyles();
  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      date: "",
    },
  });

  const columns = [
    { columnKey: "name", label: "ชื่อกิจกรรม" },
    { columnKey: "date", label: "วันที่" },
    { columnKey: "action", label: "ดำเนินการ" },
  ];

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

  const handleCreateNewEvent = async (data) => {
    try {
      console.log("Data", data);
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/events`,
        data
      );
      console.log("Result", result);
      getData();
      reset({});
      setShowAddEvent(false);
    } catch (error) {
      console.error("Error creating event:", error);
      alert(`เกิดข้อผิดพลาด ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/events/${id}`
      );
      console.log("Result", result);
      getData();
    } catch (error) {
      console.error("Error creating event:", error);
      alert(`เกิดข้อผิดพลาด ${error.message}`);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text as='h1' className={styles.title}>
          รายการที่ตั้งไว้
        </Text>
        <div>
          <Button
            appearance='primary'
            onClick={() => setShowAddEvent(!showAddEvent)}
          >
            เพิม
          </Button>
        </div>
      </div>
      {showAddEvent && (
        <div style={{ margin: "20px 0px" }}>
          <form onSubmit={handleSubmit(handleCreateNewEvent)}>
            <Card>
              <CardHeader header={<Body1>เพิ่มกิจกรรมใหม่</Body1>} />
              <EventForm control={control} register={register} />
              <CardFooter>
                <Button type='submit'>บันทึก</Button>
              </CardFooter>
            </Card>{" "}
          </form>
        </div>
      )}
      <Table arial-label='Default table' style={{ minWidth: "510px" }}>
        <TableHeader>
          <TableRow>
            {columns?.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allEvents?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.date}</TableCell>
              <TableCell>
                <Button
                  appearance='secondary'
                  onClick={() => handleDelete(item.ID)}
                >
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {Array(allEvents)?.length === 0 && <div>ไม่พบข้อมูล</div>}
    </div>
  );
};

export default Setting;
