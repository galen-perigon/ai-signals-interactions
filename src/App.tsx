import MonitoringChatPane1 from "./pages/MonitoringChatPane1";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <MonitoringChatPane1 />
    </ThemeProvider>
  );
}
