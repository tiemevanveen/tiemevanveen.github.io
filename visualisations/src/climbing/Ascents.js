import React from "react";
import AscentChart from "./components/AscentChart";
import UserIdInput from "./components/UserIdInput";
import AscentTypeSelector from "./components/AscentTypeSelector";
import AscentChartOptions from "./components/AscentChartOptions";

import AscentTypes from "./model/AscentTypes";

import fetchAscents from "./utils/fetchAscents";
import transformAscents from "./utils/transformAscents";
import { queryStringUserId, queryStringType } from "./utils/queryString";

class Ascents extends React.PureComponent {
  constructor(props) {
    super(props);

    const ascentTypeShortHand = (this.state = {
      userId: queryStringUserId,
      isLoading: !!queryStringUserId,
      error: null,
      ascents: [],
      ascentTypeShortHand: queryStringType || AscentTypes.ROUTES.shorthand,
      ascentChartOptions: AscentChartOptions.defaultState
    });
  }

  componentDidMount() {
    if (this.state.userId) {
      this.fetchAscents(this.state.userId, this.state.ascentTypeShortHand);
    }
  }

  fetchAscents = async (userId, ascentTypeShortHand) => {
    if (!userId || !ascentTypeShortHand) {
      console.error(
        "no userId or ascentTypeShortHand",
        userId,
        ascentTypeShortHand
      );
      return;
    }

    try {
      this.setState({ isLoading: true });
      const rawAscents = await fetchAscents(userId, ascentTypeShortHand);
      const ascents = transformAscents(rawAscents);
      console.log("ascents", ascents);
      this.setState({
        userId,
        ascents,
        error: null,
        isLoading: false
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        error: error.message,
        ascents: [],
        isLoading: false
      });
    }
  };

  onChangeChartOptions = ascentChartOptions =>
    this.setState({ ascentChartOptions });

  onSubmitUserIdInput = userId => {
    if (userId && userId !== "") {
      return this.fetchAscents(userId, this.state.ascentTypeShortHand);
    }

    this.setState({
      userId: undefined,
      ascents: [],
      isLoading: false,
      error: null
    });
  };

  onChangeAscentType = ascentTypeShortHand => {
    this.setState({ ascentTypeShortHand });
    this.fetchAscents(this.state.userId, ascentTypeShortHand);
  };

  render() {
    const {
      isLoading,
      error,
      ascents,
      userId,
      ascentTypeShortHand,
      ascentChartOptions
    } = this.state;

    console.log("render Ascents", this.state);

    return (
      <div className="App">
        <UserIdInput onSubmit={this.onSubmitUserIdInput} />

        {!userId && !isLoading && (
          <p>
            You can find your userId on your profile page or scorecard:
            <br />
            <br />
            <img src="8a.nu.png" width="50%" />
          </p>
        )}

        <div>
          <AscentTypeSelector
            userId={userId}
            ascentTypeShortHand={ascentTypeShortHand}
            onChange={this.onChangeAscentType}
          />
          &nbsp; &nbsp; &nbsp;
          <AscentChartOptions
            ascentTypeShortHand={ascentTypeShortHand}
            onChange={this.onChangeChartOptions}
          />
          <br /><br />
        </div>

        {isLoading && <div>Loading...</div>}

        {error && <div>Error: {error}</div>}

        {userId && !isLoading && ascents.length > 0 && (
          <AscentChart
            ascents={ascents}
            {...ascentChartOptions}
            ascentTypeShortHand={ascentTypeShortHand}
          />
        )}
      </div>
    );
  }
}

export default Ascents;
