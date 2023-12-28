import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CachedImage } from '../helpers/image';

const Categories = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonStyle = isActive ? styles.activeButton : null;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={styles.categoryButton}
            >
              <View style={[styles.buttonContainer, activeButtonStyle]}>
                <CachedImage uri={cat.strCategoryThumb} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{cat.strCategory}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 5,
    marginTop: 12,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 9,
  },
  buttonContainer: {
    borderRadius: hp(2) / 2,
    padding: 8,
    backgroundColor: 'orange',
    paddingBottom: 14,
    paddingTop: 10,
  },
  activeButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.4)',
  },
  categoryImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(6) / 2,
  },
  categoryText: {
    fontSize: hp(1.6),
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: 4,
  },
});

export default Categories;