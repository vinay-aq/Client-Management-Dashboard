import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  toggleUserStatusById,
  updateUserRoleById,
  optimisticallyUpdateUserRole,
} from "../features/users/userSlice";
import toast from "react-hot-toast";
import { AppTable, AppSelect, AppButton } from "../components/common";
import { ROLE_VALUES } from "../constants/roles";
import { fetchMastersData } from "../features/master/masterSlice";

function AdminUserPage() {
  const dispatch = useDispatch();
  const { users, isFetchingUsers, isUpdatingUserStatus } = useSelector(
    (state) => state.users,
  );
  const { user: authUser } = useSelector((state) => state.auth);
  const { masters: userRoles, isFetchingMasters: isFetchingRoles } =
    useSelector((state) => state.masters);

  const [updatingUserStatusId, setUpdatingUserStatusId] = useState(null);
  const [updatingUserRoleById, setUpdatingUserRoleById] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchMastersData("role"));
  }, [dispatch]);

  async function handleChangeRole(id, role) {
    const previousUser = users.find((user) => user.id === id);
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
          <>
            {!isFetchingRoles && userRoles && (
              <AppSelect
                onChange={(e) => handleChangeRole(row.id, row.roleId)}
                value={row.id}
                disabled={
                  row.id === updatingUserRoleById || row.id === authUser.id
                }
                options={userRoles.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
              >
                
              </AppSelect>
            )}
          </>
        );
      },
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => {
        return (
          <AppButton
            disabled={updatingUserStatusId === row.id || row.id === authUser.id}
            loading={isUpdatingUserStatus}
            onClick={() => toggleUserStatus(row.id, !row.isActive)}
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
