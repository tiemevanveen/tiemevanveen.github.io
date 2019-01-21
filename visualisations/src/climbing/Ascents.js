import React from "react";
import AscentChart from "./components/AscentChart";
import UserIdInput from "./components/UserIdInput";
import AscentChartOptions from "./components/AscentChartOptions/AscentChartOptions";

import AscentTypes from "./model/AscentTypes";
import AscentMethods from "./model/AscentMethods";

import fetchAscents from "./utils/fetchAscents";
import transformAscents from "./utils/transformAscents";
import { queryStringUserId, queryStringType } from "./utils/queryString";

class Ascents extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userId: queryStringUserId,
      isLoading: !!queryStringUserId,
      error: null,
      ascents: [],
      ascentMethodIds: Object.values(AscentMethods)
        .map(a => a.id),
      ascentTypeShortHand: queryStringType || AscentTypes.ROUTES.shorthand
    };
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

  onChangeChartOptions = options => {
    // todo different
    if (
      typeof options.ascentTypeShortHand !== "undefined" &&
      options.ascentTypeShortHand !== this.state.ascentTypeShortHand
    ) {
      this.fetchAscents(this.state.userId, options.ascentTypeShortHand);
    }

    this.setState({
      ...options
    });
  };

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

  render() {
    const {
      isLoading,
      error,
      ascents,
      userId,
      ascentTypeShortHand,
      ascentMethodIds
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

        {userId && (
          <AscentChartOptions
            ascentTypeShortHand={ascentTypeShortHand}
            ascentMethodIds={ascentMethodIds}
            onChange={this.onChangeChartOptions}
          />
        )}

        <br />
        <br />

        {isLoading && <div>Loading...</div>}

        {error && <div>Error: {error}</div>}

        {userId && !isLoading && ascents.length > 0 && (
          <AscentChart
            ascents={ascents}
            ascentTypeShortHand={ascentTypeShortHand}
            ascentMethodIds={ascentMethodIds}
          />
        )}
      </div>
    );
  }
}

export default Ascents;
