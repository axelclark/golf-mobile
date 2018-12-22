import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RoundItem from '../components/RoundItem'
import Header from '../components/Header'
import Colors from '../constants/Colors'

class RoundsScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
          <Header title={'Rounds'}/>
          {this.rounds.map(round => this.renderRound(round))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});

export const ROUNDS_QUERY = gql`
  {
    rounds {
      id
      startedOn
      totalScore
      holesToPlay
      courseId
      course {
        id
        name
      }
    }
  }
`;

export default graphql(ROUNDS_QUERY)(RoundsScreen);
