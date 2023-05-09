import { Card, CardContent, CardHeader, Divider, Grid, TextField, CardActions } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { CustomSelect } from 'src/components/custom.select';
import CONST from '../../../const/general.const';
import { useDispatch, useSelector } from 'react-redux';
import { createNewRecordForDomain, setValueForNewDomainForm } from '../../../redux/actions/setup.domain.action';
import { CREATE_NEW_RECORD_RESET } from '../../../redux/constant/setup.domain.constant';

const CreateNewRecord = (props) => {
  const {next, back} = props;
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [account, setAccount] = useState(null);

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.newDomainFormValue);
  const { isLoading, success, error, message } = useSelector((state) => state.createRecordForDomain);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setValueForNewDomainForm({...value, record: {
      domain,
      description,
      account: account.value
    }}));
    dispatch(createNewRecordForDomain(
      {
        domain,
        description,
        account: account.value
      }
    ));
  }

  const handleNext = () => {
    dispatch({ type: CREATE_NEW_RECORD_RESET });
    next();
  }

  useEffect(() => {
    if(value && value.record) {
      setDomain(value.record.domain);
      setDescription(value.record.description);
      setAccount({
        value: value.record.account,
        label: value.record.account
      })
    }
  }, [dispatch, isLoading])

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ minWidth: 900, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
        <CardHeader title="Create new record for domain" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid container item spacing={3} direction="row">
              <Grid item xs={6}>
                <TextField
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  label="Domain"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="Description"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid item>
              <CustomSelect
                id="id-aws-account"
                label="AWS Account"
                options={CONST.AWS_ACCOUNT}
                value={account}
                onChange={setAccount}
                required={true}
                isMulti={false}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", minHeight: 200, paddingRight: 3 }}>
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            Create
          </LoadingButton>
          {/* {success ? (
            <Button variant="contained" color="success" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <LoadingButton variant="contained" type="submit" loading={isLoading}>
              Create
            </LoadingButton>
          )} */}
        </CardActions>
      </Card>
    </form>
  );
};

export default CreateNewRecord;