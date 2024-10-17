import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMoviesDetail} from '../store/actions';
import images from '../assets/images';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
const DetailsScreen = ({route}) => {
  const dispatch = useDispatch();
  const {selectedMovie, loadingDetail, errorDetail} = useSelector(state => state.movies);
  const {movie} = route.params;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const MAX_LINES = 4;

  React.useEffect(() => {
    dispatch(fetchMoviesDetail(movie['#IMDB_ID']));
  }, []);

  const renderKeywords = keywords => {
    const keywordArray = keywords.split(',');
    return (
      <View>
        <View style={styles.wrapTitleReview}>
          <Text style={styles.titleReview}>Keywords</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 10,
            marginTop: 5,
          }}>
          {keywordArray.map((keyword, index) => (
            <TouchableOpacity key={index} style={styles.keywordItem}>
              <Text style={styles.titleKeyword}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderActors = actors => {
    return (
      <View>
        <View style={styles.wrapTitleReview}>
          <Text style={styles.titleReview}>Actor</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 10,
            marginTop: 5,
          }}>
          {actors.map((ac, index) => (
            <View key={index}>
              <Text style={styles.actorName}>- {ac.name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderReview = review => {
    return (
      <View>
        <View style={styles.wrapTitleReview}>
          <Text style={styles.titleReview}>Review</Text>
        </View>
        <View style={styles.wrapReview}>
          <View style={styles.reviewHeader}>
            <View>
              <Text style={styles.titleReview}>
                {selectedMovie.short.review.author.name}
              </Text>
            </View>
            {selectedMovie.short?.review?.reviewRating ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={images.star} style={styles.star} />
                <Text
                  style={{
                    color: '#fff',
                  }}>{`${selectedMovie.short.review.reviewRating.ratingValue}/${selectedMovie.short.review.reviewRating.bestRating}`}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.dateReview}>
            {moment(selectedMovie.short.review.dateCreated).format('MMM DD')}
          </Text>
          <View style={styles.reviewContent}>
            <Text
              style={styles.desReview}
              numberOfLines={isExpanded ? undefined : MAX_LINES} // Giới hạn số dòng nếu không mở rộng
            >
              {selectedMovie.short.review.reviewBody}
            </Text>

            {/* Nút "View More" hoặc "View Less" */}
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)} // Chuyển đổi trạng thái
            >
              <Text style={styles.viewMore}>
                {isExpanded ? 'View Less' : 'View More'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (errorDetail) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
        <Text style={styles.errorTitle}>{errorDetail}</Text>
      </SafeAreaView>
    );
  }
  if (!selectedMovie && !loadingDetail) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
        <View />
      </SafeAreaView>
    );
  }
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
        {loadingDetail ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#41BEAD" />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.wrapPoster}>
              {selectedMovie.short.image ? (
                <FastImage
                  source={{uri: selectedMovie.short.image}}
                  style={styles.poster}
                />
              ) : (
                <FastImage source={images.empty_video} style={styles.poster} />
              )}
              <View style={{flex: 1, marginLeft: 15}}>
                <Text style={styles.title}>
                  {selectedMovie.short.name}{' '}
                  {selectedMovie.top?.releaseDate?.year
                    ? `(${selectedMovie.top.releaseDate.year})`
                    : null}
                </Text>
                {selectedMovie.short?.genre ? (
                  <Text style={styles.subInfo}>
                    {selectedMovie.short.genre.join(' | ')}
                  </Text>
                ) : null}
                {selectedMovie.main?.runtime?.seconds ? (
                  <Text style={styles.subInfo}>
                    {`${selectedMovie.main.runtime.seconds / 60} minutes`}
                  </Text>
                ) : null}
                <TouchableOpacity style={styles.buttonWatch}>
                  <Image source={images.play} style={styles.iconWatch} />
                  <Text style={styles.titleWatch}>Watch Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingHorizontal: 20, marginBottom: 20}}>
              <Text style={styles.description}>
                {selectedMovie.short.description}
              </Text>
              {selectedMovie?.short?.actor
                ? renderActors(selectedMovie.short.actor)
                : null}
              {selectedMovie?.short?.keywords
                ? renderKeywords(selectedMovie.short.keywords)
                : null}
              {selectedMovie?.short?.review
                ? renderReview(selectedMovie.short.review)
                : null}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapPoster: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  poster: {
    width: 160,
    height: 250,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 20,
  },
  info: {
    marginBottom: 5,
  },
  subInfo: {
    marginTop: 5,
    fontSize: 14,
    color: 'grey',
  },
  wrapReview: {
    marginTop: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  titleReview: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  wrapTitleReview: {
    marginTop: 10,
    paddingLeft: 7,
    borderLeftColor: '#E62290',
    borderLeftWidth: 5,
  },
  desReview: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 5,
    lineHeight: 20,
  },
  actorName: {
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10,
    color: '#E62290',
  },
  star: {
    tintColor: 'rgba(247,218,104,1)',
    marginRight: 5,
  },
  dateReview: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 15,
    marginTop: 5,
    color: 'grey',
    paddingHorizontal: 15,
  },
  buttonWatch: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#E62290',
    paddingVertical: 10,
    borderRadius: 30,
    width: 130,
    alignItems: 'center',
  },
  titleWatch: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  iconWatch: {
    height: 16,
    width: 10,
  },
  keywordItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 4,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 15,
  },
  reviewContent: {
    borderTopWidth: 1,
    borderColor: 'gray',
    padding: 15,
  },
  titleKeyword: {
    color: '#fff',
    fontSize: 14,
  },
  viewMore: {
    marginTop: 10,
    color: '#E62290',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 16,
    color: '#fff',
  },
});

export default DetailsScreen;
