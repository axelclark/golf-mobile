import React from 'react';

import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View
} from 'react-native';

import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Header from '../components/Header'
import Colors from '../constants/Colors'
import Sizes from '../constants/Sizes'

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    session: login(email:$email, password: $password) {
      token
      user { email }
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation ($user: UserInput!) {
    session: createUser(input: $user) {
      token
      user { email }
    }
  }
`

class LogInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()
    this.state = {
      inputEmail: '',
      inputPassword: '',
      login: true,
      errorMessage: ''
    }
  }

  updateEmail(input) {
    const inputEmail = input.toLowerCase()
    this.setState({ inputEmail })
  }

  updatePassword(inputPassword) {
    this.setState({ inputPassword })
  }

  toggleLogIn(login) {
    this.setState({ login })
  }

  async saveToken({session: { token }}) {
    try {
      await AsyncStorage.setItem('golf:userToken', JSON.stringify(token));
      this.props.navigation.navigate('AuthLoading')
    } catch (error) {
      console.log(`Error saving data ${error}`);
    }
  }

  handleError(error) {
    error.graphQLErrors.map(({ message }) => (
      this.setState({ errorMessage: message })
    ))
  }

  render() {
    const { inputEmail, inputPassword, login, errorMessage } = this.state

    const logInParams = {
      email: inputEmail,
      password: inputPassword
    }

    const registrationParams = {
      user: {
        email: inputEmail,
        password: inputPassword
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header title={'Fore Score'}/>
        <View style={styles.formContainer}>

          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={(text) => this.updateEmail(text)}
            inputValue={inputEmail}
            textContentType={'emailAddress'}
            keyboardType={'email-address'}
          />
          <FormValidationMessage>{errorMessage}</FormValidationMessage>

          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.updatePassword(text)}
            inputValue={inputPassword}
            textContentType={'password'}
            secureTextEntry={true}
          />

          <Mutation
            mutation={login ? LOGIN_MUTATION : CREATE_USER_MUTATION}
            variables={login ? logInParams : registrationParams}
            onCompleted={(data) => this.saveToken(data)}
            onError={(error) => this.handleError(error)}
          >
            {logInMutation => (
              <Button
                title={login ? 'Log In' : 'Sign up'}
                onPress={() => logInMutation()}
                backgroundColor={login ? Colors.darkPrimary : Colors.lightPrimary}
              />
            )}
          </Mutation>

          <View style={styles.switchContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Sign Up</Text>
            </View>
            <Switch
              onValueChange = {(value) => this.toggleLogIn(value)}
              value = {login}
              ios_backgroundColor={Colors.lightPrimary}
              trackColor={{true: Colors.darkPrimary}}
              style={styles.switch}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Log In</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
  },
  switch: {
    backgroundColor: Colors.darkPrimary,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: Sizes.large,
    justifyContent: 'space-evenly',
  },
  text: {
    color: Colors.defaultLightText,
    fontSize: Sizes.medium,
  },
  textContainer: {
    justifyContent: 'center',
  }
});


export default LogInScreen
