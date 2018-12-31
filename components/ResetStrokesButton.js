import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import Colors from "../constants/Colors"
import Sizes from "../constants/Sizes"

const UPDATE_SCORE_MUTATION = gql`
  mutation($id: ID!, $score: ScoreInput!) {
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

export default class ResetStrokesButton extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { score, swipeable } = this.props
    const scoreParams = {
      id: score.id,
      score: {
        numStrokes: 0,
      },
    }
    return (
      <View style={{ flex: 1 }}>
        <Mutation mutation={UPDATE_SCORE_MUTATION} variables={scoreParams}>
          {updateScoreMutation => (
            <TouchableOpacity
              onPress={() => {
                updateScoreMutation()
                swipeable.recenter()
              }}
              style={{ flex: 1 }}
            >
              <View style={styles.container}>
                <Text style={styles.text}>Reset{"\n"}Strokes</Text>
              </View>
            </TouchableOpacity>
          )}
        </Mutation>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkPrimary,
    justifyContent: "center",
    maxWidth: Sizes.huge,
    marginBottom: 4,
    marginTop: 4,
    marginLeft: 6,
  },
  text: {
    flex: 0,
    color: Colors.errorText,
    textAlign: "center",
  },
})
