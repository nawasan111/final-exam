import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import PopupAlert from "@/components/PopupAlert";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "../_app";
import { AdminOrderContext } from "@/components/layout/AdminLayout";
import {
  Paper,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

export default function Order() {
  const user = useContext(UserContext);
  const adminOrder = useContext(AdminOrderContext);
  const [message, setMessage] = useState({ message: "", error: false });

  const onSendingChange = async (id, sending) => {
    try {
      let response = await axios.put(
        "/api/admin/order/sending",
        { id, sending },
        { headers: { token: user.value?.token } }
      );
      if (response.data.status === 301) {
        setMessage({ message: "อัพเดทสถานะการจัดส่งสำเร็จ", error: false });
        setTimeout(() => {
          setMessage({ message: "", error: false });
        }, 2000);
        adminOrder.fetch();
      }
    } catch (err) {
      console.error(err);
      setMessage({
        message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        error: true,
      });
      setTimeout(() => {
        setMessage({ message: "", error: true });
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>จัดการออเดอร์ | admin</title>
      </Head>

      <PopupAlert
        open={!!message.message.length}
        isError={message.error}
        message={message.message}
      />
      <Paper sx={{ p: 1, overflowX: "scroll" }}>
        {adminOrder.value?.length > 0 ? (
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "id",
                    "ราคาทั้งหมด",
                    "รายละเอียด",
                    "จำนวนสินค้า",
                    "ค่าส่ง",
                    "ชำระเงิน",
                    "การจัดส่ง",
                  ].map((label, idx) => (
                    <TableCell key={idx}>{label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {adminOrder.value.map(
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
                            <Button>รายละเอียด</Button>
                          </Link>
                        </TableCell>
                        <TableCell>{order.product_count}</TableCell>
                        <TableCell>{order.shipping_price}</TableCell>
                        <TableCell>
                          <Box color={order.pay_status ? "green" : "red"}>
                            {order.pay_status
                              ? "ชำระเงินแล้ว"
                              : "ยังไม่ชำระเงิน"}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <FormControl variant="standard">
                            <Select
                              value={Number(order.send_status)}
                              onChange={(e) => {
                                onSendingChange(
                                  Number(order.id),
                                  Number(e.target.value)
                                );
                              }}
                            >
                              <MenuItem value={0}>
                                <Box color="red">ยังไม่จัดส่ง</Box>
                              </MenuItem>
                              <MenuItem value={1}>
                                <Box color="orangered">กำลังจัดส่ง</Box>
                              </MenuItem>
                              <MenuItem value={2}>
                                <Box color="green">จัดส่งแล้ว</Box>
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </Box>
        ) : (
          <div className="text-center">
            {user.value?.token ? "รายการว่างเปล่า" : "คุณยังไม่ได้เข้าสู่ระบบ"}
          </div>
        )}
      </Paper>
    </>
  );
}
