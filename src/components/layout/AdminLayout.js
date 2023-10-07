import React, { createContext, useContext, useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import { Box } from "@mui/material";
import { Toolbar } from "@mui/material";
import axios from "axios";
import { UserContext } from "@/pages/_app";

export const AdminOrderContext = createContext(null);

export default function AdminLayout({ children }) {
  const user = useContext(UserContext);
  const [adminOrder, setAdminOrder] = useState([]);

  const fetchAdminOrder = async () => {
    try {
      if (!user.value?.token) return;
      let response = await axios.get("/api/admin/order", {
        headers: { token: user.value.token },
      });
      setAdminOrder(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdminOrder();
  }, [user]);
  return (
    <>
      <AdminOrderContext.Provider
        value={{
          value: adminOrder,
          set: setAdminOrder,
          fetch: fetchAdminOrder,
        }}
      >
        <AdminNavbar />
        <Box>
          {/* <Sidebar /> */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </AdminOrderContext.Provider>
    </>
  );
}
