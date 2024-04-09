import React from "react";
import axios from "axios";
import { useForm, Form } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PsyInput from "../psycode-input/psycode-input";
import useStyles from "./psycode-form-style";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { Toaster, toast } from "react-hot-toast";

function PsyForm({ title }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    const toastId = toast.loading("Loading...", {
      position: "top-right",
    });
    axios
      .post("https://api.restful-api.dev/objects", {
        data,
      })
      .then(() => {
        setTimeout(() => {
          dispatch(
            addUser({ ...data, Id: Math.random().toString(16).slice(2) })
          );
          toast.success("User added successfully", {
            id: toastId,
          });
          reset();
        }, 1500);
      })
      .catch((_err) => {
        toast.error("Something went wrong!", {
          id: toastId,
        });
      });
  };

  return (
    <div className={classes.psycodeFormContainer}>
      <Typography variant="h4">{title}</Typography>
      <Form
        className={classes.psycodeForm}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
      >
        <PsyInput
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          }}
          required={{ value: true, message: "Please, enter an email" }}
          control={control}
          name="email"
          type="email"
        />
        <PsyInput
          required={{ value: true, message: "Please, enter a name" }}
          control={control}
          name="name"
        />
        <PsyInput
          control={control}
          name="phone"
          required={false}
          type="number"
        />
        <Button
          className="psycode-form-button"
          variant="outlined"
          type="submit"
        >
          Submit
        </Button>
        <Toaster />
      </Form>
    </div>
  );
}

export default PsyForm;
