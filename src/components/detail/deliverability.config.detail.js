import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogNotification from '../dialog';
import CONST from './../../const/general.const';
import {
  deleteDeliverabilityConfig,
  updateDeliverabilityConfig
} from './../../redux/actions/deliverability.action';
import { CustomSelect } from './../custom.select';

export const DeliverabilityConfigDetail = (props) => {
  const { config, isLoading } = props;

  const [weight, setWeight] = useState(0);
  const [mtaDefinitionId, setMtaDefinitionId] = useState(null);
  const [scope, setScope] = useState('glo');
  const [providerGroupId, setProviderGroupId] = useState(null);
  const [listDefinitionId, setListDefinitionId] = useState(null);
  const [publisherId, setPublisherId] = useState(null);
  const [recipientStatus, setRecipientStatus] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const { list: listDefinition } = useSelector((state) => state.listDefinitionDeliverability);
  const { list: listProvider } = useSelector((state) => state.listProvider);
  const { list: listDefinitionMTA } = useSelector((state) => state.MTADefinitionList);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);

  // const { mta } = useSelector((state) => state.MTADefinitionDetail);

  useEffect(() => {
    if (config) {
      setWeight(config.weight);
      setMtaDefinitionId({
        value: config.mta_definition.id,
        label: config.mta_definition.name
      });
      setScope({
        value: config.scope,
        label: config.scope
      });
      setProviderGroupId({
        value: config.provider_group ? config.provider_group.id : null,
        label: config.provider_group ? config.provider_group.name : null
      });
      setListDefinitionId({
        value: config.list_definition ? config.list_definition.id : null,
        label: config.list_definition ? config.list_definition.name : null
      });
      setPublisherId({
        value: config.publisher ? config.publisher.id : null,
        label: config.publisher ? config.publisher.account.name : null
      });
      setRecipientStatus({
        value: config.recipient_status ? config.recipient_status : null,
        label: config.recipient_status ? config.recipient_status : null
      });
    }
  }, [dispatch, config]);

  const selectMTADefinition = useMemo(() => {
    if (listDefinitionMTA.length > 0) {
      return listDefinitionMTA.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listDefinitionMTA]);

  const selectProviderGroup = useMemo(() => {
    if (listProvider.length > 0) {
      return listProvider.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listProvider]);

  const selectListDefinition = useMemo(() => {
    if (listDefinition.length > 0) {
      return listDefinition.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listDefinition]);

  const selectPublisher = useMemo(() => {
    if (listPublisher.length > 0) {
      return listPublisher.map((l) => ({
        value: l.id,
        label: l.account_name
      }));
    }
  }, [listPublisher]);

  const handleBack = () => {
    // dispatch({ type: SET_MTA_DEFINITION_DETAIL_RESET });
    Router.push({
      pathname: `/deliverability/config`
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateDeliverabilityConfig(
        {
          weight,
          mta_definition_id: mtaDefinitionId.value,
          scope: scope.value,
          provider_group_id: providerGroupId.value,
          list_definition_id: listDefinitionId.value,
          publisher_id: publisherId.value,
          recipient_status: recipientStatus.value
        },
        config.id
      )
    );
    Router.push({
      pathname: `/deliverability/config`
    });
  };

  const showDeleteDialog = () => {
    setOpenDialog(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteDeliverabilityConfig(
        config.id
      )
    );
    Router.push({
      pathname: `/deliverability/config`
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }}>
        <CardHeader title='Deliverability Config Detail' />
        <Divider />
        <CardContent sx={{ minHeight: 450 }}>
          {isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} sx={{ minWidth: 1000, minHeight: 250 }} direction='column'>
              <Grid container item spacing={3} direction='row'>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 1000
                  }}
                >
                  {listPublisher.length > 0 ? (
                    <CustomSelect
                      id='id-provider-group'
                      label='Publisher'
                      options={selectPublisher}
                      value={publisherId}
                      onChange={setPublisherId}
                      required={false}
                      isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 999
                  }}
                >
                  {listDefinitionMTA.length > 0 ? (
                    <CustomSelect
                      id='id-mta-definition'
                      label='MTA Definition'
                      options={selectMTADefinition}
                      value={mtaDefinitionId}
                      onChange={setMtaDefinitionId}
                      required={true}
                      isMulti={false}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 998
                  }}
                >
                  <CustomSelect
                    id='id-scope'
                    label='Scope'
                    options={CONST.DELIVERABILITY_SCOPE}
                    value={scope}
                    onChange={setScope}
                    required={true}
                    isMulti={false}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 998
                  }}
                >
                  <CustomSelect
                    id='id-recipient-status'
                    label='Recipient Status'
                    options={CONST.DELIVERABILITY_RECIPIENT_STATUS}
                    value={recipientStatus}
                    onChange={setRecipientStatus}
                    required={false}
                    isMulti={false}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 997
                  }}
                >
                  {listProvider.length > 0 ? (
                    <CustomSelect
                      id='id-provider-group'
                      label='Provider Group'
                      options={selectProviderGroup}
                      value={providerGroupId}
                      onChange={setProviderGroupId}
                      required={false}
                      isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative',
                    zIndex: 997
                  }}
                >
                  {listDefinition.length > 0 ? (
                    <CustomSelect
                      id='id-list-definition'
                      label='List Definition'
                      options={selectListDefinition}
                      value={listDefinitionId}
                      onChange={setListDefinitionId}
                      required={false}
                      isMulti={false}
                    />
                  ) : null}
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid
                  item
                  xs={6}
                  sx={{
                    position: 'relative'
                  }}
                >
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
          )}
        </CardContent>
        <Divider />
        <CardActions
          sx={{ justifyContent: 'space-between', minHeight: 80, paddingRight: 3, paddingLeft: 3 }}>
          <div>
            <Button variant='contained' color='error' onClick={showDeleteDialog}>
              Delete
            </Button>
          </div>
          <div>
            <Button variant='contained' onClick={handleBack} sx={{ marginRight: '10px' }}>
              Back
            </Button>
            <Button variant='contained' type='submit' color='success'>
              Update
            </Button>
          </div>
        </CardActions>
      </Card>
      <DialogNotification open={openDialog} handleClose={handleCloseDialog} title={'Warning'}
                          content={'Do you want to delete this?'} handleAccept={handleDelete} />
    </form>
  );
};
