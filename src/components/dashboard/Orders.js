import * as React from "react";
import Link from "next/link";
import { Box, Button, FormControl, Select, MenuItem } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { UserContext } from "@/pages/_app";
import { AdminOrderContext } from "../layout/AdminLayout";
import axios from "axios";

export default function Orders() {
  const adminOrder = React.useContext(AdminOrderContext);
  const [orderRecent, setOrderRecent] = React.useState([]);
  const [userAll, setUserAll] = React.useState([]);

  React.useEffect(() => {
    let order_r = [];
    for (let i = 0; i < adminOrder.value.length && order_r.length < 5; i++) {
      order_r.push(adminOrder.value[i]);
    }
    setOrderRecent(order_r);
  }, [adminOrder]);

  React.useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        setUserAll(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Title>ออเดอร์ล่าสุด</Title>
      <div className="overflow-x-scroll">
        <Table size="small">
          <TableHead>
            <TableRow>
              {[
                "id",
                "ราคาทั้งหมด",
                "วันที่",
                "ผู้ซื้อ",
                "ค่าส่ง",
                "ชำระเงิน",
              ].map((label, idx) => (
                <TableCell key={idx}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderRecent.map(
              (order, idx) =>
                order && (
                  <TableRow key={idx}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <Box color="orangered">
                        ${Number(order.total_price).toLocaleString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Link href={"/admin/order/" + order.id}>
                        {new Date(order.date).toLocaleString()}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {userAll.length
                        ? userAll?.filter((usr) => usr.id === order.user_id)[0]
                            .name ?? "undifined"
                        : "undifined"}
                    </TableCell>
                    <TableCell>${order.shipping_price}</TableCell>
                    <TableCell>
                      <Box color={order.pay_status ? "green" : "red"}>
                        {order.pay_status ? "ชำระเงินแล้ว" : "ยังไม่ชำระเงิน"}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </div>
      <Box sx={{ pt: 2 }}>
        <Link className="text-blue-600" href="/admin/order">
          ดูออเดอร์ทั้งหมด
        </Link>
      </Box>
    </React.Fragment>
  );
}
