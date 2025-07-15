import { useState, useEffect } from "react";
import MonitoringChatPane1 from "./pages/MonitoringChatPane1";
/* import ComponentShowcase from "./pages/ComponentShowcase"; */
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"main" | "showcase">(
    window.location.hash === "#showcase" ? "showcase" : "main"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash === "#showcase" ? "showcase" : "main");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ThemeProvider>
      {currentPage === "showcase" ? (
        <ComponentShowcase />
      ) : (
        <MonitoringChatPane1 />
      )}
    </ThemeProvider>
  );
}
