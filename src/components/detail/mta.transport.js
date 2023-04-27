import { Card, CardHeader, Divider, CardContent, Grid, TextField, CardActions, Button, MenuItem, FormControlLabel, Checkbox, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { listMTATransportType, updateMTATransport } from 'src/redux/actions/mta.transport.action';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import JsonValidate from './../../validator/json';
import { SET_MTA_TRANSPORT_DETAIL_RESET } from './../../redux/constant/mta.transport.constant';
import { setMTATransportDetail } from './../../redux/actions/mta.transport.action';
import { Box } from '@mui/system';

export const MTATransportDetail = (props) => {

  const { mta, isLoading } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [params, setParams] = useState('');

  const dispatch = useDispatch();
  const { mtaTransportTypeList } = useSelector((state) => state.MTATransportType);
  // const { mta } = useSelector((state) => state.MTATransportDetail);

  const [validateParams, setValidateParams] = useState(false);


  useEffect(() => {
    if (mta) {
      setName(mta.name);
      setDescription(mta.description);
      setType(mta.type);
      setIsActive(mta.is_active);
      setParams(mta.params);
    }

    if (mtaTransportTypeList.length === 0) {
      dispatch(listMTATransportType());
    }
  }, [dispatch, mtaTransportTypeList, mta]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (JsonValidate.isJSON(params)) {
      dispatch(updateMTATransport({
        name,
        description,
        params,
        is_active: isActive,
        type
      }, mta.id)
      );
      // dispatch({ type: SET_MTA_TRANSPORT_DETAIL_RESET });
      Router.push({
        pathname: `/mta/transport`,
      });
    } else {
      setValidateParams(true);
    }
  };

  const handleBack = () => {
    // dispatch({ type: SET_MTA_TRANSPORT_DETAIL_RESET });
    Router.push({
      pathname: `/mta/transport`,
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }} >
        <CardHeader
          title="MTA Transport detail"
        />
        <Divider />
        <CardContent>
          {isLoading ?
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </Box>
            : <Grid
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
                    type="text"
                    value={name}
                    onChange={((e) => setName(e.target.value))}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    type="text"
                    value={description}
                    onChange={((e) => setDescription(e.target.value))}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction="row">
                <Grid item xs={6}>
                  {mtaTransportTypeList.length > 0 ? (
                    <TextField
                      fullWidth
                      select
                      label="Type"
                      name="type"
                      onChange={((e) => setType(e.target.value))}
                      value={type}
                    >
                      {mtaTransportTypeList.map((e) => {
                        return (
                          <MenuItem key={e.id} value={e.name}>
                            {e.name}
                          </MenuItem>
                        );
                      })
                      }
                    </TextField>
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
                  label="Params"
                  type="text"
                  value={params}
                  onChange={((e) => setParams(e.target.value))}
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