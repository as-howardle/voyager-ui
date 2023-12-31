import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Modal,
  TextField
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createMTADefinition } from 'src/redux/actions/mta.definition.action';
import { getMTATransportList } from './../redux/actions/mta.transport.action';
import { CREATE_MTA_DEFINITION_RESET } from './../redux/constant/mta.definition.constant';
import { listMTADefinition } from './../redux/actions/mta.definition.action';
import JsonValidate from './../validator/json';
import { CustomSelect } from '../components/custom.select.js';

export const MTADefinitionModal = (props) => {
  const { isOpen, handleClose, modalData, isUpdate } = props;
  const dispatch = useDispatch();
  // const { mtaTransportTypeList } = useSelector((state) => state.MTATransportType);
  const { listMTATransport } = useSelector((state) => state.MTATransport);
  const { message, success, error } = useSelector((state) => state.createMTADefinition);
  const {
    message: updateMessage,
    success: successUpdate,
    error: errorUpdate
  } = useSelector((state) => state.updateMTADefinition);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mtaTransportId, setMTATransportId] = useState('');
  const [parameters, setParameters] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [maxRecipientsPerDay, setMaxRecipientsPerDay] = useState(0);

  const [validateRecipientPerDay, setValidateRecipientPerDay] = useState(false);
  const [validateParams, setValidateParams] = useState(false);

  const selectMTATransport = useMemo(() => {
    if (listMTATransport.length > 0) {
      return listMTATransport.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listMTATransport]);

  useEffect(() => {

    if (listMTATransport.length === 0) {
      dispatch(getMTATransportList());
    }
    if (message !== '') {
      if (success) {
        if (success) {
          toast.success('Create successfully');
          dispatch({ type: CREATE_MTA_DEFINITION_RESET });

        }
        dispatch(listMTADefinition());
      }
      if (error || errorUpdate) {
        if (error) {
          toast.error('Create failed');
          dispatch({ type: CREATE_MTA_DEFINITION_RESET });
        }
      }
    }
  }, [dispatch, listMTATransport, message, success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (maxRecipientsPerDay <= 0) {
      setValidateRecipientPerDay(true);
    } else if (!JsonValidate.isJSON(parameters)) {
      setValidateParams(true);
    } else {
      dispatch(createMTADefinition({
        name,
        description,
        parameters,
        is_active: isActive,
        mta_transport_id: mtaTransportId.value,
        max_recipients_per_day: maxRecipientsPerDay
      }));
      setValidateRecipientPerDay(false);
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
        <Card variant='outlined' sx={{ minWidth: 500 }}>
          <CardHeader
            title='Create MTA Definition'
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ minWidth: 1000, minHeight: 250 }}
              direction='column'
            >
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Name'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    value={name}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Max recipents per day'
                    name='max_recipients_per_day'
                    onChange={(e) => setMaxRecipientsPerDay(e.target.value)}
                    type='number'
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
                  label='Description'
                  name='description'
                  onChange={(e) => setDescription(e.target.value)}
                  type='text'
                  value={description}
                />
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listMTATransport.length > 0 ? (
                    <CustomSelect id='id-mta-transport'
                                  options={selectMTATransport}
                                  value={mtaTransportId} onChange={setMTATransportId}
                                  placeHolder='Select MTA Transport' required={true} isMulti={false}
                    />
                    // <Select
                    //   components={{ MenuList }}
                    //   options={selectMTATransport}
                    //   filterOption={createFilter({ ignoreAccents: false })}
                    //   value={mtaTransportId}
                    //   onChange={(e) => setMTATransportId(e)}
                    //   placeholder='Select MTA Transport'
                    //   isClearable={true}
                    // />
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={isActive}
                                onChange={(e) => { setIsActive(e.target.checked); }}
                                name='is_active' />
                    }
                    label='Is active'
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Parameters'
                  name='parameters'
                  onChange={(e) => setParameters(e.target.value)}
                  type='text'
                  value={parameters}
                  multiline
                  rows={5}
                  error={validateParams}
                  helperText={validateParams && 'Must be JSON format'}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant='contained' color='error' onClick={handleClose}>
              Close
            </Button>
            <Button variant='contained' type='submit' color='success'>
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Modal>
  );
};