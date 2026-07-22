import React from 'react'
import DataTable from '../table/DataTable';


function MasterTable() {
  return (
    <div style={{ textAlign: "center" }}>
      <DataTable
        columns={columns}
        data={users}
        loading={isFetchingUsers}
        emptyMessage="Users not found"
      />
    </div>
  )
}

export default MasterTable