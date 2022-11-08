/* eslint-disable no-lone-blocks */
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AllDevicesForCurrentUser } from '../../api/services/devices';
import { AllUsers } from '../../api/services/users';
import { getCurrentUser } from '../../app/store'

let columns = [];

const columnsUsers = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "username", label: "Username", minWidth: 170 },
  { id: "role", label: "Role", minWidth: 170 }
];

const columnsDevicesAdmin = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "user_username", label: "Associated user", minWidth: 170 },
  { id: "maximum_hourly_consumption", label: "Maximum hourly consumption", minWidth: 170 }
];

const columnsDevicesClient = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "maximum_hourly_consumption", label: "Maximum hourly consumption", minWidth: 170 }
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});
  

function BasicTable({entity}) {
  const classes = useStyles();
  const history = useHistory();
  const [items, setItems] = useState([]);
  const role = getCurrentUser().role;

  useEffect(() => {
    async function fetchItems() {
      switch (entity) {
        case 'users':
          setItems(await AllUsers());
          break;
        case 'devices':
          setItems(await AllDevicesForCurrentUser());
          break;
      }
    }
    setHeader();
    fetchItems();
  }, [entity]);

  const setHeader = () =>{
    switch (entity) {
      case 'users':
        columns = columnsUsers;
        break;
      case 'devices':
        if (getCurrentUser().role == 'Admin')
          columns = columnsDevicesAdmin;
        else
          columns = columnsDevicesClient;
        break;
    }
  };

  return (
    <Grid container>{items ? 
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {items
                  .map((item) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item.id}
                        onClick={() => {
                          switch (entity) {
                            case 'users':
                              history.push({
                                pathname: `/admin/user`,
                                state: { userId: item.id },
                              });
                              break;
                            case 'devices':
                              history.push({
                                pathname: `/${role.toLowerCase()}/device`,
                                state: { deviceId: item.id },
                              });
                              break;
                          }
                        }}
                      >
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {item[column.id]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
: <p>Loading table...</p>}
    </Grid>
  )
}

export default BasicTable
