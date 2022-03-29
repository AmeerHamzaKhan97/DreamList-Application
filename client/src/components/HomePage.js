import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

//component
import Domain from "../Domain";

function HomePage() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(`${Domain}/api/v1/dreamlist`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((respo) => setList(respo));
    // .then((respo) => console.log(respo));
  }, []);

  return (
    <>
      <button onClick={() => console.log(list, "list")}>add</button>
      {list.map((data) => (
        <ul>
          <li>{data.dream}</li>
        </ul>
      ))}

      <div style={{ display: "flex" }}>
        <div>
          <Icon icon="ic:outline-business-center" color="blue" />
        </div>
        <div>
          <h1>Bike</h1>
          <p>Date:2020</p>
        </div>
      </div>
      {/* <Icon /> */}
      <Icon
        icon="ri:add-circle-fill"
        color="#89cbf0"
        style={{
          fontSize: "90px",
          cursor: "pointer",
          position: "fixed",
          right: "25px",
          bottom: "40px",
        }}
        onClick={() => navigate("/add")}
      />
    </>
  );
}

export default HomePage;
