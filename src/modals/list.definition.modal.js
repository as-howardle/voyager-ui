import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublisherList } from '../redux/actions/publisher.action';
import { getCountryList, getSaleManagerList } from '../redux/actions/general.action';
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
import { CustomSelect } from '../components/custom.select';
import { listMTADefinition } from '../redux/actions/mta.definition.action';
import {
  createListDefinition,
  getListTemplateWithoutPublishserId
} from '../redux/actions/list.definition.action';

const ListDefinitionModal = (props) => {
  const { isOpen, handleClose } = props;
  const dispatch = useDispatch();

  const { list: listPublisher } = useSelector((state) => state.listPublisher);
  const { list: listCountry } = useSelector((state) => state.listCountry);
  const { list: listSaleManager } = useSelector((state) => state.listSaleManager);
  const { list: listMtaDefinition } = useSelector((state) => state.MTADefinitionList);
  const { list: listTemplate } = useSelector((state) => state.listTemplate);

  const [publisherId, setPublisherId] = useState();
  const [dbPrefix, setDbPrefix] = useState('');
  const [externalId, setExternalId] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [domain, setDomain] = useState();
  const [fromEmail, setFromEmail] = useState();
  const [replytoEmail, setReplytoEmail] = useState();
  const [templateName, setTemplateName] = useState();
  const [templateId, setTemplateId] = useState();
  const [defaultCountryId, setDefaultCountryId] = useState();
  const [representativeSalesManagerId, setRepresentativeSalesManagerId] = useState();
  const [mtaDefinitionId, setMtaDefinitionId] = useState();
  const [globalFrequencyDefinitionId, setGlobalFrequencyDefinitionId] = useState();

  const [validateTemplate, setValidateTemplate] = useState(false);
  const [isDbPrefixValid, setIsDbPrefixValid] = useState(true);
  const [useNewTemplate, setUseNewTemplate] = useState(false);

  const selectPublisher = useMemo(() => {
    if (listPublisher.length > 0) {
      return listPublisher.map(l => ({
        value: l.id,
        label: l.account_name
      }));
    }
  }, [listPublisher]);

  const selectCountry = useMemo(() => {
    if (listCountry.length > 0) {
      const arrFilter = listCountry.filter((l) => l.id !== 7);
      const arr = arrFilter.map(l => (
        {
          value: l.id,
          label: l.name
        }
      ));
      return arr;
    }
  }, [listCountry]);

  const selectSaleManager = useMemo(() => {
    if (listSaleManager.length > 0) {
      return listSaleManager.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listSaleManager]);

  const selectMTADefinition = useMemo(() => {
    if (listMtaDefinition.length > 0) {
      return listMtaDefinition.map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listMtaDefinition]);

  const selectTemplate = useMemo(() => {
    if (listTemplate.length > 0) {
      return listTemplate.filter((l) => l.name !== '').map((l) => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listTemplate]);

  function validateDbPrefix(str) {
    const regex = new RegExp('^[a-zA-z0-9_]+$');
    if (regex.test(str) || str === '') {
      setDbPrefix(str);
      setIsDbPrefixValid(true);
    } else {
      setDbPrefix(str);
      setIsDbPrefixValid(false);
    }
  }

  useEffect(() => {
    if (listPublisher.length <= 0) {
      dispatch(getPublisherList());
    }
    if (listCountry.length <= 0) {
      dispatch(getCountryList());
    }
    if (listSaleManager.length <= 0) {
      dispatch(getSaleManagerList());
    }
    if (listMTADefinition.length <= 0) {
      dispatch(listMTADefinition());
    }
    if (listTemplate.length <= 0) {
      dispatch(getListTemplateWithoutPublishserId({
        table: 'list_template'
      }));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!templateId && !templateName) {
      setValidateTemplate(true);
    } else {
      dispatch(createListDefinition({
        publisher_id: publisherId && publisherId.value,
        db_prefix: dbPrefix,
        external_id: externalId,
        name,
        description,
        domain,
        from_email: fromEmail,
        reply_to_email: replytoEmail,
        template_name: templateName,
        template_id: templateId && templateId.value,
        default_country_id: defaultCountryId && defaultCountryId.value,
        representative_sales_manager_id: representativeSalesManagerId
          && representativeSalesManagerId.value,
        mta_definition_id: mtaDefinitionId && mtaDefinitionId.value,
        global_frequency_definition_id: globalFrequencyDefinitionId
      }));
      setName('');
      setPublisherId(null);
      setDbPrefix('');
      setExternalId('');
      setDescription('');
      setDomain('');
      setFromEmail('');
      setReplytoEmail('');
      setTemplateName('');
      setTemplateId(0);
      setDefaultCountryId(null);
      setRepresentativeSalesManagerId(null);
      setMtaDefinitionId(null);
      setGlobalFrequencyDefinitionId(0);
      setValidateTemplate(false);
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

      <form onSubmit={submitHandler}>
        <Card variant='outlined' sx={{ minWidth: 500 }}>
          <CardHeader
            title='Create List Definition'
          />
          <Divider />
          <CardContent sx={{ minHeight: 700 }}>
            <Grid
              container
              spacing={3}
              sx={{ minWidth: 1000, minHeight: 250 }}
              direction='column'
            >
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Description'
                    name='description'
                    onChange={(e) => setDescription(e.target.value)}
                    type='text'
                    value={description}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Domain'
                    name='domain'
                    onChange={(e) => setDomain(e.target.value)}
                    type='text'
                    value={domain}
                    required
                  />
                </Grid>

              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='From Email'
                    name='from_email'
                    onChange={(e) => setFromEmail(e.target.value)}
                    type='email'
                    value={fromEmail}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Replyto Email'
                    name='replyto_email'
                    onChange={(e) => setReplytoEmail(e.target.value)}
                    type='email'
                    value={replytoEmail}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Global Frequency Definition ID'
                    name='global_frequency_definition_id'
                    onChange={(e) => setGlobalFrequencyDefinitionId(e.target.value)}
                    type='number'
                    value={globalFrequencyDefinitionId}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={useNewTemplate}
                                onChange={(e) => { setUseNewTemplate(e.target.checked); }}
                                name='is_active' />
                    }
                    label='Use new template'
                  />
                </Grid>
                {
                  !useNewTemplate ? (
                    <Grid item xs={6} sx={{
                      position: 'relative',
                      zIndex: 1000
                    }}>
                      {listTemplate.length > 0 ? (
                        <CustomSelect id='id-template'
                                      label='List Template'
                                      options={selectTemplate}
                                      value={templateId}
                                      onChange={setTemplateId}
                                      placeHolder='Select template'
                                      required={true}
                                      isMulti={false}
                        />
                      ) : null}
                    </Grid>
                  ) : (
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label='Template Name'
                        name='template_name'
                        onChange={(e) => setTemplateName(e.target.value)}
                        type='text'
                        value={templateName}
                        error={validateTemplate}
                        helperText={validateTemplate && 'Can not empty'}
                      />
                    </Grid>
                  )
                }
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Database Prefix'
                    name='db_prefix'
                    onChange={(e) => validateDbPrefix(e.target.value)}
                    type='text'
                    value={dbPrefix}
                    error={!isDbPrefixValid}
                    helperText={!isDbPrefixValid && 'Can only contain character and underscore'}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='External ID'
                    name='external_id'
                    onChange={(e) => setExternalId(e.target.value)}
                    type='text'
                    value={externalId}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listPublisher.length > 0 ? (
                    <CustomSelect id='id-publisher'
                                  label='Publisher'
                                  options={selectPublisher}
                                  value={publisherId}
                                  onChange={setPublisherId}
                                  placeHolder='Select publisher'
                                  required={true}
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listCountry.length > 0 ? (
                    <CustomSelect id='id-country'
                                  label='Country'
                                  options={selectCountry}
                                  value={defaultCountryId}
                                  onChange={setDefaultCountryId}
                                  placeHolder='Select country'
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
                  {listSaleManager.length > 0 ? (
                    <CustomSelect id='id-sale-manager'
                                  label='Sale Manger'
                                  options={selectSaleManager}
                                  value={representativeSalesManagerId}
                                  onChange={setRepresentativeSalesManagerId}
                                  placeHolder='Select sale manager'
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 998
                }}>
                  {listMtaDefinition.length > 0 ? (
                    <CustomSelect id='id-mta-definition'
                                  label='MTA Definition'
                                  options={selectMTADefinition}
                                  value={mtaDefinitionId}
                                  onChange={setMtaDefinitionId}
                                  placeHolder='Select MTA Definition'
                                  isMulti={false}
                    />
                  ) : null}
                </Grid>
              </Grid>

            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant='contained'
                    color='error'
                    onClick={handleClose}
            >
              Close
            </Button>
            <Button variant='contained'
                    type='submit'
                    color='success'
            >
              Create
            </Button>
          </CardActions>
        </Card>
      </form>
    </Modal>
  );
};

export default ListDefinitionModal;