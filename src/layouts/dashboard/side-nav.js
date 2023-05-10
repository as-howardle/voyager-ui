import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import { Box, Drawer, SvgIcon, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FaFly, FaListUl, FaSyringe, FaTools, FaUsers } from 'react-icons/fa';
import { HiTable } from 'react-icons/hi';
import { MdDomain, MdOutlineAssignmentTurnedIn, MdVerifiedUser } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { Navigation } from 'react-minimal-side-navigation';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

export const SideNav = (props) => {
  const router = useRouter();
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

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
              items={[
                {
                  title: 'Overview',
                  itemId: '/',
                  // Optional
                  elemBefore: () => <SvgIcon><ChartBarIcon /></SvgIcon>
                },
                {
                  title: 'MTA',
                  itemId: 'mta-parent',
                  elemBefore: () => <SvgIcon><PaperAirplaneIcon /></SvgIcon>,
                  subNav: [
                    {
                      title: 'Transport',
                      itemId: '/mta/transport',
                      // Optional
                      elemBefore: () => <SvgIcon><TbTruckDelivery /></SvgIcon>
                    },
                    {
                      title: 'Definition',
                      itemId: '/mta/definition',
                      elemBefore: () => <SvgIcon><HiTable /></SvgIcon>
                    },
                    {
                      title: 'Assignation',
                      itemId: '/mta/assignation',
                      elemBefore: () => <SvgIcon><MdOutlineAssignmentTurnedIn /></SvgIcon>
                    }
                  ]
                },
                {
                  title: 'Delivery',
                  itemId: 'deliverability-parent',
                  elemBefore: () => <SvgIcon><FaFly /></SvgIcon>,
                  subNav: [
                    {
                      title: 'Config',
                      itemId: '/deliverability/config',
                      // Optional
                      elemBefore: () => <SvgIcon><FaTools /></SvgIcon>
                    },
                    {
                      title: 'Domain',
                      itemId: '/deliverability/domain',
                      // Optional
                      elemBefore: () => <SvgIcon><MdDomain /></SvgIcon>
                    }
                  ]
                },
                {
                  title: 'Publisher',
                  itemId: '/publisher',
                  elemBefore: () => <SvgIcon><FaUsers /></SvgIcon>
                },
                {
                  title: 'List Definition',
                  itemId: '/list_definition',
                  elemBefore: () => <SvgIcon><FaListUl /></SvgIcon>
                },
                {
                  title: 'Set up new domain',
                  itemId: '/setup_new_domain',
                  elemBefore: () => <SvgIcon><FaSyringe /></SvgIcon>
                },
                {
                  title: 'Verify Email Blacklist',
                  itemId: '/verify_email',
                  elemBefore: () => <SvgIcon><MdVerifiedUser /></SvgIcon>
                },
                {
                  title: 'Settings',
                  itemId: '/settings',
                  elemBefore: () => <SvgIcon><CogIcon /></SvgIcon>
                }
              ]}
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
