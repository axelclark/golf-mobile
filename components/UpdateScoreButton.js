import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'expo'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_SCORE_MUTATION = gql`
  mutation ($id: ID!, $score: ScoreInput!) {
    score: updateScore(id: $id, input: $score) {
      id
      numStrokes
      hole {
        id
        holeNumber
        par
      }
      round {
        id
        totalScore
        holesToPlay
      }
    }
  }
`

const UpdateScoreButton = ({ score, change, iconName }) => {
  let scoreParams = {
    id: score.id,
    score: {
      numStrokes: score.numStrokes + change
    }
  }

  return (
    <View>
      <Mutation
        mutation={UPDATE_SCORE_MUTATION}
        variables={scoreParams}
      >
        {updateScoreMutation => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => updateScoreMutation()}
            onLongPress={() => {
              scoreParams.score.numStrokes = 0
              updateScoreMutation()
            }}
            delayLongPress={1000}
          >
            <Icon.Ionicons
              name={iconName}
              size={26}
              style={styles.icons}
            />
          </TouchableOpacity>
        )}
      </Mutation>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
  }

})

export default UpdateScoreButton
