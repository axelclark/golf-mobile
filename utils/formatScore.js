const formatScore = (score) => {
  if (score === 0) {
    return 'E'
  } else if (score < 0) {
    return score
  } else {
    return `+${score}`
  }
}

export default formatScore
