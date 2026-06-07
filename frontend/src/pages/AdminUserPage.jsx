import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  toggleUserStatusById,
  updateUserRoleById,
  optimisticallyUpdateUserRole,
} from "../features/users/userSlice";
import DataTable from "../components/table/DataTable";
import { ROLES } from "../utils/permissions";
import toast from "react-hot-toast";

function AdminUserPage() {
  const dispatch = useDispatch();
  const { users, isFetchingUsers, isUpdatingUserRole, isUpdatingUserStatus } =
    useSelector((state) => state.users);
  const {user: authUser} =   useSelector((state) => state.auth);

  const [updatingUserStatusId, setUpdatingUserStatusId] = useState(null);
  const [updatingUserRoleById, setUpdatingUserRoleById] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  async function handleChangeRole(id, role) {
    const previousUser = users.find((user) => user._id === id);
    const previousUserRole = previousUser.role;

    try {
      dispatch(optimisticallyUpdateUserRole({ id, role }));
      setUpdatingUserRoleById(id);
      await dispatch(updateUserRoleById({ id, role })).unwrap();
      toast.success("Role updated successfully");
    } catch (err) {
      dispatch(optimisticallyUpdateUserRole({ id, role: previousUserRole }));
      toast.error("Failed to update role");
    } finally {
      setUpdatingUserRoleById(null);
    }
  }

  async function toggleUserStatus(id, isActive) {
    try {
      setUpdatingUserStatusId(id);
      await dispatch(toggleUserStatusById({ id, isActive })).unwrap();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdatingUserStatusId(null);
    }
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
            disabled={row._id === updatingUserRoleById || row._id===authUser.id}
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
            disabled={updatingUserStatusId === row._id || row._id===authUser.id}
            onClick={() => toggleUserStatus(row._id, !row.isActive)}
          >
            {row.isActive ? "Inactive" : "Active"}
          </button>
        );
      },
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <DataTable
        columns={columns}
        data={users}
        loading={isFetchingUsers}
        emptyMessage="Users not found"
      />
    </div>
  );
}

export default AdminUserPage;
