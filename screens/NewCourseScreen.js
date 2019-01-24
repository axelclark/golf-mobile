import React from "react"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import { COURSES_QUERY } from "../screens/CoursesScreen"
import Header from "../components/Header"
import CourseForm from "../components/CourseForm"

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
      data: {
        name: "",
        numHoles: "",
        holes: [],
      },
      errorMessage: "",
      nameError: "",
      numHolesError: "",
    }
  }

  handleFieldChange = field => value => {
    let data = { ...this.state.data }
    data[field] = value
    this.setState({ data })
  }

  onCompleted({ course }) {
    this.props.navigation.navigate("EditCourse", { course })
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
    const { name, numHoles } = this.state.data
    const courseParams = {
      course: {
        name: name,
        numHoles: Number(numHoles),
      },
    }
    return (
      <SafeAreaView styles={styles.container}>
        <ScrollView scrollEnabled={false}>
          <Header title={"New Course"} />
          <Mutation
            mutation={CREATE_COURSE_MUTATION}
            variables={courseParams}
            onCompleted={data => this.onCompleted(data)}
            update={(store, { data: { course } }) => {
              const data = store.readQuery({ query: COURSES_QUERY })
              data.courses.push(course)
              data.courses.sort((a, b) => a.name.localeCompare(b.name))
              store.writeQuery({
                query: COURSES_QUERY,
                data,
              })
            }}
            onError={error => this.handleError(error)}
          >
            {createCourseMutation => (
              <CourseForm
                {...this.state}
                handleSubmit={createCourseMutation}
                handleFieldChange={this.handleFieldChange}
              />
            )}
          </Mutation>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default NewCourseScreen
