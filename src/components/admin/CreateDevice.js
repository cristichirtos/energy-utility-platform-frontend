import React, { useEffect } from 'react'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Create } from '../../api/services/devices';
import { AllUsers } from '../../api/services/users';
import Select from 'react-select';

function CreateDevice() {
  const location = useLocation();
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [maximumHourlyConsumption, setMaximumHourlyConsumption] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchOptions() {
      const response = await AllUsers(true);

      setOptions(response.map((user) => ({value: user.id, label: user.username})));
    }
    fetchOptions();
  }, [location.state]);
  
  async function save(event) {
    event.preventDefault();

    const result = await Create(
      {
        address: address,
        user_id: selectedOption ? selectedOption.value : null,
        description: description,
        address: address,
        maximum_hourly_consumption: parseFloat(maximumHourlyConsumption)
      }
    )

    if (result) {
      alert("Device created!");
    }
  }

  return (
    <Container>
      <form onSubmit={save}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              onInput={(e) => setDescription(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              onInput={(e) => setAddress(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Maximum hourly consumption"
              name="maximum_hourly_consumption"
              variant="outlined"
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
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default CreateDevice
