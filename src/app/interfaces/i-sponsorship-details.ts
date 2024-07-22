export interface ISponsorshipDetails {
  scholarshipId: string;
  scholarshipName: string;
  totalAmount: number | string;
  awardedAmount: number | string;
  renewable: string;
  timeline: string;
  criteria: ISponsorCriteria;
}

export interface ISponsorCriteria {
  level: string[];
  major: string[];
  gpa: string;
  needOrMerit: string;
  state: string;
  county?: string[];
}
