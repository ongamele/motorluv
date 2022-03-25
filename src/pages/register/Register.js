import React, { useContext, useState } from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Row, Col, Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

import Widget from '../../components/Widget';
import s from '../dashboard/Dashboard.module.scss';
import slayout from '../../components/Layout/Layout.module.scss';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function Register(props) {
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ];

  const [side, setSide] = useState(true);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [car, setCar] = useState('');
  const [car_year, setCaryear] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Profile Picture');
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push('/');
    },
    onError(err) {
      // alert(err.graphQLErrors[0].extensions.errors);
      console.log(JSON.stringify(err));
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username,
      age,
      gender,
      city,
      car,
      car_year,
      bio,
      email,
      password,
      confirmPassword,
      file,
    },
  });

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName('Profile picture selected');
  };

  const onSubmit = (event) => {
    event.preventDefault();

    addUser();
  };

  return (
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
              SIGN UP
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className={s.root}>
          <Widget className="bg-transparent">
            <Form noValidate className={loading ? 'loading' : ''}>
              <br />
              <Container>
                <Row>
                  <Col lg={6} md={6} sm={12}>
                    <Form.Input
                      className="auth-input"
                      label="Username"
                      placeholder="Username.."
                      name="username"
                      error={errors.username ? true : false}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Age"
                      placeholder="Age.."
                      name="age"
                      error={errors.age ? true : false}
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <label style={{ color: '#fff', fontWeight: 'bold' }}>
                      Gender
                    </label>

                    <select
                      className="auth-input"
                      onChange={handleGender}
                      error={errors.gender ? true : false}
                    >
                      <option value="">Choose</option>
                      <option value="Male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <Form.Input
                      className="auth-input"
                      label="City"
                      placeholder="City.."
                      name="city"
                      error={errors.city ? true : false}
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Car"
                      placeholder="Car.."
                      name="car"
                      error={errors.car ? true : false}
                      type="text"
                      value={car}
                      onChange={(e) => setCar(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="CarYear"
                      placeholder="Car Year.."
                      name="car_year"
                      error={errors.car_year ? true : false}
                      type="text"
                      value={car_year}
                      onChange={(e) => setCaryear(e.target.value)}
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12}>
                    <Form.TextArea
                      className="auth-input"
                      label="Bio"
                      placeholder="Bio.."
                      name="bio"
                      error={errors.bio ? true : false}
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      style={{ minHeight: 114 }}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Email"
                      placeholder="Email.."
                      name="email"
                      error={errors.email ? true : false}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Password"
                      placeholder="Password.."
                      name="password"
                      error={errors.password ? true : false}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Input
                      className="auth-input"
                      label="Confirm Password"
                      placeholder="Confirm Password.."
                      name="confirmPassword"
                      error={errors.confirmPassword ? true : false}
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      as="label"
                      htmlFor="file"
                      type="button"
                      style={{ marginTop: '24px' }}
                    >
                      <small>{fileName}</small>
                    </Button>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      style={{ display: 'hidden' }}
                      hidden
                    />

                    <Button type="submit" primary onClick={onSubmit}>
                      Register
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Widget>
          {Object.keys(errors).length > 0 && (
            <div className="ui error message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Motorluv{' '}
        <a
          href="https://motorluv.online"
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect
        </a>
        .
      </footer>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $age: String!
    $gender: String!
    $city: String!
    $car: String!
    $car_year: String!
    $bio: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $file: Upload!
  ) {
    register(
      registerInput: {
        username: $username
        age: $age
        gender: $gender
        city: $city
        car: $car
        car_year: $car_year
        bio: $bio
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        file: $file
      }
    ) {
      id
      email
      username
      age
      gender
      city
      car
      car_year
      bio
      createdAt
      profilePicture
      token
    }
  }
`;

export default Register;
