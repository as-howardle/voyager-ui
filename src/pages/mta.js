import { Box, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { listMTATranport } from '../redux/actions/mta.transport.action';
import { MTATransportTable } from '../sections/table/mta.transport';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Notification from '../components/notification';
import { CREATE_MTA_TRANSPORT_RESET } from 'src/redux/constant/mta.transport.constant';
import { listMTADefinition } from './../redux/actions/mta.definition.action';
import { MTADefinitionTable } from './../sections/table/mta.definition';
const now = new Date();



const Page = () => {
  const dispatch = useDispatch();
  const mtaTransport = useSelector((state) => state.MTATransport);
  const MTADefinitionList = useSelector((state) => state.MTADefinitionList);
  const { listMTATransport, isLoading } = mtaTransport;
  const { list, isLoading: isLoadingMTADefinition } = MTADefinitionList;

  const [tableType, setTableType] = useState('transport');

  const handleChange = (event, newValue) => {
    setTableType(newValue);
  };

  useEffect(() => {
    dispatch(listMTATranport());
    dispatch(listMTADefinition());
  }, [dispatch]);

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
                  </TabList>
                </Box>
                <TabPanel value="transport">
                  <MTATransportTable data={(listMTATransport ? listMTATransport : [])} isLoading={isLoading} />
                </TabPanel>
                <TabPanel value="definition">
                  <MTADefinitionTable data={(list ? list : [])} isLoading={isLoadingMTADefinition} />
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
