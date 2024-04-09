import React from "react";
import PsyForm from "../../Components/psycode-form/psycode-form";
import PsyTable from "../../Components/psycode-table/psycode-table";
import useStyles from "./main-page-style";

function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.mainPageContainer}>
      <PsyForm title="Psycode Form" />
      <PsyTable api="/api/users" title="Users List" />
    </div>
  );
}

export default MainPage;
