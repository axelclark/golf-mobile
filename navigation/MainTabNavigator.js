/* eslint-disable react/display-name */
import React from "react"
import { Platform } from "react-native"
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation"

import TabBarIcon from "../components/TabBarIcon"
import CoursesScreen from "../screens/CoursesScreen"
import NewCourseScreen from "../screens/NewCourseScreen"
import RoundsScreen from "../screens/RoundsScreen"
import ShowRoundScreen from "../screens/ShowRoundScreen"
import SettingsScreen from "../screens/SettingsScreen"

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen,
  NewCourse: NewCourseScreen,
})

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-flag" : "md-information-circle"}
    />
  ),
}

const RoundsStack = createStackNavigator({
  Rounds: RoundsScreen,
  ShowRound: ShowRoundScreen,
})

RoundsStack.navigationOptions = {
  tabBarLabel: "Rounds",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-disc" : "md-link"}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
}

export default createBottomTabNavigator({
  CoursesStack,
  RoundsStack,
  SettingsStack,
})
