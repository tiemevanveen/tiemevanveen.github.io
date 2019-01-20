import React from 'react';
import { Input, Icon, Form, Button } from 'antd';
import {queryStringUserId} from '../utils/queryString'

class UserIdInput extends React.Component {
  state = { userId: queryStringUserId };

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
    this.setState({ userId: undefined });
    this.props.onSubmit(undefined)
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
        <br /><br />
      </Form>
    );
  }
}

export default UserIdInput;