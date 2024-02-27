import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  FlatList,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadFavorites} from '../features/favorite/favoritesSlice';
import {styles} from '../theme/theme';
import FavoriteMovieCard from '../components/FavoriteMovieCard';
import EmptyListComponent from '../components/EmptyListComponent';

const ios = Platform.OS == 'ios';
const FavoriteMovieScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  React.useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between item-center mx-4">
          <Text className="text-white text-4xl mt-1 font-bold">
            <Text style={styles.text}>Fav</Text>movies
          </Text>
        </View>
      </SafeAreaView>
      {/* Favorite Movies */}
      <View className="flex-1 p-4">
        <FlatList
          data={favorites.items}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <FavoriteMovieCard movie={item} />}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={<EmptyListComponent />}
        />
      </View>
    </View>
  );
};

export default FavoriteMovieScreen;
