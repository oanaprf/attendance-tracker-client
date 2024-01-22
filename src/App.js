import { Typography } from "antd";

import { AppContainer } from "./styled";
import { Events, AddEvent } from "./components";

const { Title } = Typography;

function App() {
  return (
    <AppContainer>
      <Title level={2}>Attendance Tracker</Title>
      <div className="body-container">
        <Events />
        <AddEvent />
      </div>
    </AppContainer>
  );
}

export default App;
