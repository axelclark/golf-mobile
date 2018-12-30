import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native-elements'
import { AsyncStorage, View } from 'react-native'

import { withApollo } from 'react-apollo';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  async logOutUser() {
    try {
      await AsyncStorage.removeItem('golf:userToken')
      await this.props.client.clearStore()
      this.props.navigation.navigate('AuthLoading')
    } catch (error) {
      // Error saving data
      console.log('error deleting token', error)
    }
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <ExpoConfigView />
        <Button
          title='Log Out'
          onPress={() => this.logOutUser()}
        />
      </View>
    )
  }
}

export default withApollo(SettingsScreen)
