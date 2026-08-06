import React from 'react'

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <h3>Role: {user?.role}</h3>
    </div>
  )
}

export default Dashboard;
