import { Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, TextField } from '@mui/material';
import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { createFilter } from 'react-select';
import { updateMTADefinition } from './../../redux/actions/mta.definition.action';
import { getMTATransportList } from './../../redux/actions/mta.transport.action';
import JsonValidate from './../../validator/json';
import MenuList from './../select';

export const MTADefinitionDetail = (props) => {
  const { mta, isLoading } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mtaTransportId, setMTATransportId] = useState('');
  const [parameters, setParameters] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [maxRecipientsPerDay, setMaxRecipientsPerDay] = useState(0);

  const [validateRecipientPerDay, setValidateRecipientPerDay] = useState(false);
  const [validateParams, setValidateParams] = useState(false);

  const dispatch = useDispatch();
  const { listMTATransport } = useSelector((state) => state.MTATransport);

  // const { mta } = useSelector((state) => state.MTADefinitionDetail);

  useEffect(() => {
    if (listMTATransport.length === 0) {
      dispatch(getMTATransportList());
    }

    if (mta) {
      setName(mta.name);
      setDescription(mta.description);
      setIsActive(mta.is_active);
      setParameters(mta.parameters);
      setMTATransportId({
        value: mta.mta_transport.id,
        label: mta.mta_transport.name
      });
      setMaxRecipientsPerDay(mta.max_recipients_per_day);
    }
  }, [dispatch, listMTATransport, mta]);

  const selectMTATransport = useMemo(() => {
    if (listMTATransport.length > 0) {
      return listMTATransport.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listMTATransport]);

  const handleBack = () => {
    // dispatch({ type: SET_MTA_DEFINITION_DETAIL_RESET });
    Router.push({
      pathname: `/mta/definition`,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (maxRecipientsPerDay <= 0) {
      setValidateRecipientPerDay(true);
    } else if (!JsonValidate.isJSON(parameters)) {
      setValidateParams(true);
    } else {
      dispatch(updateMTADefinition({
        name,
        description,
        parameters,
        is_active: isActive,
        mta_transport_id: mtaTransportId.value,
        max_recipients_per_day: maxRecipientsPerDay
      }, mta.id));
      // dispatch({ type: SET_MTA_DEFINITION_DETAIL_RESET });
      Router.push({
        pathname: `/mta/definition`,
      });
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }} >
        <CardHeader
          title="MTA Definition detail"
        />
        <Divider />
        <CardContent>
          {isLoading ? 
          <Box sx={{
            display : 'flex',
            justifyContent: 'center'
          }}>
            <CircularProgress />
          </Box> 
            :
            <Grid
              container
              spacing={3}
              sx={{
                minWidth: 1000, minHeight: 250, "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                },
              }}
              direction="column"
            >
              <Grid container item spacing={3} direction="row">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Max recipents per day"
                    name="max_recipients_per_day"
                    onChange={(e) => setMaxRecipientsPerDay(e.target.value)}
                    type="number"
                    value={maxRecipientsPerDay}
                    required
                    error={validateRecipientPerDay}
                    helperText={validateRecipientPerDay && 'Must be greater than 0'}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  value={description}
                />
              </Grid>
              <Grid container item spacing={3} direction="row" >
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listMTATransport.length > 0 ? (
                    <Select
                      components={{ MenuList }}
                      options={selectMTATransport}
                      filterOption={createFilter({ ignoreAccents: false })}
                      value={mtaTransportId}
                      onChange={(e) => setMTATransportId(e)}
                      placeholder='Select MTA Transport'
                      isClearable={true}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isActive} onChange={(e) => { setIsActive(e.target.checked); }} name='is_active' />
                    }
                    label="Is active"
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label="Parameters"
                  name="parameters"
                  onChange={(e) => setParameters(e.target.value)}
                  type="text"
                  value={parameters}
                  multiline
                  rows={5}
                  error={validateParams}
                  helperText={validateParams && 'Must be JSON format'}
                />
              </Grid>
            </Grid>
            }
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', minHeight: 80, paddingRight: 3 }}>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type='submit' color='success'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};