import { useRouter } from "next/router";
import React from "react";

export default function OrderDetail() {
  const router = useRouter();
  console.log(router.query);
  return <div>OrderDetail</div>;
}
