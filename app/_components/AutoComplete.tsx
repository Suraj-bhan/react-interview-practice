import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
interface AutoCompleteProps {
  placeHolder: string;
  loading: boolean;
  options: any[];
  onSelect: Function;
  onBlur: Function;
  onChange: Function;
}

const AutoComplete = ({
  placeHolder = "",
  loading,
  options,
  onSelect,
  onBlur,
  onChange,
}: AutoCompleteProps) => {
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange(value);
    setActiveIndex(-1);
  };

  useEffect(() => {
    onChangeRef.current("");
  }, []);

  const handleSelect = (e: MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target && target.tagName === "LI") {
      const value = parseInt(target.id);
      console.log(value, options[value].name);
      setSearch(options[value].name);
      onChange(options[value].name);
      setActiveIndex(-1);
    }
  };

  const handleOnBlur = () => {
    setShowList(false);
    setActiveIndex(-1);
  }

  const handleOnFocus = () => {
    setShowList(true);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showList || loading || !options || options.length === 0) {
      return;
    }

    const key = e.key;

    switch (key) {
      case "ArrowUp": {
        if (activeIndex > 0) {
          setActiveIndex((prev) => prev - 1)
        }
        break;
      }
      case "ArrowDown": {
        if (activeIndex < options.length - 1) {
          setActiveIndex((prev) => prev + 1)
        }
        break;
      }
      case "Enter": {
        if (activeIndex >= 0) {
          const value = options[activeIndex]?.name;
          setSearch(value);
          onChange(value);
          handleOnBlur();
          (e.target as HTMLInputElement).blur();
        }
        break;
      }
    }

  }

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "center",
        // behavior: "smooth"
      })
    }
  }, [activeIndex])

  return (
    <div className="w-[36rem] space-y-2 relative">
      <input
        className="w-full p-4 min-w-xl rounded-md border"
        type="search"
        placeholder={placeHolder}
        value={search}
        onChange={handleSearchInput}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
      />
      {showList &&
        <div className="overflow-auto max-h-[400px] absolute w-full shadow-xl rounded-lg px-6 py-6 border border-gray-200">
          <ul onMouseDown={handleSelect}>
            {loading && <li className="py-2">Loading...</li>}
            {!loading &&
              options?.map((data: any, index) => (
                <li ref={(el) => { itemRefs.current[index] = el }} key={data.id} id={index.toString()} className={`hover:bg-gray-100 cursor-pointer p-1 ${activeIndex === index ? "bg-blue-100" : ""}`}>
                  {data.name}
                </li>
              ))}

            {!loading && (!options || options.length === 0) && (
              <li className="py-2">No Data</li>
            )}
          </ul>
        </div>
      }
    </div>
  );
};

export default AutoComplete;
