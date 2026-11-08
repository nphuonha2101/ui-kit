"use client";

import * as React from "react";
import { Pagination } from "@nphuonha/ui-kit";

function PaginationDemo() {
  const [page, setPage] = React.useState(1);

  return (
    <div className="flex flex-col items-center gap-4">
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
      <p className="text-sm text-muted-foreground">Page {page} of 12</p>
    </div>
  );
}

export const demo = PaginationDemo;
export const examples = {};
