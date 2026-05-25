import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { CheckInProvider } from "./checkIn/CheckInContext";

export default function App() {
  return (
    <CheckInProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CheckInProvider>
  );
}
