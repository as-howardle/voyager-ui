import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import { Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import { toast } from 'react-toastify';
import { VERIFY_EMAIL_RESET } from '../../redux/constant/verify.emai.constant';
import { verifyEmailAction } from '../../redux/actions/verify.email.action';
import ExportHelper from '../../helpers/export.helper';

const gridStyle = { minHeight: 500 };

const columns = [
  { name: 'email_address', defaultFlex: 1, header: 'Email' },
  { name: 'lists', defaultFlex: 1, header: 'List' }
];

export const VerifyEmailTable = () => {
  const dispatch = useDispatch();

  const { emails, isLoading, success, error, message } = useSelector((state) => state.verifyEmail);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch({ type: VERIFY_EMAIL_RESET });
    }
    if (error) {
      toast.error(message);
      dispatch({ type: VERIFY_EMAIL_RESET });
    }
  }, [dispatch, message, success, error]);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    dispatch(verifyEmailAction({
      csv: e.target.files[0]
    }));
    e.target.value = '';
  };

  const handleExportCSV = () => {
    ExportHelper.generateVerifyEmailCSV(emails);
  };

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stack
        direction='row'
        alignItems='flex-end'
        justifyContent='flex-end'
        sx={{
          mb: 2
        }}
      >
        <Button
          variant='contained'
          component='label'
          startIcon={<UploadFileIcon />}
        >
          Upload File
          <input
            type='file'
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant='contained'
          component='label'
          color='success'
          onClick={handleExportCSV}
          startIcon={<DownloadIcon />}
          sx={{
            marginLeft: 2
          }}
        >
          CSV
        </Button>
      </Stack>
      <ReactDataGrid
        columns={columns}
        dataSource={emails}
        style={gridStyle}
        pagination
        loading={isLoading}
        defaultLimit={10}
      />
    </Box>
  );
};