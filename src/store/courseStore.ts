import { create } from 'zustand';
import { fetchCourses } from '../services/courses';
import {
  getBookmarks,
  saveBookmarks,
} from '../utils/localStorage';
import { sendBookmarkNotification } from '../utils/notifications';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  bookmarked: boolean;
}

interface CourseState {
  courses: Course[];
  filteredCourses: Course[];
  loading: boolean;
  loadCourses: () => Promise<void>;
  searchCourses: (query: string) => void;
  toggleBookmark: (id: number) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  courses: [],
  filteredCourses: [],
  loading: false,

  loadCourses: async () => {
    set({ loading: true });

    const data = await fetchCourses();

    // Load saved bookmark IDs
    const savedBookmarks: number[] = await getBookmarks();

    const updatedCourses = data.map((course: Course) => ({
      ...course,
      bookmarked: savedBookmarks.includes(course.id),
    }));

    set({
      courses: updatedCourses,
      filteredCourses: updatedCourses,
      loading: false,
    });
  },

  searchCourses: (query) => {
    const filtered = get().courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    set({
      filteredCourses: filtered,
    });
  },

  toggleBookmark: async (id) => {
    const updated = get().courses.map((course) =>
      course.id === id
        ? { ...course, bookmarked: !course.bookmarked }
        : course
    );

    // Save bookmarked IDs locally
    const bookmarkedIds = updated
      .filter((course) => course.bookmarked)
      .map((course) => course.id);

    await saveBookmarks(bookmarkedIds);

    const bookmarkedCount = bookmarkedIds.length;

    if (bookmarkedCount === 5) {
      await sendBookmarkNotification();
    }

    set({
      courses: updated,
      filteredCourses: updated,
    });
  },
}));