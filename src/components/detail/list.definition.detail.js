import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { getListTemplate, updateListDefinition } from 'src/redux/actions/list.definition.action';
import Router from 'next/router';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { CustomSelect } from './../custom.select';

export const ListDefinitionDetail = (props) => {
  const { def, isLoading } = props;
  const dispatch = useDispatch();

  const { list: databaseList } = useSelector((state) => state.listDatabase);
  const { list: listPublisher } = useSelector((state) => state.listPublisher);
  const { list: listSaleManager } = useSelector((state) => state.listSaleManager);
  const { list: listCountry } = useSelector((state) => state.listCountry);

  const [listTemplateId, setListTemplateId] = useState('');
  const [publisher, setPublisher] = useState(null);
  const [representativeSalesManager, setRepresentativeSalesManager] = useState(null);
  const [defaultCountry, setDefaultCountry] = useState(null);
  const [listDatabase, setListDatabse] = useState(null);
  const [affiliateId, setAffiliateId] = useState('');
  const [externalId, setExternalId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fromName, setFromName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [customProtocol, setCustomProtocol] = useState('');
  const [customPath, setCustomPath] = useState('');
  const [publicName, setPublicName] = useState('');
  const [replytoEmail, setReplytoEmail] = useState('');
  const [headersDomain, setHeadersDomain] = useState('');
  const [trackingDomain, setTrackingDomain] = useState('');
  const [rightEmailAddress, setRightEmailAddress] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [listWorkflowStatus, setListWorkflowStatus] = useState('');
  const [hasPreviewEnabled, setHasPreviewEnabled] = useState(false);
  const [isEnabledForCPMBidding, setIsEnabledForCPMBidding] = useState(false);
  const [isEnabledForCPMOBidding, setIsEnabledForCPMOBidding] = useState(false);
  const [recSendsWeek, setRecSendsWeek] = useState(0);
  const [interests, setInterests] = useState('');
  const [minCPMOPayout, setMinCPMOPayout] = useState(0);
  const [listWarmUp, setListWarmUp] = useState('');

  const { list: listTemplate } = useSelector((state) => state.listTemplate);

  useEffect(() => {
    if (def) {
      dispatch(getListTemplate(def.publisher_id));

      setListTemplateId({
        id: def.list_template_id,
        label: def.list_template_id
      });

      const pub = listPublisher.find((p) => p.id === def.publisher.id);
      const saleManager = listSaleManager.find((p) => p.id === def.representative_sales_manager_id);
      const country = listCountry.find((p) => p.id === def.default_country.id);
      if (pub) {
        setPublisher({
          value: pub.id,
          label: pub.account_name
        });
      }
      if (saleManager) {
        setRepresentativeSalesManager({
          value: saleManager.id,
          label: saleManager.name
        });
      }
      if (country) {
        setDefaultCountry({
          value: country.id,
          label: country.name
        });
      }
      // setListDatabse({
      //   value: def.list_database.id,
      //   label: def.list_database.id,
      // });

      setIsActive(def.is_active);
      setAffiliateId(def.affiliate_id);
      setExternalId(def.external_id);
      setName(def.name);
      setDescription(def.description);
      setFromName(def.from_name);
      setFromEmail(def.from_email);
      setCustomDomain(def.custom_domain);
      setCustomProtocol(def.custom_protocol);
      setCustomPath(def.custom_path);
      setPublicName(def.public_name);
      setReplytoEmail(def.replyto_email);
      setHeadersDomain(def.headers_domain);
      setTrackingDomain(def.tracking_domain);
      setRightEmailAddress(def.right_email_address);
      setBusinessType(def.business_type);
      setHasPreviewEnabled(def.has_preview_enabled);
      setIsEnabledForCPMBidding(def.is_enabled_for_cpm_bidding);
      setIsEnabledForCPMOBidding(def.is_enabled_cpmo_bidding);
      setRecSendsWeek(def.rec_sends_week);
      setInterests(def.interests);
      setMinCPMOPayout(def.min_cpmo_payout);
      setListWarmUp(def.list_warm_up);
      setListWorkflowStatus(def.list_workflow_status);
    }
  }, [def]);

  const selectListTemplate = useMemo(() => {
    if (listTemplate.length > 0) {
      return listTemplate.map((l) => ({
        value: l.id,
        label: l.id
      }));
    }
  }, [listTemplate]);

  const selectListPublisher = useMemo(() => {
    if (listPublisher.length > 0) {
      return listPublisher.map((l) => ({
        value: l.id,
        label: l.account_name
      }));
    }
  }, [listPublisher]);

  const selectSaleManager = useMemo(() => {
    if (listSaleManager.length > 0) {
      return listSaleManager.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listSaleManager]);

  const selectDefaultCountry = useMemo(() => {
    if (listCountry.length > 0) {
      return listCountry.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listCountry]);

  const selectListDatabase = useMemo(() => {
    if (databaseList.length > 0) {
      return databaseList.map((l) => ({
        value: l.id,
        label: l.id
      }));
    }
  }, [databaseList]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // const pub = listPublisher.find((p) => p.id === publisher.value);
    // const saleManager = listSaleManager.find((p) => p.id === representativeSalesManager.value);
    // const country = listCountry.find((p) => p.id === country.value);
    dispatch(updateListDefinition({
      table: 'list_definition',
      id: def.id,
      attributes: {
        list_template_id: listTemplateId.value,
        publisher_id: publisher.value,
        representative_sales_manager_id: representativeSalesManager.value,
        default_country_id: defaultCountry.value,
        // list_database_id: listDatabase.value,
        affiliate_id: affiliateId,
        external_id: externalId,
        name: name,
        description: description,
        from_name: fromName,
        from_email: fromEmail,
        custom_domain: customDomain,
        custom_protocol: customProtocol,
        custom_path: customPath,
        public_name: publicName,
        replyto_email: replytoEmail,
        headers_domain: headersDomain,
        tracking_domain: trackingDomain,
        rights_email_address: rightEmailAddress,
        business_type: businessType,
        is_active: isActive,
        list_workflow_status: listWorkflowStatus,
        has_preview_enabled: hasPreviewEnabled,
        is_enabled_for_cpm_bidding: isEnabledForCPMBidding,
        is_enabled_for_cpmo_bidding: isEnabledForCPMOBidding,
        rec_sends_week: recSendsWeek,
        interests: interests,
        min_cpmo_payout: minCPMOPayout,
        list_warm_up: listWarmUp
      }
    }));
    Router.push({
      pathname: `/list_definition`
    });
  };

  const handleBack = () => {
    Router.push({
      pathname: `/list_definition`
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }}>
        <CardHeader title='List Definition Detail' />
        <Divider />
        <CardContent
          sx={{
            overflow: 'auto'
          }}
        >
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
            <Grid
              container
              spacing={3}
              sx={{
                minWidth: 1000,
                minHeight: 250,
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#000000'
                }
              }}
              direction='column'
            >
              <Grid
                item
                spacing={3}
                sx={{
                  position: 'relative',
                  zIndex: 999
                }}
              >
                {listTemplate.length > 0 ? (
                  <CustomSelect
                    id='id-list-template'
                    label='List Tempate'
                    options={selectListTemplate}
                    value={listTemplateId}
                    onChange={setListTemplateId}
                    required={true}
                    isMulti={false}
                  />
                ) : null}
              </Grid>
              <Grid
                item
                spacing={3}
                sx={{
                  position: 'relative',
                  zIndex: 998
                }}
              >
                {selectListPublisher.length > 0 ? (
                  <CustomSelect
                    id='id-list-publisher'
                    label='List Publisher'
                    options={selectListPublisher}
                    value={publisher}
                    onChange={setPublisher}
                    required={true}
                    isMulti={false}
                  />
                ) : null}
              </Grid>
              <Grid
                item
                spacing={3}
                sx={{
                  position: 'relative',
                  zIndex: 997
                }}
              >
                {listSaleManager.length > 0 ? (
                  <CustomSelect
                    id='id-list-sale-manager'
                    label='Representative Sales Manager'
                    options={selectSaleManager}
                    value={representativeSalesManager}
                    onChange={setRepresentativeSalesManager}
                    required={false}
                    isMulti={false}
                  />
                ) : null}
              </Grid>
              <Grid
                item
                spacing={3}
                sx={{
                  position: 'relative',
                  zIndex: 996
                }}
              >
                {listCountry.length > 0 ? (
                  <CustomSelect
                    id='id-list-default-country'
                    label='Default Country'
                    options={selectDefaultCountry}
                    value={defaultCountry}
                    onChange={setDefaultCountry}
                    required={true}
                    isMulti={false}
                  />
                ) : null}
              </Grid>
              {/* <Grid
               item
               spacing={3}
               sx={{
               position: "relative",
               zIndex: 995,
               }}
               >
               {databaseList.length > 0 ? (
               <CustomSelect
               id="id-list-database"
               label="List Database"
               options={selectListDatabase}
               value={listDatabase}
               onChange={setListDatabse}
               required={true}
               isMulti={false}
               />
               ) : null}
               </Grid> */}
              <Grid item>
                <TextField
                  fullWidth
                  label='Affiliate Id'
                  type='text'
                  value={affiliateId}
                  onChange={(e) => setAffiliateId(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='External Id'
                  type='text'
                  value={externalId}
                  onChange={(e) => setExternalId(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Description'
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='From Name'
                  type='text'
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  multiline
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='From Email'
                  type='text'
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  multiline
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Custom Domain'
                  type='text'
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Custom Protocol'
                  type='text'
                  value={customProtocol}
                  onChange={(e) => setCustomProtocol(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Public Name'
                  type='text'
                  value={publicName}
                  onChange={(e) => setPublicName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Replyto Email'
                  type='text'
                  value={replytoEmail}
                  onChange={(e) => setReplytoEmail(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Headers Domain'
                  type='text'
                  value={headersDomain}
                  onChange={(e) => setHeadersDomain(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Tracking Domain'
                  type='text'
                  value={trackingDomain}
                  onChange={(e) => setTrackingDomain(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Right Email Address'
                  type='text'
                  value={rightEmailAddress}
                  onChange={(e) => setRightEmailAddress(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Business Type'
                  type='text'
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required
                />
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isActive}
                        onChange={(e) => {
                          setIsActive(e.target.checked);
                        }}
                        name='is_active'
                      />
                    }
                    label='Is active'
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hasPreviewEnabled}
                        onChange={(e) => {
                          setHasPreviewEnabled(e.target.checked);
                        }}
                      />
                    }
                    label='Has Preview Enabled'
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isEnabledForCPMBidding}
                        onChange={(e) => {
                          setIsEnabledForCPMBidding(e.target.checked);
                        }}
                      />
                    }
                    label='Is Enabled For CPM Bidding'
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isEnabledForCPMOBidding}
                        onChange={(e) => {
                          setIsEnabledForCPMOBidding(e.target.checked);
                        }}
                      />
                    }
                    label='Is Enabled For CPMO Bidding'
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='List Workflow Status'
                  type='text'
                  value={listWorkflowStatus}
                  onChange={(e) => setListWorkflowStatus(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Rec Sends Week'
                  type='number'
                  value={recSendsWeek}
                  onChange={(e) => setRecSendsWeek(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Interests'
                  type='text'
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='Min CPMO Payout'
                  type='number'
                  value={minCPMOPayout}
                  onChange={(e) => setMinCPMOPayout(e.target.value)}
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  label='List Warm Up'
                  type='text'
                  value={listWarmUp}
                  onChange={(e) => setListWarmUp(e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', minHeight: 80, paddingRight: 3 }}>
          <Button variant='contained' onClick={handleBack}>Back</Button>
          <Button variant='contained' type='submit' color='success'>
            Update
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
