import { LinkButton } from "./LinkButton";

export type PaginationButtonsProps = {
  pageCount: number;
  currentPage: number;
  getLink: (page: number) => string;
};

export function PaginationButtons({
  pageCount,
  currentPage,
  getLink,
}: PaginationButtonsProps) {
  const pageList = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {pageList.map((page) => (
        <LinkButton
          key={page}
          to={getLink(page)}
          className={currentPage === page ? "bg-green-700" : ""}
        >
          {page}
        </LinkButton>
      ))}
    </div>
  );
}
