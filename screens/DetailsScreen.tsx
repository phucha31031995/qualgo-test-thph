import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMoviesDetail} from '../store/actions';
import images from '../assets/images';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
const DetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector(state => state.movies.selectedMovie);
  const {movie} = route.params;

  React.useEffect(() => {
    dispatch(fetchMoviesDetail(movie['#IMDB_ID']));
  }, []);

  const renderKeywords = keywords => {
    const keywordArray = keywords.split(',');
    return (
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {keywordArray.map((keyword, index) => (
          <View
            key={index}
            style={{
              backgroundColor: '#e0e0e0',
              padding: 8,
              margin: 4,
              borderRadius: 8,
            }}>
            <Text>{keyword}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderActors = actors => {
    return (
      <View
        style={{flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10}}>
        {actors.map((ac, index) => (
          <View key={index}>
            <Text style={styles.actorName}>- {ac.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderReview = review => {
    return (
      <View style={styles.review}>
        <Text style={styles.titleReview}>Review</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View>
            <Text style={styles.titleReview}>
              {selectedMovie.short.review.author.name}
            </Text>
          </View>
          {selectedMovie.short?.review?.reviewRating ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={images.star} style={styles.star} />
              <Text>{`${selectedMovie.short.review.reviewRating.ratingValue}/${selectedMovie.short.review.reviewRating.bestRating}`}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.dateReview}>
          {moment(selectedMovie.short.review.dateCreated).format('MMM DD')}
        </Text>
        <Text style={styles.titleReview}>
          {selectedMovie.short.review.name}
        </Text>
        <Text style={styles.desReview}>
          {selectedMovie.short.review.reviewBody}
        </Text>
      </View>
    );
  };

  if (!selectedMovie) {
    return <View />;
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            backgroundColor: '#F8FAFC',
            width: '100%',
            padding: 20,
          }}>
          <FastImage
            source={{uri: selectedMovie.short.image}}
            style={styles.poster}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.title}>
              {selectedMovie.short.name} ({selectedMovie.top.releaseDate.year})
            </Text>
            <Text style={{marginTop: 10, fontSize: 14, color: 'grey'}}>
              {selectedMovie.short.genre.join(' | ')}
            </Text>
            <Text style={{marginTop: 10, fontSize: 14, color: 'grey'}}>
              {`${selectedMovie.main.runtime.seconds / 60} minutes`}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.description}>
            {selectedMovie.short.description}
          </Text>
          <Text style={styles.titleReview}>Actor: </Text>
          {selectedMovie?.short?.actor
            ? renderActors(selectedMovie.short.actor)
            : null}
          <Text style={styles.titleReview}>Keywords: </Text>
          {selectedMovie?.short?.keywords
            ? renderKeywords(selectedMovie.short.keywords)
            : null}
          {selectedMovie?.short?.review
            ? renderReview(selectedMovie.short.review)
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  poster: {
    width: 180,
    height: 250,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    marginBottom: 5,
  },
  review: {
    marginTop: 15,
  },
  titleReview: {
    fontSize: 18,
    fontWeight: '600',
  },
  desReview: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
  },
  actorName: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10,
  },
  star: {
    tintColor: 'rgba(247,218,104,1)',
  },
  dateReview: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});

export default DetailsScreen;
