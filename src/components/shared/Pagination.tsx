import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IUserPagination } from "../../utils/interfaces/IUser";

interface PaginationProps {
  pagination: Omit<IUserPagination, "users"> | undefined;
  onNextPagination: () => void;
  onPrevPagination: () => void;
}

export default function Pagination({ pagination, onNextPagination, onPrevPagination }: PaginationProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {pagination?.currentPage && pagination?.currentPage > 1 ? (
        <div style={{ cursor: "pointer" }} onClick={onPrevPagination}>
          <ArrowBackIosIcon htmlColor="blue"></ArrowBackIosIcon>
        </div>
      ) : (
        <></>
      )}

      <p
        style={{ marginLeft: 20, marginRight: 20 }}
      >{`Page ${pagination?.currentPage} of ${pagination?.totalPages} Pages - Page Size: ${pagination?.pageSize} - Total Users ${pagination?.totalUsers}`}</p>

      {pagination?.currentPage &&
      pagination?.currentPage < pagination.totalPages ? (
        <div style={{ cursor: "pointer" }} onClick={onNextPagination}>
          <ArrowForwardIosIcon htmlColor="blue"></ArrowForwardIosIcon>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
