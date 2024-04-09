import TextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import useStyles from "./psycode-input-style.js";

function PsyInput(props) {
  const { control, name, required, pattern, ...restProps } = props;
  const classes = useStyles();
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required: required,
      pattern: pattern,
    },
  });

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <TextField
      required={required.value}
      label={Capitalize(name)}
      className={classes.psyInput}
      error={Boolean(errors[name]?.type)}
      helperText={errors[name]?.message}
      size="small"
      FormHelperTextProps={{
        classes: {
          root: classes.helperText,
        },
      }}
      {...field}
      {...restProps}
    />
  );
}

export default PsyInput;
