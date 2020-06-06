import React from "react";
import { useHistory } from "react-router-dom";

import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Fieldset,
  TextField,
  TextArea
} from "react95";

import MainMenu from "../../components/MainMenu";

const Throw = () => {
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
            <Fieldset label="Throw something in the bucket">
              <TextField placeholder="In which bucket?" onChange={() => {}} />
              <TextField placeholder="What is it?" onChange={() => {}} />
              <TextField placeholder="Whats the url?" onChange={() => {}} />
              <TextArea placeholder="Tell me more, please 🤔" onChange={()=>{}} />
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
                    history.push("/login");
                  }}
                >
                  Throw
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

export default Throw;
