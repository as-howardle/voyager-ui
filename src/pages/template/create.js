import { Box, Container, Stack, Typography, Grid, TextField, Divider, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { setPublisherDetail } from '../../redux/actions/publisher.action';
import { PublisherDetail } from '../../components/detail/publisher.js';
import TemplateAPI from './../../axios/TemplateAPI';
import { CustomSelect } from './../../components/custom.select';
import Router from 'next/router';
import { Label } from './../../components/label';
import DomainAPI from './../../axios/DomainAPI';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const Page = () => {
  const [name, setName] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [navbarItem, setNavbarItem] = useState();
  const [footerContent, setFooterContent] = useState();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    Router.push({
      pathname: `/template`
    });
  };

  const handleCreateTemplate = async (e) => {
    e.preventDefault();
    const data = {
      name,
      logoUrl,
      navbarItem,
      footerContent
    };
    setLoading(true);
    try {
      await TemplateAPI.createTemplate(data);
      setLoading(false);
      toast.success('Create template successfully');
      Router.push({
        pathname: `/template`
      });
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Create Template
        </title>
      </Head>
      <Box
        component='main'
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
                  Create Template
                </Typography>
              </Stack>
            </Stack>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={3}
                sx={{
                  minWidth: 1000, minHeight: 250, '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: '#000000'
                  }
                }}
                direction='column'
              >
                <Grid container item spacing={3} direction='row'>
                  <Grid item xs={6}>
                    <Label label='Name' required={true} />
                    <TextField
                      fullWidth
                      name='name'
                      onChange={(e) => setName(e.target.value)}
                      type='text'
                      value={name}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Label label='Logo URL' />
                    <TextField
                      fullWidth
                      name='logoUrl'
                      onChange={(e) => setLogoUrl(e.target.value)}
                      type='text'
                      value={logoUrl}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container item spacing={3} direction='row'>
                  <Grid item xs={6}>
                    <Label label='Navbar Item' />
                    <TextField
                      fullWidth
                      name='navbarItem'
                      onChange={(e) => setNavbarItem(e.target.value)}
                      type='text'
                      value={navbarItem}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Label label='Footer Content' />
                    <TextField
                      fullWidth
                      name='footerContent'
                      onChange={(e) => setFooterContent(e.target.value)}
                      type='text'
                      value={footerContent}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Divider />
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{
                mb: 2,
              }}
            >
              <Button variant='contained' color='error' onClick={handleBack} sx={{ mr: 2 }}>
                Back
              </Button>
              <LoadingButton variant='contained' sx={{ mr: 2 }} onClick={handleCreateTemplate} loading={loading} color='success'>
                <span>Create</span>
              </LoadingButton>
            </Stack>
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
