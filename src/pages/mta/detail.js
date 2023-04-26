
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
          MTA Assignation Detail
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
