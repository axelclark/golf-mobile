import React from "react"

import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native"

import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements"

import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import Header from "../components/Header"
import Colors from "../constants/Colors"
import Sizes from "../constants/Sizes"
import Layout from "../constants/Layout"

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    session: login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation($user: UserInput!) {
    session: createUser(input: $user) {
      token
      user {
        email
      }
    }
  }
`

const RESET_PASSWORD_MUTATION = gql`
  mutation($email: String!) {
    resetPassword(email: $email) {
      email
    }
  }
`

class LogInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    this.state = {
      inputEmail: "",
      inputPassword: "",
      login: true,
      errorMessage: "",
      emailError: "",
      passwordError: "",
    }
  }

  updateEmail(input) {
    const inputEmail = input.toLowerCase()
    this.setState({ inputEmail })
  }

  updatePassword(inputPassword) {
    this.setState({ inputPassword })
  }

  resetErrors() {
    this.setState({
      errorMessage: "",
      emailError: "",
      passwordError: "",
    })
  }

  toggleLogIn(login) {
    this.resetErrors()
    this.setState({ login })
  }

  async saveToken({ session: { token } }) {
    try {
      await AsyncStorage.setItem("golf:userToken", JSON.stringify(token))
      this.props.navigation.navigate("AuthLoading")
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error saving data ${error}`)
    }
  }

  handleError({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, details }) => {
        this.setState({ errorMessage: message })
        if (details) {
          if (details.email) {
            this.setState({ emailError: details.email.join() })
          }
          if (details.password) {
            this.setState({ passwordError: details.password.join() })
          }
        }
      })
    }
    if (networkError) {
      this.setState({ errorMessage: networkError.message })
    }
  }

  handleReset() {
    this.setState({ errorMessage: "Check email for link to reset password" })
  }

  render() {
    const {
      inputEmail,
      inputPassword,
      login,
      errorMessage,
      emailError,
      passwordError,
    } = this.state

    const logInParams = {
      email: inputEmail,
      password: inputPassword,
    }

    const resetParams = {
      email: inputEmail,
    }

    const registrationParams = {
      user: {
        email: inputEmail,
        password: inputPassword,
      },
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header title={"ForeScore"} />
        <ScrollView>
          <View style={styles.formContainer}>
            <FormValidationMessage>{errorMessage}</FormValidationMessage>

            <FormLabel>Email</FormLabel>
            <FormInput
              onChangeText={text => this.updateEmail(text)}
              inputValue={inputEmail}
              textContentType={"emailAddress"}
              keyboardType={"email-address"}
              autoCapitalize={"none"}
            />
            <FormValidationMessage>{emailError}</FormValidationMessage>

            <FormLabel>Password</FormLabel>
            <FormInput
              onChangeText={text => this.updatePassword(text)}
              inputValue={inputPassword}
              textContentType={"password"}
              secureTextEntry={true}
            />
            <FormValidationMessage>{passwordError}</FormValidationMessage>

            <Mutation
              mutation={login ? LOGIN_MUTATION : CREATE_USER_MUTATION}
              variables={login ? logInParams : registrationParams}
              onCompleted={data => this.saveToken(data)}
              onError={error => this.handleError(error)}
            >
              {logInMutation => (
                <Button
                  title={login ? "Log In" : "Sign up"}
                  onPress={() => logInMutation()}
                  backgroundColor={
                    login ? Colors.darkPrimary : Colors.lightPrimary
                  }
                  style={styles.button}
                />
              )}
            </Mutation>

            {login && (
              <Mutation
                mutation={RESET_PASSWORD_MUTATION}
                variables={resetParams}
                onCompleted={() => this.handleReset()}
                onError={error => this.handleError(error)}
              >
                {resetPasswordMutation => (
                  <Button
                    title={"Reset Password"}
                    onPress={() => resetPasswordMutation()}
                    style={styles.button}
                    titleStyle={styles.resetButtonText}
                  />
                )}
              </Mutation>
            )}

            <View style={styles.switchContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>Sign Up</Text>
              </View>
              <Switch
                onValueChange={value => this.toggleLogIn(value)}
                value={login}
                ios_backgroundColor={Colors.lightPrimary}
                trackColor={{ true: Colors.darkPrimary }}
                style={styles.switch}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Log In</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: Sizes.large,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    maxWidth: Layout.window.width,
  },
  switch: {
    backgroundColor: Colors.darkPrimary,
  },
  switchContainer: {
    flexDirection: "row",
    marginTop: Sizes.large,
    justifyContent: "space-evenly",
  },
  text: {
    color: Colors.defaultLightText,
    fontSize: Sizes.medium,
  },
  textContainer: {
    justifyContent: "center",
  },
})

export default LogInScreen
