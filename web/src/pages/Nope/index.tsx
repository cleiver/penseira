import React from "react";
import { useHistory } from "react-router-dom";

import {
  Window,
  WindowContent,
  WindowHeader,
  Button
} from "react95";

import nope from "../../assets/nope.gif";

const Nope = () => {
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Window style={{ width: 400 }}>
        <WindowHeader
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>bucket.exe</span>
          <Button
            style={{ marginRight: "-6px", marginTop: "1px" }}
            size={"sm"}
            square
            onClick={() => {
              history.push("/");
            }}
          >
            <span style={{ fontWeight: "bold", transform: "translateY(-1px)" }}>
              x
            </span>
          </Button>
        </WindowHeader>
        <WindowContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={nope} alt="Not today" />
        </WindowContent>
      </Window>
    </div>
  );
};

export default Nope;
