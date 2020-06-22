import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BallotIcon from '@material-ui/icons/Ballot';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Trang chủ',
      href: '/',
      icon: <DashboardIcon />
    },
    {
      title: 'Chiến dịch',
      href: '/campaign',
      icon: <PeopleIcon />
    },{
      title: 'Ứng viên',
      href: '/UngVien',
      icon: <PeopleIcon />
    },{
      title: 'Chi phí',
      href: '/cost',
      icon: <AttachMoneyIcon />
    },{
      title: 'Vị trí',
      href: '/vitri',
      icon: <AccountTreeIcon />
    },{
      title: 'Giai đoạn',
      href: '/giaidoan',
      icon: <BallotIcon />
    },{
      title: 'Yêu cầu',
      href: '/yeucau',
      icon: <BallotIcon />
    },{
      title: 'Tạo tài khoản',
      href: '/signup',
      icon: <PersonAddIcon />
    },{
      title: 'Đổi mật khẩu',
      href: '/changepass',
      icon: <VpnKeyIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
