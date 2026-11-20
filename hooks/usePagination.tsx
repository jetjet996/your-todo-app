import { useState } from "react";

export function usePagination(initialLimit = 10) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => {
    console.log("adada");
    setPage(prev => prev + 1);
  };

  const previousPage = () => {
    setPage(prev => Math.max(1, prev - 1));
  };

  const changePage = (newPage: number) => {
    setPage(Math.max(1, newPage));
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    page,
    limit,
    setPage,
    nextPage,
    previousPage,
    changePage,
    changeLimit,
  };
}