import React from "react"
import { StyleSheet, ScrollView } from "react-native"
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements"

import Sizes from "../constants/Sizes"
import Colors from "../constants/Colors"
import HolesForm from "./HolesForm"

class CourseForm extends React.Component {
  render() {
    const {
      data,
      errorMessage,
      nameError,
      numHolesError,
      handleSubmit,
      handleFieldChange,
    } = this.props

    return (
      <ScrollView>
        <FormValidationMessage>{errorMessage}</FormValidationMessage>

        <FormLabel>Course Name</FormLabel>
        <FormInput
          onChangeText={handleFieldChange("name")}
          value={data.name}
          autoCapitalize={"words"}
        />
        <FormValidationMessage>{nameError}</FormValidationMessage>

        <FormLabel>Number of Holes</FormLabel>
        <FormInput
          onChangeText={handleFieldChange("numHoles")}
          value={String(data.numHoles)}
          keyboardType={"numeric"}
        />
        <FormValidationMessage>{numHolesError}</FormValidationMessage>

        <HolesForm
          onChangeText={handleFieldChange("holes")}
          value={data.holes}
        />

        <Button
          title="Submit"
          buttonStyle={styles.button}
          onPress={() => handleSubmit()}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: Sizes.large,
    marginBottom: Sizes.largeLayout,
    backgroundColor: Colors.darkPrimary,
  },
})

export default CourseForm
