export type CriticalStudent = {
  id: string;
  name: string;
  email: string;
  status: 'At Risk'; // Status is always 'At Risk' for this list
  issue: string; // The new field you suggested
  metrics: {
    attendance: number;
    grade: string;
    pendingReports: number;
  };
  gradeHistory: { month: string; grade: number }[];
  activityFeed: {
    date: string;
    description: string;
    type: 'alert' | 'warning' | 'info';
  }[];
};

export const studentNeedingAttention : CriticalStudent[] = [
  // 1. The Low Attendance Case
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    status: 'At Risk',
    issue: 'Low Attendance',
    metrics: {
      attendance: 78,
      grade: 'C+ (58%)',
      pendingReports: 1,
    },
    gradeHistory: [
      { month: 'July', grade: 68 }, { month: 'August', grade: 62 }, { month: 'September', grade: 58 },
    ],
    activityFeed: [
      { date: 'September 15, 2025', description: 'Missed Physics Class', type: 'alert' },
      { date: 'September 12, 2025', description: 'Missed Scheduled Check-in', type: 'warning' },
    ],
  },
  // 2. The Failing Grades Case
  {
    id: '2',
    name: 'Arjun Singh',
    email: 'arjun.singh@example.com',
    status: 'At Risk',
    issue: 'Failing Grades',
    metrics: {
      attendance: 95,
      grade: 'F (45%)',
      pendingReports: 0,
    },
    gradeHistory: [
      { month: 'July', grade: 75 }, { month: 'August', grade: 72 }, { month: 'September', grade: 45 },
    ],
    activityFeed: [
      { date: 'September 16, 2025', description: 'Failed Mid-term Exam (45%)', type: 'alert' },
      { date: 'September 10, 2025', description: 'Attendance has been good', type: 'info' },
    ],
  },
  // 3. The Missed Deadlines Case
  {
    id: '3',
    name: 'Divya Reddy',
    email: 'divya.reddy@example.com',
    status: 'At Risk',
    issue: 'Multiple Missed Deadlines',
    metrics: {
      attendance: 85,
      grade: 'B (82%)',
      pendingReports: 3,
    },
    gradeHistory: [
      { month: 'July', grade: 80 }, { month: 'August', grade: 85 }, { month: 'September', grade: 82 },
    ],
    activityFeed: [
      { date: 'September 14, 2025', description: 'Project proposal overdue', type: 'warning' },
      { date: 'September 13, 2025', description: 'Missed assignment deadline', type: 'warning' },
    ],
  },
    // 4. The Disengaged Case
  {
    id: '4',
    name: 'Vikram Kumar',
    email: 'vikram.kumar@example.com',
    status: 'At Risk',
    issue: 'Disengaged',
    metrics: {
      attendance: 88,
      grade: 'B- (75%)',
      pendingReports: 1,
    },
    gradeHistory: [
      { month: 'July', grade: 85 }, { month: 'August', grade: 80 }, { month: 'September', grade: 75 },
    ],
    activityFeed: [
        { date: 'September 12, 2025', description: 'No response to mentor messages', type: 'warning' },
        { date: 'September 9, 2025', description: 'Last login: 10 days ago', type: 'alert' },
    ],
  },
];

// export type Student = {
//   student_id: string;
//   name: string;
//   subject1: number; // e.g., Physics
//   subject2: number; // e.g., Chemistry
//   subject3: number; // e.g., Maths
//   feeStatus: 'Paid' | 'Overdue';
//   attendance: number;
//   status: 'good' | 'At Risk' | 'Improving';
// };

