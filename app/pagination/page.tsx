"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Pagination = () => {
  const [products, setProducts] = useState<[] | any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const json = await res.json();
    setProducts(json.products);
    setTotalPage(Math.ceil(json.products.length / itemsPerPage));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePrevious = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    if (products && products.length > 0) {
      setTotalPage(Math.ceil(products.length / parseInt(e.target.value)));
    }
  };

  return (
    <div className="page">
      <div className="container">
        {products &&
          products.length > 0 &&
          products
            .slice(
              currentPage * itemsPerPage - itemsPerPage,
              currentPage * itemsPerPage
            )
            .map((item: any) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="object-cover w-40 h-40"
                />
                {item.title}
              </div>
            ))}
      </div>

      {products && products.length > 0 && (
        <div className="flex items-center justify-between mt-10 w-full px-16">
          <div className="flex items-center">
            <select onChange={handlePerPageChange} className="p-4 border">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="overflow-hidden lg:flex items-center justify-center">
            <span
              className="pagination-button"
              onClick={handlePrevious}
              style={
                currentPage === 1
                  ? { background: "rgba(0,0,0, 0.1)", cursor: "not-allowed" }
                  : {}
              }
            >
              ⏮️
            </span>
            {[...Array(totalPage)].map((_, i) => (
              <span
                className="pagination-button"
                style={
                  currentPage === i + 1
                    ? { background: "rgba(58, 100, 238, 0.1)" }
                    : {}
                }
                key={i}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}
            <span
              className="pagination-button"
              onClick={handleNext}
              style={
                currentPage === totalPage
                  ? { background: "rgba(0,0,0, 0.1)", cursor: "not-allowed" }
                  : {}
              }
            >
              ⏭️
            </span>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
