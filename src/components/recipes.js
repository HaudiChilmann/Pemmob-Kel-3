import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  heading: {
    fontSize: hp(3),
    fontWeight: '600',
    color: '#666666',
    marginBottom: hp(1),
  },
  recipeCardContainer: {
    flex: 1,
    marginBottom: hp(3),
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  recipeImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 30,
    marginBottom: hp(1),
    backgroundColor: 'black',
  },
  recipeName: {
    fontSize: hp(1.5),
    fontWeight: '600',
    marginLeft: wp(2),
    color: '#666666',
  },
});

const Recipes = ({ meals }) => {
  const navigation = useNavigation();

  // Function to render each RecipeCard
  const renderRecipeCard = ({ item, index }) => (
    <RecipeCard item={item} index={index} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recipes</Text>
      <View>
        <MasonryList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderRecipeCard}
        />
      </View>
    </View>
  );
};

// RecipeCard component
const RecipeCard = ({ item, index, navigation }) => {
  return (
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
};

export default Recipes;
