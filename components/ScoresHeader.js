import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

import { styles } from './Score'
import Sizes from '../constants/Sizes'
import Colors from '../constants/Colors'

const ScoresHeader = () => {
  return (
    <View style={[styles.scoreRow, headerStyles.headerRow]}>
      <View style={styles.rowItem}>
        <Text style={[styles.rowText, headerStyles.headerText]}>
          Hole
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={[styles.rowText, headerStyles.headerText]}>
          Par
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={[styles.rowText, headerStyles.headerText]}>
          Update
        </Text>
      </View>
      <View style={styles.rowItem}>
        <Text style={[styles.rowText, headerStyles.headerText]}>
          Strokes
        </Text>
      </View>
    </View>
  )
}

const headerStyles = StyleSheet.create({
  headerText: {
    fontSize: Sizes.medium,
    color: Colors.lightPrimary,
    flex: 0,
  },
  headerRow: {
    flex: 1,
    minHeight: Sizes.huge,
    maxHeight: Sizes.huge,
    alignItems: 'stretch',
  }
})

export default ScoresHeader
