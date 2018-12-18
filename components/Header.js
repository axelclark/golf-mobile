import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import Sizes from '../constants/Sizes'
import Colors from '../constants/Colors'

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: Sizes.extraLarge,
    marginBottom: Sizes.extraLarge,
  },
  headerText: {
    textAlign: 'center',
    fontSize: Sizes.extraHuge,
    color: Colors.mainTitle,
    fontWeight: '100'
  },
})

export default Header
