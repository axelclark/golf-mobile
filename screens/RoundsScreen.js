import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import RoundItem from '../components/RoundItem'
import Header from '../components/Header'
import Colors from '../constants/Colors'

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

class RoundsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super()
    this.state = {
      refreshing: false,
    }
  }

  _onRefresh = (refetch) => {
    this.setState({refreshing: true});
    refetch().then(() => {
      this.setState({refreshing: false});
    });
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
        <Header title={'Rounds'}/>
        <Query query={ROUNDS_QUERY}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Text>Fetching</Text>
              if (error) return <Text>Error</Text>
              const { rounds } = data
            return (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh(refetch)}
                  />
                }
              >
                {rounds.map(round => this.renderRound(round))}
              </ScrollView>
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
    backgroundColor: Colors.backgroundColor,
  },
});

export default RoundsScreen
