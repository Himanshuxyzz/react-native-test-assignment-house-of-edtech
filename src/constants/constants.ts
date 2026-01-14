import { lessonDataTypes } from "@/types/types";

export const videoSources = [
  {
    source: 1,
    videoSource: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    source: 2,
    videoSource: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
];

export const lessonData: lessonDataTypes = {
  title: "Building Custom Components",
  section: "Section 2: Styling & Layout",
  lessonNumber: 9,
  totalLessons: 24,
  duration: "22:30",
  description:
    "In this comprehensive lesson, you'll learn how to create reusable custom components in React Native. We'll cover component composition, props handling, and best practices for building a scalable component library.",
  learningObjectives: [
    "Understand component composition patterns",
    "Create reusable and customizable components",
    "Implement proper TypeScript typing for props",
    "Handle component state and lifecycle",
  ],
  instructor: {
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/100?img=11",
    title: "Senior React Native Developer",
  },
  resources: [
    { name: "Lesson Slides (PDF)", icon: "📄", size: "2.4 MB" },
    { name: "Source Code", icon: "💻", size: "156 KB" },
    { name: "Exercise Files", icon: "📝", size: "89 KB" },
  ],
  nextLesson: {
    title: "Theme & Dark Mode Implementation",
    duration: "16:50",
  },
  previousLesson: {
    title: "Responsive Design Patterns",
    duration: "14:15",
  },
};
