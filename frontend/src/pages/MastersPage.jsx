import React, { useEffect, useState } from "react";
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

function MastersPage() {
  const [selectedType, setSelectedType] = useState(MASTER_TYPES.INDUSTRY);
  const [editingMaster, setEditingMaster] = useState(null);
  const dispatch = useDispatch();

  const {
    isCreatingMaster,
    isUpdatingMaster,
    error,
    masters = [],
    isFetchingMasters = null,
  } = useSelector((state) => state.masters);

  useEffect(() => {
    dispatch(fetchMastersData(selectedType));
  }, [dispatch, selectedType]);

  async function handleMasterForm(data) {
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
      await dispatch(updateMaster(master));
    } else {
      await dispatch(createMaster(master));
    }

    setEditingMaster(null);

    await dispatch(
      fetchMastersData(selectedType || MASTER_TYPES.CLIENT_STATUS),
    );
  }

  function handleEdit(value) {
    setEditingMaster(value);
  }

  async function handleDelete(data) {
    const resp = window.confirm("Confirm delete master");
    if (resp) {
      await dispatch(deleteMaster(data._id));
      await dispatch(
        fetchMastersData(selectedType || MASTER_TYPES.CLIENT_STATUS),
      );
    }
  }

  async function handleChangeMasterType(value) {
    setSelectedType(value);
  }

  return (
    <div style={{ textAlign: "left" }}>
      <select
        value={selectedType}
        onChange={(e) => {
          handleChangeMasterType(e.target.value);
          setEditingMaster(null);
        }}
      >
        {masterTypes.map((master) => (
          <option key={master} value={master}>
            {master}
          </option>
        ))}
      </select>
      <MastersForm
        isLoading={isCreatingMaster || isUpdatingMaster}
        onSubmit={handleMasterForm}
        editingMaster={editingMaster}
        onClickReset={() => setEditingMaster(null)}
      />
      {error && <span className="text-red-500">{error}</span>}
      {isFetchingMasters ? (
        "Loading..."
      ) : (
        <MastersTable
          onEdit={handleEdit}
          onDelete={handleDelete}
          masters={masters}
          loading={isFetchingMasters}
        />
      )}
    </div>
  );
}

export default MastersPage;
