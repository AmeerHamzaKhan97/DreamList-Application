import React from "react";
import { Icon } from "@iconify/react";
function HomePage() {
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
        onClick={() => console.log("working...")}
      />
    </>
  );
}

export default HomePage;
