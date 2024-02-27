import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image500} from '../api/movieAPI';

let {width, height} = Dimensions.get('window');
const TrandingMovies = ({data}) => {
  //Navigation
  const navigation = useNavigation();
  const handleClick = item => {
    navigation.navigate('Movie', item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Tranding Movies</Text>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={2}
        inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={styles.carouselStyle}
      />
    </View>
  );
};

const MovieCard = ({item, handleClick}) => (
  <TouchableWithoutFeedback onPress={() => handleClick(item)}>
    <Image
      source={{uri: image500(item?.poster_path) || fallbackMoviePoster}}
      style={{
        width: width * 0.6,
        height: height * 0.5,
      }}
      className="rounded-3xl"
    />
  </TouchableWithoutFeedback>
);
const styles = StyleSheet.create({
  carouselStyle: {display: 'flex', alignItems: 'center'},
});
export default TrandingMovies;
