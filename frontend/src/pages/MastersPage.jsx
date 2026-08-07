import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MastersTable from "../components/master/MastersTable";
import {
  fetchMastersData,
  createMaster,
  updateMaster,
  deleteMaster,
} from "../features/master/masterSlice";
import MastersForm from "../components/master/MastersForm";
import { masterTypes, MASTER_TYPES } from "../ constants/masterTypes";
import toast from "react-hot-toast";
import AppSelect from "../components/common/AppSelect";
import ConfirmDialog from "../components/common/ConfirmDialog";
import PageHeader from "../components/common/PageHeader";

function MastersPage() {
  const [selectedType, setSelectedType] = useState(MASTER_TYPES.INDUSTRY);
  const [editingMaster, setEditingMaster] = useState(null);
  const [masterToDelete, setMasterToDelete] = useState(null);
  const dispatch = useDispatch();

  const {
    isCreatingMaster,
    isUpdatingMaster,
    isDeletingMaster,
    masters = [],
    isFetchingMasters = null,
  } = useSelector((state) => state.masters);

  const refreshMasters = useCallback(async () => {
    try {
      await dispatch(fetchMastersData(selectedType)).unwrap();
    } catch (err) {
      toast.error(err || "Could not fetch Masters list");
    }
  }, [selectedType, dispatch]);

  useEffect(() => {
    refreshMasters();
  }, [refreshMasters]);

  /** the function of handle master is variied based on the hosting and closure and tempo.    */

  async function handleMasterForm(data) {
    try {
      let master = {
        type: selectedType,
        value: data.value,
        description: data.description,
      };
      if (editingMaster) {
        master = {
          ...master,
          id: editingMaster._id,
        };
        await dispatch(updateMaster(master)).unwrap();
        toast.success("Master updated successfully");
      } else {
        await dispatch(createMaster(master)).unwrap();
        toast.success("Master created successfully");
      }

      setEditingMaster(null);
    } catch (err) {
      toast.error(err || "Something went wrong");
    }

    await refreshMasters();
  }

  function handleEdit(value) {
    setEditingMaster(value);
  }

  async function handleDelete() {
    if (!masterToDelete) return;

    try {
      await dispatch(deleteMaster(masterToDelete._id)).unwrap();
      toast.success("Master deleted successfully");
      setMasterToDelete(null);
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
    await refreshMasters();
  }

  async function handleChangeMasterType(value) {
    setSelectedType(value);
  }

  return (
    <div style={{ textAlign: "left" }}>
      <PageHeader
        title="Masters"
        subtitle="Manage all the configrable masters data, used throughout the application"
      />
      <AppSelect
        label="Master Type"
        value={selectedType}
        options={masterTypes.map((m) => ({ label: m, value: m }))}
        onChange={(e) => {
          handleChangeMasterType(e.target.value);
          setEditingMaster(null);
        }}
      />
      <MastersForm
        isLoading={isCreatingMaster || isUpdatingMaster}
        onSubmit={handleMasterForm}
        editingMaster={editingMaster}
        onClickReset={() => setEditingMaster(null)}
      />
      {isFetchingMasters ? (
        "Loading..."
      ) : (
        <MastersTable
          onEdit={handleEdit}
          onDelete={(data) => setMasterToDelete(data)}
          masters={masters}
          loading={isFetchingMasters}
        />
      )}
      <ConfirmDialog
        open={!!masterToDelete}
        title="Confirm Action"
        message={
          masterToDelete
            ? `Are you sure you want to delete master ${masterToDelete?.value} ? The action could not be undone`
            : ""
        }
        confirmText="Confirm"
        cancelText="Cancel"
        loading={isDeletingMaster}
        onConfirm={handleDelete}
        onClose={() => setMasterToDelete(null)}
      />
    </div>
  );
}

export default MastersPage;
