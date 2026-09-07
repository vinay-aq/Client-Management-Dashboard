import { fetchMastersData } from "../../features/master/masterSlice";
import { useEffect, useState } from "react";
import { MASTER_TYPES } from "../../constants/masterTypes";
import { useDispatch } from "react-redux";

function useClientMasters() {
  const [mastersData, setMastersData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const masteresData = await Promise.all([
        dispatch(fetchMastersData(MASTER_TYPES.CLIENT_TYPE)),
        dispatch(fetchMastersData(MASTER_TYPES.CLIENT_STATUS)),
        dispatch(fetchMastersData(MASTER_TYPES.CLIENT_INDUSTRY)),
      ]);

      setMastersData(masteresData);
    })();
  }, []);
  return mastersData;
}

export default useClientMasters;
