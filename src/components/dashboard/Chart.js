import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { UserContext } from "@/pages/_app";
import { AdminOrderContext } from "../layout/AdminLayout";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

export default function Chart() {
  const theme = useTheme();
  const user = React.useContext(UserContext);
  const adminOrder = React.useContext(AdminOrderContext);
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("2023");

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (!user.value?.token || adminOrder.value.length === 0) return;
    const date = new Date(adminOrder.value[0].date);
    const date_all = [];
    const date_price = {};
    const month_now = date.toLocaleString("default", { month: "long" });
    const year_now = date.getFullYear();
    for (let i = 0; i < adminOrder.value.length; i++) {
      let d = new Date(adminOrder.value[i].date);
      let da = d.getDate();
      let m = date.toLocaleString("default", { month: "long" });
      let y = date.getFullYear();

      if (m === month_now && y === year_now) {
        if (!date_all.includes(da)) date_all.push(da);
        if (date_price[da]) {
          date_price[da] += Number(adminOrder.value[i].total_price);
        } else {
          date_price[da] = Number(adminOrder.value[i].total_price);
        }
      }
    }
    setMonth(month_now);
    setYear(year_now);
    date_all.reverse();
    let graph = [];
    date_all.map((dat) => {
      graph.push(createData(dat, date_price[dat]));
    });
    setData(graph);
  }, [user, adminOrder]);

  return (
    <React.Fragment>
      <Title>
        on {month}, {year}
      </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
