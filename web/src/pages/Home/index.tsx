import React from "react";
import { useHistory } from "react-router-dom";

import MainMenu from "../../components/MainMenu";
import {
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
} from "react95";
import { Container } from "./styles";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <MainMenu />
      <Container>
          <Window style={{ width: 800 }}>
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
              >
                <span
                  style={{ fontWeight: "bold", transform: "translateY(-1px)" }}
                >
                  x
                </span>
              </Button>
            </WindowHeader>
            <WindowContent>
              <Table>
                <TableHead>
                  <TableRow head>
                    <TableHeadCell>Bucket</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>URL</TableHeadCell>
                    <TableHeadCell>Description</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableDataCell>design</TableDataCell>
                    <TableDataCell>Favicon</TableDataCell>
                    <TableDataCell>favicon.com</TableDataCell>
                    <TableDataCell>favicon generator</TableDataCell>
                  </TableRow>
                  <TableRow>
                    <TableDataCell>design</TableDataCell>
                    <TableDataCell>Favicon</TableDataCell>
                    <TableDataCell>favicon.com</TableDataCell>
                    <TableDataCell>favicon generator</TableDataCell>
                  </TableRow>
                  <TableRow>
                    <TableDataCell>design</TableDataCell>
                    <TableDataCell>Favicon</TableDataCell>
                    <TableDataCell>favicon.com</TableDataCell>
                    <TableDataCell>favicon generator</TableDataCell>
                  </TableRow>
                </TableBody>
              </Table>
            </WindowContent>
          </Window>
      </Container>
    </>
  );
};

export default Home;
