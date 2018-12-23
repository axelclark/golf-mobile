import React from 'react';

import {
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
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

import Colors from '../constants/Colors'
import Sizes from '../constants/Sizes'

const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email:$email, password: $password) {
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
    }
  }

  updateEmail(input) {
    const inputEmail = input.toLowerCase()
    this.setState({ inputEmail })
  }

  updatePassword(inputPassword) {
    this.setState({ inputPassword })
  }

  async saveToken(token) {
    console.log('token', token)
    try {
      await AsyncStorage.setItem('golf:userToken', JSON.stringify(token));
      this.props.navigation.navigate('AuthLoading')
    } catch (error) {
      console.log(`Error saving data${error}`);
    }
  }

  render() {
    const { inputEmail, inputPassword } = this.state
    const logInParams = {
      email: inputEmail,
      password: inputPassword
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>

          <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={(text) => this.updateEmail(text)}
            inputValue={inputEmail}
          />
          <FormValidationMessage></FormValidationMessage>

          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(text) => this.updatePassword(text)}
            inputValue={inputPassword}
            secureTextEntry={true}
          />
          <FormValidationMessage></FormValidationMessage>

          <Mutation
            mutation={LOGIN_MUTATION}
            variables={logInParams}
            update={(store, { data: { login: { token } } }) => {
              console.log(token)
              this.saveToken(token)
            }}
          >
            {logInMutation => (
              <Button
                title='Log In'
                onPress={() => logInMutation()}
              />
            )}
          </Mutation>

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
    marginTop: Sizes.smallLayout,
  },
});


export default LogInScreen
