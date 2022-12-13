import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import {IMovie, MainContext} from '../../../../context/mainContext';
import {colors, spacing} from '../../../../theme';
interface IMoviesCard {
  item: IMovie;
  index: number;
}

const MoviesCard = ({item, index}: IMoviesCard) => {
  const {navigate} = useNavigation();
  const {setSelectedMovie} = useContext(MainContext);
  return (
    <Pressable
      onPress={() => {
        setSelectedMovie(item);
        navigate('MovieDetails', {item});
      }}>
      <View style={{position: 'relative', padding: 10, height: 240}}>
        <Image
          source={{
            uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
          }}
          style={styles.movieImage}
          resizeMode="cover"
        />
        <Text style={styles.MovieNumber}>{index + 1}</Text>
      </View>
    </Pressable>
  );
};

export default MoviesCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.normal,
    overflow: 'hidden',
  },
  movieImage: {
    height: 210,
    width: 144,
  },
  MovieNumber: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 96,
    color: colors.gray4,
    textShadowColor: colors.primaryBlueColor,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
    bottom: -20,
    left: -10,
  },
});
