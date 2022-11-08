import React from 'react'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UpdateDevice, DestroyDeviceById } from '../../api/services/devices';
import { AllUsers } from '../../api/services/users';
import Select from 'react-select';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
  },
}));

function EditDevice({device}) {
  const history = useHistory();
  const classes = useStyles();
  const [description, setDescription] = useState(device.description);
  const [address, setAddress] = useState(device.address);
  const [maximumHourlyConsumption, setMaximumHourlyConsumption] = useState(device.maximum_hourly_consumption);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    setDescription(device.description);
    setAddress(device.address);
    setMaximumHourlyConsumption(device.maximum_hourly_consumption);

    async function fetchOptions() {
      const response = await AllUsers(true);

      setOptions(response.map((user) => {
        const option = { value: user.id, label: user.username };

        if (option.value == device.user_id) {
          setSelectedOption(option);
        }

        return option;
      }));
    }
    fetchOptions();
  }, [device]);

  async function save(event) {
    event.preventDefault();
    const res = await UpdateDevice(
      {
        id: device.id,
        user_id: selectedOption ? selectedOption.value : null,
        description: description,
        address: address,
        maximum_hourly_consumption: parseFloat(maximumHourlyConsumption)
      }
    )
    if (res) {
      alert("Update successful!");
    }
  }

  async function destroy() {
    DestroyDeviceById(device.id);
    history.push('/admin/devices');
  }
  
  return (
    <Container className={classes.container}>
      <form onSubmit={save}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              value={description}
              onInput={(e) => setDescription(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              value={address}
              onInput={(e) => setAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Maximum hourly consumption"
              name="maximum_hourly_consumption"
              variant="outlined"
              value={maximumHourlyConsumption}
              onInput={(e) => setMaximumHourlyConsumption(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              name="user_id"
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" type="submit" variant="contained">
              Save
            </Button>
            <Button color="primary" variant="contained" onClick={destroy}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default EditDevice
