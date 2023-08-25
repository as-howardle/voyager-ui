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

const Page = (props) => {
  const { domain, template } = props;
  const [domainName, setDomainName] = useState(domain.name);
  const [domainTitle, setDomainTitle] = useState(domain.title);
  const [templateId, setTemplateId] = useState({
    value: domain.template_id,
    label: domain.template_name
  });
  const [loading, setLoading] = useState(false);

  const selectTemplate = useMemo(() => {
    if (template.length > 0) {
      return template.map(l => ({
        value: l.id,
        label: l.name
      }));
    }
  }, [template]);

  const handleBack = () => {
    Router.push({
      pathname: `/domain`
    });
  };

  const handleCreateDomainSetting = async (e) => {
    e.preventDefault();
    const data = {
      id: domain.id,
      name: domainName,
      title: domainTitle,
      template_id: templateId.value
    };
    setLoading(true);
    try {
      await DomainAPI.updateDomain(data);
      setLoading(false);
      toast.success('Update domain setting successfully');
      Router.push({
        pathname: `/domain`
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
          Create Domain Setting
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
                  Create Domain Setting
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
                    <Label label='Domain Name' required={true} />
                    <TextField
                      fullWidth
                      name='domainName'
                      onChange={(e) => setDomainName(e.target.value)}
                      type='text'
                      value={domainName}
                      required
                    />
                  </Grid>
                  <Grid item xs={6} sx={{
                    position: 'relative',
                    zIndex: 999
                  }}>
                    {template.length > 0 ? (
                      <CustomSelect id='id-template' label='Template' options={selectTemplate}
                        value={templateId} onChange={setTemplateId}
                        required={true} isMulti={false}
                      />
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container item spacing={3} direction='row'>
                  <Grid item xs={6}>
                    <Label label='Domain Title' required={true} />
                    <TextField
                      fullWidth
                      name='domainTitle'
                      onChange={(e) => setDomainTitle(e.target.value)}
                      type='text'
                      value={domainTitle}
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
              <LoadingButton variant='contained' sx={{ mr: 2 }} onClick={handleCreateDomainSetting} loading={loading} color='success'>
                <span>Update</span>
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

export async function getServerSideProps(context) {
  const id = context.query.id;
  const response = await DomainAPI.getDomainById(id);
  const templates = await TemplateAPI.getAllTemplate();
  return {
    props: {
      domain: response.data[0],
      template: templates.data
    }
  };
}

export default Page;
