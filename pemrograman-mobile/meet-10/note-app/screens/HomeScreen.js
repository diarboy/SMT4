import { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';
import tw from 'twrnc';
import { deleteNote } from '../database';

export const HomeScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const db = useSQLiteContext();
  const [isLoading, setIsLoading] = useState(true);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const results = await db.getAllAsync('SELECT * FROM note ORDER BY id ASC');
      setNotes(results);
      setIsLoading(false);
    } catch (error) {
      console.error("Database error", error);
    } finally {
      setIsLoading(false);
    }
  };

  
const handleDelete = (id) => {
    Alert.alert("Konfirmasi", "Apakah Anda yakin ingin menghapus catatan ini?", [
        { text: "Batal", style: "cancel" },
        {
            text: "Hapus",
            style: "destructive",
            onPress: async () => {
                try {
                    await deleteNote(db, id);
                    await loadNotes();
                } catch (error) {
                    console.error("Delete error", error);
                }
            }
        }
    ])
}

const renderRightActions = (id) => {
    return (
    <TouchableOpacity
    onPress={() => handleDelete(id)}
    style={tw`bg-red-600 justify-center items-center w-20 h-full rounded-r-xl`}
    >
        <Text style={tw`text-white font-bold`}>Hapus</Text>
    </TouchableOpacity>
    )    
}

  useEffect(() => {
    loadNotes();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (

    <FlatList
      style={tw`w-full p-4`}
      data={notes}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={loadNotes}
          tintColor="#0000FF"
        />
      }
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={tw`bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl shadow-md`}>
          <Text style={tw`text-lg font-semibold text-gray-900 dark:text-white mb-1`}>
            {item.title}
          </Text>
          <Text style={tw`text-gray-700 dark:text-gray-300`}>
            {item.content}
          </Text>
        </View>
        </Swipeable>
      )}
      ListEmptyComponent={
        <Text style={tw`text-center text-gray-500 mt-4`}>No notes found</Text>
      }
    />
  );
};

export default HomeScreen;