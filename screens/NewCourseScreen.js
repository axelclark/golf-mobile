import React from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import { COURSES_QUERY } from "../screens/CoursesScreen"
import Header from "../components/Header"
import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"

const CREATE_COURSE_MUTATION = gql`
  mutation($course: CourseInput!) {
    course: createCourse(input: $course) {
      id
      name
      numHoles
      holes {
        id
        par
        holeNumber
      }
    }
  }
`

class NewCourseScreen extends React.Component {
  static navigationOptions = {
    title: "New Course",
  }

  constructor() {
    super()
    this.state = {
      errorMessage: "",
      nameInput: "",
      nameError: "",
      numHolesInput: "",
      numHolesError: "",
    }
  }

  updateName(nameInput) {
    this.setState({ nameInput })
  }

  updateNumHoles(numHolesInput) {
    this.setState({ numHolesInput })
  }

  onCompleted() {
    this.props.navigation.navigate("Courses")
  }

  handleError({ graphQLErrors, networkError }) {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, details }) => {
        this.setState({ errorMessage: message })
        if (details) {
          if (details.name) {
            this.setState({ nameError: details.name.join() })
          }
          if (details.num_holes) {
            this.setState({ numHolesError: details.num_holes.join() })
          }
        }
      })
    }
    if (networkError) {
      this.setState({ errorMessage: networkError.message })
    }
  }

  render() {
    const {
      errorMessage,
      nameInput,
      nameError,
      numHolesInput,
      numHolesError,
    } = this.state

    const courseParams = {
      course: {
        name: nameInput,
        numHoles: Number(numHolesInput),
      },
    }
    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView scrollEnabled={false}>
          <Header title={"New Course"} />

          <FormValidationMessage>{errorMessage}</FormValidationMessage>

          <FormLabel>Course Name</FormLabel>
          <FormInput
            onChangeText={text => this.updateName(text)}
            inputValue={nameInput}
            autoCapitalize={"words"}
          />
          <FormValidationMessage>{nameError}</FormValidationMessage>

          <FormLabel>Number of Holes</FormLabel>
          <FormInput
            onChangeText={number => this.updateNumHoles(number)}
            inputValue={numHolesInput}
            keyboardType={"numeric"}
          />
          <FormValidationMessage>{numHolesError}</FormValidationMessage>

          <Mutation
            mutation={CREATE_COURSE_MUTATION}
            variables={courseParams}
            onCompleted={() => this.onCompleted()}
            update={(store, { data: { course } }) => {
              const data = store.readQuery({ query: COURSES_QUERY })
              data.courses.push(course)
              store.writeQuery({
                query: COURSES_QUERY,
                data,
              })
            }}
            onError={error => this.handleError(error)}
          >
            {createCourseMutation => (
              <Button
                title="Submit"
                buttonStyle={styles.button}
                onPress={() => createCourseMutation()}
              />
            )}
          </Mutation>
        </ScrollView>
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

export default NewCourseScreen
