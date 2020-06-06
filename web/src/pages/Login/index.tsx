import React from "react";
import { useHistory } from "react-router-dom";

import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Fieldset,
  TextField,
} from "react95";

const Login = () => {
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
              history.push("/nope");
            }}
          >
            <span style={{ fontWeight: "bold", transform: "translateY(-1px)" }}>
              x
            </span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <Fieldset label="Login">
            <TextField placeholder="your email" onChange={() => {}} />
            <TextField
              type="password"
              placeholder="your password"
              onChange={() => {}}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Button
                onClick={() => {
                  history.push("/");
                }}
              >
                Login
              </Button>
            </div>
          </Fieldset>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button onClick={()=>{history.push("/reset")}}>Reset Password</Button>
            <Button onClick={()=>{history.push("/register")}}>Register</Button>
          </div>
        </WindowContent>
      </Window>
    </div>
  );
};

export default Login;
