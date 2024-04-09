import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUsers } from "../../redux/slices/userSlice";
import { users } from "../../data/users";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import useStyles from "./psycode-table-style";
import PsyTableItem from "../psycode-table-item/psycode-table-item";

function PsyTable({ _api, title }) {
  const listOfUsers = useSelector((state) => state.users.users);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const getUsersList = () => {
      if (listOfUsers?.length === 0) {
        axios.get("https://api.restful-api.dev/objects").then((_res) => {
          dispatch(addUsers(users));
          setIsLoading(false);
        });
      }
    };
    getUsersList();
  }, []);

  return (
    <div className={classes.listContainer}>
      {isLoading ? (
        <div className={classes.loaderContainer}>
          <Skeleton
            className={classes.loaderSkeleton}
            width={240}
            height={48}
          />
          {[...new Array(5)].map((_item, i) => (
            <Skeleton key={i} width="100%" />
          ))}
        </div>
      ) : (
        <>
          <Typography variant="h4">
            {title}({listOfUsers?.length})
          </Typography>
          {listOfUsers.length > 0 ? (
            <table className={classes.userList}>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
              {listOfUsers.map((item) => {
                return <PsyTableItem key={item.Id} data={item} />;
              })}
            </table>
          ) : (
            <Typography variant="h5" className={classes.noData}>
              No data to show
            </Typography>
          )}
        </>
      )}
    </div>
  );
}

export default PsyTable;
