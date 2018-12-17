import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'


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
    marginTop: 50,
    marginBottom: 50,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 72,
    color: 'rgba(175, 47, 47, 0.25)',
    fontWeight: '100'
  },
})

export default Header
