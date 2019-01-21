/* eslint max-len:0 */

import React from "react";


import AscentMethodOptions from "./AscentMethodOptions";

import AscentTypeSelector from './AscentTypeSelector'
const colors = {
  redpoint: "#f03c3c",
  flash: "#ffca10",
  onsight: "#333",
  toprope: "#666",
  attempt: "#fff"
};

class AscentChartOptions extends React.Component {
  handleChangeOptions = newOptions => {
    // this.setState(newOptions);
    this.props.onChange(newOptions);
  };

  handleChangeMethod = ascentMethodIds => {
    this.handleChangeOptions({ ascentMethodIds });
  };

  handleChangeAscentType = ascentTypeShortHand => {
    this.handleChangeOptions({ ascentTypeShortHand });
  };

  render() {
    const { ascentTypeShortHand, userId } = this.props;

    return (
      <div>
        <AscentTypeSelector
          userId={userId}
          ascentTypeShortHand={ascentTypeShortHand}
          onChange={this.handleChangeAscentType}
        />
        <AscentMethodOptions
          ascentTypeShortHand={ascentTypeShortHand}
          onChange={this.handleChangeMethod}
        />
      </div>
    );
  }
}

export default AscentChartOptions;
