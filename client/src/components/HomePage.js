import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Icon />
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
