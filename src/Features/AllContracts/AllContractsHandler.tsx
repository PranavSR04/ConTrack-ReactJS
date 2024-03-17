import React, { useState, useEffect } from "react";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Empty, Input, Tag } from "antd";
import {
  FilterConfirmProps,
  TablePaginationConfig,
} from "antd/lib/table/interface";
import { fetchDataFromApi } from "./api/AllContracts";
import { fetchMyContractsApi } from "./api/MyContracts";
import { ContractData, TableColumn, locale } from "./types";
import AllContracts from "./AllContracts";
import { useNavigate } from "react-router";
import tableStyles from "./contractsList.module.css";
import { useLocation } from "react-router";
const AllContractsHandler = () => {
  const [data, setData] = useState<ContractData[]>([]);
  const [searchConditions, setSearchConditions] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState<boolean>(false);
  const [actionClicked, setActionClicked] = useState<boolean>(false);
  const [checkedExpiring, setCheckedExpiring] = useState(false);
  const [contractAddToast, setContractAddToast] = useState<boolean>(false);
  const [contractEditToast, setContractEditToast] = useState<boolean>(false);
  const [isMyContracts, setIsMyContracts] = useState<boolean>(false);
  const [slideroption, setSlideroption] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const role_id = parseInt(localStorage.getItem("role_id") || "0", 10);
  const [pageTitle, setPageTitle] = useState("CONTRACTS OVERVIEW");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // Default page size
    total: 0,
  });
  let locale: locale = {
    //empty message for table
    emptyText: loading ? " " : <Empty />,
  };

  const showExpired = (checked: boolean) => {
    //show expired contracts?
    console.log(`switch to ${checked}`);
    setCheckedExpiring(checked);
    setSearchConditions({}); //clear search from Api
    setIsEmptySearch(true);
  };
  const handleSegmentChange = (value: string) => {
    if(value==='All'){
      setSlideroption('');
      clearSearch();
    }
    else if(value==='Associated'){
      setSlideroption('associated_by_me');
      clearSearch();
    }
    else{
      setSlideroption('added_by_me');
      clearSearch();
    }
  }
  

  useEffect(() => {
    setSearchConditions({}); //clear search and search entry
    setIsEmptySearch(true);
  }, [window.location.href]);

  useEffect(() => {
    fetchData(); // Fetch initial data
  }, [
    searchConditions,
    pagination.current,
    pagination.pageSize,
    window.location.href,
  ]); // Refetch data when searchText or searchField changes

  useEffect(() => {
    if (location.state && location.state.hasOwnProperty("added")) {
      setContractAddToast(true);
      setTimeout(() => {
        window.history.replaceState(null, "");
      }, 0);
    } else if (location.state && location.state.hasOwnProperty("edited")) {
      setContractEditToast(true);
      setTimeout(() => {
        window.history.replaceState(null, "");
      }, 0);
    }
  }, [location.state]);
  const fetchData = async () => {
    try {
      setLoading(true);
      let location = window.location.href; //get the url path
      let locationPaths = location.split("/");
      let pagePath = locationPaths[locationPaths.length - 1]; //get the corresponding page path.
      console.log("location", pagePath);
      //get Api for MyContracts
      if (pagePath === "MyContracts") {
        const USER_ID = localStorage.getItem("user_id") as string; //get user id
        setIsMyContracts(true)
        const result = await fetchMyContractsApi(
          searchConditions,
          pagination.current,
          pagination.pageSize,
          USER_ID,
          checkedExpiring,
          slideroption
        );
        setData(result.data);
        setPageTitle("MY CONTRACTS");

        setPagination({
          ...pagination,
          total: result.total,
        });
      } else {
        //get Api for All contracts
        setIsMyContracts(false);
        const result = await fetchDataFromApi(
          searchConditions,
          pagination.current,
          pagination.pageSize,
          checkedExpiring,
        );
        setData(result.data);
        setPageTitle("CONTRACTS OVERVIEW");
        console.log("result:", result.data);
        console.log("toatal page", result.total);
        setPagination({
          ...pagination,
          total: result.total,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    if ("current" in pagination && "pageSize" in pagination) {
      setPagination({
        current: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        total: pagination.total || 0,
      });
    }
  };
  const onSearch = (selectedKeys: string, selectedField: string) => {
    setIsEmptySearch(false);
    setSearchConditions((prevConditions) => ({
      ...prevConditions,
      [selectedField]: selectedKeys,
    }));
    console.log(searchConditions);
  };

  const clearSearch = () => {
    setSearchConditions({});
    setIsEmptySearch(true);
  };

  const rowClassName = (record: ContractData, index: number): string => {
    // Add a custom class to alternate rows
    return index % 2 === 0 ? tableStyles["oddRow"] : tableStyles["evenRow"];
  };

  const rowClickHandler = (record: ContractData) => {
    if (!actionClicked) {
      navigate(`/contract`, { state: { id: record.id as string } });
    }
  };
  const getColumnSearchProps = (dataIndex: string) => {
    return {
      filterDropdown: ({
        selectedKeys,
        confirm,
        setSelectedKeys,
      }: {
        selectedKeys: React.Key[];
        confirm: (param?: FilterConfirmProps) => void;
        setSelectedKeys: (selectedKeys: React.Key[]) => void;
      }) => {
        return (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              placeholder={`Search ${
                (customHeadings as Record<string, string>)[dataIndex]
              }`}
              onChange={(e) => {
                setSelectedKeys([e.target.value]);
                onSearch(e.target.value, dataIndex);
              }}
              value={isEmptySearch ? "" : selectedKeys[0]}
              style={{
                marginBottom: 8,
                display: "block",
              }}
            />
            <Button
              onClick={() => {
                clearSearch();
              }}
            >
              Clear All Search
            </Button>
          </div>
        );
      },
      filterIcon: () => <SearchOutlined />,
    };
  };

  const customHeadings: Record<string, string> = {
    contract_ref_id: "Contract ID",
    client_name: "Client Name",
    start_date: "Start Date",
    end_date: "End Date",
    contract_type: " Type",
    contract_status: "Status",
    du: "DU",
  };

  const desiredColumnKeys = [
    "contract_ref_id",
    "client_name",
    "start_date",
    "end_date",
    "contract_type",
    "du",
  ];

  const columns: TableColumn[] = desiredColumnKeys.map((key) => ({
    title: customHeadings[key],
    dataIndex: key,
    key,
    sorter: (a: ContractData, b: ContractData) =>
      a[key as keyof ContractData].localeCompare(b[key as keyof ContractData]),
    sortDirections: ["ascend", "descend"],
    ...getColumnSearchProps(key),
    render: (text: any, record: ContractData) => (
      <span onClick={() => rowClickHandler(record)}>{text}</span>
    ),
  }));

  const oneditPage = (contract_id: string) => {
    setActionClicked(true);
    navigate(`/editContract`, { state: { id: contract_id as string } });
  };

  columns.push({
    title: "Status",
    dataIndex: "contract_status",
    key: "contract_status",
    sorter: (a: ContractData, b: ContractData) =>
      a.contract_status.localeCompare(b.contract_status),
    sortDirections: ["ascend", "descend"],
    ...getColumnSearchProps("contract_status"),
    render: (status: string, record: ContractData) => {
      // let color = 'green'; // Default color
      let className = "status-active";
      if (status === "On Progress") {
        className = "status-onprogress";
      } else if (status === "Closed") {
        className = "status-closed";
      } else if (status === "Expired") {
        className = "status-closed";
      }else if (status === "Expiring") {
        className = "status-Expiring";
      }
      return (
        <Tag
          className={className}
          onClick={() => {
            rowClickHandler(record);
          }}
        >
          {status}
        </Tag>
      );
    },
  });

  {
    role_id !== 3 &&
      columns.push({
        title: "Action",
        key: "action",
        render: (text: any, record: ContractData) => (
          <span>
            <EditOutlined
              style={{ fontSize: "16px", color: "#DC143C" }}
              onClick={() => {
                oneditPage(record.id);
              }}
            />
          </span>
        ),
      });
  }

  return (
    <>
      <AllContracts
        columns={columns}
        data={data}
        pagination={pagination}
        handleTableChange={handleTableChange}
        actionClicked={actionClicked}
        loading={loading}
        rowClassName={rowClassName}
        pageTitle={pageTitle}
        locale={locale}
        showExpired={showExpired}
        contractAddToast={contractAddToast}
        contractEditToast={contractEditToast}
        isMyContracts={isMyContracts}
        handleSegmentChange={handleSegmentChange}
      />
    </>
  );
};

export default AllContractsHandler;
