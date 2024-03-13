export interface RcFile extends File {
  uid: string;
}

export interface Milestone {
  milestones: string | null;
  expectedCompletionDate: Date | null;
  percentage?: number | null;
  amount: number | null;
}

export interface ContractDetails {
  msa_id: string;
  clientName: string;
  contract_ref_id: string;
  region: string;
  du: string;
  start_date: string;
  end_date: string;
  date_of_signature: string;
  contract_type: 'FF' | 'TM' ;
  milestone: Milestone[];
  associatedMembers: string[];
  file: RcFile | null;
  comments: string | null;
  estimated_amount: number | null;
  contract_added_by: number;
}
