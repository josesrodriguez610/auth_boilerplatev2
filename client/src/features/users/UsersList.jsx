import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import MaterialReactTableComponent from "../../components/MaterialReactTableComponent/MaterialReactTableComponent";
import { useState } from "react";
import { useEffect } from "react";
import { useRefreshMutation } from "../auth/authApiSlice";
import axios from "axios";
import LinkDefault from "../../components/LinkDefault/LinkDefault";

const UsersList = () => {
  useTitle("the Advocate: Users List");

  const [refresh] = useRefreshMutation();
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let editButton = (userId) => (
    <Link key={userId} to={`/dash/users/${userId}`}>
      <PencilSquareIcon className="h-8 w-8" />
    </Link>
  );

  async function getData() {
    try {
      const responseToken = await refresh();
      const { accessToken } = responseToken.data;
      let response = await axios.get(`/api/v1/users`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      let data = await response.data;

      const formatData = await data.map((user) => {
        return {
          ...user,
          edit: editButton(user.id),
        };
      });

      setUsersData(formatData);
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Last Name",
    },
    {
      accessorKey: "edit",
      header: "Edit",
    },
  ];

  return (
    <>
      {usersData && (
        <div className="container mx-auto">
          <LinkDefault to={"/dash/users/new"} title="New User" />
          <MaterialReactTableComponent columns={columns} data={usersData} />
        </div>
      )}
    </>
  );
};
export default UsersList;
