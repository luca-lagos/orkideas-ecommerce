import { StatusBar } from "expo-status-bar";
import { fontCollection } from "./src/utils/global/fonts";
import { useFonts } from "expo-font";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  const [fontsLoaded] = useFonts(fontCollection);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar/>
      <MainNavigator/>
    </>
  );
}
