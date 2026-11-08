import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = {
  default: T;
};

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    React.ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(event) => onPageChange(event.selected)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      previousClassName={css.previous}
      previousLinkClassName={css.previousLink}
      nextClassName={css.next}
      nextLinkClassName={css.nextLink}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      breakClassName={css.break}
      breakLinkClassName={css.breakLink}
      previousLabel="←"
      nextLabel="→"
    />
  );
};

export default Pagination;
