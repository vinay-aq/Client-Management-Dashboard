import React, { useEffect } from "react";
import DataTable from "../components/table/DataTable";
import { useSelector, useDispatch } from "react-redux";
import MastersTable from "../components/master/MastersTable";
import { fetchMastersData } from "../features/master/masterSlice";


function MastersPage() {

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchMastersData("clientStatus"));
  },[dispatch]);



  return (
    <div style={{ textAlign: "center" }}>
      <MastersTable />
    </div>
  );
}

export default MastersPage;
