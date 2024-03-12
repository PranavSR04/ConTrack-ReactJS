export interface NotificationType{
    log_id: number;
    contract_id: number | null;
    msa_id: number | null;
    client_name:string;
    performed_by: number | null;
    action: string;
    updated_at:Date;
    
}