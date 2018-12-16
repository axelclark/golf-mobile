import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RoundItem from '../components/RoundItem'

class RoundsScreen extends React.Component {
  static navigationOptions = {
    title: 'Rounds',
  };

  get rounds() {
    const { data } = this.props;
    if (data && data.rounds) {
      return data.rounds;
    } else {
      return [];
    }
  }

  renderRound(round) {
    return (
      <RoundItem
        key={round.id}
        round={round}
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {this.rounds.map(round => this.renderRound(round))}
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

const query = gql`
  {
    rounds {
      id
      startedOn
      totalScore
      course {
        name
      }
    }
  }
`;

export default graphql(query)(RoundsScreen);
