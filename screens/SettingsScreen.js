import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native-elements'
import { AsyncStorage, View } from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  async deleteUserToken() {
    try {
      await AsyncStorage.removeItem('golf:userToken')
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
          onPress={() => this.deleteUserToken()}
        />
      </View>
    )
  }
}
