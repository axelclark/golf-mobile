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

class ShowRoundScreen extends React.Component {
  static navigationOptions = {
    title: 'Round',
  };

  render() {
    const id = this.props.navigation.getParam('id', 'Error')
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Query query={ROUND_QUERY} variables={{ id }}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Fetching</Text>
                if (error) return <Text>Error</Text>

                const scoresToRender = data.round.scores

              return (
                <View>
                  {scoresToRender.map(score => <Score key={score.id} score={score} />)}
                </View>
              )
            }}
          </Query>
        </ScrollView>
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

const ROUND_QUERY = gql`
  query ($id: ID!) {
    round(id: $id) {
      course {
        name
      },
      startedOn
      scores {
        id
        numStrokes
        hole {
          holeNumber
          par
        }
      }
    }
  }
`
;

export default ShowRoundScreen
