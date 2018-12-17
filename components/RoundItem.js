import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import formatScore from '../utils/formatScore'

const RoundItem = ({ round, navigation }) => {
  return (
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
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    flex: 8,
    marginLeft: 5,
  },
  roundContainer: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    paddingTop: 18,
    paddingBottom: 18,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundText: {
    fontSize: 16,
    maxWidth: 300,
    flex: 1,
  },
  scoreContainer: {
    flex: 1,
    marginRight: 5,
  },
  scoreText: {
    fontSize: 16,
    textAlign: 'center'

  },
})

export default withNavigation(RoundItem)
