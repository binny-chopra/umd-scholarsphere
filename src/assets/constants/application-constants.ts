export class ApplicationConstants {
  public static NA_STRING: string = 'NA';
  public static STRING: string = 'string';
  public static NUMBER: string = 'number';
  public static SCHOLARSHIP_SPHERE: string = 'Scholarship Sphere';
  public static SUBMIT: string = 'Submit';
  public static SPONSORS: string = 'Sponsors';
  public static SCHOLARS: string = 'Scholars';
  public static STUDENT_APPLICANTS: string = 'Student Applicants';
  public static CLEAR: string = 'Clear';
  public static CLOSE: string = 'Close';
  public static ADD_NEW_SCHOLAR: string = 'Add New Scholar';
  public static ADD_NEW_SPONSOR: string = 'Add New Sponsor';
  public static FILTER: string = 'Filter';
  public static FILTER_EX: string = 'Ex. Robert';
  public static FILTER_NO_DATA: string = 'No data matching the filter';
  public static UID: string = 'UID';
  public static STUDENT_ID: string = 'Student ID';
  public static STUDENT_NAME: string = 'Student Name';
  public static SCHOLARSHIP_ID: string = 'Scholarship ID';
  public static SCHOLARSHIP_NAME: string = 'Scholarship Name';
  public static TOTAL_AMOUNT: string = 'Total Amount';
  public static AWARDED_AMOUNT: string = 'Awarded Amount';
  public static REWARD_AMOUNT: string = 'Reward Amount';
  public static RENEWABLE: string = 'Renewable';
  public static TIMELINE: string = 'Timeline';
  public static START_DATE: string = 'Start Date';
  public static END_DATE: string = 'End Date';
  public static LEVEL: string = 'Level';
  public static MAJOR: string = 'Major';
  public static GPA: string = 'GPA';
  public static NEED_OR_MERIT: string = 'Need or Merit';
  public static RESIDENCY: string = 'Residency';
  public static STATE: string = 'State';
  public static COUNTY: string = 'County';
  public static MAJORITY_CLASSES: string = 'Majority Classes';
  public static EMAIL: string = 'Email';
  public static GRAD_DATE: string = 'Graduation Date';
  public static APP_DATE: string = 'Application Date';

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
    STATE: 'state',
    COUNTY: 'county',
    GPA: 'gpa',
  };

  public static STUDENT_APPLICANT_DETAILS = {
    STUDENT_ID: 'studentId',
    STUDENT_NAME: 'studentName',
    STUDENT_EMAIL: 'studentEmail',
    STUDENT_MAJOR: 'studentMajor',
    GRAD_DATE: 'gradDate',
    MAJORITY_CLASSES: 'majorityClasses',
    STATE: 'state',
    COUNTY: 'county',
    GPA: 'gpa',
    TIMESTAMP: 'timestamp'
  };

  public static QUES_FOR_CANDIDATE: { [key: string]: string }[] = [
    {
      question:
        'Thinking about your personal strengths, in 4-5 sentences, describe what sets you apart as a Smith student.',
      field: 'personalStatement',
    },
    {
      question: 'Describe why you chose to study business.',
      field: 'whyBusiness',
    },
    { question: 'What are your career plans?', field: 'careerPlans' },
    {
      question: 'Please list your honors and/or awards.',
      field: 'honorsOrAwards',
    },
    {
      question: 'Please list your non-Smith extra-curricular activities.',
      field: 'extracurricular',
    },
  ];

  public static SCHOLAR_CRITERIA = {
    STUDENT_MAJOR: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.STUDENT_MAJOR}`,
    NEED_OR_MERIT: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.NEED_OR_MERIT}`,
    STATE: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.STATE}`,
    COUNTY: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.COUNTY}`,
    GPA: `criteria.${ApplicationConstants.SCHOLAR_DETAILS.GPA}`,
  };

  public static YES_NO: string[] = ['Yes', 'No'];
  public static COURSE_LEVEL: string[] = ['UG', 'PG', 'PhD'];
  public static NEED_MERIT: string[] = ['Need', 'Merit', 'Both'];
  public static MAJORS: string[] = [
    'All',
    'Accounting',
    'Supply Chain Management',
    'Information Systems',
    'Business Analytics',
  ];
}
