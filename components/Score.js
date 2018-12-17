import React from 'react'
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'

import UpdateScoreButton from './UpdateScoreButton'
import Sizes from '../constants/Sizes'

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
          iconName='ios-add-circle-outline'
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
    paddingTop: Sizes.small,
    paddingBottom: Sizes.small,
  },
  rowText: {
    flex: 1,
    fontSize: Sizes.mediumLarge,
    textAlign: 'center'
  },
})

export default Score
