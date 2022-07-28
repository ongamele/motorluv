import React, { useContext, useState, useEffect } from 'react';
import {
  Row,
  Col,
  Progress,
  Table,
  Label,
  Input,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import Image from 'react-bootstrap/Image';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../../context/auth';
import PostCard from '../../components/PostCard';
import PostForm from '../../components/PostForm';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

import Widget from '../../components/Widget';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Profile from '../../components/Profile';

import s from './Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';

function Dashboard() {
  const [side, setSide] = useState(true);
  const [splash, setSplash] = useState('open-splash');
  const [dashboard, setDashboard] = useState('open-dashboard');

  const { user } = useContext(AuthContext);

  /*useEffect(() => {
    const timer = setTimeout(() => {
      setSplash('closed-splash');
      setDashboard(slayout.root);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);*/

  const { loading, data } = useQuery(FETCH_POSTS_QUERY, { pollInterval: 5000 });

  return (
    <>
      <div className={slayout.root}>
        <div className={slayout.wrap}>
          <Header changeSide={(side) => setSide(side)} />
          <Sidebar side={side} />
          <div className="breadcrumb">
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem
                style={{
                  backgroundColor: '#C20052',
                  padding: '6px',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              >
                YOU ARE HERE
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div  style={{ marginTop: '34px' }}>
            <h1 className="page-title"></h1>

            <Row>
              <Col lg={6} md={8} sm={12}>
                <Widget className="bg-transparent">
                  {user && <PostForm />}
                  {loading ? (
                    <h1>Loading posts..</h1>
                  ) : (
                    data.getPosts &&
                    data.getPosts.map((post) => (
                      <PostCard post={post} key={post.id} />
                    ))
                  )}
                </Widget>
              </Col>
              <Col lg={1} md={0} sm={12} />

              <Col lg={4} md={2} sm={12}>
                <Profile user={user} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
