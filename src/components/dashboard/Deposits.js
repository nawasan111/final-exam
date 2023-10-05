import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { AdminOrderContext } from "../layout/AdminLayout";
import { UserContext } from "@/pages/_app";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [totalSelling, setTotalSelling] = React.useState(0);
  const adminOrder = React.useContext(AdminOrderContext);
  const user = React.useContext(UserContext);
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("2023");

  React.useEffect(() => {
    if (!user.value?.token || adminOrder.value.length === 0) return;
    let total = 0;
    const date = new Date(adminOrder.value[0].date);
    const month_now = date.toLocaleString("default", { month: "long" });
    const year_now = date.getFullYear();
    for (let i = 0; i < adminOrder.value.length; i++) {
      let d = new Date(adminOrder.value[i].date);
      let m = date.toLocaleString("default", { month: "long" });
      let y = date.getFullYear();
      if (m === month_now && y === year_now) {
        total += Number(adminOrder.value[i].total_price);
      }
    }
    setMonth(month_now)
    setYear(year_now)
    setTotalSelling(total);
  }, [user]);

  return (
    <React.Fragment>
      <Title>ยอดขายทั้งหมด</Title>
      <Typography component="p" variant="h4">
        ${Number(totalSelling).toLocaleString()}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {month}, {year} 
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
