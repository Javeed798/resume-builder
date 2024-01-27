import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
} from "./types";
import { ShowForm } from "./settingsSlice";
import { RootState } from "./store";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  description: [],
};

export const initalEducation: ResumeEducation = {
  school: "",
  degree: "",
  date: "",
  gpa: "",
  description: [],
};

export const initialProject: ResumeProject = {
  project: "",
  date: "",
  description: [],
};

export const initialFeaturedSkill: FeaturedSkill = {
  skill: "",
  rating: 4,
};

export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});

export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};

export const initialCustom = {
  descriptions: [],
};

export const initalResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initalEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
};

export type CreateChangeActionWithDescription<T> = {
  idx: number;
} & (
  | { field: Exclude<keyof T, "descriptions">; value: string }
  | {
      field: "descriptions";
      value: string[];
    }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initalResumeState,
  reducers: {
    changeProfile: (
      draft: { profile: { [x: string]: string } },
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },

    changeWorkExperince: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescription<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.workExperiences[idx];
      // @ts-ignore
      workExperience[field] = value;
    },

    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescription<ResumeEducation>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      // @ts-ignore
      education[field] = value as any;
    },

    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "descriptions"; value: String[] }
        | {
            field: "featuredSkills";
            idx: number;
            skill: string;
            rating: number;
          }
      >
    ) => {
      const { field } = action.payload;
      if (field === "descriptions") {
        // @ts-ignore
        draft.skills.descriptions = value;
      } else {
        const { idx, skill, rating } = action.payload;
        const featuredSkill = draft.skills.featuredSkills[idx];
        featuredSkill.skill = skill;
        featuredSkill.rating = rating;
      }
    },

    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.descriptions = value;
    },

    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience));
        }
        case "educations": {
          draft.educations.push(structuredClone(initalEducation));
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject));
        }
      }
    },

    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;
      if (form !== "skills" && form != "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft;
        }

        const section = draft[form][idx];
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1];
          draft[form][idx - 1] = section;
        } else {
          draft[form][idx] = draft[form][idx + 1];
          draft[form][idx + 1] = section;
        }
      }
    },

    deleteSectionInFormByIndex: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },

    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

export const {
  changeCustom,
  changeEducations,
  changeProfile,
  changeSkills,
  changeWorkExperince,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIndex,
  setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;

export const selectProfile = (state: RootState) => state.resume.profile;

export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;

export const selectEducations = (state: RootState) => state.resume.educations;

export const selectProjects = (state: RootState) => state.resume.projects;

export const selectSkills = (state: RootState) => state.resume.skills;

export const selectCustom = (state: RootState) => state.resume.custom;

export default resumeSlice.reducer;
