/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Loader, ScreenContainer} from '../../components';
import {SearchInput} from '../HomeScreen/components';
import {colors, spacing} from '../../theme';
import axios from 'axios';
import {
  CalendarBlankIcon,
  ClockIcon,
  StarIcon,
  TicketIcon,
} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL, API_KEY} from '../../utils/constant';

const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {navigate} = useNavigation();

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?${API_KEY}&query=${value || 'fast'}&page=1`,
      );
      setMoviesData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [value]);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Loader />
      </View>
    );
  }
  return (
    <ScreenContainer>
      <SearchInput setValue={setValue} value={value} />
      <View>
        <FlatList
          data={moviesData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Pressable
              style={styles.movieCard}
              onPress={() => {
                navigate('MovieDetails', {item});
              }}>
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
                  <Text style={styles.attributeText}>
                    {Math.floor(Math.random() * 100)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <TicketIcon />
                  <Text style={styles.attributeText}>138 minute</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default SearchScreen;

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray,
  },
});
