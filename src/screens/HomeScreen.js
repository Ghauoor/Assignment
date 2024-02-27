import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

import {styles} from '../theme/theme';
import TrandingMovies from '../components/TrandingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from '../features/movies/moviesThunks';
import {
  selectTrendingMovies,
  selectupComingMovies,
  selectTopRatedMovies,
} from '../features/movies/moviesSlice';

const ios = Platform.OS == 'ios';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {trendingMovies, loading} = useSelector(selectTrendingMovies);
  const {upcomingMovies} = useSelector(selectupComingMovies);
  const {topRatedMovies} = useSelector(selectTopRatedMovies);
  //get movies data
  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between item-center mx-4">
          <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon color="white" strokeWidth={2} size="30" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}>
          {/*Tranding Movies Carusal*/}
          {trendingMovies?.length > 0 && (
            <TrandingMovies data={trendingMovies} />
          )}

          {/* upcoming movie row */}

          {upcomingMovies?.length > 0 && (
            <MovieList title="Upcoming" data={upcomingMovies} />
          )}

          {/* Top Rated movie row */}
          {topRatedMovies?.length > 0 && (
            <MovieList title="Top Rated" data={topRatedMovies} />
          )}
        </ScrollView>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {paddingBottom: 10},
});
export default HomeScreen;
