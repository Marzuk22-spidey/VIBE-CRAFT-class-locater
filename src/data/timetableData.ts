import { ClassTimetable } from '../types';

/**
 * 10 Class Timetables - Ground Truth Dataset
 * Uses realistic college course schedules.
 * Venues keep their original format (e.g. "IST 503", "IST 612", "IST 211", "IST 416").
 */
export const INITIAL_TIMETABLES: ClassTimetable[] = [
  // 1. CS-A
  {
    id: 'tt-cs-a',
    classSection: 'CS-A (Computer Science & Eng - Year 3)',
    department: 'Department of Computer Science & Engineering',
    semester: 'Semester 5',
    totalStudents: 62,
    slots: [
      // Monday
      { id: 'cs-a-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Aris Thorne', roomNumber: 'IST 001', classSection: 'CS-A' },
      { id: 'cs-a-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 001', classSection: 'CS-A' },
      { id: 'cs-a-m3', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 201', classSection: 'CS-A' },
      { id: 'cs-a-m4', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 201', classSection: 'CS-A' },
      { id: 'cs-a-m5', day: 'Monday', startTime: '13:30', endTime: '15:30', subjectCode: 'CS305L', subjectName: 'DBMS & Query Optimization Lab', instructor: 'Dr. Aris Thorne', roomNumber: 'IST 303', classSection: 'CS-A' },

      // Tuesday
      { id: 'cs-a-tu1', day: 'Tuesday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 002', classSection: 'CS-A' },
      { id: 'cs-a-tu2', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 002', classSection: 'CS-A' },
      { id: 'cs-a-tu3', day: 'Tuesday', startTime: '10:45', endTime: '12:45', subjectCode: 'CS306L', subjectName: 'OS Kernel & Systems Lab', instructor: 'Prof. Maya Lin', roomNumber: 'IST 303', classSection: 'CS-A' },
      { id: 'cs-a-tu4', day: 'Tuesday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 201', classSection: 'CS-A' },
      { id: 'cs-a-tu5', day: 'Tuesday', startTime: '14:30', endTime: '15:30', subjectCode: 'CS307', subjectName: 'Technical Writing & Seminar', instructor: 'Prof. Elena Rostova', roomNumber: 'IST 401', classSection: 'CS-A' },

      // Wednesday
      { id: 'cs-a-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 211', classSection: 'CS-A' },
      { id: 'cs-a-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Aris Thorne', roomNumber: 'IST 211', classSection: 'CS-A' },
      { id: 'cs-a-w3', day: 'Wednesday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 201', classSection: 'CS-A' },
      { id: 'cs-a-w4', day: 'Wednesday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS308', subjectName: 'Software Engineering Principles', instructor: 'Dr. Kelvin Meyer', roomNumber: 'IST 201', classSection: 'CS-A' },
      { id: 'cs-a-w5', day: 'Wednesday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 101', classSection: 'CS-A' },

      // Thursday
      { id: 'cs-a-th1', day: 'Thursday', startTime: '08:30', endTime: '10:30', subjectCode: 'CS309L', subjectName: 'Full-Stack Web Architectures Lab', instructor: 'Prof. Daniel Park', roomNumber: 'IST 303', classSection: 'CS-A' },
      { id: 'cs-a-th2', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Aris Thorne', roomNumber: 'IST 101', classSection: 'CS-A' },
      { id: 'cs-a-th3', day: 'Thursday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 101', classSection: 'CS-A' },
      { id: 'cs-a-th4', day: 'Thursday', startTime: '13:30', endTime: '15:30', subjectCode: 'CS310', subjectName: 'Mini Project Mentorship', instructor: 'Faculty Panel', roomNumber: 'IST 503', classSection: 'CS-A' },

      // Friday
      { id: 'cs-a-f1', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 211', classSection: 'CS-A' },
      { id: 'cs-a-f2', day: 'Friday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS308', subjectName: 'Software Engineering Principles', instructor: 'Dr. Kelvin Meyer', roomNumber: 'IST 211', classSection: 'CS-A' },
      { id: 'cs-a-f3', day: 'Friday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 211', classSection: 'CS-A' },
      { id: 'cs-a-f4', day: 'Friday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS311', subjectName: 'Open Elective (AI Ethics)', instructor: 'Dr. Mira Patel', roomNumber: 'IST 501', classSection: 'CS-A' },

      // Saturday
      { id: 'cs-a-sa1', day: 'Saturday', startTime: '09:00', endTime: '11:00', subjectCode: 'CS312', subjectName: 'Competitive Programming Workshop', instructor: 'Alumni Mentors', roomNumber: 'IST 301', classSection: 'CS-A' },
      { id: 'cs-a-sa2', day: 'Saturday', startTime: '11:15', endTime: '13:15', subjectCode: 'CS313', subjectName: 'Industry Guest Lecture Series', instructor: 'Visiting Fellow', roomNumber: 'IST 601', classSection: 'CS-A' }
    ]
  },

  // 2. CS-B
  {
    id: 'tt-cs-b',
    classSection: 'CS-B (Computer Science & Eng - Year 3)',
    department: 'Department of Computer Science & Engineering',
    semester: 'Semester 5',
    totalStudents: 58,
    slots: [
      // Monday
      { id: 'cs-b-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-m3', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Priya Nair', roomNumber: 'IST 211', classSection: 'CS-B' },
      { id: 'cs-b-m4', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 211', classSection: 'CS-B' },
      { id: 'cs-b-m5', day: 'Monday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 416', classSection: 'CS-B' },

      // Tuesday
      { id: 'cs-b-tu1', day: 'Tuesday', startTime: '08:30', endTime: '10:30', subjectCode: 'CS305L', subjectName: 'DBMS & Query Optimization Lab', instructor: 'Dr. Priya Nair', roomNumber: 'IST 303', classSection: 'CS-B' },
      { id: 'cs-b-tu2', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-tu3', day: 'Tuesday', startTime: '11:45', endTime: '12:45', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-tu4', day: 'Tuesday', startTime: '13:30', endTime: '15:30', subjectCode: 'CS306L', subjectName: 'OS Kernel & Systems Lab', instructor: 'Prof. Daniel Park', roomNumber: 'IST 303', classSection: 'CS-B' },

      // Wednesday
      { id: 'cs-b-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 211', classSection: 'CS-B' },
      { id: 'cs-b-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 211', classSection: 'CS-B' },
      { id: 'cs-b-w3', day: 'Wednesday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS308', subjectName: 'Software Engineering Principles', instructor: 'Dr. Kelvin Meyer', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-w4', day: 'Wednesday', startTime: '13:30', endTime: '15:30', subjectCode: 'CS309L', subjectName: 'Full-Stack Web Architectures Lab', instructor: 'Prof. Daniel Park', roomNumber: 'IST 303', classSection: 'CS-B' },

      // Thursday
      { id: 'cs-b-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Priya Nair', roomNumber: 'IST 416', classSection: 'CS-B' },
      { id: 'cs-b-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS303', subjectName: 'Design & Analysis of Algorithms', instructor: 'Dr. Robert Vance', roomNumber: 'IST 416', classSection: 'CS-B' },
      { id: 'cs-b-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS305', subjectName: 'Computer Networks', instructor: 'Dr. Nathan Drake', roomNumber: 'IST 211', classSection: 'CS-B' },
      { id: 'cs-b-th4', day: 'Thursday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS308', subjectName: 'Software Engineering Principles', instructor: 'Dr. Kelvin Meyer', roomNumber: 'IST 102', classSection: 'CS-B' },

      // Friday
      { id: 'cs-b-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'CS304', subjectName: 'Theory of Computation', instructor: 'Prof. Sarah Chen', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'CS301', subjectName: 'Database Management Systems', instructor: 'Dr. Priya Nair', roomNumber: 'IST 102', classSection: 'CS-B' },
      { id: 'cs-b-f3', day: 'Friday', startTime: '10:45', endTime: '11:45', subjectCode: 'CS302', subjectName: 'Operating Systems & Concurrency', instructor: 'Prof. Maya Lin', roomNumber: 'IST 201', classSection: 'CS-B' },
      { id: 'cs-b-f4', day: 'Friday', startTime: '13:30', endTime: '14:30', subjectCode: 'CS311', subjectName: 'Open Elective (AI Ethics)', instructor: 'Dr. Mira Patel', roomNumber: 'IST 501', classSection: 'CS-B' },

      // Saturday
      { id: 'cs-b-sa1', day: 'Saturday', startTime: '10:00', endTime: '12:00', subjectCode: 'CS314', subjectName: 'Cloud & DevOps Hack Lab', instructor: 'Industry Mentors', roomNumber: 'IST 401', classSection: 'CS-B' }
    ]
  },

  // 3. AI-DS
  {
    id: 'tt-ai-ds',
    classSection: 'AI-DS (Artificial Intelligence & Data Science - Year 2)',
    department: 'Department of Data Intelligence',
    semester: 'Semester 3',
    totalStudents: 60,
    slots: [
      // Monday
      { id: 'ai-m1', day: 'Monday', startTime: '08:30', endTime: '10:30', subjectCode: 'AI201L', subjectName: 'Python for Deep Learning Lab', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 303', classSection: 'AI-DS' },
      { id: 'ai-m2', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'AI202', subjectName: 'Linear Algebra & Optimization', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-m3', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'AI203', subjectName: 'Foundations of Machine Learning', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-m4', day: 'Monday', startTime: '13:30', endTime: '14:30', subjectCode: 'AI204', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Jason Kim', roomNumber: 'IST 301', classSection: 'AI-DS' },

      // Tuesday
      { id: 'ai-tu1', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'AI203', subjectName: 'Foundations of Machine Learning', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-tu2', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'AI205', subjectName: 'Probability & Statistics for AI', instructor: 'Dr. Anand Joshi', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-tu3', day: 'Tuesday', startTime: '11:45', endTime: '12:45', subjectCode: 'AI202', subjectName: 'Linear Algebra & Optimization', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-tu4', day: 'Tuesday', startTime: '13:30', endTime: '15:30', subjectCode: 'AI206L', subjectName: 'Data Science & Visualisation Lab', instructor: 'Dr. Anand Joshi', roomNumber: 'IST 303', classSection: 'AI-DS' },

      // Wednesday
      { id: 'ai-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'AI204', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Jason Kim', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'AI205', subjectName: 'Probability & Statistics for AI', instructor: 'Dr. Anand Joshi', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-w3', day: 'Wednesday', startTime: '10:45', endTime: '12:45', subjectCode: 'AI207L', subjectName: 'Neural Networks Exploratory Studio', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 303', classSection: 'AI-DS' },
      { id: 'ai-w4', day: 'Wednesday', startTime: '14:30', endTime: '15:30', subjectCode: 'AI208', subjectName: 'Discrete Mathematics', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 503', classSection: 'AI-DS' },

      // Thursday
      { id: 'ai-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'AI202', subjectName: 'Linear Algebra & Optimization', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'AI203', subjectName: 'Foundations of Machine Learning', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'AI204', subjectName: 'Data Structures & Algorithms', instructor: 'Prof. Jason Kim', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-th4', day: 'Thursday', startTime: '11:45', endTime: '12:45', subjectCode: 'AI208', subjectName: 'Discrete Mathematics', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 301', classSection: 'AI-DS' },

      // Friday
      { id: 'ai-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'AI205', subjectName: 'Probability & Statistics for AI', instructor: 'Dr. Anand Joshi', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'AI208', subjectName: 'Discrete Mathematics', instructor: 'Prof. Hannah Brooks', roomNumber: 'IST 301', classSection: 'AI-DS' },
      { id: 'ai-f3', day: 'Friday', startTime: '10:45', endTime: '12:45', subjectCode: 'AI209L', subjectName: 'Model Deployment & MLOps Lab', instructor: 'Prof. Jason Kim', roomNumber: 'IST 303', classSection: 'AI-DS' },
      { id: 'ai-f4', day: 'Friday', startTime: '14:30', endTime: '16:00', subjectCode: 'AI210', subjectName: 'AI Capstone Ideation', instructor: 'Dr. Vikram Seth', roomNumber: 'IST 612', classSection: 'AI-DS' },

      // Saturday
      { id: 'ai-sa1', day: 'Saturday', startTime: '09:30', endTime: '11:30', subjectCode: 'AI211', subjectName: 'GenAI & LLM Hackathon Session', instructor: 'VibeCraft Labs', roomNumber: 'IST 501', classSection: 'AI-DS' }
    ]
  },

  // 4. IT-A
  {
    id: 'tt-it-a',
    classSection: 'IT-A (Information Technology - Year 2)',
    department: 'Department of Information Technology',
    semester: 'Semester 3',
    totalStudents: 55,
    slots: [
      // Monday
      { id: 'it-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'IT201', subjectName: 'Web & Internet Technologies', instructor: 'Prof. Chris Evans', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'IT202', subjectName: 'Data Structures using C++', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-m3', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'IT203', subjectName: 'Computer Organization & Architecture', instructor: 'Prof. Lisa Wong', roomNumber: 'IST 503', classSection: 'IT-A' },
      { id: 'it-m4', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'IT204', subjectName: 'Object Oriented Programming', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 503', classSection: 'IT-A' },

      // Tuesday
      { id: 'it-tu1', day: 'Tuesday', startTime: '08:30', endTime: '09:30', subjectCode: 'IT203', subjectName: 'Computer Organization & Architecture', instructor: 'Prof. Lisa Wong', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-tu2', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'IT201', subjectName: 'Web & Internet Technologies', instructor: 'Prof. Chris Evans', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-tu3', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'IT202', subjectName: 'Data Structures using C++', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-tu4', day: 'Tuesday', startTime: '13:30', endTime: '15:30', subjectCode: 'IT205L', subjectName: 'Web Engineering & API Lab', instructor: 'Prof. Chris Evans', roomNumber: 'IST 303', classSection: 'IT-A' },

      // Wednesday
      { id: 'it-w1', day: 'Wednesday', startTime: '08:30', endTime: '10:30', subjectCode: 'IT206L', subjectName: 'Data Structures & Algorithms Lab', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 303', classSection: 'IT-A' },
      { id: 'it-w2', day: 'Wednesday', startTime: '10:45', endTime: '11:45', subjectCode: 'IT204', subjectName: 'Object Oriented Programming', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-w3', day: 'Wednesday', startTime: '11:45', endTime: '12:45', subjectCode: 'IT201', subjectName: 'Web & Internet Technologies', instructor: 'Prof. Chris Evans', roomNumber: 'IST 612', classSection: 'IT-A' },

      // Thursday
      { id: 'it-th1', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'IT202', subjectName: 'Data Structures using C++', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-th2', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'IT203', subjectName: 'Computer Organization & Architecture', instructor: 'Prof. Lisa Wong', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-th3', day: 'Thursday', startTime: '11:45', endTime: '12:45', subjectCode: 'IT207', subjectName: 'Cyber Security Essentials', instructor: 'Dr. Amit Trivedi', roomNumber: 'IST 503', classSection: 'IT-A' },
      { id: 'it-th4', day: 'Thursday', startTime: '13:30', endTime: '14:30', subjectCode: 'IT204', subjectName: 'Object Oriented Programming', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 503', classSection: 'IT-A' },

      // Friday
      { id: 'it-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'IT207', subjectName: 'Cyber Security Essentials', instructor: 'Dr. Amit Trivedi', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'IT204', subjectName: 'Object Oriented Programming', instructor: 'Dr. Sanjeev Rao', roomNumber: 'IST 612', classSection: 'IT-A' },
      { id: 'it-f3', day: 'Friday', startTime: '10:45', endTime: '12:45', subjectCode: 'IT208L', subjectName: 'Network Security Lab', instructor: 'Dr. Amit Trivedi', roomNumber: 'IST 303', classSection: 'IT-A' },

      // Saturday
      { id: 'it-sa1', day: 'Saturday', startTime: '09:00', endTime: '11:00', subjectCode: 'IT209', subjectName: 'Open Source Contribution Sprint', instructor: 'Student Council', roomNumber: 'IST 503', classSection: 'IT-A' }
    ]
  },

  // 5. ECE-A
  {
    id: 'tt-ece-a',
    classSection: 'ECE-A (Electronics & Comm - Year 3)',
    department: 'Department of Electronics & Communication',
    semester: 'Semester 5',
    totalStudents: 60,
    slots: [
      // Monday
      { id: 'ece-a-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC301', subjectName: 'Digital Signal Processing', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC302', subjectName: 'Microprocessors & Microcontrollers', instructor: 'Dr. Anita Roy', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-m3', day: 'Monday', startTime: '10:45', endTime: '12:45', subjectCode: 'EC303L', subjectName: 'DSP & MATLAB Simulation Lab', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 303', classSection: 'ECE-A' },
      { id: 'ece-a-m4', day: 'Monday', startTime: '13:30', endTime: '14:30', subjectCode: 'EC304', subjectName: 'Electromagnetic Field Theory', instructor: 'Dr. G. Venkat', roomNumber: 'IST 416', classSection: 'ECE-A' },

      // Tuesday
      { id: 'ece-a-tu1', day: 'Tuesday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC304', subjectName: 'Electromagnetic Field Theory', instructor: 'Dr. G. Venkat', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-tu2', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC301', subjectName: 'Digital Signal Processing', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-tu3', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC305', subjectName: 'Control Systems', instructor: 'Prof. S. Nambiar', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-tu4', day: 'Tuesday', startTime: '11:45', endTime: '12:45', subjectCode: 'EC302', subjectName: 'Microprocessors & Microcontrollers', instructor: 'Dr. Anita Roy', roomNumber: 'IST 416', classSection: 'ECE-A' },

      // Wednesday
      { id: 'ece-a-w1', day: 'Wednesday', startTime: '08:30', endTime: '10:30', subjectCode: 'EC306L', subjectName: 'Microcontroller 8051 & ARM Lab', instructor: 'Dr. Anita Roy', roomNumber: 'IST 303', classSection: 'ECE-A' },
      { id: 'ece-a-w2', day: 'Wednesday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC301', subjectName: 'Digital Signal Processing', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-w3', day: 'Wednesday', startTime: '11:45', endTime: '12:45', subjectCode: 'EC305', subjectName: 'Control Systems', instructor: 'Prof. S. Nambiar', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-w4', day: 'Wednesday', startTime: '13:30', endTime: '14:30', subjectCode: 'EC302', subjectName: 'Microprocessors & Microcontrollers', instructor: 'Dr. Anita Roy', roomNumber: 'IST 416', classSection: 'ECE-A' },

      // Thursday
      { id: 'ece-a-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC305', subjectName: 'Control Systems', instructor: 'Prof. S. Nambiar', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC304', subjectName: 'Electromagnetic Field Theory', instructor: 'Dr. G. Venkat', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC307', subjectName: 'VLSI Design Fundamentals', instructor: 'Dr. Neha Saxena', roomNumber: 'IST 401', classSection: 'ECE-A' },

      // Friday
      { id: 'ece-a-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC307', subjectName: 'VLSI Design Fundamentals', instructor: 'Dr. Neha Saxena', roomNumber: 'IST 401', classSection: 'ECE-A' },
      { id: 'ece-a-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC305', subjectName: 'Control Systems', instructor: 'Prof. S. Nambiar', roomNumber: 'IST 416', classSection: 'ECE-A' },
      { id: 'ece-a-f3', day: 'Friday', startTime: '13:30', endTime: '15:30', subjectCode: 'EC308L', subjectName: 'VLSI CADENCE Synthesis Lab', instructor: 'Dr. Neha Saxena', roomNumber: 'IST 303', classSection: 'ECE-A' },

      // Saturday
      { id: 'ece-a-sa1', day: 'Saturday', startTime: '09:30', endTime: '11:30', subjectCode: 'EC309', subjectName: 'Embedded Robotics & Drone Tech', instructor: 'Robotics Club', roomNumber: 'IST 416', classSection: 'ECE-A' }
    ]
  },

  // 6. ECE-B
  {
    id: 'tt-ece-b',
    classSection: 'ECE-B (Electronics & Comm - Year 2)',
    department: 'Department of Electronics & Communication',
    semester: 'Semester 3',
    totalStudents: 50,
    slots: [
      // Monday
      { id: 'ece-b-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC201', subjectName: 'Electronic Circuits & Analysis', instructor: 'Prof. Deepa Das', roomNumber: 'IST 211', classSection: 'ECE-B' },
      { id: 'ece-b-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC202', subjectName: 'Digital System Design', instructor: 'Dr. Tarun Verma', roomNumber: 'IST 211', classSection: 'ECE-B' },
      { id: 'ece-b-m3', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC203', subjectName: 'Signals & Systems', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 612', classSection: 'ECE-B' },
      { id: 'ece-b-m4', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'EC204', subjectName: 'Network Analysis', instructor: 'Dr. G. Venkat', roomNumber: 'IST 612', classSection: 'ECE-B' },

      // Tuesday
      { id: 'ece-b-tu1', day: 'Tuesday', startTime: '08:30', endTime: '10:30', subjectCode: 'EC205L', subjectName: 'Analog Electronics Hardware Lab', instructor: 'Prof. Deepa Das', roomNumber: 'IST 303', classSection: 'ECE-B' },
      { id: 'ece-b-tu2', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC201', subjectName: 'Electronic Circuits & Analysis', instructor: 'Prof. Deepa Das', roomNumber: 'IST 503', classSection: 'ECE-B' },
      { id: 'ece-b-tu3', day: 'Tuesday', startTime: '11:45', endTime: '12:45', subjectCode: 'EC202', subjectName: 'Digital System Design', instructor: 'Dr. Tarun Verma', roomNumber: 'IST 503', classSection: 'ECE-B' },
      { id: 'ece-b-tu4', day: 'Tuesday', startTime: '13:30', endTime: '14:30', subjectCode: 'EC203', subjectName: 'Signals & Systems', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 503', classSection: 'ECE-B' },

      // Wednesday
      { id: 'ece-b-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC204', subjectName: 'Network Analysis', instructor: 'Dr. G. Venkat', roomNumber: 'IST 416', classSection: 'ECE-B' },
      { id: 'ece-b-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC203', subjectName: 'Signals & Systems', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 416', classSection: 'ECE-B' },
      { id: 'ece-b-w3', day: 'Wednesday', startTime: '10:45', endTime: '12:45', subjectCode: 'EC206L', subjectName: 'Digital Logic & FPGA Lab', instructor: 'Dr. Tarun Verma', roomNumber: 'IST 303', classSection: 'ECE-B' },

      // Thursday
      { id: 'ece-b-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'EC201', subjectName: 'Electronic Circuits & Analysis', instructor: 'Prof. Deepa Das', roomNumber: 'IST 211', classSection: 'ECE-B' },
      { id: 'ece-b-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC202', subjectName: 'Digital System Design', instructor: 'Dr. Tarun Verma', roomNumber: 'IST 211', classSection: 'ECE-B' },
      { id: 'ece-b-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC204', subjectName: 'Network Analysis', instructor: 'Dr. G. Venkat', roomNumber: 'IST 211', classSection: 'ECE-B' },

      // Friday
      { id: 'ece-b-f1', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'EC203', subjectName: 'Signals & Systems', instructor: 'Prof. Ramesh Kulkarni', roomNumber: 'IST 503', classSection: 'ECE-B' },
      { id: 'ece-b-f2', day: 'Friday', startTime: '10:45', endTime: '11:45', subjectCode: 'EC201', subjectName: 'Electronic Circuits & Analysis', instructor: 'Prof. Deepa Das', roomNumber: 'IST 503', classSection: 'ECE-B' },
      { id: 'ece-b-f3', day: 'Friday', startTime: '11:45', endTime: '12:45', subjectCode: 'EC202', subjectName: 'Digital System Design', instructor: 'Dr. Tarun Verma', roomNumber: 'IST 503', classSection: 'ECE-B' },

      // Saturday
      { id: 'ece-b-sa1', day: 'Saturday', startTime: '09:00', endTime: '11:00', subjectCode: 'EC207', subjectName: 'PCB Prototyping Workshop', instructor: 'Prof. Deepa Das', roomNumber: 'IST 612', classSection: 'ECE-B' }
    ]
  },

  // 7. MECH-A
  {
    id: 'tt-mech-a',
    classSection: 'MECH-A (Mechanical Engineering - Year 3)',
    department: 'Department of Mechanical Engineering',
    semester: 'Semester 5',
    totalStudents: 45,
    slots: [
      // Monday
      { id: 'me-m1', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'ME301', subjectName: 'Thermodynamics & Heat Transfer', instructor: 'Dr. Suresh Menon', roomNumber: 'IST 102', classSection: 'MECH-A' },
      { id: 'me-m2', day: 'Monday', startTime: '10:45', endTime: '11:45', subjectCode: 'ME302', subjectName: 'Fluid Mechanics & Turbomachinery', instructor: 'Prof. Ajay Saxena', roomNumber: 'IST 416', classSection: 'MECH-A' },
      { id: 'me-m3', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'ME303', subjectName: 'Kinematics & Dynamics of Machines', instructor: 'Dr. M. K. Pillai', roomNumber: 'IST 416', classSection: 'MECH-A' },
      { id: 'me-m4', day: 'Monday', startTime: '14:30', endTime: '16:30', subjectCode: 'ME304L', subjectName: 'Thermal Engineering & IC Engines Lab', instructor: 'Dr. Suresh Menon', roomNumber: 'Seminar Annex', classSection: 'MECH-A' },

      // Tuesday
      { id: 'me-tu1', day: 'Tuesday', startTime: '08:30', endTime: '09:30', subjectCode: 'ME303', subjectName: 'Kinematics & Dynamics of Machines', instructor: 'Dr. M. K. Pillai', roomNumber: 'IST 416', classSection: 'MECH-A' },
      { id: 'me-tu2', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'ME301', subjectName: 'Thermodynamics & Heat Transfer', instructor: 'Dr. Suresh Menon', roomNumber: 'IST 416', classSection: 'MECH-A' },
      { id: 'me-tu3', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'ME302', subjectName: 'Fluid Mechanics & Turbomachinery', instructor: 'Prof. Ajay Saxena', roomNumber: 'IST 416', classSection: 'MECH-A' },
      { id: 'me-tu4', day: 'Tuesday', startTime: '13:30', endTime: '14:30', subjectCode: 'ME305', subjectName: 'Manufacturing Technology II', instructor: 'Prof. K. Raghavan', roomNumber: 'IST 102', classSection: 'MECH-A' },

      // Wednesday
      { id: 'me-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'ME305', subjectName: 'Manufacturing Technology II', instructor: 'Prof. K. Raghavan', roomNumber: 'IST 102', classSection: 'MECH-A' },
      { id: 'me-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'ME303', subjectName: 'Kinematics & Dynamics of Machines', instructor: 'Dr. M. K. Pillai', roomNumber: 'IST 102', classSection: 'MECH-A' },
      { id: 'me-w3', day: 'Wednesday', startTime: '13:30', endTime: '15:30', subjectCode: 'ME306L', subjectName: 'CAD / CAM & FEA Lab', instructor: 'Prof. Ajay Saxena', roomNumber: 'IST 303', classSection: 'MECH-A' },

      // Thursday
      { id: 'me-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'ME301', subjectName: 'Thermodynamics & Heat Transfer', instructor: 'Dr. Suresh Menon', roomNumber: 'IST 211', classSection: 'MECH-A' },
      { id: 'me-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'ME302', subjectName: 'Fluid Mechanics & Turbomachinery', instructor: 'Prof. Ajay Saxena', roomNumber: 'IST 211', classSection: 'MECH-A' },
      { id: 'me-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'ME305', subjectName: 'Manufacturing Technology II', instructor: 'Prof. K. Raghavan', roomNumber: 'IST 211', classSection: 'MECH-A' },

      // Friday
      { id: 'me-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'ME303', subjectName: 'Kinematics & Dynamics of Machines', instructor: 'Dr. M. K. Pillai', roomNumber: 'IST 102', classSection: 'MECH-A' },
      { id: 'me-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'ME305', subjectName: 'Manufacturing Technology II', instructor: 'Prof. K. Raghavan', roomNumber: 'IST 102', classSection: 'MECH-A' },
      { id: 'me-f3', day: 'Friday', startTime: '10:45', endTime: '11:45', subjectCode: 'ME301', subjectName: 'Thermodynamics & Heat Transfer', instructor: 'Dr. Suresh Menon', roomNumber: 'IST 102', classSection: 'MECH-A' },

      // Saturday
      { id: 'me-sa1', day: 'Saturday', startTime: '09:30', endTime: '11:30', subjectCode: 'ME307', subjectName: 'Electric Vehicle Powertrain Seminar', instructor: 'Dr. Suresh Menon', roomNumber: 'IST 503', classSection: 'MECH-A' }
    ]
  },

  // 8. CIVIL-A
  {
    id: 'tt-civil-a',
    classSection: 'CIVIL-A (Civil Engineering - Year 2)',
    department: 'Department of Civil & Infrastructure',
    semester: 'Semester 3',
    totalStudents: 40,
    slots: [
      // Monday
      { id: 'civ-m1', day: 'Monday', startTime: '08:30', endTime: '09:30', subjectCode: 'CE201', subjectName: 'Structural Mechanics I', instructor: 'Dr. B. Sengupta', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-m2', day: 'Monday', startTime: '09:30', endTime: '10:30', subjectCode: 'CE202', subjectName: 'Surveying & Geomatics', instructor: 'Prof. Harish Nair', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-m3', day: 'Monday', startTime: '11:45', endTime: '12:45', subjectCode: 'CE203', subjectName: 'Fluid Mechanics in Open Channels', instructor: 'Prof. Rekha Sharma', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-m4', day: 'Monday', startTime: '13:30', endTime: '15:30', subjectCode: 'CE204L', subjectName: 'Surveying Total Station Fieldwork', instructor: 'Prof. Harish Nair', roomNumber: 'Seminar Annex', classSection: 'CIVIL-A' },

      // Tuesday
      { id: 'civ-tu1', day: 'Tuesday', startTime: '08:30', endTime: '09:30', subjectCode: 'CE203', subjectName: 'Fluid Mechanics in Open Channels', instructor: 'Prof. Rekha Sharma', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-tu2', day: 'Tuesday', startTime: '09:30', endTime: '10:30', subjectCode: 'CE201', subjectName: 'Structural Mechanics I', instructor: 'Dr. B. Sengupta', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-tu3', day: 'Tuesday', startTime: '10:45', endTime: '11:45', subjectCode: 'CE205', subjectName: 'Building Materials & Concrete Tech', instructor: 'Dr. Sandeep Paul', roomNumber: 'IST 612', classSection: 'CIVIL-A' },

      // Wednesday
      { id: 'civ-w1', day: 'Wednesday', startTime: '08:30', endTime: '09:30', subjectCode: 'CE202', subjectName: 'Surveying & Geomatics', instructor: 'Prof. Harish Nair', roomNumber: 'IST 416', classSection: 'CIVIL-A' },
      { id: 'civ-w2', day: 'Wednesday', startTime: '09:30', endTime: '10:30', subjectCode: 'CE205', subjectName: 'Building Materials & Concrete Tech', instructor: 'Dr. Sandeep Paul', roomNumber: 'IST 416', classSection: 'CIVIL-A' },
      { id: 'civ-w3', day: 'Wednesday', startTime: '10:45', endTime: '11:45', subjectCode: 'CE201', subjectName: 'Structural Mechanics I', instructor: 'Dr. B. Sengupta', roomNumber: 'IST 416', classSection: 'CIVIL-A' },
      { id: 'civ-w4', day: 'Wednesday', startTime: '13:30', endTime: '15:30', subjectCode: 'CE206L', subjectName: 'Concrete & Strength of Materials Lab', instructor: 'Dr. Sandeep Paul', roomNumber: 'Seminar Annex', classSection: 'CIVIL-A' },

      // Thursday
      { id: 'civ-th1', day: 'Thursday', startTime: '08:30', endTime: '09:30', subjectCode: 'CE205', subjectName: 'Building Materials & Concrete Tech', instructor: 'Dr. Sandeep Paul', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-th2', day: 'Thursday', startTime: '09:30', endTime: '10:30', subjectCode: 'CE203', subjectName: 'Fluid Mechanics in Open Channels', instructor: 'Prof. Rekha Sharma', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-th3', day: 'Thursday', startTime: '10:45', endTime: '11:45', subjectCode: 'CE202', subjectName: 'Surveying & Geomatics', instructor: 'Prof. Harish Nair', roomNumber: 'IST 612', classSection: 'CIVIL-A' },

      // Friday
      { id: 'civ-f1', day: 'Friday', startTime: '08:30', endTime: '09:30', subjectCode: 'CE201', subjectName: 'Structural Mechanics I', instructor: 'Dr. B. Sengupta', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-f2', day: 'Friday', startTime: '09:30', endTime: '10:30', subjectCode: 'CE202', subjectName: 'Surveying & Geomatics', instructor: 'Prof. Harish Nair', roomNumber: 'IST 612', classSection: 'CIVIL-A' },
      { id: 'civ-f3', day: 'Friday', startTime: '10:45', endTime: '11:45', subjectCode: 'CE205', subjectName: 'Building Materials & Concrete Tech', instructor: 'Dr. Sandeep Paul', roomNumber: 'IST 612', classSection: 'CIVIL-A' },

      // Saturday
      { id: 'civ-sa1', day: 'Saturday', startTime: '09:00', endTime: '11:00', subjectCode: 'CE207', subjectName: 'Smart Cities & Urban Design Seminar', instructor: 'Dr. B. Sengupta', roomNumber: 'IST 401', classSection: 'CIVIL-A' }
    ]
  },

  // 9. MBA-A
  {
    id: 'tt-mba-a',
    classSection: 'MBA-A (School of Management - Batch 2026)',
    department: 'Graduate School of Business',
    semester: 'Trimester 2',
    totalStudents: 70,
    slots: [
      // Monday
      { id: 'mba-m1', day: 'Monday', startTime: '09:30', endTime: '11:00', subjectCode: 'MB601', subjectName: 'Corporate Finance & Valuation', instructor: 'Prof. Edward Sterling', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-m2', day: 'Monday', startTime: '11:15', endTime: '12:45', subjectCode: 'MB602', subjectName: 'Strategic Marketing & Consumer Insights', instructor: 'Dr. Nalini Swaminathan', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-m3', day: 'Monday', startTime: '14:00', endTime: '16:00', subjectCode: 'MB603', subjectName: 'Executive Leadership Workshop', instructor: 'Dean Marcus Cole', roomNumber: 'IST 601', classSection: 'MBA-A' },

      // Tuesday
      { id: 'mba-tu1', day: 'Tuesday', startTime: '09:30', endTime: '11:00', subjectCode: 'MB604', subjectName: 'Organizational Behavior & Negotiation', instructor: 'Prof. Sarah Jennings', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-tu2', day: 'Tuesday', startTime: '11:15', endTime: '12:45', subjectCode: 'MB601', subjectName: 'Corporate Finance & Valuation', instructor: 'Prof. Edward Sterling', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-tu3', day: 'Tuesday', startTime: '13:30', endTime: '15:00', subjectCode: 'MB605', subjectName: 'Business Analytics & Decision Models', instructor: 'Dr. Arun Balaji', roomNumber: 'IST 503', classSection: 'MBA-A' },

      // Wednesday
      { id: 'mba-w1', day: 'Wednesday', startTime: '09:30', endTime: '11:00', subjectCode: 'MB602', subjectName: 'Strategic Marketing & Consumer Insights', instructor: 'Dr. Nalini Swaminathan', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-w2', day: 'Wednesday', startTime: '11:15', endTime: '12:45', subjectCode: 'MB604', subjectName: 'Organizational Behavior & Negotiation', instructor: 'Prof. Sarah Jennings', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-w3', day: 'Wednesday', startTime: '13:30', endTime: '15:30', subjectCode: 'MB606', subjectName: 'Harvard Business Case Studies Forum', instructor: 'Dean Marcus Cole', roomNumber: 'IST 601', classSection: 'MBA-A' },

      // Thursday
      { id: 'mba-th1', day: 'Thursday', startTime: '09:30', endTime: '11:00', subjectCode: 'MB605', subjectName: 'Business Analytics & Decision Models', instructor: 'Dr. Arun Balaji', roomNumber: 'IST 401', classSection: 'MBA-A' },
      { id: 'mba-th2', day: 'Thursday', startTime: '11:15', endTime: '12:45', subjectCode: 'MB601', subjectName: 'Corporate Finance & Valuation', instructor: 'Prof. Edward Sterling', roomNumber: 'IST 401', classSection: 'MBA-A' },
      { id: 'mba-th3', day: 'Thursday', startTime: '14:00', endTime: '16:00', subjectCode: 'MB607', subjectName: 'Venture Capital Pitch Deck Critiques', instructor: 'Guest Angel Investors', roomNumber: 'IST 501', classSection: 'MBA-A' },

      // Friday
      { id: 'mba-f1', day: 'Friday', startTime: '09:30', endTime: '11:00', subjectCode: 'MB604', subjectName: 'Organizational Behavior & Negotiation', instructor: 'Prof. Sarah Jennings', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-f2', day: 'Friday', startTime: '11:15', endTime: '12:45', subjectCode: 'MB602', subjectName: 'Strategic Marketing & Consumer Insights', instructor: 'Dr. Nalini Swaminathan', roomNumber: 'IST 503', classSection: 'MBA-A' },
      { id: 'mba-f3', day: 'Friday', startTime: '14:00', endTime: '16:30', subjectCode: 'MB608', subjectName: 'Global Supply Chains & Logistics', instructor: 'Prof. Edward Sterling', roomNumber: 'IST 601', classSection: 'MBA-A' },

      // Saturday
      { id: 'mba-sa1', day: 'Saturday', startTime: '10:00', endTime: '13:00', subjectCode: 'MB609', subjectName: 'CEO Roundtable & Networking Lunch', instructor: 'Industry Board', roomNumber: 'IST 601', classSection: 'MBA-A' }
    ]
  },

  // 10. DESIGN-A
  {
    id: 'tt-design-a',
    classSection: 'DESIGN-A (B.Des Interaction Design - Year 2)',
    department: 'School of Design & Creative Arts',
    semester: 'Semester 3',
    totalStudents: 42,
    slots: [
      // Monday
      { id: 'des-m1', day: 'Monday', startTime: '08:30', endTime: '10:30', subjectCode: 'DES201', subjectName: 'Design Thinking & User Research', instructor: 'Prof. Leila Morales', roomNumber: 'IST 211', classSection: 'DESIGN-A' },
      { id: 'des-m2', day: 'Monday', startTime: '10:45', endTime: '12:45', subjectCode: 'DES202', subjectName: 'Typography & Information Architecture', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 211', classSection: 'DESIGN-A' },
      { id: 'des-m3', day: 'Monday', startTime: '13:30', endTime: '15:30', subjectCode: 'DES203L', subjectName: 'Figma UI/UX Prototyping Studio', instructor: 'Prof. Leila Morales', roomNumber: 'IST 612', classSection: 'DESIGN-A' },

      // Tuesday
      { id: 'des-tu1', day: 'Tuesday', startTime: '08:30', endTime: '10:30', subjectCode: 'DES204', subjectName: 'Physical Computing & Arduino Prototyping', instructor: 'Dr. Leo Vance', roomNumber: 'IST 211', classSection: 'DESIGN-A' },
      { id: 'des-tu2', day: 'Tuesday', startTime: '10:45', endTime: '12:45', subjectCode: 'DES201', subjectName: 'Design Thinking & User Research', instructor: 'Prof. Leila Morales', roomNumber: 'IST 211', classSection: 'DESIGN-A' },
      { id: 'des-tu3', day: 'Tuesday', startTime: '13:30', endTime: '15:30', subjectCode: 'DES205L', subjectName: 'Color Theory & Visual Systems', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 612', classSection: 'DESIGN-A' },

      // Wednesday
      { id: 'des-w1', day: 'Wednesday', startTime: '08:30', endTime: '10:30', subjectCode: 'DES202', subjectName: 'Typography & Information Architecture', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 201', classSection: 'DESIGN-A' },
      { id: 'des-w2', day: 'Wednesday', startTime: '10:45', endTime: '12:45', subjectCode: 'DES203L', subjectName: 'Figma UI/UX Prototyping Studio', instructor: 'Prof. Leila Morales', roomNumber: 'IST 612', classSection: 'DESIGN-A' },
      { id: 'des-w3', day: 'Wednesday', startTime: '13:30', endTime: '15:30', subjectCode: 'DES206', subjectName: 'Interaction Heuristics Critique', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 211', classSection: 'DESIGN-A' },

      // Thursday
      { id: 'des-th1', day: 'Thursday', startTime: '08:30', endTime: '10:30', subjectCode: 'DES204', subjectName: 'Physical Computing & Arduino Prototyping', instructor: 'Dr. Leo Vance', roomNumber: 'IST 201', classSection: 'DESIGN-A' },
      { id: 'des-th2', day: 'Thursday', startTime: '10:45', endTime: '12:45', subjectCode: 'DES207L', subjectName: 'User Usability Testing Lab', instructor: 'Prof. Leila Morales', roomNumber: 'IST 416', classSection: 'DESIGN-A' },
      { id: 'des-th3', day: 'Thursday', startTime: '13:30', endTime: '15:30', subjectCode: 'DES208', subjectName: 'Design Systems for Web & Mobile', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 201', classSection: 'DESIGN-A' },

      // Friday
      { id: 'des-f1', day: 'Friday', startTime: '08:30', endTime: '10:30', subjectCode: 'DES201', subjectName: 'Design Thinking & User Research', instructor: 'Prof. Leila Morales', roomNumber: 'IST 201', classSection: 'DESIGN-A' },
      { id: 'des-f2', day: 'Friday', startTime: '10:45', endTime: '12:45', subjectCode: 'DES208', subjectName: 'Design Systems for Web & Mobile', instructor: 'Prof. Akira Tanaka', roomNumber: 'IST 416', classSection: 'DESIGN-A' },
      { id: 'des-f3', day: 'Friday', startTime: '13:30', endTime: '16:00', subjectCode: 'DES209', subjectName: 'End-of-Week Design Critique Showcase', instructor: 'Panel of Designers', roomNumber: 'IST 501', classSection: 'DESIGN-A' },

      // Saturday
      { id: 'des-sa1', day: 'Saturday', startTime: '10:00', endTime: '13:00', subjectCode: 'DES210', subjectName: 'Creative Portfolio Build Marathon', instructor: 'Prof. Leila Morales', roomNumber: 'IST 201', classSection: 'DESIGN-A' }
    ]
  }
];
