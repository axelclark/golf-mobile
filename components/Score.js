import React from 'react'
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import UpdateScoreButton from './UpdateScoreButton'

const Score = ({ score }) => {
  return (
    <View style={styles.scoreRow}>
      <View style={[styles.rowItem, styles.holeNumber]}>
        <Text style={styles.rowText}>
          {score.hole.holeNumber}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.rowText}>
          {score.hole.par}
        </Text>
      </View>
      <View style={styles.rowItem}>
        <UpdateScoreButton
          title='-'
          score={score}
          change={-1}
        />
      </View>
      <View style={styles.rowItem}>
        <UpdateScoreButton
          title='+'
          score={score}
          change={1}
        />
      </View>
      <View style={styles.rowItem}>
        <Text style={styles.rowText}>
          {score.numStrokes}
        </Text>
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  holeNumber: {
    textAlign: 'left'
  },
  scoreRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    borderBottomWidth: 1,
    borderColor: '#ededed',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  rowText: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center'
  },
})

export default Score
