import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

//component
import Domain from "../Domain";
import HeroSection from "./HeroSection";
import "../App.css";

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
      {/* <button onClick={() => console.log(list, "list")}>add</button> */}
      <HeroSection />
      {list.map((data) => (
        <>
          <ul style={{ display: "flex", alignItems: "center" }}>
            <li>
              {data.dream_type === "Personal" ? (
                <Icon
                  icon="mdi:account"
                  color="#89cbf0"
                  style={{ fontSize: "50px" }}
                />
              ) : (
                <Icon
                  icon="ic:outline-business-center"
                  color="#89cbf0"
                  style={{ fontSize: "50px" }}
                />
              )}
            </li>
            <li>
              <h2>{data.dream}</h2>
            </li>
          </ul>
        </>
        // <div
        //   style={{
        //     display: "flex",
        //     alignItems: "center",
        //     // justifyContent: "center",
        //   }}
        // >
        //   <div style={{ flexGrow: "0.5" }}>
        //     {data.dream_type === "Personal" ? (
        //       <Icon
        //         icon="mdi:account"
        //         color="#89cbf0"
        //         style={{ fontSize: "50px" }}
        //       />
        //     ) : (
        //       <Icon
        //         icon="ic:outline-business-center"
        //         color="#89cbf0"
        //         style={{ fontSize: "50px" }}
        //       />
        //     )}
        //   </div>
        //   <div style={{ flexGrow: "1" }}>
        //     <h2>{data.dream}</h2>
        //   </div>
        //   {/* <ul>
        //     {data.dream_type === "Personal" ? (
        //       <div
        //         style={{
        //           borderRadius: "50px",
        //           border: "1px solid lightgrey",
        //         }}
        //       >
        //         <Icon
        //           icon="mdi:account"
        //           color="#89cbf0"
        //           style={{ fontSize: "50px" }}
        //         />
        //       </div>
        //     ) : (
        //       <div
        //         style={{
        //           border: "1px solid lightgrey",
        //           borderRadius: "50px",
        //           marginLeft: "25px",
        //         }}
        //       >
        //         {" "}
        //         <Icon
        //           icon="ic:outline-business-center"
        //           color="#89cbf0"
        //           style={{ fontSize: "50px" }}
        //         />
        //       </div>
        //     )}
        //     <li> </li>
        //   </ul>
        //   <ul>
        //     <li>{data.dream}</li>
        //   </ul> */}
        // </div>
      ))}

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
