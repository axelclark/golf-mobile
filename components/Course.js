import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import NewRoundButton from './NewRoundButton'

const Course = ({ course, createRound }) => {
  return (
    <View style={styles.courseContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.courseText}>
          {course.name} ({course.numHoles})
        </Text>
      </View>
      <NewRoundButton course={course}/>
    </View>
  )
}

const styles = StyleSheet.create({
  courseContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  courseText: {
    fontSize: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  }
})

export default Course
