import * as React from "react";
import { Text } from "react-native";

export function MonoText(props: any) {
  return <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />;
}
