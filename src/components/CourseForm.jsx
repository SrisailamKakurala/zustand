import React, { useState } from 'react';
import useCourseStore from '../app/courseStore';

const CourseForm = () => {
  const addCourse = useCourseStore((state) => state.addCourse);
  const [courseTitle, setCourseTitle] = useState('');
  console.log('rendering CourseForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseTitle) {
      alert('Please enter a title');
      return;
    }
    addCourse({
      id: Math.ceil(Math.random() * 1000),
      title: courseTitle,
    });
    setCourseTitle(''); // Clear input after submission
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="courseTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Course Title
          </label>
          <input
            type="text"
            id="courseTitle"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
