import React,{useRef} from "react";
import { useEffect, useState } from "react";
import axios,{AxiosResponse,AxiosPromise,AxiosError} from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { debounce } from 'lodash';
import { TableColumn, User, RoleOption, ActionColumn, Employee } from "./types";
import ManageUsers from "./ManageUsers";
import userTableStyles from './ManagerUsers.module.css'
import { getUserList } from "./api/getUserList";
import { getEmployeeList } from "./api/getEmployeeList";
import { getRolesList } from "./api/getRolesList";
import { addUser } from "./api/postAddUser";
import { deleteUser } from "./api/putDeleteUser";
import { updateUser } from "./api/putUpdateUser";
import Swal,{SweetAlertCustomClass } from 'sweetalert2';
import Toast from "../../Components/Toast/Toast";
import { message } from "antd";

const ManageUsersHandler = () => {

  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [dataSource, setDataSource] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [roleOptions, setRoleOptions] = useState<RoleOption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchEmployee, setSearchEmployee] = useState("")
  const [dropdownOptions, setDropdownOptions] = useState<{ value: string }[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>(undefined);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | undefined>(undefined);
  const [userAdded, setUserAdded]=useState<boolean>(false)
  const [userUpdated, setUserUpdated]=useState<boolean>(false)
  const [userDeleted, setUserDeleted]=useState<boolean>(false)
  const [showToast, setShowToast] = useState(false);
  const [emptyUserToast, setEmptyUserToast] = useState(false);
  const [employeeNotFoundToast, setEmployeeNotFoundToast]=useState<boolean>(false)


  const render=useRef(true);
  const [updateUserId, setupdateUserId] = useState<number | undefined>(undefined);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
  });

  const [userToBeUpdated,setUserToBeUpdated]=useState<string>("")

  //To list the users in the table 
  const fetchUserData = async (page :number , pageSize :number ,searchQuery1?:string) => {
    try {
      setLoading(true)
      const response =await getUserList(pagination.current, pagination.pageSize,searchQuery1)
      const result = response.data;
      console.log(result);
      console.log('parameter', searchQuery)
      console.log('Entire response', response); // Log the entire response to inspect its structure
      console.log("page total", response.data.data.total); 
      if (result.data.data.length=== 0) {
        // If the data array is empty, display a toast
        setEmptyUserToast(true);
        setTimeout(() => {
          setEmptyUserToast(false);
        }, 5000);
      } else {
        setEmptyUserToast(false);
      }
      setPagination({
        ...pagination,
        total: response.data.data.total
      });

      // setUserUpdated(false)

      const list: User[] = result.data.data || [];
      //Storing the first user to get the columns title
      const firstObject: User = list[0] || {};
      const cols: TableColumn[] = [];

      for (const key in firstObject) {
        // Customize column titles based on the 'key'
        let customTitle: string;
        //Not to display ID in the table
        if (key !== "id") { 
          switch (key) {
            case "user_name":
              customTitle = "Name";
              break;
            case "role_access":
              customTitle = "Access Permission";
              break;
            case "contracts_count":
              customTitle = "Associated Contracts";
              break;
            // Add more cases if needed
            default:
              customTitle = key; // Use the key as the title by default
          }

          const col: TableColumn = {
            title: <span style={{ fontWeight: "bold" }}>{customTitle}</span>,
            dataIndex: key,
            sorter:
              //Applying sorting logic to only required fields
              key === "role_access" || key === "id"
                ? false
                : (a, b) => {
                    // Add sorting logic for specific columns if needed
                    if (key === "user_name") {
                      return (a[key] as string).localeCompare(b[key] as string);
                    } else if (key === "contracts_count") {
                      return (a[key] as number) - (b[key] as number);
                    }
                    // If no special sorting required, return 0
                    return 0;
                  },
            //To prevent ID from displaying in the table
            width: key === "id" ? 0 : undefined,
          };
          cols.push(col);
      }
    }
      
      // Add "Action" column with "Edit" and "Delete" icons
      const actionColumn: ActionColumn = {
        title: <span style={{ fontWeight: "bold" }}>Action</span>,
        dataIndex: "action",
        render: (_, record: User) => (
          <>  
            <EditOutlined
              className={`${userTableStyles.actionIcon}`}
              onClick={(e) =>{
                //Keeping the user list visible 
                e.stopPropagation();
                // updateUser(record)
                showUpdateChoice(record)
              }
            }
            />
            <DeleteOutlined
              className={`${userTableStyles.actionIcon}`}
              onClick={(e) => {
                e.stopPropagation();
                showDeleteConfirmation(record);
              }}
            />
          </>
        ),
      };
      //Storing all the required titles
    {     
      result.data.data.length!== 0 &&
      cols.push(actionColumn);
    }      

   setColumns(cols);

    // Initialize dataSource once with the mapped list
    setDataSource(
      list.map((data: User) => ({
          id: data.id,
          user_name: data.user_name,
          role_access: data.role_access,
          contracts_count: data.contracts_count,
      }))
  );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  //To get the Users List on loading the page
  useEffect(() => {
    fetchUserData(pagination.current, pagination.pageSize, searchQuery);
  }, [pagination.current, pagination.pageSize,searchQuery]);

  //To get the Employee list in dropdwown
  const fetchEmployeeList = async (searchValue: string) => {
    try {
      setLoading(true);
      setDropdownOptions([]);
      const response: AxiosResponse<Employee[]> =await  getEmployeeList(searchValue);
      const result = response.data;
      const uniqueOptions = new Set(
        result.map((res: Employee) => ({
           id: res.id,
           value: `${res.id}. ${res.first_name} ${res.middle_name} ${res.last_name}` 
           }
          ))
      );
          setDropdownOptions(Array.from(uniqueOptions));
      console.log('Original',dropdownOptions);
    } catch (error:any) {
      console.error('Error fetching data with search:', error);
      if (error.response && error.response.status === 404){
        setEmployeeNotFoundToast(true)
        setTimeout(() => {
          setEmployeeNotFoundToast(false);
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const debouncedFetchData = debounce(fetchEmployeeList, 2000);

  useEffect(() => {
  }, [dropdownOptions]);

  const onSelectEmployee = (data : string ) => {
    // Check if data is defined and has the value property
    const parts = data.split('.');
    const extractedId = parseInt(parts[0], 10);
    console.log('Employee ID :', extractedId);
    setSelectedEmployeeId(extractedId)
  };

  const getEmployee = (value:string) :void=> {
    setSearchEmployee(value);
  };

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setRoleOptions([]);
      const response = await getRolesList();
      const result = response.data;
      console.log(result);

      const accessValues = result
        .filter((res: { role_name: string, role_access: string, id:number  }) => res.role_name !== "Super Admin") // Exclude "Admin" role
        .map((res: { role_name: string,role_access: string, id:number }) => ({access:res.role_access, id:res.id }));

      const formattedOptions = accessValues.map((data:{access:string, id:number}) => ({
        value: data.id,
        label:data.access
      }));
      setRoleOptions(formattedOptions);

      // Set the initial value to the first role
      if (formattedOptions.length > 0) {
        setSelectedRole(formattedOptions[0].value);
      }
    } catch (error) {
      console.error("Error fetching data with search:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Log the updated value of selectedRoleId
  }, [selectedRoleId]); 

  // useEffect(() => {
  //   fetchRoles();
  // }, []);

  const addUserToSystem = async (employee_id: number, role_id: number) => {
    try {
      setLoading(true);
      await addUser(employee_id,role_id)
      setUserAdded(true);
      setTimeout(() => {
        setUserAdded(false);
      }, 5000);

      //toaster call
    } catch (error:any) {
      console.error("Error adding user to the system:", error);
    //       if (error.response && error.response.status === 422) {
    //   // User already exists, show SweetAlert
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'User Already Exists',
    //     text: 'The user you are trying to add already exists.',
    //   });
    // }
    if (error.response && error.response.status === 422) {
      // Display a toast with custom message for 422 status
      // return <Toast message="User already exists" messageType="error" />;
      setShowToast(true);

      // Optionally, you can set a timeout to hide the toast after a certain duration
      setTimeout(() => {
        setShowToast(false);
      }, 5000); 
    }
      

    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    if (selectedEmployeeId && selectedRoleId) {
      console.log('Add:',selectedEmployeeId,selectedRoleId)
      addUserToSystem(selectedEmployeeId, selectedRoleId);
    } else {
      console.warn("Please select an employee and a role before adding a user.");
    }
  }

  const showUpdateChoice =(record: User)=>{
    if(record.role_access==="Full Access"){
      setUserToBeUpdated("Super Admin")
      Swal.fire({
        title: 'Super Admin cannot be updated',
        customClass: {
          popup:` ${userTableStyles.myCustomAlertPopup}`,
        } as SweetAlertCustomClass, 
      });
    }
   else{
    setupdateUserId(record.id)
    setEditModalVisible(true);
   }
  }

  const handleUpdateUser = async (selectedRoleId: number | undefined) => {
    try {
      setLoading(true);
      if (updateUserId && selectedRoleId !== undefined) {
        updateUser(updateUserId,selectedRoleId)
        console.log('User Role updated succesfully')
        setUserUpdated(true)
        setTimeout(() => {
          setUserUpdated(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
      setEditModalVisible(false);
    }
  };

  //Modal for delete confirmation
  const showDeleteConfirmation = (record: User): void => {
    if(record.role_access==="Full Access"){
      console.log('Super Admin',selectedUser)
      alert("Cannot delete Super Admin user.");
    }
    else{
    setSelectedUser(record);
    setDeleteConfirmationVisible(true);
    }
  };

  const hideDeleteConfirmation = (): void => {
    setDeleteConfirmationVisible(false);
  };

  //
  const handleDelete = async (selectedUser:User):Promise<void>=> {
    try {
      await deleteUser(selectedUser)
      setUserDeleted(true)
      setDataSource(dataSource)
      setTimeout(() => {
        setUserDeleted(false);
      }, 5000);
    
    } catch (error:any) {
      console.error("Error deleting user:", error);
      console.log("Failed to delete user");
    } finally {
      hideDeleteConfirmation();
    }
    hideDeleteConfirmation();
  
  };

  //setting the User to be searched
  const handleSearch = (value : string) => {
    setSearchQuery(value);
  };

    // useEffect(() => {
    //   // Fetch data on mount or when a user is searched
    //   fetchUserData(pagination.current, pagination.pageSize, searchQuery);
    //   setUserAdded(false);
    // }, [searchQuery,pagination.current, pagination.pageSize]);
    
    useEffect(() => {
      // Fetch data when a user is added/updated 
      if (userAdded || userUpdated || userDeleted) {
        render.current = false;
        fetchUserData(pagination.current, pagination.pageSize, searchQuery);
      }
    }, [userAdded, userUpdated, userDeleted]);
    
    const handlePageChange = (pagination:any) => {
      // fetchUserData(pagination.page, pagination.pageSize);
      // Update the current page in the state
      setPagination({
        ...pagination,
        current: pagination.current,
      });    
    };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    // Optionally, you can reset the editedUser state if needed
    setEditedUser(null);
  };

  useEffect(() => {
    // Fetch roles when the component mounts
    fetchRoles();
  }, []);

  const rowClassName = (record: User, index: number): string => {
    // Add a custom class to alternate rows for styling
    return index % 2 === 0 ? userTableStyles.evenRow : userTableStyles.oddRow;
  };

  return (
    <ManageUsers
     handleAddUser={handleAddUser}
     showDeleteConfirmation={showDeleteConfirmation}
     setDeleteConfirmationVisible={setDeleteConfirmationVisible}
     hideDeleteConfirmation={hideDeleteConfirmation}
     handleDelete={handleDelete}
     setDataSource={setDataSource}
     handleSearch={handleSearch}
     setUserUpdated={setUserUpdated}
     showUpdateChoice={showUpdateChoice}
     handlePageChange={handlePageChange}
     handleEditModalCancel={handleEditModalCancel}
     handleUpdateUser={handleUpdateUser}
     rowClassName={rowClassName}
     debouncedFetchData={debouncedFetchData}
     onSelectEmployee={onSelectEmployee}
     getEmployee={getEmployee}
     setDropdownOptions={setDropdownOptions}
     setSelectedRoleId={setSelectedRoleId}
     columns={columns}
     dropdownOptions={dropdownOptions}
     roleOptions={roleOptions}
     dataSource={dataSource}
     pagination={pagination}
     editModalVisible={editModalVisible}
     selectedRoleId={selectedRoleId}
     deleteConfirmationVisible={deleteConfirmationVisible}
     selectedUser={selectedUser}
     userAdded={userAdded}
     loading={loading}
     userUpdated={userUpdated}
     userDeleted={userDeleted}
     showToast={showToast}
     emptyUserToast={emptyUserToast}
     employeeNotFoundToast={employeeNotFoundToast}
     />
  )
}

export default ManageUsersHandler
