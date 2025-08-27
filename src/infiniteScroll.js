import React, { useEffect, useRef, useState, useCallback } from 'react';
import './infiniteScroll.css';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const fetchMoreItems = useCallback(async () => {
    await new Promise((res) => setTimeout(res, 1000));

    const newItems = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`);
    setItems((prev) => [...prev, ...newItems]);

    if (page >= 5) {
      setHasMore(false);
    } else {
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    fetchMoreItems();
  }, [fetchMoreItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          fetchMoreItems();
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, fetchMoreItems]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div ref={loader} className="loader">
        {hasMore ? 'Loading more items...' : 'No more items to load.'}
      </div>
    </div>
  );
};

export default InfiniteScroll;
