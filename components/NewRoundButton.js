import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_ROUND_MUTATION = gql`
  mutation ($round: RoundInput!) {
    round: createRound(input: $round) {
      courseId
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
