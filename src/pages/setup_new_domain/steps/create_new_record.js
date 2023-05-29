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
  TextField,
  Typography
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { CustomSelect } from 'src/components/custom.select';
import CONST from '../../../const/general.const';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_NEW_RECORD_RESET } from '../../../redux/constant/setup.domain.constant';
import {
  createNewRecordForDomain,
  setValueForNewDomainForm
} from '../../../redux/actions/setup.domain.action';

const CreateNewRecord = (props) => {
  const { next, back } = props;
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState(null);
  const [integrateToKarma, setIntegrateToKarma] = useState(false);

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.newDomainFormValue);
  const {
    isLoading,
    success,
    error,
    message,
    aws
  } = useSelector((state) => state.createRecordForDomain);

  const onSubmit = (e) => {
    e.preventDefault();
    const value = {
      domain,
      description,
      account: account.value,
      integrate_to_karma: false
    };
    if (account.value === 'EB') {
      value.integrate_to_karma = integrateToKarma;
    }
    dispatch(setValueForNewDomainForm({
      ...value, record: {
        domain,
        description,
        account: account.value
      }
    }));
    dispatch(createNewRecordForDomain(value));
  };

  const handleNext = () => {
    dispatch({ type: CREATE_NEW_RECORD_RESET });
    next();
  };

  useEffect(() => {
    if (value && value.record) {
      setDomain(value.record.domain);
      setDescription(value.record.description);
      setAccount({
        value: value.record.account,
        label: value.record.account
      });
    }
  }, [dispatch, isLoading]);

  useEffect(() => {}, [aws, dispatch]);

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ minWidth: 900, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
        <CardHeader title='Create new record for domain' />
        <Divider />
        <CardContent>
          <Grid container spacing={3} direction='column'>
            <Grid container item spacing={3} direction='row'>
              <Grid item xs={6}>
                <TextField
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  label='Domain'
                  fullWidth
                  required
                />
                {account &&
                <Typography
                  sx={{
                    marginTop: 2,
                    marginLeft: 2,
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    color: '#6C737F'
                  }}>
                  Example: {account.value === 'EB' ? <span>eb.domain.com</span> :
                  <span>domain.com</span>}
                </Typography>
                }
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label='Description'
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid item>
              <CustomSelect
                id='id-aws-account'
                label='AWS Account'
                options={CONST.AWS_ACCOUNT}
                value={account}
                onChange={setAccount}
                required={true}
                isMulti={false}
              />
            </Grid>
            {
              account && account.value === 'EB' &&
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox checked={integrateToKarma}
                              onChange={(e) => setIntegrateToKarma(e.target.checked)}
                              name='is_active' />
                  }
                  label='Integrate to Karma'
                />
              </Grid>
            }
            <Grid item>
              <pre>{aws}</pre>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', minHeight: 200, paddingRight: 3 }}>
          <Button variant='contained' color='success' onClick={handleNext} disabled={isLoading}>
            Next
          </Button>
          <LoadingButton variant='contained' type='submit' loading={isLoading}>
            Create
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default CreateNewRecord;