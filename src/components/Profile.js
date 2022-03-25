import React from 'react';
import { Progress } from 'reactstrap';
import gql from 'graphql-tag';
import Widget from './Widget';
import AnimateNumber from 'react-animated-number';
import Image from 'react-bootstrap/Image';
import logo2 from '../pages/dashboard/logo2.png';

function Profile({ user }) {
  return (
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        padding: '20px',
      }}
    >
      <Image
        src={logo2}
        fluid
        className="logo"
        style={{ width: '60px', marginLeft: '80%' }}
      />

      <div className="row progress-stats">
        <div className="col-md-9 col-12">
          <p
            className="description deemphasize mb-xs"
            style={{ color: '#2E2D2D' }}
          >
            Active members
          </p>
          <Progress
            color="warning"
            value="90"
            className="bg-subtle-blue progress-xs"
          />
        </div>
        <div className="col-md-3 col-12 text-center home-value"></div>
      </div>

      <div
        className="row progress-stats"
        style={{ marginTop: '16px', marginBottom: '16px' }}
      >
        <div className="col-md-9 col-12">
          <p
            className="description deemphasize mb-xs"
            style={{ color: '#2E2D2D' }}
          >
            Hot conversations
          </p>
          <Progress
            color="primary"
            value="95"
            className="bg-subtle-blue progress-xs"
            style={{ color: '#2E2D2D' }}
          />
        </div>
        <div className="col-md-3 col-12 text-center home-value"></div>
      </div>
      <div className="row progress-stats">
        <div className="col-md-9 col-12">
          <p
            className="description deemphasize mb-xs"
            style={{ color: '#2E2D2D' }}
          >
            Motorluv
          </p>
          <a href="#">
            <i className="fa fa-circle text-success mr-2" />
            <small style={{ textDecoration: 'none', color: '#706675' }}>
              Use Motorluv app to connect with different car brand owners for
              love, relationship, dating & friendships.
            </small>
          </a>
        </div>
      </div>
      <p style={{ color: '#000', marginTop: '10px' }}>
        <i className="fa fa-map-marker" style={{ color: '#ad0059' }} /> &nbsp;{' '}
        Find friends near you
      </p>
    </div>
  );
}

export default Profile;
