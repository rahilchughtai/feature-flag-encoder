import { createContext } from "react";

export const SnackbarContext = createContext<{ snackbarOpen: boolean, setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>> }>({ snackbarOpen: false, setSnackbarOpen: () => { } });
