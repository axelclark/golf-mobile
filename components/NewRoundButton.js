import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ROUNDS_QUERY } from '../screens/RoundsScreen'

const CREATE_ROUND_MUTATION = gql`
  mutation ($round: RoundInput!) {
    round: createRound(input: $round) {
      id
      courseId
      startedOn
      totalScore
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
      courseId: Number(course.id)
    }
  }

  return (
    <View style={styles.buttonContainer}>
      <Mutation
        mutation={CREATE_ROUND_MUTATION}
        variables={newRound}
        onCompleted={() => navigation.navigate('Rounds')}
        update={(store, { data: { round } }) => {
          const data = store.readQuery({ query: ROUNDS_QUERY })
          console.log(round)
          data.rounds.push(round)
          store.writeQuery({
            query: ROUNDS_QUERY,
            data
          })
        }}
      >
        {createRoundMutation => (
          <Button
            onPress={() => createRoundMutation(newRound)}
            title='New Round'
          />
        )}
      </Mutation>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    maxWidth: 100,
    maxHeight: 50,
    margin: 5,
    flex: 1
  }
})

export default withNavigation(NewRoundButton)
