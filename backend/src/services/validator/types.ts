export interface StudentRow {
  enroll_no: string;
  roll_no: string;
  name: string;
  attendance: number | string | null;
  marks: number | string | null;
  feesPaid?: number | string | null;  // not coming from CSV right now
  subject?: string;                   // ✅ actually present in CSV now
}
