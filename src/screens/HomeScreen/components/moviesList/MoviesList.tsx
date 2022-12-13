import {FlatList, Image, StyleSheet, Pressable, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {IMovie, MainContext} from '../../../../context/mainContext';
import {spacing} from '../../../../theme';
import {useNavigation} from '@react-navigation/native';

interface IMoviesList {
  data: IMovie[];
}
const MoviesList = ({data}: IMoviesList) => {
  const {navigate} = useNavigation();
  const {setSelectedMovie} = useContext(MainContext);

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      renderItem={({item}) => {
        return (
          <Pressable
            onPress={() => {
              setSelectedMovie(item);
              navigate('MovieDetails', {item});
            }}
            style={styles.cardContainer}>
            <Image
              source={{
                uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
              }}
              resizeMode="cover"
              style={styles.movieCard}
            />
          </Pressable>
        );
      }}
    />
  );
};

export default MoviesList;

const styles = StyleSheet.create({
  cardContainer: {
    width: '33%',
    height: 145,
    padding: 5,
    marginTop: spacing.normal,
  },
  movieCard: {
    width: '100%',
    height: 145,
    borderRadius: spacing.normal,
  },
});
