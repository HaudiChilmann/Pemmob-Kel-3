import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FavoriteScreen = ({ navigation }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const loadFavoriteRecipes = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        setFavoriteRecipes(parsedFavorites);
      }
    } catch (err) {
      console.log('error loading favorites: ', err.message);
    }
  };

  const refreshFavorites = useCallback(() => {
    loadFavoriteRecipes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refreshFavorites);
    return unsubscribe;
  }, [navigation, refreshFavorites]);

  const renderRecipeCard = ({ item }) => (
    <View style={styles.recipeCardWrapper}>
      <RecipeCard item={item} navigation={navigation} />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Favorite Recipes</Text>
      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderRecipeCard}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorite recipes yet.</Text>
      )}
    </ScrollView>
  );
};


const RecipeCard = ({ item, navigation }) => (
  <Pressable
    style={styles.recipeCardContainer}
    onPress={() => navigation.navigate('RecipeDetail', { ...item })}
  >
    <CachedImage uri={item.strMealThumb} style={styles.recipeImage} />
    <Text style={styles.recipeName}>
      {item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({

  container: {
    marginHorizontal: wp(3),
    marginRight: hp(3),
    paddingBottom: 75,
    marginBottom: 60,
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFA500',
    paddingTop: hp(3),
    textAlign: 'center',
  },
  recipeCardContainer: {
    margin: 8,
    marginBottom: hp(1),
    justifyContent: 'space-around',
    flexDirection: 'column',

  },
  recipeImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 30,
    marginBottom: hp(1),
    backgroundColor: 'black',
    borderWidth: 5,
    borderColor: 'rgba(255, 193, 7, 0.4)',
  },
  recipeName: {
    fontSize: hp(2),
    fontWeight: '600',
    marginLeft: wp(2),
    color: '#666666',
    textAlign: 'center',
  },
  recipeCardWrapper: {
    width: '49%',
    marginHorizontal: wp(1),
    marginVertical: wp(-1),
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: '50%',
  },
});

export default FavoriteScreen;