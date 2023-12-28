import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { CachedImage } from '../helpers/image';
import axios from 'axios';
import Loading from '../components/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeDetailScreen = (props) => {
  const item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
    checkIfFavourite(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const checkIfFavourite = async (id) => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setIsFavourite(parsedFavorites.some((favItem) => favItem.idMeal === id));
        console.log('Favorite:', parsedFavorites);
      }
    } catch (err) {
      console.log('error checking favorite: ', err.message);
    }
  };
  
  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let parsedFavorites = [];
      if (favorites) {
        parsedFavorites = JSON.parse(favorites);
      }
  
      const isCurrentlyFavourite = parsedFavorites.some((favItem) => favItem.idMeal === item.idMeal);
  
      if (isCurrentlyFavourite) {
        // Remove from favorites
        const updatedFavorites = parsedFavorites.filter((favItem) => favItem.idMeal !== item.idMeal);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Add to favorites
        const newFavorite = {
          idMeal: item.idMeal,
          strMeal: item.strMeal,
          strMealThumb: item.strMealThumb,
        };
        parsedFavorites.push(newFavorite);
        await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
      }
  
      setIsFavourite(!isCurrentlyFavourite);
    } catch (err) {
      console.log('error toggling favorite: ', err.message);
    }
  };
  
  

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        
        {/* recipe image */}
        <View style={styles.imageContainer}>
          <CachedImage uri={item.strMealThumb} style={styles.recipeImage} />
        </View>

        {/* back button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favouriteButton}>
            <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
          </TouchableOpacity>
        </View>

        {/* meal description */}
        {loading ? (
          <Loading size="large" style={styles.loading} />
        ) : (
          <View style={styles.recipeDetails}>
            {/* name and area */}
            <View style={styles.nameAndArea}>
              <Text style={styles.recipeName}>{meal?.strMeal}</Text>
              <Text style={styles.recipeArea}>{meal?.strArea}</Text>
            </View>

            {/* ingredients */}
            <View style={styles.ingredients}>
              <Text style={styles.ingredientsTitle}>Ingredients</Text>
              <View style={styles.ingredientsList}>
                {ingredientsIndexes(meal).map(i => (
                  <View key={i} style={styles.ingredientItem}>
                    <View style={styles.ingredientBullet} />
                    <View style={styles.ingredientText}>
                      <Text style={styles.boldText}>{meal['strMeasure' + i]}</Text>
                      <Text style={styles.normalText}>{meal['strIngredient' + i]}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* instructions */}
            <View style={styles.instructions}>
              <Text style={styles.instructionsTitle}>Instructions</Text>
              <Text style={styles.normalText}>{meal?.strInstructions}</Text>
            </View>

            {/* recipe video */}
            {meal.strYoutube && (
              <View style={styles.videoContainer}>
                <Text style={styles.videoTitle}>Recipe Video</Text>
                {Platform.OS === 'ios' ? (
                  <YouTubeIframe webViewProps={{ overScrollMode: 'never' }} videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)} />
                ) : (
                  <TouchableOpacity style={styles.videoLink} onPress={() => handleOpenLink(meal.strYoutube)}>
                    <Text style={styles.blueText}>{meal.strYoutube}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingBottom: hp(0),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeImage: {
    width: wp(100),
    height: hp(50),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: hp(3),
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: hp(4),
    width: wp(100),
    paddingHorizontal: wp(4),
  },
  backButton: {
    padding: hp(2),
    borderRadius: hp(1),
    backgroundColor: 'white',
  },
  favouriteButton: {
    padding: hp(2),
    borderRadius: hp(1),
    backgroundColor: 'white',
  },
  loading: {
    marginTop: hp(16),
  },
  recipeDetails: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(4),
  },
  nameAndArea: {
    marginBottom: hp(4),
  },
  recipeName: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
  },
  recipeArea: {
    fontSize: hp(2),
    fontWeight: '500',
    color: '#666',
  },
  misc: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp(4),
  },
  miscItem: {
    alignItems: 'center',
  },
  iconBackground: {
    height: hp(6.5),
    width: hp(6.5),
    backgroundColor: 'white',
    borderRadius: hp(3.25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  miscText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: '#333',
  },
  smallText: {
    fontSize: hp(1.3),
    fontWeight: 'bold',
    color: '#333',
  },
  ingredients: {
    marginBottom: hp(4),
  },
  ingredientsTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(3),
  },
  ingredientsList: {
    marginLeft: wp(3),
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  ingredientBullet: {
    height: hp(1.5),
    width: hp(1.5),
    backgroundColor: '#FFA500',
    borderRadius: hp(0.75),
  },
  ingredientText: {
    flexDirection: 'row',
    marginLeft: wp(2),
  },
  normalText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    color: '#666',
  },
  instructions: {
    marginBottom: hp(4),
  },
  instructionsTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333',
  },
  videoContainer: {
    marginBottom: hp(4),
  },
  videoTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333',
  },
  videoLink: {
    marginBottom: hp(5),
  },
  blueText: {
    fontSize: hp(2),
    color: '#4285f4',
  },
});

export default RecipeDetailScreen;