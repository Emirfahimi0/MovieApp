import { Animated, GestureResponderEvent, PanResponder, PanResponderGestureState, View, ViewStyle } from "react-native";
import { DrawerState, color, height, setHeight } from "../../constants";
import React, { useRef } from "react";
import { animateMove, getNextState } from "./detail-component";

interface BottomDrawerProps {
  children?: React.ReactNode;
  onDrawerStateChange?: (nextState?: DrawerState) => void;
}

const BottomDrawer: React.FunctionComponent<BottomDrawerProps> = ({ children, onDrawerStateChange }) => {
  /* Declare initial value of y. In this case, we want it to be closed when the component is closed */
  const y = useRef(new Animated.Value(DrawerState.Closed)).current;
  /* Declare another variable to keep track of the state. We need a separate variable for this because y will also change whilst the user is in the process of moving the drawer up or down */
  const state = useRef(new Animated.Value(DrawerState.Closed)).current;
  const margin = 0.08 * height;
  const movementValue = (moveY: number) => height - moveY;

  /* This event is triggered when the animated view is moving. We want the user to be able to drag/swipe up or down and the drawer should move simultaneously. */
  const onPanResponderMove = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const val = movementValue(moveY);
    animateMove(y, val);
  };

  /* Here is where we snap the drawer to the desired state - open, peek or closed */
  const onPanResponderRelease = (_: GestureResponderEvent, { moveY }: PanResponderGestureState) => {
    const valueToMove = movementValue(moveY);
    const nextState = getNextState(state._value, valueToMove, margin);
    state.setValue(nextState);
    animateMove(y, nextState);
  };

  /* This determines if the responder should do something. In this scenario, it is set to true when the distance moved by Y is greater than or equal to 10, or lesser than or equal to -10. */
  const onMoveShouldSetPanResponder = (_: GestureResponderEvent, { dy }: PanResponderGestureState) => Math.abs(dy) >= 10;

  /* Here we're creating a panResponder object and assigning th event handlers to it. */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    }),
  ).current;

  const drawerContainer: ViewStyle = {
    width: "100%",
    height: height,
    borderRadius: 25,
    position: "absolute",
    zIndex: 1,
    bottom: -height + 64,

    // paddingVertical: setHeight(2),
    /* Refers to y variable which changes as the user performs a gesture */
    transform: [{ translateY: y }, { translateX: 0 }],
  };

  return (
    <Animated.View
      style={drawerContainer}
      /* Refers to the PanResponder created above */
      {...panResponder.panHandlers}>
      <View style={{ ...HorizontalLine }}></View>
      {children}
    </Animated.View>
  );
};

export default BottomDrawer;

export const HorizontalLine: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  borderRadius: 100,
  top: 16,
  height: 4,
  zIndex: 1,
  width: " 10%",
  backgroundColor: color.PRIMARY_COLOR,
};
