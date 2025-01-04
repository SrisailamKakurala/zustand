import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const courseStore = (set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
    })),
  removeCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    })),
  toggleCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, completed: !course.completed }
          : course
      ),
    })),
});

const useCourseStore = create(
  devtools(
    persist(courseStore, { name: 'courses' }) // Store in localStorage
  )
);

export default useCourseStore;
