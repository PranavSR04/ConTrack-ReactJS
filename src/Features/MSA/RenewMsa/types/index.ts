import { Moment } from "moment";

export interface LocationStateProps {
    id: string;
}

export interface RenewMsaPropType{
    msa_ref_id: string|undefined
    fileName: string|undefined
    region: string | undefined
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleStartDateChange: (date: Moment | null, dateString: string | string[]) => void
    handleEndDateChange: (date: Moment | null, dateString: string | string[]) => void
    handleFileUpload: (info: any) => void
    submitRenewMsa: () => Promise<void>
    visible: boolean
    onCancel: () => void
    modalPopUp: () => void
    isFormFilled: () => boolean
}

export interface RenewMsaModalPropsType{
    visible: boolean;
    onCancel: ()=>void;
    submitRenewMsa: ()=>void;
}