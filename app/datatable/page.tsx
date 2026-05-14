"use client"
import React, { useEffect, useState } from 'react'
import Table from './Table';

const DataTablePage = () => {
    const [rowPerPage, setRowPerPage] = useState(150);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageData, setPageData] = useState([]);

    const fetchProductData = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=${rowPerPage}&skip=${0}`);
        const json = await res.json();
        console.log(json);
        setPageData(json?.products)
    }


    useEffect(() => {
        fetchProductData();
    }, [])
    return (
        <div className='text-black bg-white h-screen max-h-screen overflow-auto'>
            <Table data={pageData} />
        </div>
    )
}

export default DataTablePage