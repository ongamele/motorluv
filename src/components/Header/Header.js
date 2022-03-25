import React, { useContext, useState } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  Badge,
  Form,
} from 'reactstrap';
import PowerIcon from '../Icons/HeaderIcons/PowerIcon';
import BellIcon from '../Icons/HeaderIcons/BellIcon';
import SettingsIcon from '../Icons/HeaderIcons/SettingsIcon';
import BurgerIcon from '../Icons/HeaderIcons/BurgerIcon';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../../context/auth';

import s from './Header.module.scss';
import 'animate.css';

function Header({ changeSide }) {
  const { user, logout } = useContext(AuthContext);
  var receiver = '';
  {
    user ? (receiver = user.id) : (receiver = '');
  }
  const { loading, data } = useQuery(
    FETCH_UNREAD_MESSAGES_QUERY,

    {
      pollInterval: 5000,
      variables: {
        receiver: receiver,
      },
    }
  );

  //console.log(data);

  var d = null;

  {
    loading ? (d = 0) : (d = data.getUnreadMessages.length);
  }

  //alert(user.profilePicture);
  const [checked, setChecked] = useState(true);
  const toggleChecked = () => setChecked((value) => !value);
  changeSide(checked);
  const menuBar = user ? (
    <Navbar className={`d-print-none`}>
      <div className={s.burger}>
        <NavLink
          className={`d-md-none ${s.navItem} text-white`}
          href="#"
          onClick={toggleChecked}
        >
          <BurgerIcon className={s.headerIcon} />
        </NavLink>
      </div>
      <div className={`d-print-none ${s.root}`}>
        <UncontrolledAlert
          className={`${s.alert} mr-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}
        >
          {'   '}
          Hello{' '}
          <button className="btn-link">
            <SettingsIcon className={s.settingsIcon} />
          </button>{' '}
          car fanatic!
        </UncontrolledAlert>
        <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`}>
          <InputGroup></InputGroup>
        </Collapse>
        <Form className="d-md-down-none mr-3 ml-3" inline></Form>

        <Nav className="ml-md-0">
          <Dropdown
            nav
            id="basic-nav-dropdown"
            className={`${s.notificationsMenu}`}
          >
            <DropdownToggle nav caret style={{ color: '#C1C3CF', padding: 0 }}>
              <span
                className={`${s.avatar} rounded-circle thumb-sm float-left`}
              >
                {user.profilePicture ? (
                  <img
                    src={require(`../img/users/${user.profilePicture}`)}
                    alt="..."
                  />
                ) : (
                  window.location.reload()
                )}
              </span>
              <span className={`small d-sm-down-none ${s.accountCheck}`}>
                {user.username}
              </span>
              <Badge className={`d-sm-down-none ${s.badge}`} color="success">
                {d}
              </Badge>
            </DropdownToggle>
          </Dropdown>

          <NavItem className={`${s.divider} d-none d-sm-block`} />

          <Dropdown className="d-none d-sm-block" nav>
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <BellIcon className={s.headerIcon} />
              <div
                className={s.count}
                style={{ color: '#000', fontSize: '10px' }}
              >
                {d}
              </div>
            </DropdownToggle>
          </Dropdown>
          <NavItem>
            <NavLink
              className={`${s.navItem} text-white`}
              href="#"
              onClick={logout}
            >
              <PowerIcon className={s.headerIcon} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  ) : (
    <Navbar className={`d-print-none `}>
      <div className={s.burger}>
        <NavLink
          className={`d-md-none ${s.navItem} text-white`}
          href="#"
          onClick={toggleChecked}
        >
          <BurgerIcon className={s.headerIcon} />
        </NavLink>
      </div>
      <div className={`d-print-none ${s.root}`}>
        <UncontrolledAlert
          className={`${s.alert} mr-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s`}
        >
          {'   '}
          Hello{' '}
          <button className="btn-link">
            <SettingsIcon className={s.settingsIcon} />
          </button>{' '}
          car fanatic!
        </UncontrolledAlert>
        <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`}></Collapse>
        <Form className="d-md-down-none mr-3 ml-3" inline></Form>

        <Nav className="ml-md-0">
          <NavItem className={`${s.divider} d-none d-sm-block`} />

          <NavItem>
            <NavLink className={`${s.navItem} text-white`} href="/login">
              <PowerIcon className={s.headerIcon} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );

  return menuBar;
}

const FETCH_UNREAD_MESSAGES_QUERY = gql`
  query ($receiver: String!) {
    getUnreadMessages(receiver: $receiver) {
      id
      sender
      receiver
      body
      status
      createdAt
    }
  }
`;

export default Header;
