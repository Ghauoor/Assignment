import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from '../theme/theme';
import MoviesList from '../components/MovieList';
import Loading from '../components/Loading';
import {fallbackPersonImage, image342} from '../api/movieAPI';
import {
  selectpersonDetails,
  selectpersonMovies,
} from '../features/movies/moviesSlice';
import {
  fetchPersonDetails,
  fetchPersonMovies,
} from '../features/movies/moviesThunks';

const verticalMargin = ios ? '' : ' my-3';
var {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

export default function PersonScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {personDetails, loading} = useSelector(selectpersonDetails);
  const {personMovies} = useSelector(selectpersonMovies);

  const [isFavourite, toggleFavourite] = useState(false);
  const {params: item} = useRoute();
  useEffect(() => {
    dispatch(fetchPersonDetails(item.id));
    dispatch(fetchPersonMovies(item.id));
  }, [item, dispatch]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      {/* Back Button */}
      <SafeAreaView
        className={
          'flex-row justify-between items-center mx-4 z-10 ' + verticalMargin
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
        <TouchableOpacity
          className="rounded-xl p-1"
          onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon
            size="35"
            strokeWidth={2.5}
            color={isFavourite ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center" style={style.container}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
              <Image
                source={{
                  uri:
                    image342(personDetails?.profile_path) ||
                    fallbackPersonImage,
                }}
                style={{height: height * 0.43, width: width * 0.74}}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personDetails?.name}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
              {personDetails?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {/* Male */}
                {personDetails?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">known for</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {personDetails?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">
              {personDetails?.biography ? personDetails.biography : 'N/A'}
            </Text>
          </View>
          {/* Person Movies */}
          <MoviesList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    shadowColor: 'gray',
    shadowRadius: 40,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1,
  },
});
