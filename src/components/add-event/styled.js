import styled from "styled-components";

export const AddEventContainer = styled.div`
  border-radius: 10px;
  background-color: #fafafa;
  width: 500px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .event-date {
    display: flex;
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .input {
    margin-bottom: 10px;
  }
`;
