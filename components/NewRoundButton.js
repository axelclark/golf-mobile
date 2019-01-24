import React from "react"
import { View, StyleSheet } from "react-native"
import { TouchableHighlight } from "react-native"
import { withNavigation } from "react-navigation"
import { Icon } from "expo"

import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import { ROUNDS_QUERY } from "../screens/RoundsScreen"
import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"

const CREATE_ROUND_MUTATION = gql`
  mutation($round: RoundInput!) {
    round: createRound(input: $round) {
      id
      courseId
      startedOn
      totalScore
      holesToPlay
      course {
        id
        name
      }
      scores {
        id
        numStrokes
        hole {
          id
          holeNumber
          par
        }
      }
    }
  }
`

const NewRoundButton = ({ course, navigation }) => {
  const newRound = {
    round: {
      courseId: Number(course.id),
    },
  }
  const handleCompleted = data => {
    navigation.navigate("ShowRound", { id: data.round.id })
  }

  return (
    <View>
      <Mutation
        mutation={CREATE_ROUND_MUTATION}
        variables={newRound}
        onCompleted={data => handleCompleted(data)}
        update={(store, { data: { round } }) => {
          const data = store.readQuery({ query: ROUNDS_QUERY })
          data.rounds.push(round)
          store.writeQuery({
            query: ROUNDS_QUERY,
            data,
          })
        }}
      >
        {createRoundMutation => (
          <View style={styles.container}>
            <TouchableHighlight onPress={() => createRoundMutation()}>
              <Icon.Ionicons
                name={"md-play"}
                size={Sizes.mediumLarge}
                color={Colors.darkPrimary}
              />
            </TouchableHighlight>
          </View>
        )}
      </Mutation>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: Sizes.small,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default withNavigation(NewRoundButton)
