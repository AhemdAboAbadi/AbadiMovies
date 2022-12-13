import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {ScreenContainer} from '../../components';
import {IMovie, MainContext} from '../../context/mainContext';
import {colors, spacing} from '../../theme';
import {
  CalendarBlankIcon,
  ClockIcon,
  StarIcon,
  TicketIcon,
} from '../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const wishlist = 'wishlist';
const Wishlist = () => {
  const [moviesList, setMoviesList] = useState<IMovie[]>([]);
  const {refreshData} = useContext(MainContext);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await AsyncStorage.getItem(wishlist);
      if (movies) {
        setMoviesList(JSON.parse(movies));
      }
    };
    getMovies();
  }, [refreshData]);

  return (
    <ScreenContainer>
      <FlatList
        ListEmptyComponent={
          <Text style={styles.emptyText}>Now Movies in the list </Text>
        }
        data={moviesList}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.movieCard}>
              <Image
                source={{
                  uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`,
                }}
                resizeMode="cover"
                style={styles.movieImage}
              />
              <View style={styles.movieDetailsContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.row}>
                  <StarIcon />
                  <Text style={styles.rateValue}>9.5</Text>
                </View>
                <View style={styles.row}>
                  <CalendarBlankIcon />
                  <Text style={styles.attributeText}>Action</Text>
                </View>
                <View style={styles.row}>
                  <ClockIcon />
                  <Text style={styles.attributeText}>2019</Text>
                </View>
                <View style={styles.row}>
                  <TicketIcon />
                  <Text style={styles.attributeText}>139 minuts</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </ScreenContainer>
  );
};

export default Wishlist;
const styles = StyleSheet.create({
  movieCard: {
    flexDirection: 'row',
    marginTop: spacing.xLarge,
  },
  movieImage: {
    width: 95,
    height: 120,
    borderRadius: spacing.normal,
  },
  movieDetailsContainer: {
    marginLeft: spacing.medium,
  },
  title: {
    color: colors.white2,
    fontFamily: 'Poppins-Regular',
    marginLeft: spacing.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateValue: {
    color: colors.orange,
    fontFamily: 'Poppins-Regular',
    marginLeft: spacing.small,
    fontSize: 12,
  },
  attributeText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: spacing.small,
    fontSize: 12,
    color: colors.white2,
  },
  emptyText: {
    color: colors.red,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 70,
    fontWeight: 'bold',
  },
});
