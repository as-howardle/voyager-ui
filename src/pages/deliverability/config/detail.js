import { Box, CircularProgress } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeliverabilityConfigDetail } from 'src/components/detail/deliverability.config.detail';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setDeliverabilityConfigDetail } from 'src/redux/actions/deliverability.action';

const Page = () => {

  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const { config, isLoading } = useSelector((state) => state.deliverabilityConfigDetail);

  useEffect(() => {
    if (id) {
      dispatch(setDeliverabilityConfigDetail(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          Deliverability Config Detail
        </title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <DeliverabilityConfigDetail config={config} isLoading={isLoading} />
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
