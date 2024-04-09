import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { removeUser, setIsRemovingId } from "../../redux/slices/userSlice";
import { toast } from "react-hot-toast";
import useStyles from "./psycode-table-item-style";

function PsyTableItem({ data }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isRemovingId = useSelector(
    (state) => state.users.isRemovingIds[data.Id]
  );
  const deleteUser = (ID) => {
    const toastId = toast.loading("Loading...", {
      position: "top-right",
    });
    dispatch(setIsRemovingId({ Id: ID, value: true }));
    setTimeout(() => {
      dispatch(removeUser(ID));
      toast.success(`User ${data.name} deleted successfully`, {
        id: toastId,
      });
      dispatch(setIsRemovingId({ Id: ID, value: false }));
    }, 1500);
  };

  return (
    <tr className={classes.listItem}>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.phone || "N/A"}</td>
      <td>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            disabled={isRemovingId}
            edge="end"
            aria-label="delete"
            onClick={() => deleteUser(data.Id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
}

export default PsyTableItem;
