import "react-native"
import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import TestRenderer from "react-test-renderer"
import NavigationTestUtils from "react-navigation/NavigationTestUtils"
import { ROUNDS_QUERY } from "../../screens/RoundsScreen"
import RoundsScreen from "../../screens/RoundsScreen"
import wait from "waait"

const mocks = [
  {
    request: {
      query: ROUNDS_QUERY,
    },
    result: {
      data: {
        rounds: [
          {
            id: "1",
            startedOn: "December",
            totalScore: "3",
            holesToPlay: "7",
            courseId: "2",
            course: {
              id: "2",
              name: "My Course",
            },
          },
        ],
      },
    },
  },
]

describe("Roundscreen snapshot", () => {
  it("renders RoundsScreen correctly", async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RoundsScreen />
      </MockedProvider>
    )
    await wait(0)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders RoundsScreen when loading", async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RoundsScreen />
      </MockedProvider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
