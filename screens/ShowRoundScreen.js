import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
} from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Score from '../components/Score'
import ScoresHeader from '../components/ScoresHeader'

class ShowRoundScreen extends React.Component {
  static navigationOptions = {
    title: 'Round',
  };

  sortByHole = scores => scores.sort((a, b) => {
    return parseInt(a.hole.holeNumber) - parseInt(b.hole.holeNumber)
  })

  render() {
    const id = this.props.navigation.getParam('id', 'Error')
    return (
      <SafeAreaView style={styles.container}>
        <Query query={ROUND_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Fetching</Text>
              if (error) return <Text>Error</Text>

              const scoresToRender = this.sortByHole(data.round.scores)

            return (
              <View>
                <ScoresHeader/>
                <ScrollView>
                  {scoresToRender.map(score => <Score key={score.id} score={score} />)}
                </ScrollView>
              </View>
            )
          }}
        </Query>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export const ROUND_QUERY = gql`
  query ($id: ID!) {
    round(id: $id) {
      id
      startedOn
      course {
        id
        name
      },
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
;

export default ShowRoundScreen
