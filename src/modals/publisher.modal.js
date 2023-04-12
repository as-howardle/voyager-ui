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
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountryList,
  getLanguageList,
  getSaleManagerList
} from '../redux/actions/general.action';
import CONST from '../const/general.const';
import { CustomSelect } from '../components/custom.select.js';
import { createPublisher } from '../redux/actions/publisher.action';

export const PublisherModal = (props) => {
  const { isOpen, handleClose } = props;
  const dispatch = useDispatch();

  const { list: listCountry } = useSelector((state) => state.listCountry);
  const { list: listLanguage } = useSelector((state) => state.listLanguage);
  const { list: listSaleManager } = useSelector((state) => state.listSaleManager);

  const [name, setName] = useState('');
  const [revenueShare, setRevenueShare] = useState(0);
  const [representativeSalesManagerId, setRepresentativeSalesManagerId] = useState('');
  const [localeCountryId, setLocaleCountryId] = useState('');
  const [languageId, setLanguageId] = useState(0);
  const [approvedProveniences, setApprovedProveniences] = useState([]);
  const [status, setStatus] = useState('integrating');

  const selectLanguage = useMemo(() => {
    if (listLanguage.length > 0) {
      return listLanguage.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listLanguage]);

  const selectCountry = useMemo(() => {
    if (listCountry.length > 0) {
      const arrFilter = listCountry.filter((l) => l.id !== 7);
      const arr = arrFilter.map(l => (
        {
          value: l.locale_country.id,
          label: l.name,
          locale_country_id: l.locale_country.id,
          timezone_id: l.timezone.id
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

  useEffect(() => {

    if (listCountry.length === 0) {
      dispatch(getCountryList());
    }
    if (listLanguage.length === 0) {
      dispatch(getLanguageList());
    }
    if (listSaleManager.length === 0) {
      dispatch(getSaleManagerList());
    }
  }, [dispatch, listCountry, listLanguage, listSaleManager]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPublisher({
      name,
      revenue_share: revenueShare,
      representative_sales_manager_id: representativeSalesManagerId.value,
      locale_country_id: localeCountryId.locale_country_id,
      timezone_id: localeCountryId.timezone_id,
      language_id: languageId.value,
      approved_proveniences: approvedProveniences.map(a => a.value),
      status: status.value
    }));
    setName('');
    setRevenueShare(0);
    setLocaleCountryId('');
    setLanguageId('');
    setApprovedProveniences([]);
    setStatus('');
    setRepresentativeSalesManagerId('');
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
            title='Create Publisher'
          />
          <Divider />
          <CardContent sx={{ minHeight: 500 }}>
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
                    label='Revenue share'
                    name='revenue_shared'
                    onChange={(e) => setRevenueShare(parseFloat(e.target.value))}
                    type='number'
                    value={revenueShare}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listLanguage.length > 0 ? (
                    <CustomSelect id='id-language' label='Language' options={selectLanguage}
                                  value={languageId} onChange={setLanguageId}
                                  placeHolder='Select language' required={true} isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 999
                }}>
                  {listCountry.length > 0 ? (
                    <CustomSelect id='id-country' label='Country' options={selectCountry}
                                  value={localeCountryId} onChange={setLocaleCountryId}
                                  placeHolder='Select country' required={true} isMulti={false}
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
                    <CustomSelect id='id-sale-manager' label='Sale manager'
                                  options={selectSaleManager}
                                  value={representativeSalesManagerId}
                                  onChange={setRepresentativeSalesManagerId}
                                  placeHolder='Select sale manager' required={true} isMulti={false}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 998
                }}>
                  <CustomSelect id='id-approved-proviniences' label='Approved proviniences'
                                options={CONST.APPROVED_PROVENIENCES}
                                value={approvedProveniences} onChange={setApprovedProveniences}
                                placeHolder='Select approved proviniences' required={true}
                                isMulti={true}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction='row'>
                <Grid item xs={6} sx={{
                  position: 'relative',
                  zIndex: 997
                }}>
                  <CustomSelect id='id-status' label='Status' options={CONST.STATUS}
                                value={status} onChange={setStatus}
                                placeHolder='Select status' required={true} isMulti={false}
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