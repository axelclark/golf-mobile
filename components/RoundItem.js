import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import Swipeable from 'react-native-swipeable'

import DeleteRoundButton from './DeleteRoundButton'

import formatScore from '../utils/formatScore'
import Sizes from '../constants/Sizes'
import Colors from '../constants/Colors'

const RoundItem = ({ round, navigation }) => {
  const rightButtons = [
    <DeleteRoundButton round={round} />
  ];

  return (
    <Swipeable rightButtons={rightButtons}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowRound', {id: round.id})}
      >
        <View style={styles.roundContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.roundText}>
              {round.course.name} ({round.startedOn})
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              {formatScore(round.totalScore)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 8,
    marginLeft: Sizes.verySmall,
  },
  roundContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    marginLeft: Sizes.verySmall,
    marginRight: Sizes.verySmall,
    marginBottom: 2,
    paddingTop: Sizes.medium,
    paddingBottom: Sizes.medium,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundText: {
    fontSize: Sizes.medium,
    maxWidth: 300,
    flex: 1,
    color: Colors.defaultText,
  },
  scoreContainer: {
    flex: 1,
    marginRight: Sizes.verySmall,
  },
  scoreText: {
    fontSize: Sizes.medium,
    textAlign: 'center',
    color: Colors.defaultText,
  },
})

export default withNavigation(RoundItem)
