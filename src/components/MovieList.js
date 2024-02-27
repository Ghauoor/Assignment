import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {styles} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image185} from '../api/movieAPI';

let {width, height} = Dimensions.get('window');
const MovieList = ({title, data, hideSeeAll}) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl ">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.container}>
        {data &&
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}>
                <View className="space-y-1 mr-4">
                  <Image
                    className="rounded-2xl"
                    source={{
                      uri: image185(item.poster_path) || fallbackMoviePoster,
                    }}
                    style={{width: width * 0.33, height: height * 0.22}}
                  />

                  <Text className="text-neutral-300 ml-1">
                    {item.title.length > 14
                      ? item.title.slice(0, 14) + '...'
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  container: {paddingHorizontal: 15},
});
export default MovieList;
