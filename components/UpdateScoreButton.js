import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Icon } from "expo"

import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import Colors from "../constants/Colors"

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
export default class UpdateScoreButton extends React.Component {
  constructor() {
    super()
    this.state = {
      updating: false,
    }
  }

  onPress = updateScoreMutation => {
    this.setState({ updating: true })
    updateScoreMutation().then(() => {
      this.setState({ updating: false })
    })
  }

  render() {
    const { score, change, iconName } = this.props
    let scoreParams = {
      id: score.id,
      score: {
        numStrokes: score.numStrokes + change,
      },
    }
    const { updating } = this.state

    return (
      <View>
        <Mutation mutation={UPDATE_SCORE_MUTATION} variables={scoreParams}>
          {updateScoreMutation => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => this.onPress(updateScoreMutation)}
              onLongPress={() => {
                scoreParams.score.numStrokes = 0
                updateScoreMutation()
              }}
              disabled={updating}
            >
              <Icon.Ionicons
                name={iconName}
                size={26}
                style={styles.icons}
                color={Colors.defaultText}
              />
            </TouchableOpacity>
          )}
        </Mutation>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    flex: 1,
  },
})
