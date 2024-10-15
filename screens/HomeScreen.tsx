import * as React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  TextInput,
  FlatList,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMovies, setSelectedMovie} from '../store/actions';
import {debounce} from 'lodash';
import {Movie} from '../store/app.reducer';
import FastImage from 'react-native-fast-image';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const [searchText, setSearchText] = React.useState('');
  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    if (movies.movies.length) {
      setMoviesList(movies.movies);
    }
  }, [movies]);

  React.useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const searchMovies = (text: string) => {
    dispatch(fetchMovies(text));
  };

  const debouncedSearchMovies = React.useMemo(
    () => debounce(searchMovies, 500),
    [],
  );

  const handleSearchInputChange = (text: string) => {
    setSearchText(text);
    debouncedSearchMovies(text);
  };

  const handleMoviePress = (movie: Movie) => {
    dispatch(setSelectedMovie(null));
    navigation.navigate('Details', {movie});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleMoviePress(item)}
        style={{width: '50%', alignItems: 'center', marginTop: 10}}>
        <FastImage
          source={{uri: item['#IMG_POSTER']}}
          style={{width: 140, height: 170}}
          resizeMode="cover"
        />
        <Text style={{marginTop: 5}}>{item['#TITLE']}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <TextInput
        placeholder="Search for movies..."
        value={searchText}
        onChangeText={handleSearchInputChange}
        style={{
          width: '100%',
          padding: 10,
          borderWidth: 1,
          borderColor: 'gray',
          marginBottom: 20,
        }}
      />

      <FlatList
        data={moviesList}
        keyExtractor={item => item['#IMDB_ID']}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
}
