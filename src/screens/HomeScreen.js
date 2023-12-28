import { View, Text, ScrollView, Image, TextInput, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        setMeals(response.data.meals);
        setAllMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const filterRecipes = (text) => {
    const filteredRecipes = allMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(text.toLowerCase())
    );
    setMeals(filteredRecipes);
    setInput(text);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {/* greetings and punchline */}
        <View style={styles.greetingsContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.greetingsText}>
                Foody, Make With Your Mood
              </Text>
            </View>
            <View style={styles.avatarContainer}>
              {/* Add your avatar content here */}
            </View>
          </View>



        {/* search bar */}
        <View style={styles.searchBarContainer}>
        <TextInput
            value={input}
            onChangeText={(text) => filterRecipes(text)}
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{
              fontSize: hp(1.7),
              flex: 1,
              marginBottom: 0,
              paddingLeft: 2,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: 'white',
              borderRadius: 30,
            }}
            
/>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 3,
            }}
          >
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View style={styles.categoriesContainer}>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View style={styles.recipesContainer}>
          <Recipes meals={meals} categories={categories} />
        </View>
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
    paddingBottom: 50,
    paddingTop: hp(0),
  },
  greetingsContainer: {
    marginHorizontal: 4,
    marginBottom: 2,
  },
  textContainer: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 15,
    marginHorizontal: -8, 
    paddingTop: hp(5),
  },
  
  greetingsText: {
    fontSize: hp(3.8),
    fontWeight: 'bold',
    color: 'white',
  },
  searchBarContainer: {
    marginHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 193, 7, 0.4)',
    padding: 8,
  },
  avatarContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoriesContainer: {},
  recipesContainer: {},
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default HomeScreen;