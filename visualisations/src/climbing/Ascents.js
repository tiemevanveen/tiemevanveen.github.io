import React from 'react';
import AscentsChart from './components/AscentsChart'
import UserIdInput from './components/UserIdInput'

import fetchAscents from "./utils/fetchAscents";
import transformAscents from "./utils/transformAscents";

class Ascents extends React.PureComponent {
  state = {
    userId: undefined,
    ascents: [],
    isLoading: false,
    error: null,
  };

  onSubmitUserIdInput = async userId => {
    try {
      this.setState({ isLoading: true });
      const rawAscents = await fetchAscents(userId);
      const ascents = transformAscents(rawAscents);
      console.log('ascents', ascents)
      this.setState({
        userId,
        ascents,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      console.log('error', error)
      this.setState({
        error: error.message,
        isLoading: false,
      })
    }
  }

  render() {
    const {isLoading, error, ascents} = this.state;
    console.log('render', this.state)
    return (
      <div className="App">
        <UserIdInput onSubmit={this.onSubmitUserIdInput} />

        {isLoading && (
          <div>Loading...</div>
        )}

        {error && (
          <div>Error: {error}</div>
        )}

        {!isLoading && ascents.length > 0 && (
          <AscentsChart ascents={ascents}/>
        )}
      </div>
    );
  }
}

export default Ascents;