// export const studentsData: Student[] = [
//   // 1. Good in one subject, failing another
//   {
//     student_id: 'S001',
//     name: 'Priya Sharma',
//     subject1: 92, // Excels here
//     subject2: 45, // Failing
//     subject3: 55,
//     feeStatus: 'Paid',
//     attendance: 85,
//     status: 'At Risk',
//   },
//   // 2. The consistent high-performer
//   {
//     student_id: 'S002',
//     name: 'Rohan Verma',
//     subject1: 88,
//     subject2: 91,
//     subject3: 85,
//     feeStatus: 'Paid',
//     attendance: 98,
//     status: 'Improving',
//   },
//   // 3. The student who is struggling overall
//   {
//     student_id: 'S003',
//     name: 'Anjali Mehta',
//     subject1: 40, // Failing
//     subject2: 52,
//     subject3: 35, // Failing
//     feeStatus: 'Overdue',
//     attendance: 72, // Low attendance,
//     status: 'At Risk',
//   },
//   // 4. The average, but inconsistent, student
//   {
//     student_id: 'S004',
//     name: 'Sameer Khan',
//     subject1: 75,
//     subject2: 65,
//     subject3: 80,
//     feeStatus: 'Paid',
//     attendance: 91,
//     status: 'good',
//   },
// ];

export type Student = {
    id: string;
    name: string;
    credentials: {
        email: string;
        phone: string;
        guardian_no: string;
    }
    mentorId: string;
    subjects: {
        subject_name: string;
        marks: number;
        attendance: number; // Corrected from 'atterdance'
    }[],
    avg_marks?: number; // Optional average marks field
    avg_attendance?: number; // Optional average attendance field
    feeStatus: {
        last_submission: string; // Using YYYY-MM-DD format
        status: boolean; // true = paid, false = overdue
    }
    status: 'good' | 'At Risk' | 'Improving';
    messages: string;
};

