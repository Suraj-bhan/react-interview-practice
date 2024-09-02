"use client";
import { useEffect, useState } from "react";
import Table from "../_components/Table";
import SearchInput from "../_components/SearchInput";

const SearchFilter = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [filterData, setFiterData] = useState([]);

  const fetchTableData = async () => {
    const res = await fetch("https://dummyjson.com/users?limit=100");
    const json = await res.json();
    setTableData(json.users);
    setFiterData(json.users);
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleSearch = (query: string) => {
    if (tableData && tableData.length > 0) {
      setFiterData(
        tableData.filter((item: any) =>
          query.toLowerCase() === ""
            ? item
            : item.firstName.toLowerCase().includes(query.toLowerCase()) ||
              item.lastName.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="page">
      <div className="tableContainer">
        <SearchInput searchHandler={handleSearch} />
        <Table data={filterData} />
      </div>
    </div>
  );
};

export default SearchFilter;
