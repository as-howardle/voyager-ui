import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Modal,
  TextField
} from '@mui/material';
import { CustomSelect } from '../components/custom.select.js';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CONST from '../const/general.const';
import { createDeliverabilityConfig } from '../redux/actions/deliverability.action';

export const DeliverabilityConfigModal = (props) => {
  const { isOpen, handleClose } = props;
  const dispatch = useDispatch();

  const {
    list: listDefinition
  } = useSelector((state) => state.listDefinitionDeliverability);
  const { list: listProvider } = useSelector((state) => state.listProvider);
  const { list: listDefinitionMTA } = useSelector((state) => state.MTADefinitionList);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);

  const [weight, setWeight] = useState(0);
  const [mtaDefinitionId, setMtaDefinitionId] = useState('');
  const [scope, setScope] = useState('glo');
  const [providerGroupId, setProviderGroupId] = useState('');
  const [listDefinitionId, setListDefinitionId] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [recipientStatus, setRecipientStatus] = useState('');

  const selectMTADefinition = useMemo(() => {
    if (listDefinitionMTA.length > 0) {
      return listDefinitionMTA.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listDefinitionMTA]);

  const selectProviderGroup = useMemo(() => {
    if (listProvider.length > 0) {
      return listProvider.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listProvider]);

  const selectListDefinition = useMemo(() => {
    if (listDefinition.length > 0) {
      return listDefinition.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listDefinition]);

  const selectPublisher = useMemo(() => {
    if (listPublisher.length > 0) {
      return listPublisher.map(l => ({
        value: l.id,
        label: l.account_name
      }));
    }
  }, [listPublisher]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDeliverabilityConfig({
      weight,
      mta_definition_id: mtaDefinitionId.value,
      scope: scope.value,
      provider_group_id: providerGroupId.value,
      list_definition_id: listDefinitionId.value,
      publisher_id: publisherId.value,
      recipient_status: recipientStatus.value
    }));
    setWeight(0);
    setMtaDefinitionId('');
    setScope('');
    setProviderGroupId('');
    setListDefinitionId('');
    setPublisherId('');
    setRecipientStatus('');
    handleClose();
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
            title='Create Deliverability Config'
          />
          <Divider />
          <CardContent sx={{ minHeight: 450 }}>
            <Grid
              container
              spacing={3}
              sx={{ minWidth: 1000, minHeight: 250 }}
              direction='column'
            >
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 1000
                }}>
                  {listPublisher.length > 0 ? (
                    <CustomSelect id='id-provider-group'
                                  label='Publisher'
                                  options={selectPublisher}
                                  value={publisherId} onChange={setPublisherId}
                                  required={false}
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listDefinitionMTA.length > 0 ? (
                    <CustomSelect id='id-mta-definition'
                                  label='MTA Definition'
                                  options={selectMTADefinition}
                                  value={mtaDefinitionId} onChange={setMtaDefinitionId}
                                  required={true}
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 998
                }}>
                  <CustomSelect id='id-scope'
                                label='Scope'
                                options={CONST.DELIVERABILITY_SCOPE}
                                value={scope} onChange={setScope}
                                required={true}
                                isMulti={false}
                  />
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 998
                }}>
                  <CustomSelect id='id-recipient-status'
                                label='Recipient Status'
                                options={CONST.DELIVERABILITY_RECIPIENT_STATUS}
                                value={recipientStatus} onChange={setRecipientStatus}
                                required={false}
                                isMulti={false}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 997
                }}>
                  {listProvider.length > 0 ? (
                    <CustomSelect id='id-provider-group'
                                  label='Provider Group'
                                  options={selectProviderGroup}
                                  value={providerGroupId} onChange={setProviderGroupId}
                                  required={false}
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 997
                }}>
                  {listDefinition.length > 0 ? (
                    <CustomSelect id='id-list-definition'
                                  label='List Definition'
                                  options={selectListDefinition}
                                  value={listDefinitionId} onChange={setListDefinitionId}
                                  required={false}
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative'
                }}>
                  <TextField
                    fullWidth
                    label='Weight'
                    name='weight'
                    onChange={(e) => setWeight(e.target.value)}
                    type='number'
                    value={weight}
                    required
                  />
                </Grid>
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