export class ApplicationConstants {
  public static NA_STRING: string = 'NA';
  public static STRING: string = 'string';
  public static NUMBER: string = 'number';

  public static SPONSOR_DETAILS = {
    SCHOLARSHIP_ID: 'scholarshipId',
    SCHOLARSHIP_NAME: 'scholarshipName',
    TOTAL_AMOUNT: 'totalAmount',
    AWARDED_AMOUNT: 'awardedAmount',
    RENEWABLE: 'renewable',
    TIMELINE: 'timeline',
    LEVEL: 'level',
    MAJOR: 'major',
    GPA: 'gpa',
    NEED_OR_MERIT: 'needOrMerit',
    STATE: 'state',
    COUNTY: 'county',
  };

  public static SPONSOR_CRITERIA = {
    LEVEL: `criteria.${ApplicationConstants.SPONSOR_DETAILS.LEVEL}`,
    MAJOR: `criteria.${ApplicationConstants.SPONSOR_DETAILS.MAJOR}`,
    GPA: `criteria.${ApplicationConstants.SPONSOR_DETAILS.GPA}`,
    NEED_OR_MERIT: `criteria.${ApplicationConstants.SPONSOR_DETAILS.NEED_OR_MERIT}`,
    STATE: `criteria.${ApplicationConstants.SPONSOR_DETAILS.STATE}`,
    COUNTY: `criteria.${ApplicationConstants.SPONSOR_DETAILS.COUNTY}`,
  };

  public static SCHOLAR_DETAILS = {
    STUDENT_ID: 'studentId',
    STUDENT_NAME: 'studentName',
    SCHOLARSHIP_ID: 'scholarshipId',
    SCHOLARSHIP_NAME: 'scholarshipName',
    REWARD_AMOUNT: 'rewardAmount',
    RENEWABLE: 'renewable',
    TIMELINE: 'timeline',
    STUDENT_MAJOR: 'studentMajor',
    NEED_OR_MERIT: 'needOrMerit',
    RESIDENCY: 'residency',
    GPA: 'gpa'
  };

  public static SCHOLAR_CRITERIA = {
    STUDENT_MAJOR: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.STUDENT_MAJOR}`,
    NEED_OR_MERIT: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.NEED_OR_MERIT}`,
    RESIDENCY: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.RESIDENCY}`,
    GPA: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.GPA}`
  };
}
