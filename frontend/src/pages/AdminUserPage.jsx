import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, toggleUserStatusById, updateUserRoleById } from "../features/users/userSlice";
import DataTable from "../components/table/DataTable";
import { ROLES } from "../utils/permissions";

function AdminUserPage() {
  const dispatch = useDispatch();
  const { users, isFetchingUsers, isUpdatingUserRole, isUpdatingUserStatus } =
    useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  async function handleChangeRole(e) {
    await updateUserRoleById({id, role: e.target.value});
  }

  function toggleUserStatus(isActive) {
    await updateUserRoleById({id, isActive});
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
      header: "Phone",
      accessor: "phone",
    },
    {
      header: "Status",
      accessor: "status",
    },
    {
        header: 'role',
        accessor: (row) => {
            return (
                <select onChange={handleChangeRole} value={row.role}>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </select>
            )
        }
    },
     {
        header: 'is Active',
        accessor: (row) => {
            return  <button disabled={isUpdatingUserRole} onClick={() => toggleUserStatus(!row.isActive)}>{row.isActive ? "Inactive":"Active"}</button>
        }
    }
  ];

  return (
    <div>
      <DataTable
        columns
        data={users}
        loading={isFetchingUsers || isUpdatingUserRole || isUpdatingUserStatus}
        emptyMessage="Users not found"
      />
    </div>
  );
}

export default AdminUserPage;
