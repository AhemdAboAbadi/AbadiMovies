import React, {createContext, ReactNode, useState} from 'react';
interface IMainProvider {
  children: ReactNode;
}
export interface IMovie {
  adult?: boolean;
  backdrop_path?: any;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

interface IMainContext {
  moviesData: IMovie[];
  setMoviesData: (value: any) => void;
  popularMoviesData: IMovie[];
  setPopularMoviesData: (value: any) => void;
  upComingMoviesData: IMovie[];
  nowPlayingMoviesData: IMovie[];
  setUpComingMoviesData: (value: any) => void;
  topRatedMoviesData: IMovie[];
  setTopRatedMoviesData: (value: any) => void;
  setNowPlayingMoviesData: (value: any) => void;
  selectedMovie: IMovie;
  setSelectedMovie: (value: any) => void;
  favMovies: IMovie[];
  setFavMovies: (value: any) => void;
  refreshData: boolean;
  setRefreshData: (value: any) => void;
}

const MainContext = createContext<IMainContext>({
  moviesData: [],
  setMoviesData: ({}) => {},
  popularMoviesData: [],
  setPopularMoviesData: ({}) => {},
  upComingMoviesData: [],
  setUpComingMoviesData: ({}) => {},
  nowPlayingMoviesData: [],
  setNowPlayingMoviesData: ({}) => {},
  topRatedMoviesData: [],
  setTopRatedMoviesData: ({}) => {},
  selectedMovie: {},
  setSelectedMovie: ({}) => {},
  favMovies: [],
  setFavMovies: ({}) => {},
  refreshData: false,
  setRefreshData: ({}) => {},
});

const MainProvider = ({children}: IMainProvider) => {
  const [moviesData, setMoviesData] = useState([]);
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [upComingMoviesData, setUpComingMoviesData] = useState([]);
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  const [topRatedMoviesData, setTopRatedMoviesData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [favMovies, setFavMovies] = useState([]);
  const [refreshData, setRefreshData] = useState<boolean>(false);

  return (
    <MainContext.Provider
      value={{
        moviesData,
        setMoviesData,
        popularMoviesData,
        setPopularMoviesData,
        upComingMoviesData,
        setUpComingMoviesData,
        nowPlayingMoviesData,
        setNowPlayingMoviesData,
        topRatedMoviesData,
        setTopRatedMoviesData,
        selectedMovie,
        setSelectedMovie,
        favMovies,
        setFavMovies,
        refreshData,
        setRefreshData,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export {MainContext, MainProvider};
