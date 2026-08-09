import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  toggleUserStatusById,
  updateUserRoleById,
  optimisticallyUpdateUserRole,
} from "../features/users/userSlice";
import toast from "react-hot-toast";
import { AppTable, AppSelect, AppButton } from "../components/common";
import { ROLE_VALUES } from "../ constants/roles";

function AdminUserPage() {
  const dispatch = useDispatch();
  const { users, isFetchingUsers, isUpdatingUserStatus } = useSelector(
    (state) => state.users,
  );
  const { user: authUser } = useSelector((state) => state.auth);

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
      toast.success("User status updated");
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
          <AppSelect
            onChange={(e) => handleChangeRole(row._id, e.target.value)}
            value={row.role}
            disabled={
              row._id === updatingUserRoleById || row._id === authUser.id
            }
            options={ROLE_VALUES.map((role) => ({ value: role, label: role }))}
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </AppSelect>
        );
      },
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => {
        return (
          <AppButton
            disabled={
              updatingUserStatusId === row._id || row._id === authUser.id
            }
            loading={isUpdatingUserStatus}
            onClick={() => toggleUserStatus(row._id, !row.isActive)}
          >
            {row.isActive ? "Inactive" : "Active"}
          </AppButton>
        );
      },
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <AppTable
        columns={columns}
        rows={users ? users : []}
        loading={isFetchingUsers}
        emptyMessage="Users not found"
      />
    </div>
  );
}

export default AdminUserPage;
