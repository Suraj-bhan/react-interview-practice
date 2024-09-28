"use client";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import AutoComplete from "../_components/AutoComplete";

const AutoCompleteHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchData = useCallback(async (query: string) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`
      );
      const json = await res.json();
      console.log(json);
      setData(json.recipes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceSearchData = useCallback(debounce(fetchSearchData, 300), [
    fetchSearchData,
  ]);

  const empltyFunctions = () => {};

  return (
    <div className="page p-24">
      <AutoComplete
        options={data}
        onSelect={empltyFunctions}
        onBlur={empltyFunctions}
        onChange={debounceSearchData}
        loading={loading}
      />
    </div>
  );
};

export default AutoCompleteHome;
