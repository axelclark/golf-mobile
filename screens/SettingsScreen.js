import React from "react"
import { Button } from "react-native-elements"
import { AsyncStorage, SafeAreaView, StyleSheet, Linking } from "react-native"

import { withApollo } from "react-apollo"

import Header from "../components/Header"
import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  async emailSupport() {
    const url = "mailto:forescoreapp@gmail.com"
    try {
      await Linking.openURL(url)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  async logOutUser() {
    try {
      await AsyncStorage.removeItem("golf:userToken")
      await this.props.client.clearStore()
      this.props.navigation.navigate("AuthLoading")
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("error deleting token", error)
    }
  }

  render() {
    return (
      <SafeAreaView styles={styles.container}>
        <Header title={"Settings"} />
        <Button
          title="Log Out"
          buttonStyle={styles.button}
          onPress={() => this.logOutUser()}
        />
        <Button
          title="Email Support"
          buttonStyle={styles.button}
          onPress={() => this.emailSupport()}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: Sizes.large,
    backgroundColor: Colors.darkPrimary,
  },
  container: {
    flex: 1,
  },
})

export default withApollo(SettingsScreen)
