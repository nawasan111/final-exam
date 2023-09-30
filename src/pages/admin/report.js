import DashboardLayout from "@/components/dashboard/Dashboard";
import React from "react";
import { Grid, Paper } from "@mui/material";
import Chart from "@/components/dashboard/Chart";
import Deposits from "@/components/dashboard/Deposits";
import Orders from "@/components/dashboard/Orders";

export default function Report() {
  return (
    <main>
      <DashboardLayout>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
      </DashboardLayout>
    </main>
  );
}