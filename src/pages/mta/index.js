import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Container, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getMTATransportList } from '../../redux/actions/mta.transport.action';
import { MTATransportTable } from '../../sections/table/mta.transport';
import { MTADefinitionTable } from './../../sections/table/mta.definition';
import { MTAAssignationTable } from './../../sections/table/mta.assignation';
import { toast } from 'react-toastify';
import { UPDATE_MTA_DEFINITION_RESET } from './../../redux/constant/mta.definition.constant';
import { listMTADefinition } from './../../redux/actions/mta.definition.action';
import { UPDATE_MTA_TRANSPORT_RESET } from 'src/redux/constant/mta.transport.constant';
const now = new Date();



const Page = () => {
  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  // const MTADefinitionList = useSelector((state) => state.MTADefinitionList);
  const { listMTATransport, isLoading } = mtaTransport;

  const {
    message: messageUpdateMTADefinition,
    success: successUpdateMTADefinition,
    error: errorUpdateMTADefinition
  } = useSelector((state) => state.updateMTADefinition);
  const {
    success: successUpdateMTATransport,
    error: errorUpdateMTATransport,
    message: messageUpdateMTATransport
  } = useSelector((state) => state.updateMTATransport);

  const [tableType, setTableType] = useState('transport');

  const handleChange = (event, newValue) => {
    setTableType(newValue);
  };


  useEffect(() => {
    if (listMTATransport.length === 0) {
      dispatch(getMTATransportList());
    }

    if (successUpdateMTADefinition) {
      toast.success(messageUpdateMTADefinition);
      dispatch(listMTADefinition());
      dispatch({ type: UPDATE_MTA_DEFINITION_RESET });
    }
    if (errorUpdateMTADefinition) {
      toast.error(messageUpdateMTADefinition);
      dispatch({ type: UPDATE_MTA_DEFINITION_RESET });
    }

    if (successUpdateMTATransport) {
      toast.success(messageUpdateMTATransport);
      dispatch(getMTATransportList());
      dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
    }
    if (errorUpdateMTATransport) {
      toast.error(messageUpdateMTATransport);
      dispatch({ type: UPDATE_MTA_TRANSPORT_RESET });
    }
  }, [dispatch, listMTATransport]);

  return (
    <>
      <Head>
        <title>
          MTA
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
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
            {/* <CircularProgress /> */}
            {/* {isLoading && <CircularProgress />} */}
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
        </Container>
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
