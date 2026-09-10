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

  async function handleChangeRole({ id, roleId, role }) {
    const previousUser = users.find((user) => user.id === id);
    const previousUserRoleId = previousUser.roleId;
    const previousUserRoleName = previousUser.role;

    try {
      dispatch(optimisticallyUpdateUserRole({ id, role, roleId }));
      setUpdatingUserRoleById(id);
      await dispatch(updateUserRoleById({ id, roleId })).unwrap();
      toast.success("Role updated successfully");
    } catch (err) {
      dispatch(
        optimisticallyUpdateUserRole({
          id,
          role: previousUserRoleName,
          roleId: previousUserRoleId,
        }),
      );
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
        const roleOptions = userRoles?.map((role) => ({
          value: role.id,
          label: role.name,
        }));

        return (
          <>
            {!isFetchingRoles && userRoles && (
              <AppSelect
                onChange={(e) => {
                  const selectedRole = userRoles.find(
                    (role) => role.value === e.target.value,
                  );

                  handleChangeRole({
                    id: row.id,
                    roleId: Number(e.target.value),
                    role: selectedRole,
                  });
                }}
                value={row.roleId}
                disabled={
                  row.id === updatingUserRoleById || row.id === authUser.id
                }
                options={roleOptions}
              ></AppSelect>
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
