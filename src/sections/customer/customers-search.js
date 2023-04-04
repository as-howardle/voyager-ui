import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, Box } from '@mui/material';

export const CustomersSearch = () => (
  <Box sx={{
    p: 2,
    display: 'flex'
  }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500, mr: 2 }}
    />
    <Button
      startIcon={(
        <SvgIcon fontSize="small">
          <PlusIcon />
        </SvgIcon>
      )}
      variant="contained"
    >
      Add
    </Button>
  </Box>
);
