import { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(user?.role);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setEmail("");
      setPassword("");
      setRole("");
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRoleChanged = (e) => setRole(e.target.value);

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, email, password, role, active });
    } else {
      await updateUser({ id: user.id, email, role, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave = [role, validEmail, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [role, validEmail].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validEmail ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  // const validRoleClass = !Boolean(role.length) ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div>
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="email">
          Email: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="email"
          name="email"
          type="text"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChanged}
          />
        </label>

        <label className="form__label" htmlFor="role">
          ASSIGNED ROLE:
        </label>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="role"
              id="role"
              value={role}
              label="role"
              onChange={onRoleChanged}
            >
              <MenuItem value={"Employee"}>Employee</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"SuperAdmin"}>SuperAdmin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <select
          id="role"
          name="role"
          className={`form__select ${validRoleClass}`}
          multiple={true}
          size="3"
          value={role}
          onChange={onRoleChanged}
        >
          {options}
        </select> */}
      </form>
    </>
  );

  return content;
};
export default EditUserForm;
