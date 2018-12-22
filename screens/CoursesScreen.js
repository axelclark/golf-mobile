import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from 'react-native';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Course from '../components/Course'
import Header from '../components/Header'
import Colors from '../constants/Colors'


import { ROUNDS_QUERY } from './RoundsScreen'

class CoursesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  get courses() {
    const { data } = this.props;
    if (data && data.courses) {
      return data.courses;
    } else {
      return [];
    }
  }

  renderCourse(course) {
    return (
      <Course
        key={course.id}
        course={course}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Header title={'Courses'}/>
          {this.courses.map(course => this.renderCourse(course))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

const query = gql`
  { courses { id name numHoles} }
`;

export default compose(
  graphql(ROUNDS_QUERY),
  graphql(query),
)(CoursesScreen);
