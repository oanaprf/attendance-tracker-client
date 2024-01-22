import { useState } from "react";
import { Input, Button, DatePicker, TimePicker } from "antd";
import { AddEventContainer } from "./styled";

const AddEvent = () => {
  const [userInput, setUserInput] = useState();

  const onInputChange = (field) => (e) =>
    setUserInput((currentUserInput) => ({
      ...currentUserInput,
      [field]: e?.target?.value,
    }));

  const onDateChange = (e) =>
    setUserInput((currentUserInput) => ({
      ...currentUserInput,
      date: e.format("DD.MM.YYYY"),
    }));

  const onTimeChange = (field) => (e) =>
    setUserInput((currentUserInput) => ({
      ...currentUserInput,
      [`${field}Time`]: e.format("HH:mm"),
    }));

  const onCreateEventClick = async () => {
    if (
      !userInput?.title ||
      !userInput?.code ||
      !userInput?.date ||
      !userInput?.startTime ||
      !userInput?.endTime
    )
      alert("Input is incomplete!");
    else {
      console.log(userInput);
      try {
        await fetch(`https://localhost:3000/api/event`, {
          method: "POST",
          body: JSON.stringify(userInput),
        });
        setUserInput(undefined);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <AddEventContainer>
      <Input
        className="input"
        placeholder="Event title"
        onChange={onInputChange("title")}
      />
      <Input
        className="input"
        placeholder="Participation code"
        onChange={onInputChange("code")}
      />
      <div className="event-date">
        <DatePicker placeholder="Event date" onChange={onDateChange} />
        <TimePicker placeholder="Start time" onChange={onTimeChange("start")} />
        <TimePicker placeholder="End time" onChange={onTimeChange("end")} />
      </div>
      <Button type="primary" onClick={onCreateEventClick}>
        Create Event
      </Button>
    </AddEventContainer>
  );
};

export default AddEvent;
