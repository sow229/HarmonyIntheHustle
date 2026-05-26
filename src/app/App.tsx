import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { CheckInProvider } from "./checkIn/CheckInContext";
import { UserProfileProvider } from "./user/UserProfileContext";

export default function App() {
  return (
    <UserProfileProvider>
      <CheckInProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CheckInProvider>
    </UserProfileProvider>
  );
}
