import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

const RoundInfo = ({ round }) => {
  console.log(round)
  return (
    <View style={styles.roundContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {round.course.name}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text>
          {round.startedOn}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text>
          Score: {round.totalScore}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 18,
  },
  roundContainer: {
    minHeight: 100,
    flex: 1,
  },
  textContainer: {
    margin: 5,
  }
})

export default RoundInfo
