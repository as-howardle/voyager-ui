import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button, Card, CardActions, CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomSelect } from "src/components/custom.select";
import CONST from "../../../const/general.const";
import {
  addDkimToMailerq,
  setValueForNewDomainForm
} from "../../../redux/actions/setup.domain.action";
import { ADD_DKIM_TO_MAILERQ_RESET } from './../../../redux/constant/setup.domain.constant';

const AddDomainToMailerQ = (props) => {
  const { next, back } = props;
  const [domain, setDomain] = useState("");

  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.newDomainFormValue);
  const { isLoading, success, error, message } = useSelector((state) => state.addDkimToMailerQ);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      setValueForNewDomainForm({
        ...value,
        dkim_mailerq: domain,
      })
    );
    dispatch(
      addDkimToMailerq({
        domain,
      })
    );
  };

  const handleNext = () => {
    dispatch({ type: ADD_DKIM_TO_MAILERQ_RESET });
    next();
  };

  useEffect(() => {
    if (value) {
      setDomain(value.dkim_mailerq);
    }
  }, [dispatch, isLoading]);

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ minWidth: 900, marginLeft: 5, marginRight: 5, marginTop: 5 }}>
        <CardHeader title="Add domain to MailerQ" />
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

export default AddDomainToMailerQ;
