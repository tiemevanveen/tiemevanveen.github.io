import React from 'react';
import { Input, Icon, Form, Button } from 'antd';
import queryString from 'query-string';

const query = queryString.parse(window.location.search);

class UserIdInput extends React.Component {
  state = {
    userId: query && query.userId && /^[0-9]*$/.test(query.userId) ? query.userId : '',
  };

  componentDidMount() {
    this.handleSubmit();
  }

  checkUserId = value => /^[0-9]*$/.test(value)

  handleSubmit = (event) => {
    if(event) {
      event.preventDefault();
    }

    if (this.checkUserId(this.userIdInput.state.value)) {
      this.props.onSubmit(this.userIdInput.state.value)
    }
  }

  onClearUserId = () => {
    this.userIdInput.focus();
    this.setState({ userId: '' });
  }

  onChangeUserId = (e) => {
    const { value } = e.target;
    if (this.checkUserId(value)) {
      this.setState({ userId: value });
    }
  }

  render() {
    const { userId } = this.state;
    const suffix = userId ? <Icon type="close-circle" onClick={this.onClearUserId} /> : null;

    // Only show error after a field is touched.
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input
            placeholder="Enter your userId"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={userId}
            onChange={this.onChangeUserId}
            ref={node => this.userIdInput = node}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!userId}
          >
            Load ascents!
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UserIdInput;

