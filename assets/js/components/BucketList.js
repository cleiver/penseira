import React, { useContext, useState } from "react";
import { BucketContext } from "../contexts/BucketContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

export default function BucketList() {
  const context = useContext(BucketContext);

  const [bucketItem, setBucketItem] = useState({ name: "", url: "" });
  const [showEdit, setShowEdit] = useState('');
  const [editItem, setEditItem] = useState({ name: "", url: "" });

  function handleItemNameChange(event) {
    setBucketItem({ ...bucketItem, name: event.target.value });
  }

  function handleItemUrlChange(event) {
    setBucketItem({ ...bucketItem, url: event.target.value });
  }

  function handleEditClick(index) {
    setEditItem({ name: "", url: "" });
    setShowEdit(index);
  }

  function handleSubmit(event) {
    event.preventDefault();
    context.createItem(bucketItem);
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                fullWidth={true}
                label="Novo item"
                value={bucketItem.name}
                onChange={handleItemNameChange}
              ></TextField>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth={true}
                label="Endereço"
                value={bucketItem.url}
                onChange={handleItemUrlChange}
              ></TextField>
            </TableCell>
            <TableCell align="right">
              <IconButton type="submit">
                <AddCircleIcon></AddCircleIcon>
              </IconButton>
            </TableCell>
          </TableRow>
          {context.bucket.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {showEdit === `${index}a` ? (
                  <TextField
                    value={item.name}
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CheckCircleIcon></CheckCircleIcon>
                          </IconButton>
                          <IconButton onClick={() => setShowEdit(null)}>
                            <HighlightOffIcon></HighlightOffIcon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                ) : (
                  <div onClick={() => handleEditClick(`${index}a`)}>{item.name}</div>
                )}
              </TableCell>
              <TableCell>
                {showEdit === `${index}b` ? (
                  <TextField
                    value={item.url}
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CheckCircleIcon></CheckCircleIcon>
                          </IconButton>
                          <IconButton onClick={() => setShowEdit(null)}>
                            <HighlightOffIcon></HighlightOffIcon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></TextField>
                ) : (
                  <div onClick={() => handleEditClick(`${index}b`)}>{item.url}</div>
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </form>
  );
}
