import { Card, CardHeader, Divider, CardContent, Grid, TextField, CardActions, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { SET_MTA_ASSIGNATION_DETAIL_RESET } from 'src/redux/constant/mta.assignation.constant';
import { useState, useEffect } from 'react';


export const MTAAssignationDetail = (props) => {
  // const { data } = props;
  const dispatch = useDispatch();
  const { mta } = useSelector((state) => state.MTAAssignationDetail);

  const [mtaTransportName, setMTATransportName] = useState('');
  const [mtaDefinitionName, setMTADefinitionName] = useState('');
  const [mtaTransportParams, setMTATransportParams] = useState('');
  const [mtaDefinitionParams, setMTADefinitionParams] = useState('');
  const [mtaPublisherName, setPublisherName] = useState('');
  const [mtaListDefinitionName, setListDefinitionName] = useState('');

  useEffect(() => {
    if (mta) {
      setMTATransportName(mta.mta_transport_name);
      setMTADefinitionName(mta.mta_definition_name);
      setMTATransportParams(mta.mta_transport_params);
      setMTADefinitionParams(mta.mta_definition_params);
      setPublisherName(mta.publisher_name);
      setListDefinitionName(mta.list_definition_name);
    }
  }, [mta]);

  const handleBack = () => {
    Router.push({
      pathname: `/mta/assignation`,
    });
    dispatch({ type: SET_MTA_ASSIGNATION_DETAIL_RESET });
  };

  return (
    <Card sx={{ minWidth: 500 }}>
      <CardHeader
        title="MTA Assignation detail"
      />
      <Divider />
      <CardContent>
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
                label="MTA Transport name"
                type="text"
                value={mtaTransportName}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MTA Transport params"
                type="text"
                value={mtaTransportParams}
                multiline
                rows={5}
                disabled
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3} direction="row">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MTA Definition name"
                type="text"
                value={mtaDefinitionName}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MTA Definition params"
                type="text"
                value={mtaDefinitionParams}
                multiline
                rows={5}
                disabled
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3} direction="row">
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Publisher name"
                type="text"
                value={mtaPublisherName}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="List definition name"
                type="text"
                value={mtaListDefinitionName}
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', paddingRight: 3 }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
      </CardActions>
    </Card>
  );
};