export const studentsData: Student[] = [
    {
        id: 'ST-001',
        name: 'Aarav Sharma',
        credentials: { email: 'aarav.s@example.com', phone: '9876543210', guardian_no: '9876543211' },
        mentorId: 'M-01',
        subjects: [
            { subject_name: 'Physics', marks: 45, attendance: 72 },
            { subject_name: 'Chemistry', marks: 35, attendance: 85 },
            { subject_name: 'Maths', marks: 55, attendance: 80 },
        ],
        avg_marks: 45,
        avg_attendance: 79,
        feeStatus: { last_submission: '2025-08-15', status: true },
        status: 'At Risk',
        messages: 'Low marks & attendance in Physics.',
    },
    {
        id: 'ST-002',
        name: 'Vivaan Singh',
        credentials: { email: 'vivaan.s@example.com', phone: '9876543212', guardian_no: '9876543213' },
        mentorId: 'M-01',
        subjects: [
            { subject_name: 'Physics', marks: 88, attendance: 95 },
            { subject_name: 'Chemistry', marks: 92, attendance: 98 },
            { subject_name: 'English', marks: 85, attendance: 96 },
        ],
        avg_marks: 88.33,
        avg_attendance: 96.33,
        feeStatus: { last_submission: '2025-08-12', status: true },
        status: 'good',
        messages: 'Consistent top performer.',
    },
    {
        id: 'ST-003',
        name: 'Aditya Kumar',
        credentials: { email: 'aditya.k@example.com', phone: '9876543214', guardian_no: '9876543215' },
        mentorId: 'M-02',
        subjects: [
            { subject_name: 'Computer Science', marks: 78, attendance: 85 },
            { subject_name: 'Maths', marks: 65, attendance: 74 },
            { subject_name: 'Physics', marks: 71, attendance: 88 },
        ],
        avg_marks: 71.33,
        avg_attendance: 82.33,
        feeStatus: { last_submission: '2025-07-20', status: false },
        status: 'At Risk',
        messages: 'Fee payment is overdue.',
    },
    {
        id: 'ST-004',
        name: 'Arjun Reddy',
        credentials: { email: 'arjun.r@example.com', phone: '9876543216', guardian_no: '9876543217' },
        mentorId: 'M-02',
        subjects: [
            { subject_name: 'Chemistry', marks: 58, attendance: 90 },
            { subject_name: 'Maths', marks: 62, attendance: 92 },
            { subject_name: 'English', marks: 75, attendance: 95 },
        ],
        avg_marks: 65,
        avg_attendance: 92.33,
        feeStatus: { last_submission: '2025-08-18', status: true },
        status: 'Improving',
        messages: 'Marks improving after last review.',
    },
    {
        id: 'ST-005',
        name: 'Diya Patel',
        credentials: { email: 'diya.p@example.com', phone: '9876543218', guardian_no: '9876543219' },
        mentorId: 'M-03',
        subjects: [
            { subject_name: 'Physics', marks: 95, attendance: 99 },
            { subject_name: 'Computer Science', marks: 98, attendance: 100 },
            { subject_name: 'Maths', marks: 92, attendance: 97 },
        ],
        avg_marks: 95,
        avg_attendance: 98.67,
        feeStatus: { last_submission: '2025-08-11', status: true },
        status: 'good',
        messages: 'Excellent academic record.',
    },
    {
        id: 'ST-006',
        name: 'Ishaan Gupta',
        credentials: { email: 'ishaan.g@example.com', phone: '9876543220', guardian_no: '9876543221' },
        mentorId: 'M-01',
        subjects: [
            { subject_name: 'Physics', marks: 68, attendance: 85 },
            { subject_name: 'Chemistry', marks: 72, attendance: 88 },
            { subject_name: 'Maths', marks: 65, attendance: 82 },
        ],
        avg_marks: 68.33,
        avg_attendance: 85,
        feeStatus: { last_submission: '2025-08-14', status: true },
        status: 'good',
        messages: 'Stable performance.',
    },
    {
        id: 'ST-007',
        name: 'Kavya Mishra',
        credentials: { email: 'kavya.m@example.com', phone: '9876543222', guardian_no: '9876543223' },
        mentorId: 'M-02',
        subjects: [
            { subject_name: 'English', marks: 80, attendance: 90 },
            { subject_name: 'Computer Science', marks: 75, attendance: 71 },
            { subject_name: 'Maths', marks: 78, attendance: 85 },
        ],
        avg_marks: 77.67,
        avg_attendance: 82,
        feeStatus: { last_submission: '2025-08-19', status: true },
        status: 'At Risk',
        messages: 'Low attendance in Computer Science.',
    },
    {
        id: 'ST-008',
        name: 'Mohammed Ali',
        credentials: { email: 'mohammed.a@example.com', phone: '9876543224', guardian_no: '9876543225' },
        mentorId: 'M-03',
        subjects: [
            { subject_name: 'Physics', marks: 55, attendance: 80 },
            { subject_name: 'Chemistry', marks: 60, attendance: 82 },
            { subject_name: 'Maths', marks: 58, attendance: 79 },
        ],
        avg_marks: 57.67,
        avg_attendance: 80.33,
        feeStatus: { last_submission: '2025-08-05', status: true },
        status: 'Improving',
        messages: 'Showing steady improvement.',
    },
    {
        id: 'ST-009',
        name: 'Priya Nair',
        credentials: { email: 'priya.n@example.com', phone: '9876543226', guardian_no: '9876543227' },
        mentorId: 'M-01',
        subjects: [
            { subject_name: 'English', marks: 65, attendance: 92 },
            { subject_name: 'Physics', marks: 52, attendance: 88 },
            { subject_name: 'Chemistry', marks: 48, attendance: 85 },
        ],
        avg_marks: 55,
        avg_attendance: 88.33,
        feeStatus: { last_submission: '2025-07-10', status: false },
        status: 'At Risk',
        messages: 'Degrading marks in Chemistry & fee overdue.',
    },
    {
        id: 'ST-010',
        name: 'Rohan Joshi',
        credentials: { email: 'rohan.j@example.com', phone: '9876543228', guardian_no: '98765-43229' },
        mentorId: 'M-03',
        subjects: [
            { subject_name: 'Maths', marks: 90, attendance: 95 },
            { subject_name: 'Computer Science', marks: 85, attendance: 92 },
            { subject_name: 'Physics', marks: 88, attendance: 94 },
        ],
        avg_marks: 87.67,
        avg_attendance: 93.67,
        feeStatus: { last_submission: '2025-08-20', status: true },
        status: 'good',
        messages: 'No issues reported.',
    },
];