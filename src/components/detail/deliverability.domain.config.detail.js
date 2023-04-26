import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader, CircularProgress,
  Divider, Grid,
  TextField
} from "@mui/material";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DialogNotification from "../dialog";
import CONST from "./../../const/general.const";
import { deleteDeliverabilityConfig, updateDeliverabilityConfig } from "./../../redux/actions/deliverability.action";
import { CustomSelect } from "./../custom.select";
import { deleteDeliverabilityDomainConfig, updateDeliverabilityDomainConfig } from './../../redux/actions/deliverability.domain.action';

export const DeliverabilityDomainConfigDetail = (props) => {
  const { config, isLoading } = props;

  const [mtaDefinitionId, setMtaDefinitionId] = useState('');
  const [scope, setScope] = useState('glo');
  const [providerGroupId, setProviderGroupId] = useState('');
  const [listDefinitionId, setListDefinitionId] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [recipientStatus, setRecipientStatus] = useState('');
  const [senderEmailAddress, setSenderEmailAddress] = useState('');
  const [headerDomain, setHeaderDomain] = useState('');
  const [trackingDomain, setTrackingDomain] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const { list: listDefinition } = useSelector((state) => state.listDefinitionDeliverability);
  const { list: listProvider} = useSelector((state) => state.listProvider);
  const { list: listDefinitionMTA } = useSelector((state) => state.MTADefinitionList);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);

  // const { mta } = useSelector((state) => state.MTADefinitionDetail);

  useEffect(() => {
    if (config) {
      setSenderEmailAddress(config.sender_email_address);
      setHeaderDomain(config.headers_domain);
      setTrackingDomain(config.tracking_domain);
      setMtaDefinitionId({
        value: config.mta_definition ? config.mta_definition.id : null,
        label: config.mta_definition ? config.mta_definition.name : null,
      });
      setScope({
        value: config.scope,
        label: config.scope,
      });
      setProviderGroupId({
        value: config.provider_group ? config.provider_group.id : null,
        label: config.provider_group ? config.provider_group.name : null,
      });
      setListDefinitionId({
        value: config.list_definition ? config.list_definition.id : null,
        label: config.list_definition ? config.list_definition.name : null,
      });
      setPublisherId({
        value: config.publisher ? config.publisher.id : null,
        label: config.publisher ? config.publisher.account.name : null,
      });
      setRecipientStatus({
        value: config.recipient_status ? config.recipient_status : null,
        label: config.recipient_status ? config.recipient_status : null,
      });
    }
  }, [dispatch, config]);

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

  const handleBack = () => {
    // dispatch({ type: SET_MTA_DEFINITION_DETAIL_RESET });
    Router.push({
      pathname: `/deliverability/domain`,
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateDeliverabilityDomainConfig(
        {
          sender_email_address: senderEmailAddress,
          headers_domain: headerDomain,
          tracking_domain: trackingDomain,
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
      pathname: `/deliverability/domain`,
    });
  };

  const showDeleteDialog = () => {
    setOpenDialog(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteDeliverabilityDomainConfig(
        config.id
      )
    );
    Router.push({
      pathname: `/deliverability/domain`,
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }}>
        <CardHeader title="Deliverability Domain Config Detail" />
        <Divider />
        <CardContent sx={{ minHeight: 450 }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
                        required={false}
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
                  <Grid item xs={4} sx={{
                    position: 'relative'
                  }}>
                    <TextField
                      fullWidth
                      label='Sender email address'
                      name='sender_email_address'
                      onChange={(e) => setSenderEmailAddress(e.target.value)}
                      type='text'
                      value={senderEmailAddress}
                      required
                    />
                  </Grid>
                  <Grid item xs={4} sx={{
                    position: 'relative'
                  }}>
                    <TextField
                      fullWidth
                      label='Header domain'
                      name='headers_domain'
                      onChange={(e) => setHeaderDomain(e.target.value)}
                      type='text'
                      value={headerDomain}
                      required
                    />
                  </Grid>
                  <Grid item xs={4} sx={{
                    position: 'relative'
                  }}>
                    <TextField
                      fullWidth
                      label='Tracking domain'
                      name='tracking_domain'
                      onChange={(e) => setTrackingDomain(e.target.value)}
                      type='text'
                      value={trackingDomain}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
          )}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", minHeight: 80, paddingRight: 3 }}>
          <Button variant="contained" color="error" onClick={showDeleteDialog}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" type="submit" color="success">
            Update
          </Button>
        </CardActions>
      </Card>
      <DialogNotification open={openDialog} handleClose={handleCloseDialog} title={'Warning'} content={'Do you want to delete this?'} handleAccept={handleDelete} />
    </form>
  );
};
