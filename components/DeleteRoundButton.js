import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Icon } from 'expo'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ROUNDS_QUERY } from '../screens/RoundsScreen'
import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const DELETE_ROUND_MUTATION = gql`
  mutation ($id: ID!) {
    round: deleteRound(id: $id) {
      id
    }
  }
`

export default class DeleteRoundButton extends React.Component {
  constructor() {
    super()
  }

  render() {
    const { round } = this.props
    const roundParams = {
      id: round.id
    }
    const deleteRound = (rounds, roundId) => {
      return rounds.filter((round) => {
        return round.id !== roundId
      })
    }
    return (
      <View style={{ flex: 1 }}>
        <Mutation
          mutation={DELETE_ROUND_MUTATION}
          variables={roundParams}
          update={(store, { data: { round } }) => {
            const data = store.readQuery({ query: ROUNDS_QUERY })
            const newRounds = deleteRound(data.rounds, round.id)
            data.rounds = newRounds
            store.writeQuery({
              query: ROUNDS_QUERY,
              data
            })
          }}
        >
          {deleteRoundMutation => (
            <TouchableOpacity
              onPress={() => deleteRoundMutation()}
              style={{ flex: 1 }}
            >
              <View style={styles.container}>
                <Text style={styles.text}>
                  Delete{"\n"}Round
                </Text>
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
    backgroundColor: Colors.errorBackground,
    justifyContent: 'center',
    maxWidth: Sizes.huge,
  },
  text: {
    flex: 0,
    color: Colors.errorText,
    textAlign: 'center',
  }

})
