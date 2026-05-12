
import AppRoutes from "./routes/AppRoutes";
import { restoreSession } from "./features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(restoreSession());
  },[dispatch])

  return (
    <div className="App">
     <AppRoutes/>
    </div>
  );
}

export default App;
