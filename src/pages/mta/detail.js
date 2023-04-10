
import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { MTAAssignationDetail } from 'src/components/detail/mta.assignation';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MTADefinitionDetail } from '../../components/detail/mta.definition';
import { MTATransportDetail } from '../../components/detail/mta.transport';
const now = new Date();



const Page = () => {

  const router = useRouter();
  const type = router.query.type;


  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  const MTADefinitionList = useSelector((state) => state.MTADefinitionList);
  const { listMTATransport, isLoading } = mtaTransport;

  const [tableType, setTableType] = useState('transport');

  const handleChange = (event, newValue) => {
    setTableType(newValue);
  };


  return (
    <>
      <Head>
        <title>
          MTA Detail
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {type === 'assignation' && <MTAAssignationDetail />}
        {type === 'transport' && <MTATransportDetail />}
        {type === 'definition' && <MTADefinitionDetail />}
        {/* <Card sx={{ minWidth: 500 }}>
          <CardHeader
            title="Create MTA Definition"
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
                  <TextField
                    fullWidth
                    label="MTA Transport name"
                    type="text"
                    value={data.mta_transport_name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="MTA Transport params"
                    type="text"
                    value={data.mta_transport_params}
                    multiline
                    rows={5}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction="row">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="MTA Definition name"
                    type="text"
                    value={data.mta_definition_name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="MTA Definition params"
                    type="text"
                    value={data.mta_definition_params}
                    multiline
                    rows={5}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={3} direction="row">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Publisher name"
                    type="text"
                    value={data.publisher_name}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="List definition name"
                    type="text"
                    value={data.list_definition_name}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type='submit'>
              Update
            </Button>
          </CardActions>
        </Card> */}
        {/* <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  MTA
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <TabContext value={tableType}>
                <Box sx={{ borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="MTA Transport" value="transport" />
                    <Tab label="MTA Definition" value="definition" />
                    <Tab label="MTA Assignation" value="assignation" />
                  </TabList>
                </Box>
                <TabPanel value="transport" sx={{ padding: 0, mt: 2 }}>
                  <MTATransportTable data={(listMTATransport ? listMTATransport : [])} isLoading={isLoading} />
                </TabPanel>
                <TabPanel value="definition" sx={{ padding: 0, mt: 2 }}>
                  <MTADefinitionTable />
                </TabPanel>
                <TabPanel value="assignation" sx={{ padding: 0, mt: 2 }}>
                  <MTAAssignationTable />
                </TabPanel>
              </TabContext>
            </Box>

          </Stack>
        </Container> */}
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
