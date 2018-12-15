import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Course from '../components/Course'

class HomeScreen extends React.Component {
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
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Courses
            </Text>
          </View>
          {this.courses.map(course => this.renderCourse(course))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  courseContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
  },
  courseText: {
    fontSize: 16,
    margin: 15,
  },
  header: {
    marginTop: 50,
    marginBottom: 50,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 72,
    color: 'rgba(175, 47, 47, 0.25)',
    fontWeight: '100'
  },
});

const query = gql`
  { courses { id name numHoles} }
`;

export default graphql(query)(HomeScreen);
