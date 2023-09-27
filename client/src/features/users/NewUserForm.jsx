import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import useTitle from "../../hooks/useTitle";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const USER_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

const NewUserForm = () => {
  useTitle("The Advocate: New User");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState("Employee");
  const [active, setActive] = useState(false);

  useEffect(() => {
    setValidEmail(USER_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setRole([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRoleChanged = (e) => setRole(e.target.value);

  const onActiveChanged = () => setActive((prev) => !prev);

  const canSave =
    [role, validEmail, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ email, password, role, active });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validEmail ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRoleClass = !Boolean(role.length) ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
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
          Password: <span className="nowrap">[4-20 chars incl. !@#$%]</span>
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
export default NewUserForm;
