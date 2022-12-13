import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Loader, ScreenContainer} from '../../components';
import {MainContext} from '../../context/mainContext';
import {colors, spacing} from '../../theme';
import {SearchInput, MoviesCard, MoviesList} from './components';
import {BASE_URL, API_KEY} from '../../utils/constant';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const NowPlaying = () => {
  const {nowPlayingMoviesData} = useContext(MainContext);
  return <MoviesList data={nowPlayingMoviesData} />;
};

const UpComming = () => {
  const {upComingMoviesData} = useContext(MainContext);
  return <MoviesList data={upComingMoviesData} />;
};
const TopRated = () => {
  const {topRatedMoviesData} = useContext(MainContext);
  return <MoviesList data={topRatedMoviesData} />;
};
const Popular = () => {
  const {popularMoviesData} = useContext(MainContext);
  return <MoviesList data={popularMoviesData} />;
};

const renderScene = SceneMap({
  'now-playing': NowPlaying,
  'up-comming': UpComming,
  'top-rated': TopRated,
  popular: Popular,
});
let routes = [
  {key: 'now-playing', title: 'Now Playing'},
  {key: 'up-comming', title: 'Upcomming'},
  {key: 'top-rated', title: 'Top rated'},
  {key: 'popular', title: 'Popular'},
];

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const {
    moviesData,
    setMoviesData,
    setPopularMoviesData,
    setUpComingMoviesData,
    setNowPlayingMoviesData,
    setTopRatedMoviesData,
  } = useContext(MainContext);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [loading, setIsLoading] = useState(false);

  const getMoviesData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}search/movie?${API_KEY}&query=fast&page=1`,
      );
      setMoviesData(response.data.results);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPapularMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/popular?${API_KEY}&page=1`,
      );
      setPopularMoviesData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUpComingMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/upcoming?${API_KEY}&page=1`,
      );
      setUpComingMoviesData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/now_playing?${API_KEY}&page=1`,
      );
      setNowPlayingMoviesData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}movie/top_rated?${API_KEY}&page=1`,
      );
      setTopRatedMoviesData(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getMoviesData();
    getPapularMovies();
    getUpComingMovies();
    getNowPlayingMovies();
    getTopRatedMovies();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <View>
        <Text style={styles.pageTitle}>What do you want to watch?</Text>
        <Pressable onPress={() => navigate('SearchStack')}>
          <SearchInput containerStyle={styles.searchInput} editable={false} />
        </Pressable>
        <FlatList
          style={styles.productsList}
          data={moviesData}
          keyExtractor={(_, idx) => idx.toString()}
          horizontal
          renderItem={({item, index: idx}) => (
            <MoviesCard item={item} index={idx} />
          )}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            pressColor={colors.primary}
            tabStyle={styles.tabStyle}
            indicatorStyle={styles.indicatorStyle}
            style={styles.TabBarStyle}
            scrollEnabled
            activeColor={colors.primary}
            renderLabel={({route}) => (
              <Text style={styles.tabTextStyle}>{route.title}</Text>
            )}
            {...props}
          />
        )}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loaderStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 18,
    color: colors.white,
    marginTop: spacing.normal,
    fontFamily: 'Poppins-SemiBold',
  },
  searchInput: {
    marginTop: spacing.xLarge,
  },
  productsList: {
    marginTop: spacing.large,
  },
  tabStyle: {
    width: 'auto',
  },
  indicatorStyle: {
    backgroundColor: colors.gray2,
    paddingVertical: 2,
  },
  TabBarStyle: {
    backgroundColor: colors.gray,
  },
  tabTextStyle: {
    color: colors.white,
    textAlign: 'center',
  },
});
