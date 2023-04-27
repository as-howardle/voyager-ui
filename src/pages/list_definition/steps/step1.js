import { Card, CardContent, CardHeader, Divider, Grid, TextField, CardActions } from '@mui/material';
import { Button } from '@mui/material';

const Step1 = (props) => {
  const {next, back} = props;
  return (
    <form>
      <Card sx={{ minWidth: 500, marginLeft: 5, marginRight: 5 }} >
        <CardHeader
          title="Step1"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
            sx={{
              minWidth: 1000, minHeight: 250, "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            direction="column"
          >
            <Grid container item spacing={3} direction="row">
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" />
              </Grid>
            </Grid>
            <Grid container item spacing={3} direction="row">
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" />
              </Grid>
            </Grid>
            <Grid item>
              <TextField id="outlined-basic" label="Outlined" />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', minHeight: 80, paddingRight: 3 }}>
          <Button variant="contained" onClick={back}>
            Back
          </Button>
          <Button variant="contained" type='submit' color='success' onClick={next}>
            Next
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default Step1;