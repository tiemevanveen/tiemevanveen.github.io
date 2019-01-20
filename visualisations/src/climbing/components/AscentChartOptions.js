/* eslint max-len:0 */

import React from "react";
import Moment from "moment";
import { Checkbox, Radio } from "antd";

import AscentTypes from "../model/AscentTypes";
import AscentMethods from "../model/AscentMethods";
import AscentNotes from "../model/AscentNotes";

const colors = {
  redpoint: "#f03c3c",
  flash: "#ffca10",
  onsight: "#333",
  toprope: "#666",
  attempt: "#fff"
};

const ascentMethods = Object.values(AscentMethods).sort(
  (a, b) => a.order - b.order
);

class AscentChartOptions extends React.Component {
  state = AscentChartOptions.defaultState;

  handleChangeOptions = newOptions => {
    this.setState(newOptions);
    this.props.onChange({ ...this.state, ...newOptions });
  };

  handleChangeMethod = ascentMethodIds => {
    this.handleChangeOptions({ ascentMethodIds });
  };

  render() {
    const { ascentMethodIds } = this.state;
    const { ascentTypeShortHand } = this.props;
    const methods = ascentMethods
      .filter(method => method.ascentTypes.includes(ascentTypeShortHand))
      .map(method => ({ label: method.label, value: method.id }));

    return (
      <Checkbox.Group
        options={methods}
        defaultValue={ascentMethodIds.filter(id => id !== 6) /* attempt */}
        onChange={this.handleChangeMethod}
      />
    );
  }
}

AscentChartOptions.defaultState = {
  ascentMethodIds: ascentMethods.map(a => a.id)
};

export default AscentChartOptions;
