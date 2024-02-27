import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles, theme} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import {fallbackMoviePoster, image500} from '../api/movieAPI';
import Loading from '../components/Loading';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from '../features/movies/moviesThunks';
import {
  selectMoviesDetails,
  selectMovieCredits,
  selectsimilarMovies,
} from '../features/movies/moviesSlice';
import HeartIconButton from '../components/HeartIconButton';

let {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

const MovieScreen = () => {
  const {params: item} = useRoute();

  const navigation = useNavigation();
  //State for heart icon
  const [isFavourite, toggleFavourite] = useState(false);

  const dispatch = useDispatch();
  const {movieDetails, loading} = useSelector(selectMoviesDetails);
  const {movieCredits: cast} = useSelector(selectMovieCredits);
  const {similarMovies} = useSelector(selectsimilarMovies);
  useEffect(() => {
    dispatch(fetchMovieDetails(item.id));
    dispatch(fetchMovieCredits(item.id));
    dispatch(fetchSimilarMovies(item.id));
  }, [item, dispatch]);

  return (
    <ScrollView
      contentContainerStyle={style.container}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4' +
            topMargin
          }>
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => navigation.navigate('Home')}>
            <ChevronLeftIcon
              style={styles.background}
              size="28"
              strokeWidth={2.5}
              color="white"
            />
          </TouchableOpacity>
          <HeartIconButton movie={movieDetails} />
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movieDetails?.poster_path || fallbackMoviePoster),
              }}
              style={{width, height: height * 0.55}}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.8)',
                'rgba(23, 23, 23, 1)',
              ]}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      {/* Movie Details View */}
      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        {/* Movie title */}
        <Text className="text-white text-center text-3xl font-bold tracking tracking-wider">
          {movieDetails?.title}
        </Text>
        {/* status release date runtime */}
        {movieDetails?.id ? (
          <Text className="text-neutral-400 font-base text-center">
            {movieDetails?.status} • {movieDetails?.release_date} •{' '}
            {movieDetails?.runtime}
          </Text>
        ) : null}

        {/* Genre */}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movieDetails?.genres?.map((genre, index) => {
            let showDot = index + 1 != movieDetails.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name} {showDot ? '•' : null}
              </Text>
            );
          })}
        </View>
        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movieDetails?.overview}
        </Text>
      </View>
      {/* cast scroll view */}
      <Cast navigation={navigation} cast={cast} />

      {/* Similar Movies */}

      {
        <MovieList
          title={'Similar Movies'}
          hideSeeAll={true}
          data={similarMovies}
        />
      }
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
export default MovieScreen;
