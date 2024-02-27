import {
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {XMarkIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';
import _ from 'lodash'; // Import lodash library
import movieAPI, {fallbackMoviePoster, image185} from '../api/movieAPI';

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = _.debounce(handleSearch, 400);

  // Handle search with debounced function
  const handleSearchDebounced = text => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  async function handleSearch(searchText) {
    setLoading(true);
    try {
      const result = await movieAPI.searchMovies(searchText);
      setResults(result.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  }

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className={
          'mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full' +
          verticalMargin
        }>
        <TextInput
          placeholder="Search Movie"
          onChangeText={handleSearchDebounced}
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSearch(searchQuery)} // Perform immediate search
          className="rounded-full p-3 m-1 bg-neutral-500">
          <MagnifyingGlassIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* All results from API */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.container}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1 ">
            Results ({results.length})
          </Text>
          {/* View container for all the results */}
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View className="space-y-2 mb-4">
                    <Image
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      // source={require('../../assets/images/antman.jpg')}
                      className="rounded-3xl"
                      style={{width: width * 0.44, height: height * 0.3}}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require('../../assets/images/movieTime.png')}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {paddingHorizontal: 15},
});
