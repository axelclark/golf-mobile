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
  const formatToPlay = (toPlay) => {
    if (toPlay === 0) {
      return 'Round Complete'
    } else if (toPlay === 1) {
      return `${toPlay} hole to play`
    } else {
      return `${toPlay} holes to play`
    }
  }
  return (
    <View style={styles.roundContainer}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>
          {formatScore(round.totalScore)}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {round.course.name}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {formatToPlay(round.holesToPlay)}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {round.startedOn}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  nameText: {
    fontSize: Sizes.mediumLarge,
    textAlign: 'center',
    color: Colors.mainTitle,
  },
  roundContainer: {
    minHeight: Sizes.extraHuge,
    borderBottomWidth: 1,
    borderColor: Colors.defaultTableBorder,
    flex: 1,
    flexDirection: 'row',
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: Sizes.extraLarge,
    color: Colors.darkPrimary,
  },
  text: {
    fontSize: Sizes.medium,
    textAlign: 'center',
    color: Colors.defaultLightText
  },
  textContainer: {
  },
})

export default RoundInfo
