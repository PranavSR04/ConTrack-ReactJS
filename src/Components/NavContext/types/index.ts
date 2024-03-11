export type NavPropType={
    showDrawer:()=>void;
    open:boolean;
    onClose:()=>void;
    setActiveNotificationCount:React.Dispatch<React.SetStateAction<number>>
    activeNotificationCount:number ;


}