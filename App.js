import { StatusBar } from "expo-status-bar";
import { fontCollection } from "./src/utils/global/fonts";
import { useFonts } from "expo-font";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { init } from "./src/utils/db";

init();

export default function App() {
  const [fontsLoaded] = useFonts(fontCollection);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar />
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </>
  );
}
