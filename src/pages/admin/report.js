import React from "react";
import { Grid, Paper } from "@mui/material";
import Chart from "@/components/dashboard/Chart";
import Deposits from "@/components/dashboard/Deposits";
import Orders from "@/components/dashboard/Orders";
import Head from "next/head";

export default function Report() {
  return (
    <>
      <Head>
        <title>รายงาน | admin</title>
      </Head>
      <Grid sx={{maxWidth: 1080, mx: "auto"}} container spacing={3}>
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
    </>
  );
}
