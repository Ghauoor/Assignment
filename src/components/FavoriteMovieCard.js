import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {image500, fallbackMoviePoster} from '../api/movieAPI';
import {theme} from '../theme/theme';
import HeartIconButton from './HeartIconButton';

const FavoriteMovieCard = ({movie}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {movie?.title}
          </Text>
          <HeartIconButton movie={movie} />
        </View>
        <Text style={styles.tagline}>{movie?.tagline}</Text>
        <Text style={styles.releaseDate}>
          Release Date:{' '}
          <Text style={styles.whiteText}>{movie?.release_date}</Text>
        </Text>
        <View style={styles.genresContainer}>
          {movie?.genres?.map((genre, index) => (
            <Text key={index} style={styles.genre}>
              {genre?.name}
            </Text>
          ))}
        </View>
        <Text style={styles.budget}>
          Budget: <Text style={styles.whiteText}>${movie?.budget}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.background,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  poster: {
    width: '32%',
  },
  infoContainer: {
    flex: 1,
    padding: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tagline: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  releaseDate: {
    fontSize: 16,
    color: '#000',
    marginBottom: 6,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  genre: {
    fontSize: 14,
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  budget: {
    fontSize: 16,
    color: '#000',
  },
  whiteText: {
    color: 'white',
  },
});

export default FavoriteMovieCard;
