import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserById } from "../../api/services/users";
import EditUser from '../../components/admin/EditUser';

const User = () => {
  const location = useLocation();
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await UserById(location.state.userId);
      setUser(data);
    }
    fetchData();
  }, [location.state.userId]);

  return (
    <div>
      <EditUser user={user}></EditUser>
    </div>
  )
}

export default User
