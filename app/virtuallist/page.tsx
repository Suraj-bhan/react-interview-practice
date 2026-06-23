"use client";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 50;
const WINDOW_HEIGHT = 500;
const OVERSCAN = 5;

type User = {
  id: number;
  firstName: string;
  lastName: string;
};

const VirtualList = () => {
  const [tableData, setTableData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const fetchTableData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/users?limit=100");
      const json = await res.json();
      setTableData(json.users);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  // ✅ Correct virtualization calculations
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN
  );

  const visibleCount = Math.ceil(WINDOW_HEIGHT / ITEM_HEIGHT);

  const endIndex = Math.min(
    tableData.length,
    startIndex + visibleCount + OVERSCAN * 2
  );

  const visibleData = tableData.slice(startIndex, endIndex);

  return (
    <div className="page">
      <div
        className="w-full relative overflow-y-auto"
        style={{ height: WINDOW_HEIGHT }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        {/* ✅ Spacer for full height */}
        <div
          style={{
            height: tableData.length * ITEM_HEIGHT,
            position: "relative",
          }}
        >
          {visibleData.map((item, i) => {
            const actualIndex = startIndex + i; // ✅ FIX

            return (
              <div
                key={item.id}
                className="border-b flex items-center px-4 absolute w-full"
                style={{
                  height: ITEM_HEIGHT,
                  top: actualIndex * ITEM_HEIGHT, // ✅ FIX
                }}
              >
                {item?.firstName} {item?.lastName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;