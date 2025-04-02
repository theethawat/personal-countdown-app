import { Input, Label, makeStyles } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";

import { Controller } from "react-hook-form";
const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
});

const EventForm = ({ register, control }) => {
  const styles = useStyles();
  return (
    <div>
      <div className={styles.root}>
        <Label htmlFor='name'>ชื่อ</Label>
        <Input id='nae' {...register("name")} />
      </div>{" "}
      <div className={styles.root}>
        <Label htmlFor='date'>เวลาที่จะมาถึง</Label>
        <Controller
          control={control}
          name='date'
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onSelectDate={field.onChange}
              placeholder='Select a date...'
              className={styles.control}
            />
          )}
        />
      </div>
    </div>
  );
};

export default EventForm;
