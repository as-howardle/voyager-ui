import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import { Box, Drawer, SvgIcon, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import PropTypes, { array } from 'prop-types';
import { Navigation } from 'react-minimal-side-navigation';
import { Logo } from 'src/components/logo';
import { MdOutlineDomain } from "react-icons/md";
import { Scrollbar } from 'src/components/scrollbar';
import { useAuth } from './../../hooks/use-auth';
import { FiUsers } from 'react-icons/fi';
import { GrTemplate } from 'react-icons/gr'
import { useMemo } from 'react';


export const SideNav = (props) => {
  const router = useRouter();
  const auth = useAuth();

  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const items = useMemo(() => {
    const arr = [
      {
        title: 'Overview',
        itemId: '/',
        // Optional
        elemBefore: () => <SvgIcon><ChartBarIcon /></SvgIcon>
      },
      {
        title: 'Domain',
        itemId: '/domain',
        // Optional
        elemBefore: () => <SvgIcon><MdOutlineDomain /></SvgIcon>
      },
      {
        title: 'Template',
        itemId: '/template',
        // Optional
        elemBefore: () => <SvgIcon><GrTemplate /></SvgIcon>
      },
      {
        title: 'Settings',
        itemId: '/settings',
        elemBefore: () => <SvgIcon><CogIcon /></SvgIcon>
      }
    ];
    if (auth.user && auth.user.isAdmin === 1) {
      arr.splice(2, 0, {
        title: 'Manage Users',
        itemId: '/user',
        // Optional
        elemBefore: () => <SvgIcon><FiUsers /></SvgIcon>
      });
    }
    return arr;
  }, [auth])

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'neutral.50'
          }
        }}
        variant='permanent'
      >
        <Scrollbar
          sx={{
            height: '100%',
            '& .simplebar-content': {
              height: '100%'
            },
            '& .simplebar-scrollbar:before': {
              background: 'neutral.400'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              fontSize: 14
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box
                component={NextLink}
                href='/'
                sx={{
                  display: 'inline-flex',
                  height: 32,
                  width: 32
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Navigation
              activeItemId={router.pathname}
              sx={{
                '&. .side-navigation-panel-select-option:hover': {
                  backgroundColor: 'blue'
                }
              }}
              onSelect={({ itemId }) => {
                if (itemId !== 'mta-parent' && itemId !== 'deliverability-parent') {
                  Router.push({
                    pathname: `${itemId}`
                  });
                }
              }}
              items={items}
            />
          </Box>
        </Scrollbar>
      </Drawer>

    );
  }

  return (
    <Navigation
      activeItemId={router.pathname}
      onSelect={({ itemId }) => {
        Router.push({
          pathname: `/`
        });
      }}
      items={[
        {
          title: 'Overview',
          itemId: '/',
          // Optional
          elemBefore: () => <ChartBarIcon />
        },
        {
          title: 'MTA',
          itemId: '/mta',
          elemBefore: () => <PaperAirplaneIcon />,
          subNav: [
            {
              title: 'Projects',
              itemId: '/mta/transport',
              // Optional
              elemBefore: () => <PaperAirplaneIcon />
            },
            {
              title: 'Members',
              itemId: '/mta/definition',
              elemBefore: () => <PaperAirplaneIcon />
            }
          ]
        },
        {
          title: 'Settings',
          itemId: '/settings',
          elemBefore: () => <CogIcon />
        }
      ]}
    />
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
