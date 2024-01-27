import { RootState } from "./store";

const LOCAL_STORAGE_KEY = "resume-builder-parser-state";

export const saveStateToLocalStorage = (state: RootState) => {
  try {
    const stringFieldState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringFieldState);
  } catch (error) {}
};

export const loadStateFromLocalStorage = () => {
  try {
    const stringifyState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stringifyState) {
      return undefined;
    }
    return JSON.parse(stringifyState);
  } catch (error) {
    return undefined;
  }
};

export const getHasUsedAppBefore = () => Boolean(loadStateFromLocalStorage());
