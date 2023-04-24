import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setMTATransportDetail } from './../../../redux/actions/mta.transport.action';
import { MTATransportDetail } from './../../../components/detail/mta.transport';

const Page = () => {

  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const { mta } = useSelector((state) => state.MTATransportDetail);

  useEffect(() => {
    if (id) {
      dispatch(setMTATransportDetail(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          MTA Transport Detail
        </title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <MTATransportDetail mta={mta} />
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
