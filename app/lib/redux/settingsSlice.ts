import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Settings {
  themeColor: string;
  fontFamily: string;
  fontSize: string;
  documentSize: string;
  formToShow: {
    workExperiences: boolean;
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
  formToHeading: {
    workExperiences: string;
    educations: string;
    projects: string;
    skills: string;
    custom: string;
  };
  formsOrder: ShowForm[];
  showBulletPoints: {
    educations: boolean;
    projects: boolean;
    skills: boolean;
    custom: boolean;
  };
}

export type ShowForm = keyof Settings["formToShow"];

export type formWithBulletPoints = keyof Settings["showBulletPoints"];

export type GeneralSettings = Exclude<
  keyof Settings,
  ["formToShow" | "formToHeading" | "formsOrder" | "showBulletPoints"]
>;

export const DEFAULT_THEME_COLOR = "#38bdf8";
export const DEFAULT_FONT_FAMILY = "Roboto";
export const DEFAILT_FONT_SIZE = "11";
export const DEFAILT_FONT_COLOR = "#171717";

export const initialSettings: Settings = {
  themeColor: DEFAULT_THEME_COLOR,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontSize: DEFAILT_FONT_SIZE,
  documentSize: "Letter",
  formToShow: {
    workExperiences: true,
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
  formToHeading: {
    workExperiences: "WORK EXPERIENCE",
    educations: "EDUCATION",
    projects: "PROJECT",
    skills: "SKILLS",
    custom: "CUSTOM SECTION",
  },
  formsOrder: ["workExperiences", "educations", "projects", "skills", "custom"],
  showBulletPoints: {
    educations: true,
    projects: true,
    skills: true,
    custom: true,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialSettings,
  reducers: {
    changeSettings: (
      draft,
      action: PayloadAction<{ field: GeneralSettings; value: string }>
    ) => {
      const { field, value } = action.payload;
      // @ts-ignore
      draft[field] = value;
    },

    changeShowForm: (
      draft,
      action: PayloadAction<{ field: ShowForm; value: boolean }>
    ) => {
      const { field, value } = action.payload;
      draft.formToShow[field] = value;
    },

    changeFormHeading: (
      draft,
      action: PayloadAction<{ field: ShowForm; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.formToHeading[field] = value;
    },

    changeFormOrder: (
      draft,
      action: PayloadAction<{ form: ShowForm; type: "up" | "down" }>
    ) => {
      const { form, type } = action.payload;
      // This line calculates the index of the last element in the formsOrder array.
      const lastIdx = draft.formsOrder.length - 1;
      // This line finds the index of the specified form within the formsOrder array.
      const pos = draft.formsOrder.indexOf(form);
      // This line calculates the new position (index) based on whether the type is "up" or "down". If the type is "up", it decrements the current position by 1; otherwise, it increments it by 1.
      const newPos = type === "up" ? pos - 1 : pos + 1;
      const swapFormOrder = (idx1: number, idx2: number) => {
        let temp = draft.formsOrder[idx1];
        draft.formsOrder[idx1] = draft.formsOrder[idx2];
        draft.formsOrder[idx2] = temp;
      };

      if (newPos >= 0 && newPos <= lastIdx) {
        swapFormOrder(pos, newPos);
      }
    },

    changeShowBulletPoints: (
      draft,
      action: PayloadAction<{ field: formWithBulletPoints; value: boolean }>
    ) => {
      const { field, value } = action.payload;
      draft.showBulletPoints[field] = value;
    },

    setSettings: (draft, action: PayloadAction<Settings>) => {
      return action.payload;
    },
  },
});

export const {
  changeFormHeading,
  changeFormOrder,
  changeSettings,
  changeShowBulletPoints,
  changeShowForm,
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const selectThemeColor = (state: RootState) => state.settings.themeColor;


export const selectFormToShow = (state: RootState) => state.settings.formToShow;

export const selectShowByForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formToShow[form];

export const selectFormToHeading = (state: RootState) =>
  state.settings.formToHeading;

export const selectHeadingByForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formToHeading[form];

export const selectFormsOrder = (state: RootState) => state.settings.formsOrder;

export const selectIsFirstForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formsOrder[0] === form;

export const selectIsLastForm = (form: ShowForm) => (state: RootState) =>
  state.settings.formsOrder[state.settings.formsOrder.length - 1] === form;

export const selectShowBulletPoints =
  (form: ShowForm) => (state: RootState) => {
    if (
      form === "educations" ||
      form === "projects" ||
      form === "skills" ||
      form === "custom"
    ) {
      return state.settings.showBulletPoints[form];
    }
    return false;
  };

export default settingsSlice.reducer;
