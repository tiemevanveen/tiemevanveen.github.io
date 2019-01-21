import React from "react";
import { Radio } from "antd";

import AscentTypes from "../../model/AscentTypes";

class AscentTypeSelector extends React.Component {
  handleChangeType = e => {
    const ascentTypeShortHand = e.target.value;
    this.props.onChange(ascentTypeShortHand);
  };

  render() {
    const { ascentTypeShortHand } = this.props;
    return (
      <Radio.Group value={ascentTypeShortHand} onChange={this.handleChangeType}>
        {Object.values(AscentTypes).map(type => (
          <Radio.Button key={type.id} value={type.shorthand}>
            {type.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    );
  }
}

export default AscentTypeSelector;
