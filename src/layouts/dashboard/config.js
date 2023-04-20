import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize='small'>
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'MTA',
    path: '/mta',
    icon: (
      <SvgIcon fontSize='small'>
        <PaperAirplaneIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Publishers',
    path: '/publisher',
    icon: (
      <SvgIcon fontSize='small'>
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize='small'>
        <CogIcon />
      </SvgIcon>
    )
  }
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
