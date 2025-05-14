import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NoteForm from "./components/NoteForm";
import HomeScreen from "./screens/HomeScreen";
import { onInitDB } from "./database";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SQLiteProvider
      databaseName="notedb.db"
      onInit={onInitDB}
      options={{ useNewConnection: false }}
    >
      <NoteForm />
      <HomeScreen />
    </SQLiteProvider>
    </GestureHandlerRootView>

  );
}