import React from 'react'
import { View, Button } from 'react-native'

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
    }
  }
`

const UpdateScoreButton = ({ score, change, title }) => {
  const scoreParams = {
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
          <Button
            onPress={() => updateScoreMutation(scoreParams)}
            title={title}
          />
        )}
      </Mutation>
    </View>
  )
}

export default UpdateScoreButton
