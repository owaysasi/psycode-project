import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  listContainer: {
    marginTop: "24px",
    width: "600px",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loaderSkeleton: {
    marginBottom: "36px !important",
  },
  userList: {
    width: "100%",
    maxWidth: 600,
    paddingTop: "36px !important",
    // listStyleType: "none",
  },
  noData: {
    marginTop: "36px !important",
  },
});

export default useStyles;
