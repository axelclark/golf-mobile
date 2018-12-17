const formatScore = (score) => {
  if (score === 0) {
    return 'Even'
  } else if (score < 0) {
    return score
  } else {
    return `+${score}`
  }
}

export default formatScore
