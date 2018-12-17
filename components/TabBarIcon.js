import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes'

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={Sizes.mediumLarge}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
