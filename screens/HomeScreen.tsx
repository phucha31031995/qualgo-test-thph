import * as React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies, setSelectedMovie} from '../store/actions';
import {debounce} from 'lodash';
import {Movie} from '../store/app.reducer';
import FastImage from 'react-native-fast-image';
import images from '../assets/images';

const RenderMovieItem = React.memo(({item, index, onPress}) => {
  const [loadingImage, setLoadingImage] = React.useState(false);
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      style={[
        styles.movieItemContainer,
        {marginLeft: index % 2 !== 0 ? 25 : 0},
      ]}>
      {item['#IMG_POSTER'] ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FastImage
            source={{
              uri: item['#IMG_POSTER'],
              priority: FastImage.priority.high,
            }}
            style={styles.posterImage}
            resizeMode="cover"
            onLoadEnd={() => setLoadingImage(false)}
            onLoad={() => setLoadingImage(false)}
            onLoadStart={() => setLoadingImage(true)}
          />
          {loadingImage ? (
            <ActivityIndicator style={{position: 'absolute'}} />
          ) : null}
        </View>
      ) : (
        <FastImage
          source={images.empty_video}
          style={styles.posterImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.movieTitle}>{item['#TITLE']}</Text>
      <Text style={styles.movieSubTitle}>{item['#YEAR']}</Text>
    </TouchableOpacity>
  );
});

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const {movies, loadingList, errorList} = useSelector(state => state.movies);
  const [searchText, setSearchText] = React.useState('');
  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    if (movies.length) {
      setMoviesList(movies);
    }
  }, [movies]);

  React.useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const searchMovies = React.useCallback(
    (text: string) => {
      dispatch(fetchMovies(text));
    },
    [dispatch],
  );

  const debouncedSearchMovies = React.useMemo(
    () => debounce(searchMovies, 500),
    [dispatch],
  );

  const handleSearchInputChange = (text: string) => {
    setSearchText(text);
    debouncedSearchMovies(text);
  };

  const handleMoviePress = (movie: Movie) => {
    dispatch(setSelectedMovie(null));
    navigation.navigate('Details', {movie});
  };

  if (errorList) {
    return (
    <View style={styles.container}>
        <Text style={styles.errorTitle}>{errorList}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapIputSearch}>
        <TextInput
          placeholder="Search for movies..."
          value={searchText}
          onChangeText={handleSearchInputChange}
          style={styles.searchInput}
          placeholderTextColor={'gray'}
        />
        <Image source={images.search} />
      </View>
      {loadingList ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#41BEAD" />
        </View>
      ) : (
        <FlatList
          data={moviesList}
          keyExtractor={item => item['#IMDB_ID']}
          numColumns={2}
          renderItem={({item, index}) => (
            <RenderMovieItem
              item={item}
              index={index}
              onPress={handleMoviePress}
            />
          )}
          initialNumToRender={10}
          windowSize={3}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 50,
    color: '#fff',
  },
  movieItemContainer: {
    width: '46%',
    marginTop: 15,
  },
  posterImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  movieTitle: {
    marginTop: 5,
    fontSize: 16,
    color: '#fff',
  },
  wrapIputSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E1E1E7',
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  movieSubTitle: {
    marginTop: 3,
    fontSize: 14,
    color: 'gray',
  },
  errorTitle: {
    fontSize: 16,
    color: '#fff',
  },
});
