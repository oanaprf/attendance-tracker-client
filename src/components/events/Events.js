import { useState, useEffect } from "react";
import { Collapse, Input, Tag, Button } from "antd";
import { EventsContainer } from "./styled";

const { Panel } = Collapse;

const mockedEventsResponse = {
  data: [
    {
      id: "727ce948-4e5e-400f-851d-f5c143373397",
      date: "17.01.2024",
      startTime: "19:00",
      endTime: "21:00",
      createdAt: "2024-01-17T15:49:39.024Z",
      updatedAt: "2024-01-17T15:49:39.024Z",
      code: "1111",
      participants: [],
      title: "Eveniment 1",
      status: "open",
    },
    {
      id: "520f50d0-a30e-452f-b185-6d5a442bddf0",
      date: "17.01.2024",
      startTime: "19:00",
      endTime: "21:00",
      createdAt: "2024-01-17T15:49:55.012Z",
      updatedAt: "2024-01-17T15:49:55.012Z",
      code: "2222",
      participants: [],
      title: "Eveniment 1",
      status: "closed",
    },
    {
      id: "5c572d9f-7df9-4f3c-8899-9b597228ad85",
      date: "string",
      startTime: "string",
      endTime: "string",
      createdAt: "2024-01-17T15:50:37.144Z",
      updatedAt: "2024-01-17T15:50:37.144Z",
      code: "3333",
      participants: ["gigel", "fronel"],
      title: "string",
      status: "open",
    },
  ],
};

const STATUS_ENUM = {
  open: "open",
  close: "close",
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data = mockedEventsResponse } = await fetch(
          "https://localhost:3000/api/events"
        );
        if (data?.data?.length) setEvents(data.data);
      } catch (e) {
        setEvents(mockedEventsResponse.data);
        console.error(e);
      }
    }
    fetchData();
  }, []);

  const onInputChange = (field) => (e) =>
    setUserInput((currentUserInput) => ({
      ...currentUserInput,
      [field]: e?.target?.value,
    }));

  const onParticipateClick = (event) => async () => {
    if (!userInput?.code || !userInput?.name) alert("Input is incomplete!");
    else if (userInput?.code !== event?.code) alert("Event code is incorrect!");
    else {
      try {
        await fetch(`https://localhost:3000/api/event/participate?eventId=${event?.id}`, {
          method: "POST",
          body: JSON.stringify({ name: userInput?.name }),
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <EventsContainer>
      <Collapse bordered={false} accordion>
        {events?.map(({ id, title, startTime, endTime, status, participants, code }) => (
          <Panel header={title} key={id}>
            <div className="event-details">
              <span>
                Status:{" "}
                <Tag color={status === STATUS_ENUM.open ? "green" : "red"}>
                  {status?.toUpperCase()}
                </Tag>
              </span>
              <span>
                Start time: <Tag>{startTime}</Tag>
              </span>
              <span>
                End time: <Tag>{endTime}</Tag>
              </span>
            </div>
            {participants?.length ? (
              <div className="participants">
                Participants:{" "}
                <span>
                  {participants.map((participant) => (
                    <Tag>{participant}</Tag>
                  ))}
                </span>
              </div>
            ) : null}
            {status === STATUS_ENUM.open && (
              <div className="participation-container">
                <Input
                  className="input"
                  placeholder="Event code"
                  onChange={onInputChange("code")}
                />
                <Input
                  className="input"
                  placeholder="Your name"
                  onChange={onInputChange("name")}
                />
                <Button type="primary" onClick={onParticipateClick({ id, code })}>
                  Participate
                </Button>
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
    </EventsContainer>
  );
};

export default Events;
