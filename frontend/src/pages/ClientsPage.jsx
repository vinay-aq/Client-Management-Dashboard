import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchClients } from "../features/clients/clientSlice";


function ClientsPage() {
   const dispatch = useDispatch();
   const {clients, loading, error} = useSelector(state => state.clients);

    console.log('clients page render')

   useEffect( ()=> {
      console.log('use effect render clients page')
    dispatch(fetchClients({page:1, limit: 10}))
   },[dispatch]);

   if(loading) return <h2>Loading...</h2>
   if(error) return <h2>{error}</h2>

   return (
    <div>
        <h2>Clients</h2>
        {clients.map(client => (
            <div key={client._id}>
                <div>{client.name}</div>
                <div>{client.email}</div>
            </div>
        ))}
    </div>
   )




}

export default ClientsPage;