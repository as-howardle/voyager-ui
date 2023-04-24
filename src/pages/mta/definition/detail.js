import { Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setMTADefinitionDetail } from 'src/redux/actions/mta.definition.action';
import { MTADefinitionDetail } from './../../../components/detail/mta.definition';

const Page = () => {

  const router = useRouter();
  const id = router.query.id;

  const dispatch = useDispatch();
  const { mta } = useSelector((state) => state.MTADefinitionDetail);

  useEffect(() => {
    if (id) {
      dispatch(setMTADefinitionDetail(id));
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          MTA Definition Detail
        </title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <MTADefinitionDetail mta={mta} />
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
