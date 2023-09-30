import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_app";
import axios from "axios";

export default function Member() {
  const user = useContext(UserContext);
  const [userAll, setUserAll] = useState([]);

  async function fetchApi() {
    try {
      let response = await axios.get("/api/admin/user", {
        headers: { token: user.value.token },
      });
      console.log(response.data);
      setUserAll(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <div>
      {userAll.map((usr, idx) => (
        <div key={idx}>
          {usr.name}@{usr.username} {usr.email}
        </div>
      ))}
      <button onClick={fetchApi}>submit</button>
    </div>
  );
}
