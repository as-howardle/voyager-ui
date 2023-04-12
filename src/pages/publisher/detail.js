import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setPublisherDetail } from '../../redux/actions/publisher.action';
import { PublisherDetail } from '../../components/detail/publisher.js';

const Page = () => {

  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const { pub } = useSelector((state) => state.publisherDetail);

  useEffect(() => {
    if (id) {
      dispatch(setPublisherDetail(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          Publisher Detail
        </title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <PublisherDetail pub={pub} />
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
