export interface IScholarDetails {
    studentId: string,
    studentName: string,
    scholarshipId: string,
    scholarshipName: string,
    rewardAmount: number | string,
    renewable: string,
    timeline: string[],
    criteria: {
      studentMajor: string,
      needOrMerit: string,
      residency: string,
      gpa: string
    }
}
