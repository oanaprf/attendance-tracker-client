import styled from "styled-components";

export const EventsContainer = styled.div`
  padding: 20px;
  width: 500px;

  .event-details {
    display: flex;
    justify-content: space-between;
  }

  .participants {
    margin: 10px 0;
  }

  .participation-container {
    display: flex;
    justify-items: space-between;
    margin-top: 10px;

    .input {
      margin-right: 10px;
    }
  }
`;
