import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import Header from "../components/Header"
import CourseForm from "../components/CourseForm"

const UPDATE_COURSE_MUTATION = gql`
  mutation($id: ID!, $course: CourseInput!) {
    course: updateCourse(id: $id, input: $course) {
      id
      numHoles
      name
      holes {
        id
        holeNumber
        par
      }
    }
  }
`

class EditCourseScreen extends React.Component {
  static navigationOptions = {
    title: "Edit Course",
  }

  constructor() {
    super()
    this.state = {
      data: {
        id: "",
        name: "",
        numHoles: "",
        holes: [],
      },
      errorMessage: "",
      nameError: "",
      numHolesError: "",
    }
  }

  componentWillMount() {
    const { navigation } = this.props
    let course = navigation.getParam("course", {})
    let holes = course.holes
    holes.forEach(hole => {
      delete hole.__typename
    })
    holes.sort((a, b) => a.holeNumber - b.holeNumber)
    course["holes"] = holes
    this.setState({ data: course })
  }

  handleFieldChange = field => value => {
    let data = { ...this.state.data }
    data[field] = value
    this.setState({ data })
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
    const { id, name, numHoles, holes } = this.state.data
    const updateParams = {
      id: id,
      course: {
        name: name,
        numHoles: Number(numHoles),
        holes: holes,
      },
    }
    return (
      <SafeAreaView styles={styles.container}>
        <Header title={"Edit Course"} />
        <Mutation
          mutation={UPDATE_COURSE_MUTATION}
          variables={updateParams}
          onCompleted={() => this.onCompleted()}
          onError={error => this.handleError(error)}
        >
          {updateCourseMutation => (
            <CourseForm
              {...this.state}
              handleSubmit={updateCourseMutation}
              handleFieldChange={this.handleFieldChange}
            />
          )}
        </Mutation>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default EditCourseScreen
