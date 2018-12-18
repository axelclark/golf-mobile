import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

import formatScore from '../utils/formatScore'
import Sizes from '../constants/Sizes'
import Colors from '../constants/Colors'

const RoundInfo = ({ round }) => {
  return (
    <View style={styles.roundContainer}>
        <Text style={styles.nameText}>
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
    fontSize: Sizes.large,
    textAlign: 'center',
    marginLeft: 0,
    marginTop: Sizes.verySmall,
    flex: 2,
    color: Colors.mainTitle,
  },
  roundContainer: {
    minHeight: 90,
    borderBottomWidth: 1,
    borderColor: Colors.defaultTableBorder,
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: Sizes.medium,
    flex: 1,
    textAlign: 'center',
    color: Colors.defaultText
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default RoundInfo
