import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  TextField,
  List,
  ListItem,
  Divider,
  Button,
} from "react95";

import logo from "../../assets/bucket.png";

const MainMenu = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <AppBar style={{ top: "unset", bottom: 0, zIndex: 100 }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          {open && (
            <List
              horizontalAlign="left"
              verticalAlign="top"
              open={open}
              onClick={handleClose}
            >
              <ListItem
                onClick={() => {
                  history.push("/profile");
                }}
              >
                🏦 Account
              </ListItem>
              <ListItem
                onClick={() => {
                  history.push("/throw");
                }}>🗑 Throw something</ListItem>
              <Divider />
              <ListItem
                onClick={() => {
                  history.push("/login");
                }}
              >
                👋 Logout
              </ListItem>
            </List>
          )}
          <Button
            onClick={handleClick}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src={logo}
              style={{ marginLeft: -2, marginRight: 4, height: 24 }}
            />
            Start
          </Button>
        </div>

        <TextField
          placeholder="Search..."
          width={150}
          style={{ marginLeft: 4 }}
          onClick={() => {
            history.push("/nope");
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default MainMenu;
