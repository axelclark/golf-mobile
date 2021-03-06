import React from "react"
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
} from "react-native"

import { graphql, Query } from "react-apollo"
import gql from "graphql-tag"
import { Button } from "react-native-elements"

import Course from "../components/Course"
import Header from "../components/Header"
import Colors from "../constants/Colors"
import Sizes from "../constants/Sizes"

import { ROUNDS_QUERY } from "./RoundsScreen"

export const COURSES_QUERY = gql`
  {
    courses {
      id
      name
      numHoles
      holes {
        id
        holeNumber
        par
      }
    }
  }
`

class CoursesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super()
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh = refetch => {
    this.setState({ refreshing: true })
    refetch().then(() => {
      this.setState({ refreshing: false })
    })
  }

  renderCourse(course) {
    return <Course key={course.id} course={course} />
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={"Courses"} />
        <Query query={COURSES_QUERY}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Text>Fetching</Text>
            if (error) return <Text>Error</Text>
            const { courses } = data
            return (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh(refetch)}
                  />
                }
              >
                {courses.map(course => this.renderCourse(course))}
              </ScrollView>
            )
          }}
        </Query>
        <Button
          title="Create New Course"
          buttonStyle={styles.button}
          onPress={() => this.props.navigation.navigate("NewCourse")}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  button: {
    marginTop: Sizes.small,
    marginBottom: Sizes.small,
    backgroundColor: Colors.darkPrimary,
  },
})

export default graphql(ROUNDS_QUERY)(CoursesScreen)
