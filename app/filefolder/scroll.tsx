import React, { useEffect, useRef, useState, useCallback } from "react";

type Item = {
  id: number;
  title: string;
};

const LIMIT = 10;

const InfiniteScroll = () => {
  const [data, setData] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // 🔹 API call
  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${pageNum}`
      );
      const newData = await res.json();

      setData((prev) => [...prev, ...newData]);

      if (newData.length < LIMIT) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 IntersectionObserver logic
  const lastElementCallback = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore]);

  // 🔹 Fetch on page change
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 🔹 Fallback: scroll event
  useEffect(() => {
    if ("IntersectionObserver" in window) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Infinite Scroll</h2>

      {data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <div
              key={item.id}
              ref={lastElementCallback}
              style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}
            >
              {item.title}
            </div>
          );
        }

        return (
          <div
            key={item.id}
            style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}
          >
            {item.title}
          </div>
        );
      })}

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data</p>}
    </div>
  );
};

export default InfiniteScroll;