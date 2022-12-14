import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function DatePicker() {
  // const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  const [value, setValue] = useState(undefined);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Stack spacing={3}>
        <DesktopDatePicker
          disablePast={true}
          label="수령하실 날짜를 입력해 주세요"
          inputFormat="YYYY/MM/DD (EE)"
          dayOfWeekFormatter={(day) => `${day}.`}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          disablePast={true}
          label="Date mobile"
          inputFormat="YYYY/DD/MM"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          disablePast={true}
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
