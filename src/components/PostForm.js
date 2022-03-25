import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Row, Col, Label, FormText, Input, FormGroup } from 'reactstrap';

import { useMutation, gql } from '@apollo/client';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  const [body, setBody] = useState('');
  const [fileName, setFileName] = useState('Choose post picture');
  const [file, setFile] = useState('');
  //const { body, onChange, onSubmit } = useForm(createPostCallback);

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body, file },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      body = '';
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  const onChange = (event) => {
    setBody(event.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName('Post picture selected');
  };

  /*const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });*/

  return (
    <>
      <Form className="formContainer">
        <Form.Group style={{ marginBotton: '-16px' }}>
          <Form.TextArea
            placeholder="Your thoughts.."
            name="body"
            type="text"
            onChange={onChange}
            value={body}
            error={error ? true : false}
            className="post-form"
            style={{ minHeight: '40px' }}
          />
        </Form.Group>
        <FormGroup style={{ marginTop: '-16px' }}>
          <Button
            as="label"
            htmlFor="file"
            type="button"
            className="postUploadButton"
            style={{ margin: '2px auto auto 6px', borderRadius: '0px 0px' }}
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
          <Button
            type="button"
            color="#fff"
            onClick={onSubmit}
            style={{
              backgroundColor: '#5EBC4E',
              marginRight: '0px',
              borderRadius: '3px 3px 0px 0px',
            }}
            className="post-image-input"
          >
            <i class="paper plane icon" style={{ color: '#fff' }}></i>
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
/*const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;*/
const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $file: Upload!) {
    createPost(body: $body, file: $file) {
      id
      body
      createdAt
      username
      profilePicture
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
