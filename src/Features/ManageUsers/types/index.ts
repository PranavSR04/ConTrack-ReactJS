import { DebouncedFunc } from "lodash"

export interface ManageUsersPropType{
   handleAddUser: () => void
   showDeleteConfirmation: (record: User) => void
   setDeleteConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>
   hideDeleteConfirmation: () => void
   handleDelete: (selectedUser:User) => Promise<void>
   setDataSource: React.Dispatch<React.SetStateAction<User[]>>
   handleSearch: (value: string) => void
   setUserUpdated: React.Dispatch<React.SetStateAction<boolean>>
   showUpdateChoice: (record: User) => void
   handlePageChange: (pagination: any) => void
   handleEditModalCancel: () => void
   handleUpdateUser: (selectedRoleId: number | undefined) => Promise<void>
   rowClassName: (record: User, index: number) => string
   debouncedFetchData: DebouncedFunc<(searchValue: string) => Promise<void>>
   onSelectEmployee: (data: string) => void
   getEmployee: (value: string) => void
   setDropdownOptions: React.Dispatch<React.SetStateAction<{
      value: string;
  }[]>>
  setSelectedRoleId: React.Dispatch<React.SetStateAction<number | undefined>>
  columns: TableColumn[]
  dropdownOptions: {
   value: string;
}[]
   roleOptions: RoleOption[]
   dataSource: User[]
   pagination: {
      current: number;
      pageSize: number;
      total: number;
  }
  editModalVisible: boolean
  selectedRoleId: number | undefined
  deleteConfirmationVisible: boolean
  selectedUser: User | null

}

export interface ManageUserHandlerPropType{

}

export interface User {
    id: number;
    user_name: string;
    role_access: string;
    contracts_count: number;
  }
  
 export interface Employee {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
  }
  
 export interface TableColumn {
    title: JSX.Element;
    dataIndex: string;
    sorter?: false | ((a: any, b: any) => number);
    width?: number | undefined;
  }
  
 export interface ActionColumn {
    title: JSX.Element;
    dataIndex: string;
    render: (_: any, record: User) => JSX.Element;
  }
  
 export interface RoleOption {
    value: number;
    label:string;
  }

 export interface DeleteConfirmationProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    userName: string;
  }
 
 export interface UpdateModalProps {
    visible: boolean;
    onCancel: () => void;
    updateUser: () => void;
 }