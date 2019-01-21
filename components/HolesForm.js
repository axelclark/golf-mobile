import React from "react"
import { View } from "react-native"
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements"

class HolesForm extends React.Component {
  handleFieldChange = (index, field) => value => {
    let data = [...this.props.value]
    let hole = data[index]
    hole[field] = value ? Number(value) : ""
    data[index] = hole
    this.props.onChangeText(data)
  }
  render() {
    return (
      <View>
        {this.props.value.map((hole, index) => (
          <View key={hole.id}>
            <FormLabel>Hole Number</FormLabel>
            <FormInput
              value={String(hole.holeNumber)}
              onChangeText={this.handleFieldChange(index, "holeNumber")}
            />
            <FormValidationMessage>{""}</FormValidationMessage>

            <FormLabel>Par</FormLabel>
            <FormInput
              value={String(hole.par)}
              onChangeText={this.handleFieldChange(index, "par")}
            />
            <FormValidationMessage>{""}</FormValidationMessage>
          </View>
        ))}
      </View>
    )
  }
}

export default HolesForm
