import React from "react";
import { Button } from "antd";

import AscentChart from "./components/AscentChart";
import UserIdInput from "./components/UserIdInput";
import AscentChartOptions from "./components/AscentChartOptions/AscentChartOptions";
import AscentNoteOptions from "./components/AscentChartOptions/AscentNoteOptions";

import AscentTypes from "./model/AscentTypes";
import AscentMethods from "./model/AscentMethods";

import * as storage from "./utils/localStorage";
import fetchAscents from "./utils/fetchAscents";
import transformAscents from "./utils/transformAscents";
import { queryStringUserId, queryStringType } from "./utils/queryString";
import AscentNotes from "./model/AscentNotes";

class Ascents extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userId: queryStringUserId,
      isLoading: !!queryStringUserId,
      error: null,
      ascents: [],
      ascentsLoadedFromCache: undefined,
      ascentMethodIds: Object.values(AscentMethods)
        .filter(m => m !== AscentMethods.ATTEMPT)
        .map(m => m.id),
      ascentNoteValues: Object.values(AscentNotes)
        .reduce((res, n) => res | n.value, 0),
      ascentTypeShortHand: queryStringType || AscentTypes.ROUTES.shorthand
    };
  }

  componentDidMount() {
    if (this.state.userId) {
      this.fetchAscents(this.state.userId, this.state.ascentTypeShortHand);
    }
  }

  refreshAscents = e => {
    e.preventDefault();
    storage.removeAscents(this.state.userId, this.state.ascentTypeShortHand);
    this.fetchAscents(this.state.userId, this.state.ascentTypeShortHand);
  };

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
      const result = await fetchAscents(userId, ascentTypeShortHand);
      const ascents = transformAscents(result.ascents);
      console.log("ascents", ascents);
      this.setState({
        userId,
        ascentsLoadedFromCache: result.fromCache,
        ascents,
        error: null,
        isLoading: false
      });
    } catch (error) {
      console.log("error", error);
      this.setState({
        error: error.message,
        ascentsLoadedFromCache: undefined,
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

  handleChangeNotes = ascentNoteValues => {
    this.setState({ ascentNoteValues });
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
      ascentsLoadedFromCache,
      userId,
      ascentTypeShortHand,
      ascentMethodIds,
      ascentNoteValues
    } = this.state;

    console.log("render Ascents", this.state);

    return (
      <div className="App">
        <UserIdInput
          onSubmit={this.onSubmitUserIdInput}
          userId={userId}
          isLoading={isLoading}
        />
        {!userId && !isLoading && (
          <p>
            You can find your userId on your profile page or scorecard:
            <br />
            <br />
            <img
              src="8a.nu.png"
              alt="8a.nu screenshot showing userId"
              width="50%"
            />
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
            ascentNoteValues={ascentNoteValues}
          />
        )}
        <br />
        
        {userId && !isLoading && ascents.length > 0 && (
          <p>
            <h3>More options</h3>
            <AscentNoteOptions
              ascentTypeShortHand={ascentTypeShortHand}
              onChange={this.handleChangeNotes}
            />
          </p>
        )}
        
        <br />
        {userId && !isLoading && ascents.length > 0 && ascentsLoadedFromCache && (
          <p>
            Ascents loaded from cache{" "}
            <a href onClick={this.refreshAscents}>
              refresh
            </a>
            .
          </p>
        )}
      </div>
    );
  }
}

export default Ascents;
