import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors, spacing} from '../../theme';
import {
  BookmarkIcon,
  CalendarBlankIcon,
  ClockIcon,
  StarIcon,
  TicketIcon,
} from '../../assets/icons';
import {MainContext} from '../../context/mainContext';
import {ScreenContainer} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_KEY, BASE_URL} from '../../utils/constant';
import {IMovie} from '../../context/mainContext';

const wishlist = 'wishlist';
const TabSection = ({text}: {text: string | undefined}) =>
  text ? (
    <ScrollView>
      <Text style={styles.overView}>{text}</Text>
    </ScrollView>
  ) : null;
const AboutMovie = () => {
  const {selectedMovie} = useContext(MainContext);
  return <TabSection text={selectedMovie.overview?.toString()} />;
};
const Reviews = () => {
  return (
    <TabSection text={Math.floor(Math.random() * 10).toString() + ' Reviews'} />
  );
};

const Cast = () => {
  const {selectedMovie} = useContext(MainContext);
  return <TabSection text={selectedMovie.overview?.toString()} />;
};

const renderScene = SceneMap({
  'about-movie': AboutMovie,
  reviews: Reviews,
  cast: Cast,
});
let routes = [
  {key: 'about-movie', title: 'About Movie'},
  {key: 'reviews', title: 'Reviews'},
  {key: 'cast', title: 'Cast'},
];

const MovieDetailsScreen = () => {
  const {setRefreshData, refreshData} = useContext(MainContext);
  const {setOptions} = useNavigation();
  const layout = useWindowDimensions();
  const {params} = useRoute();
  const [index, setIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState<IMovie>({});
  const {item}: any = params;

  const addToFavHandler = async () => {
    const wishlistList = (await AsyncStorage.getItem(wishlist)) as
      | IMovie[]
      | any;

    if (wishlistList) {
      const parsedWishlist = JSON.parse(wishlistList);
      if (parsedWishlist?.length) {
        const foundedItem = parsedWishlist?.find(
          (movie: IMovie) => movie.id === item.id,
        );
        if (foundedItem) {
          const filteredList = parsedWishlist?.filter(
            (movie: IMovie) => movie.id !== item.id,
          );
          AsyncStorage.setItem(wishlist, JSON.stringify(filteredList));
          setRefreshData(!refreshData);
          setEmptyFav();
          Alert.alert('Movie removed from watch list');
        } else {
          const newList = [...parsedWishlist, {...item}];
          AsyncStorage.setItem(wishlist, JSON.stringify(newList));
          setFillFav();
          setRefreshData(!refreshData);
          Alert.alert('Movie added to watch list');
        }
      } else {
        AsyncStorage.setItem(wishlist, JSON.stringify([{...item}]));
        setFillFav();
        setRefreshData(!refreshData);
      }
    } else {
      AsyncStorage.setItem(wishlist, JSON.stringify([{...item}]));
      setFillFav();
      setRefreshData(!refreshData);
    }
    setIsFavorite(prev => !prev);
  };
  const setEmptyFav = () => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addToFavHandler}>
          <BookmarkIcon color={colors.gray3} />
        </TouchableOpacity>
      ),
    });
  };
  const setFillFav = () => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addToFavHandler}>
          <Image source={require('../../assets/images/Vector.png')} />
        </TouchableOpacity>
      ),
    });
  };
  const getFav = async () => {
    const wishlistList = (await AsyncStorage.getItem(wishlist)) as
      | IMovie[]
      | any;
    if (wishlistList) {
      const parsedWishlist = JSON.parse(wishlistList);
      if (parsedWishlist?.length) {
        const foundedItem = parsedWishlist?.find(
          (movie: IMovie) => movie.id === item.id,
        );
        if (foundedItem) {
          setIsFavorite(true);
          setFillFav();
        } else {
          setEmptyFav();
          setIsFavorite(false);
        }
      } else {
        setEmptyFav();
        setIsFavorite(false);
      }
    } else {
      setEmptyFav();
      setIsFavorite(false);
    }
  };
  useLayoutEffect(() => {
    getFav();
  }, [isFavorite]);

  useEffect(() => {
    const movieDetails = async () => {
      const response = await axios.get(`
      ${BASE_URL}movie/${item.id}?${API_KEY}&language=en-US
      `);
      setData(response.data);
    };
    movieDetails();
  }, [item]);

  return (
    <ScreenContainer withPadding={false}>
      <ImageBackground
        source={{
          uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`,
        }}
        imageStyle={styles.headerImage}
        style={[
          styles.headerImage,
          {position: 'relative', overflow: 'hidden'},
        ]}>
        <View style={styles.rateBox}>
          <StarIcon />
          <Text style={styles.rateValue}>9.5</Text>
        </View>
      </ImageBackground>
      <View style={{top: -imageHeight * 0.5, flex: 1}}>
        {data.backdrop_path ? (
          <Image
            source={{
              uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${data.backdrop_path}`,
            }}
            style={styles.mainImage}
          />
        ) : (
          <View style={styles.emptyBackdropPath}>
            <Text style={styles.movieFirstCharacters}>
              {data?.original_title?.substring(0, 2)}
            </Text>
          </View>
        )}
        <View style={styles.movieDetails}>
          <View style={styles.properityContainer}>
            <CalendarBlankIcon />
            <Text style={styles.attributeText}>15 March 2021</Text>
          </View>
          <View style={styles.properityContainer}>
            <View style={styles.verticalDevider} />
            <ClockIcon />
            <Text style={styles.attributeText}>148 Minutes</Text>
          </View>
          <View style={styles.properityContainer}>
            <View style={styles.verticalDevider} />
            <TicketIcon />
            <Text style={styles.attributeText}>Action</Text>
          </View>
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
              activeColor={colors.primary}
              renderLabel={({route}) => (
                <Text style={styles.tabTextStyle}>{route.title}</Text>
              )}
              {...props}
            />
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default MovieDetailsScreen;

const imageHeight = 120;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 230,
    borderBottomRightRadius: spacing.normal,
    borderBottomLeftRadius: spacing.normal,
  },
  rateBox: {
    backgroundColor: colors.gray5,
    height: 24,
    width: 54,
    position: 'absolute',
    bottom: spacing.small,
    right: spacing.medium,
    borderRadius: spacing.small,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateValue: {
    color: colors.orange,
    marginLeft: spacing.tiny,
  },
  mainImage: {
    height: imageHeight,
    width: 95,
    left: 20,
    borderRadius: spacing.normal,
  },
  emptyBackdropPath: {
    height: imageHeight,
    width: 95,
    left: 20,
    borderRadius: spacing.normal,
    backgroundColor: colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieFirstCharacters: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    textTransform: 'uppercase',
  },
  movieDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xLarge,
  },
  properityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDevider: {
    height: 10,
    width: 1,
    backgroundColor: colors.gray,
    marginHorizontal: spacing.normal,
  },
  tabStyle: {
    marginTop: spacing.normal,
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
  attributeText: {
    color: colors.gray6,
  },
  overView: {
    color: colors.white,
    width: '100%',
    alignSelf: 'center',
    padding: spacing.medium,
  },
});
