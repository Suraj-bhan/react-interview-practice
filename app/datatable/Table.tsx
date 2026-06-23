import React, { useEffect, useState } from 'react'

interface TableData {
    data: any[]
}

const Table = ({ data }: TableData) => {
    const [vHeader, setVHeaders] = useState<(string | null)[]>([]);
    const [sortBy, setSortBy] = useState("");
    const [orderBy, setOrderBy] = useState<"ASC" | "DSC">("ASC");
    const [localData, setLocalData] = useState(data);
    const [rowPerPage, setRowPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (data && data.length > 0) {
            setVHeaders(Object.keys(data[0]));
        }
    }, [data])

    const handleSorting = (sort: string) => {
        if (sort !== sortBy) {
            setSortBy(sort);
            setOrderBy("ASC")
        } else if (orderBy === "ASC") {
            setOrderBy("DSC");
        } else {
            setSortBy("");
            setOrderBy("ASC")
        }
    }

    useEffect(() => {
        setPage(1);

        const filteredData = [...data].filter((item) =>
            Object.values(item).some((val) =>
                (typeof val === "string" && val.toLowerCase().includes(search.toLowerCase())) ||
                (typeof val === "number" && val.toString().includes(search))
            )
        )

        if (!sortBy) {
            setLocalData(filteredData);
            return;
        }

        const sorted = [...filteredData].sort((a, b) => {
            const valA = a[sortBy];
            const valB = b[sortBy];

            if (typeof valA === "number" && typeof valB === "number") {
                return orderBy === "ASC" ? valA - valB : valB - valA
            }

            return orderBy === "ASC" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA))
        })

        setLocalData(sorted)

    }, [data, sortBy, orderBy, search])

    const getPagesList = Array.from({ length: Math.ceil(localData.length / rowPerPage) }, (_, i) => i + 1)

    return (
        <div>
            <div className='flex justify-center mb-2'>
                <input
                    type='search'
                    value={search}
                    className='border bg-gray text-black p-2'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='relative'>
                <table className='max-w-full w-full overflow-auto'>
                    <thead className=''>
                        <tr>
                            {vHeader && vHeader.slice(0, 10).map((item) => (
                                <th key={item} onClick={() => handleSorting(item as string)}>
                                    {item?.toLocaleUpperCase()}{" "}{sortBy === item ? (orderBy === "DSC" ? "↓" : "↑") : ""}
                                </th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {localData.slice((page - 1) * rowPerPage, page * rowPerPage).map((item, rowIdx) => (
                            <tr key={`${item.id} ${rowIdx}`}>
                                {Object.values(item).slice(0, 10).map((val, colIdx) => (
                                    <td key={`${item.id} ${rowIdx} ${colIdx}`} className='whitespace-nowrap max-w-sm bg-white overflow-x-hidden'>
                                        {typeof val === "string" || typeof val === "number" ? val : "N/A"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-start items-center gap-2 mx-8 border-t p-4 w-full'>
                <div>
                    <select onChange={(e) => setRowPerPage(Number(e.target.value))}>
                        {[10, 25, 50].map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </div>
                <div className='flex justify-start gap-2 mx-8 p-4 w-full'>
                    {getPagesList.map((i) => <button key={i} className='w-8 h-8 border rounded-md bg-blue-300' onClick={() => setPage(i)}>{i}</button>)}
                </div>
            </div>
        </div>
    )
}

export default Table