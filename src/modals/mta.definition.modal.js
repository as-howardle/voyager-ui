import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, Modal, NativeSelect, TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createMTADefinition } from "src/redux/actions/mta.definition.action";
import { listMTATranport } from './../redux/actions/mta.transport.action';
import { CREATE_MTA_DEFINITION_RESET } from './../redux/constant/mta.definition.constant';
import { listMTADefinition } from './../redux/actions/mta.definition.action';

export const MTADefinitionModal = (props) => {
  const { isOpen, handleClose, modalData, isUpdate } = props;
  const dispatch = useDispatch();
  // const { mtaTransportTypeList } = useSelector((state) => state.MTATransportType);
  const { listMTATransport } = useSelector((state) => state.MTATransport);
  const { message, success, error } = useSelector((state) => state.createMTADefinition);
  // const { message: updateMessage, success: updateSuccess, error: errorUpdate } = useSelector((state) => state.updateMTATransport);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mtaTransportId, setMTATransportId] = useState('');
  const [parameters, setParameters] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [maxRecipientsPerDay, setMaxRecipientsPerDay] = useState(0);

  const [validtaeRecipientPerDay, setValidtaeRecipientPerDay] = useState(false);

  useEffect(() => {
    // async function setInitialValues() {
    //   if (isUpdate) {
    //     await formik.setValues(modalData.data, false);
    //   }
    //   else {
    //     formik.resetForm();
    //   }
    // }
    // setInitialValues();

    if (listMTATransport.length === 0) {
      dispatch(listMTATranport());
    }
    if (message !== '') {
      if (success) {
        if (success) {
          toast.success('Create successfully');
          dispatch({ type: CREATE_MTA_DEFINITION_RESET });

        }
        // if (updateMessage) {
        //   toast.success('Update successfully');
        //   dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
        // }
        dispatch(listMTADefinition());
      }
      if (error) {
        if (error) {
          toast.error('Create failed');
        }
        // if (errorUpdate) {
        //   toast.error('Update failed');
        // }
        dispatch({ type: CREATE_MTA_DEFINITION_RESET });
      }
    }
  }, [dispatch, listMTATransport, message, success, error]);
  //dispatch, message, success, isUpdate, modalData, updateMessage, updateSuccess, errorUpdate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (maxRecipientsPerDay <= 0) {
      setValidtaeRecipientPerDay(true);
    }
    else {
      dispatch(createMTADefinition({
        name,
        description,
        parameters,
        is_active: isActive,
        mta_transport_id: mtaTransportId,
        max_recipients_per_day: maxRecipientsPerDay
      }));
      setValidtaeRecipientPerDay(false);
      setName('');
      setDescription('');
      setParameters('');
      setIsActive(true);
      setMTATransportId('');
      setMaxRecipientsPerDay(0);
      handleClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <form onSubmit={handleSubmit}>
        <Card variant="outlined" sx={{ minWidth: 500 }}>
          <CardHeader
            title="Create MTA Transport"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ minWidth: 1000, minHeight: 250 }}
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
                    error={validtaeRecipientPerDay}
                    helperText={validtaeRecipientPerDay && 'Must be greater than 0'}
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
                <Grid item xs={6}>
                  {listMTATransport.length > 0 ? (
                    <FormControl fullWidth>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        MTA Transport
                      </InputLabel>
                      <NativeSelect
                        value={mtaTransportId}
                        onChange={(e) => setMTATransportId(e.target.value)}
                        inputProps={{
                          name: 'mta_transport_id',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value=""></option>
                        {listMTATransport.map((e) => {
                          return (
                            <option key={e.id} value={e.id}>
                              {e.name}
                            </option>
                          );
                        })
                        }
                      </NativeSelect>
                    </FormControl>
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
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type='submit'>
              {isUpdate ? 'Update' : 'Create'}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Modal>
  );
};