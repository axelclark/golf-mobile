import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

import formatScore from '../utils/formatScore'

const RoundInfo = ({ round }) => {
  return (
    <View style={styles.roundContainer}>
        <Text style={[styles.text, styles.nameText]}>
          {round.course.name}
        </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Score: {formatScore(round.totalScore)}
        </Text>
        <Text style={styles.text}>
          To Play: {round.holesToPlay}
        </Text>
        <Text style={styles.text}>
          {round.startedOn}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  nameText: {
    fontSize: 36,
    textAlign: 'center',
    marginLeft: 0,
    marginTop: 8,
    flex: 2,
  },
  roundContainer: {
    minHeight: 90,
    borderBottomWidth: 1,
    borderColor: '#ededed',
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default RoundInfo
