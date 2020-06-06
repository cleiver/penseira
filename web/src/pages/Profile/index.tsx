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

import MainMenu from "../../components/MainMenu";

const Profile = () => {
  const history = useHistory();

  return (
    <>
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
              <span
                style={{ fontWeight: "bold", transform: "translateY(-1px)" }}
              >
                x
              </span>
            </Button>
          </WindowHeader>
          <WindowContent>
            <Fieldset label="Your account">
              <TextField
                placeholder="your email"
                value="your@email.com"
                onChange={() => {}}
              />
              <br />
              <Fieldset label="Reset password">
                <TextField
                  type="password"
                  placeholder="New password"
                  onChange={() => {}}
                />
                <TextField
                  type="password"
                  placeholder="Repeat password"
                  onChange={() => {}}
                />
              </Fieldset>
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
                  Update
                </Button>
              </div>
            </Fieldset>
          </WindowContent>
        </Window>
      </div>

      <MainMenu />
    </>
  );
};

export default Profile;
