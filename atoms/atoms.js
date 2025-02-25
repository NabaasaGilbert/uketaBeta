import { atom } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: {},
});

export const courseDataState = atom({
  key: "courseDataState",
  default: {},
});

export const instructorDataState = atom({
  key: "instructorDataState",
  default: {},
});

export const userCourseDataState = atom({
  key: "userCourseDataState",
  default: {},
});

export const currentCourseState = atom({
  key: "currentCourseState",
  default: {},
});

export const currentModuleState = atom({
  key: "currentModuleState",
  default: {},
});

export const currentInstructorState = atom({
  key: "currentInstructorState",
  default: {},
});
