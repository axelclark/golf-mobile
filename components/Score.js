import React from 'react'
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import Swipeable from 'react-native-swipeable'

import UpdateScoreButton from './UpdateScoreButton'
import ResetStrokesButton from './ResetStrokesButton'
import Sizes from '../constants/Sizes'
import Colors from '../constants/Colors'

export default class Score extends React.Component {
  constructor() {
    super()
    this.state = {
      swipeable: null
    }
  }

  render() {
    const { score } = this.props
    const { swipeable } = this.state
    const rightButtons = [
      <ResetStrokesButton score={score} swipeable={swipeable} />
    ]
    return (
      <Swipeable
        onRef={(ref) => this.setState({ swipeable: ref })}
        rightButtons={rightButtons}
      >
        <View style={styles.scoreRow}>
          <View style={styles.rowItem}>
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
      </Swipeable>
    )
  }
}

export const styles = StyleSheet.create({
  scoreRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowItem: {
    borderBottomWidth: 1,
    borderColor: Colors.defaultTableBorder,
    backgroundColor: Colors.defaultTableBackgroundColor,
    flex: 1,
    paddingTop: Sizes.small,
    paddingBottom: Sizes.small,
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
    fontSize: Sizes.mediumLarge,
    textAlign: 'center',
    color: Colors.defaultText,
  },
})
