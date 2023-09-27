import { Box, FormControlLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import PasswordInput from "../../components/Buttons/PasswordInput";
import ButtonDefault from "../../components/ButtonDefault/ButtonDefault";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../users/usersApiSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

  const navigate = useNavigate();

  const { id } = useAuth();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypeNewPassword, setRetypeNewPassword] = useState("");

  const onSaveUserClicked = async (e) => {
    try {
      e.preventDefault();
      if (canSave) {
        if (newPassword === retypeNewPassword) {
          const updatePassword = await updateUser({
            id: user.id,
            email: user.email,
            role: user.role,
            active: user.active,
            currentPassword,
            newPassword,
          });

          if (updatePassword.data.success === true) {
            return navigate(-1);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const canSave =
    [currentPassword, newPassword, retypeNewPassword].every(Boolean) &&
    !isLoading;

  // useEffect(() => {
  //   setNewPassword(PWD_REGEX.test(newPassword));
  // }, [newPassword]);

  return (
    <div className="sm:container mx-auto">
      <h1>Reset Password</h1>
      <form className="max-w-md" onSubmit={onSaveUserClicked}>
        <PasswordInput
          title={"Current Password"}
          nameId={"currentPassword"}
          password={currentPassword}
          setPassword={setCurrentPassword}
        />
        <PasswordInput
          title={"New Password"}
          nameId={"newPassword"}
          password={newPassword}
          setPassword={setNewPassword}
        />
        <PasswordInput
          title={"Retype New Password"}
          nameId={"retypeNewPassword"}
          password={retypeNewPassword}
          setPassword={setRetypeNewPassword}
        />
        <ButtonDefault title="Save" loading={isLoading} />
      </form>
    </div>
  );
};

export default Settings;
