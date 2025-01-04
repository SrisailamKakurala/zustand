import React from 'react';
import useCourseStore from '../app/courseStore';

const CourseList = () => {
  // Access Zustand state
  const courses = useCourseStore((state) => state.courses);
  const removeCourse = useCourseStore((state) => state.removeCourse);
  const toggleCourse = useCourseStore((state) => state.toggleCourse);

  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <input
              className='mr-5 ml-8 mt-8 mx-auto'
              type="checkbox"
              checked={course.completed || false}
              onChange={() => toggleCourse(course.id)}
            />
            <span>{course.title}</span>
            <button className='bg-red-500 ml-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => removeCourse(course.id)}>remove course</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
