import React from 'react'
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'

import { styles } from './Score'

const ScoresHeader = () => {
  return (
    <View style={[styles.scoreRow, headerStyles.headerRow]}>
      <View style={[styles.rowItem, styles.holeNumber]}>
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
          Remove
        </Text>

      </View>
      <View style={styles.rowItem}>
        <Text style={[styles.rowText, headerStyles.headerText]}>
          Add
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
    fontSize: 18,
    minHeight: 50,
    flex: 1,
  },
  headerRow: {
    minHeight: 50,
    flex: 1,
  }
})

export default ScoresHeader