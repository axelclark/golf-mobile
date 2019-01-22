import React from "react"
import { View, Text, StyleSheet } from "react-native"

import NewRoundButton from "./NewRoundButton"
import EditCourseButton from "./EditCourseButton"
import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"

const Course = ({ course }) => {
  return (
    <View style={styles.courseContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.courseText}>
          {course.name} ({course.numHoles})
        </Text>
      </View>
      <EditCourseButton course={course} />
      <NewRoundButton course={course} />
    </View>
  )
}

const styles = StyleSheet.create({
  courseContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.defaultTableBorder,
    backgroundColor: Colors.defaultTableBackgroundColor,
    marginLeft: Sizes.verySmall,
    marginRight: Sizes.verySmall,
    marginBottom: 2,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseText: {
    fontSize: Sizes.medium,
    color: Colors.defaultText,
  },
  textContainer: {
    flex: 6,
    marginLeft: Sizes.verySmall,
  },
})

export default Course
