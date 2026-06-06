import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  toggleUserStatusById,
  updateUserRoleById,
} from "../features/users/userSlice";
import DataTable from "../components/table/DataTable";
import { ROLES } from "../utils/permissions";

function AdminUserPage() {
  const dispatch = useDispatch();
  const { users, isFetchingUsers, isUpdatingUserRole, isUpdatingUserStatus } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  async function handleChangeRole(id, role) {
    await dispatch(updateUserRoleById({ id, role }));
  }

  async function toggleUserStatus(id, isActive) {
    await dispatch(toggleUserStatusById({ id, isActive }));
  }

  const columns = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => {
        console.log(row.isActive)
        return row.isActive ? "Active" : "Inactive";
      },
    },
    {
      header: "role",
      accessor: "role",
      render: (row) => {
        return (
          <select
            onChange={(e) => handleChangeRole(row._id, e.target.value)}
            value={row.role}
            disabled={isUpdatingUserRole}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
        );
      },
    },
    {
      header: "Action",
       accessor: "action",
      render: (row) => {
        return (
          <button
            disabled={isUpdatingUserStatus}
            onClick={() => toggleUserStatus(row._id, !row.isActive)}
          >
            {row.isActive ? "Inactive" : "Active"}
          </button>
        );
      },
    },
  ];

  return (
    <div style={{textAlign: 'center'}}>
      <DataTable
        columns={columns}
        data={users}
        loading={isFetchingUsers }
        emptyMessage="Users not found"
      />
    </div>
  );
}

export default AdminUserPage;
