export interface Milestone {
  milestones: string | null;
  expectedCompletionDate: Date | null;
  paymentPercentage?: number | null;
  paymentAmount: number | null;
}

export interface ContractDetails {
  clientName: string;
  contractId: string;
  region: string;
  du: string;
  startDate: string;
  endDate: string;
  dateOfSignature: string;
  contractType: string | null;
  totalContractValue: number | null;
  milestones: Milestone[];
  associatedMembers: string[];
  workSchedule: File | null;
  commentsRemarks: string | null;
}
