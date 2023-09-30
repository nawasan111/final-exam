import userCookie from "@/components/lib/userCookie";
import { useRouter } from "next/router";
import React from "react";

export default function Logout() {
  React.useEffect(() => {
    const usr = new userCookie();
    usr.delete();
    window.location.href = '/'
  }, []);
  return <div>Logout</div>;
}
