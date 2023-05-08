import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomSelect } from 'src/components/custom.select';
import { getDefinitionList } from 'src/redux/actions/deliverability.action';
import { setValueForNewDomainForm } from '../../../redux/actions/setup.domain.action';
import { CREATE_NEW_RECORD_RESET } from '../../../redux/constant/setup.domain.constant';
import { addNewDomainToListDefinition } from './../../../redux/actions/setup.domain.action';

const AddNewDomainToListDefinition = (props) => {
  const { next, back } = props;
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.newDomainFormValue);
  const { list: listDefinition } = useSelector((state) => state.listDefinitionDeliverability);
  const { isLoading, success, error, message } = useSelector((state) => state.createRecordForDomain);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(list);
    let listId = [];
    list.map((l) => {
      listId.push(l.value);
    })
    dispatch(setValueForNewDomainForm({
      ...value, domain_to_list_definition: {
        domain,
        list_ids: listId
      }
    }));
    dispatch(addNewDomainToListDefinition({ domain, list_ids: listId }));
  };

  const handleNext = () => {
    dispatch({ type: CREATE_NEW_RECORD_RESET });
    next();
  };

  const selectMTADefinition = useMemo(() => {
    if (listDefinition.length > 0) {
      return listDefinition.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [listDefinition]);

  useEffect(() => {
    if(listDefinition.length === 0) {
      dispatch(getDefinitionList());
    }
  }, [dispatch, isLoading, listDefinition]);

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ minWidth: 900, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
        <CardHeader title="Create new record for domain" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid item zIndex={999}>
              <CustomSelect
                id="id-aws-account"
                label="List definition"
                options={selectMTADefinition}
                value={list}
                onChange={setList}
                required={true}
                isMulti={true}
              />
            </Grid>
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

export default AddNewDomainToListDefinition;