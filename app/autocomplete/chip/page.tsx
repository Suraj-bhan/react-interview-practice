"use client";
import { MouseEvent, useEffect, useRef, useState } from "react";

const AutoCompletChip = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedList, setSelectedList] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredData = data.filter((item) => {
    return (
      !selectedList.includes(item.firstName) &&
      item.firstName.toLowerCase().includes(query.toLowerCase())
    );
  });

  const fetchTableData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/users?limit=100");
      const json = await res.json();
      setData(json.users);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, []);

  const handleShowHideList = (flag: boolean) => {
    setShowList(flag);
  };

  const handleSelectList = (e: MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === "LI") {
      const id = target.id;
      setSelectedList([...selectedList, filteredData[+id].firstName]);
      setQuery("");
      setShowList(false);
      inputRef?.current?.focus();
    }
  };

  const handleListRemove = (item: string) => {
    setSelectedList((prev) => prev.filter((list) => list !== item));
  };

  const handleFocused = () => {
    inputRef?.current?.focus();
  };

  console.log(filteredData);
  return (
    <div className="page">
      <div
        className="p-12 rounded-md mt-24"
        // onBlur={() => handleShowHideList(false)}
      >
        <div
          className="flex flex-wrap border rounded-sm items-center w-[640px] bg-white"
          onClick={handleFocused}
        >
          {selectedList.map((item, index) => (
            <div key={index} className="rounded-sm bg-green-600 mx-2 my-2 px-2">
              {item} <span onClick={() => handleListRemove(item)}>X</span>
            </div>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            ref={inputRef}
            className="border-none outline-none rounded-sm p-2 text-black flex-1"
            onFocus={() => handleShowHideList(true)}

            //
          />
        </div>

        {showList && (
          <div className="max-h-96 overflow-auto mt-2">
            <ul onClick={handleSelectList}>
              {[...filteredData]?.map((item, index) => (
                <li
                  id={index.toString()}
                  key={item.firstName + index}
                  className="py-2 border-t"
                >
                  {item.firstName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompletChip;
