import React from "react"
import { View, StyleSheet } from "react-native"
import { TouchableHighlight } from "react-native"
import { withNavigation } from "react-navigation"
import { Icon } from "expo"

import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"

const EditCourseButton = ({ course, navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.navigate("EditCourse", { course })}
      >
        <Icon.MaterialIcons
          name={"edit"}
          size={Sizes.mediumLarge}
          color={Colors.darkPrimary}
        />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: Sizes.small,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default withNavigation(EditCourseButton)
