import { Card, CardContent, CardHeader, Divider, Grid, TextField, CardActions } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { CustomSelect } from 'src/components/custom.select';
import CONST from '../../../const/general.const';
import { useDispatch, useSelector } from 'react-redux';
import { createNewRecordForDomain, setValueForNewDomainForm, addDomainToPostfix } from '../../../redux/actions/setup.domain.action';
import { CREATE_NEW_RECORD_RESET, ADD_DOMAIN_TO_POSTFIX_RESET } from '../../../redux/constant/setup.domain.constant';

const AddDomainToPostfix = (props) => {
  const { next, back } = props;
  const [domain, setDomain] = useState('');

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.newDomainFormValue);
  const { isLoading, success, error, message } = useSelector((state) => state.createRecordForDomain);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(setValueForNewDomainForm({
      ...value, postfix_server_domain: domain
    }));
    dispatch(addDomainToPostfix({domain}));
  };

  const handleNext = () => {
    dispatch({ type: ADD_DOMAIN_TO_POSTFIX_RESET });
    next();
  };

  useEffect(() => {
    if (value) {
      setDomain(value.postfix_server_domain);
    }
  }, [dispatch, isLoading]);

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ minWidth: 900, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
        <CardHeader title="Add domain to postfix server" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                label="Domain"
                fullWidth
                required
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

export default AddDomainToPostfix;