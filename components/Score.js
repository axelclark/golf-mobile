import React from 'react'
import {
  Text,
} from 'react-native'

const Score = ({ score }) => {
  return (
    <Text>
      {score.numStrokes}
    </Text>
  )
}

export default Score
