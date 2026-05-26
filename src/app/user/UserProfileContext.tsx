import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFirstName, getInitials } from "./userProfileUtils";

const LS_DISPLAY_NAME = "ff-display-name";

function readDisplayName(): string {
  return localStorage.getItem(LS_DISPLAY_NAME)?.trim() ?? "";
}

type UserProfileContextValue = {
  displayName: string;
  firstName: string;
  initials: string;
  hasDisplayName: boolean;
  setDisplayName: (name: string) => void;
};

const UserProfileContext = createContext<UserProfileContextValue | null>(null);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [displayName, setDisplayNameState] = useState(readDisplayName);

  const setDisplayName = useCallback((name: string) => {
    const trimmed = name.trim();
    setDisplayNameState(trimmed);
    if (trimmed) {
      localStorage.setItem(LS_DISPLAY_NAME, trimmed);
    } else {
      localStorage.removeItem(LS_DISPLAY_NAME);
    }
  }, []);

  const value = useMemo(() => {
    const trimmed = displayName.trim();
    return {
      displayName: trimmed,
      firstName: getFirstName(trimmed),
      initials: getInitials(trimmed),
      hasDisplayName: trimmed.length > 0,
      setDisplayName,
    };
  }, [displayName, setDisplayName]);

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>;
}

export function useUserProfile() {
  const ctx = useContext(UserProfileContext);
  if (!ctx) {
    throw new Error("useUserProfile must be used within UserProfileProvider");
  }
  return ctx;
}
