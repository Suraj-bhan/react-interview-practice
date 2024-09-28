import { ChangeEvent, useState } from "react";

const AutoComplete = ({
  placeHolder = "",
  loading,
  options,
  onSelect,
  onBlur,
  onChange,
}) => {
  const [search, setSearch] = useState("");
  // const [showSuggestions, setShowSuggestions] = useState(false);

  const [error, setError] = useState(false);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange(value);
  };

  const getSuggestions = async () => {
    setError(false);
  };

  const handleSelect = (e) => {
    const value = e.target.id;
    console.log(value, options[value].name);
    setSearch(options[value].name);
    onChange(options[value].name);
  };

  return (
    <div className="w-[36rem] space-y-2 relative">
      <input
        className="w-full p-4 min-w-xl rounded-md border"
        type="search"
        placeholder={placeHolder}
        value={search}
        onChange={handleSearchInput}
        onBlur={onBlur}
        onSelect={onSelect}
      />

      {/* {showSuggestions && ( */}
        <div className="overflow-auto max-h-[400px] absolute w-full shadow-xl rounded-lg px-6 py-6 border border-gray-200">
          <ul onClick={handleSelect}>
            {loading && <li className="py-2">Loading...</li>}
            {!loading &&
              options?.map((data: any, index) => (
                <li key={data.id} id={index}>
                  {data.name}
                </li>
              ))}

            {!loading && (!options || options.length === 0) && (
              <li className="py-2">No Data</li>
            )}
          </ul>
        </div>
      {/* )} */}
    </div>
  );
};

export default AutoComplete;
