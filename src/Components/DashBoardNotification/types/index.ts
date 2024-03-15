export interface NotificationType{
    log_id: number;
    contract_ref_id: number | null;
    msa_ref_id: number | null;
    client_name:string;
    performed_by: number | null;
    action: string;
    updated_at:Date;
    
}
export interface DashBoardNotificationPropType {
    notification: NotificationType;
    difference: string;
}
export interface DashBoardNotificationHandlerPropType {
    notification: NotificationType;
}