import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Grid, Typography } from "@mui/material";

const Analytycs = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const totalAmount = users?.reduce(
    (acc, currentItem) => acc + currentItem.Amount,
    0
  );
  const totalFood = users
    ?.filter((val) => val.Cause == "Food")
    ?.reduce((acc, currentItem) => acc + currentItem.Amount, 0);
  const totalEducation = users
    ?.filter((val) => val.Cause == "Education")
    ?.reduce((acc, currentItem) => acc + currentItem.Amount, 0);
  const totalHealth = users
    ?.filter((val) => val.Cause == "Health")
    ?.reduce((acc, currentItem) => acc + currentItem.Amount, 0);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div style={{ marginTop: 100, padding: "0 2rem", marginBottom: 20 }}>
      <Grid container gap={2} mb={5}>
        <Grid
          item
          xs={12}
          lg={2}
          sm={3}
          sx={{
            border: 1,
            borderColor: "silver",
            height: "10rem",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" alignSelf={"center"}>
            Education
          </Typography>
          <Typography variant="body2" color="gray">
            {totalEducation}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sm={3}
          sx={{
            border: 1,
            borderColor: "silver",
            height: "10rem",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Health</Typography>
          <Typography variant="body2" color="gray">
            {totalHealth}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sm={3}
          sx={{
            border: 1,
            borderColor: "silver",
            height: "10rem",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Food</Typography>
          <Typography variant="body2" color="gray">
            {totalFood}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          lg={2}
          sm={3}
          sx={{
            border: 1,
            borderColor: "silver",
            height: "10rem",
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Total</Typography>
          <Typography variant="body2" color="gray">
            {totalAmount}
          </Typography>
        </Grid>
      </Grid>
      <Grid container gap={2}>
        <Grid item lg={5} xs={12}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={users}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="Amount"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} lg={5}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={users}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="Amount" fill="#4B0082" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytycs;
