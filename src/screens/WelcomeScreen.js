import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.replace('BottomNavigator'), 500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

     
      <Image source={require('../../assets/images/gambar1.png')} style={styles.gambar1} />
      <Image source={require('../../assets/images/gambar2.png')} style={styles.gambar2} />
      <Image source={require('../../assets/images/gambar3.png')} style={styles.gambar3} />
      <Image source={require('../../assets/images/gambar4.png')} style={styles.gambar4} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.subtitle}>Make With {'\n'}Your Mood</Text>
       
      </View>
      
      <View >
        
          <Image source={require('../../assets/images/welcome.png')} style={styles.logo} />
          
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF8C00', 
    padding: 10,
  },
  logo: {
    alignItems: 'center',

    width: 320,
    height: 320,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 2,
    marginBottom:25,
  },
  subtitle: {
    fontSize: hp(4),
    fontWeight: 'medium',
    color: 'white',
    letterSpacing: 2,
    marginBottom:45,
  },
  gambar1: {
    position: 'absolute',
    left:0,
    top:90,
    width:120,
    height:100,
  },
  gambar2: {
    position: 'absolute',
    right:10,
    top:213,
    width:110,
    height:110,
  },
  gambar3: {
    position: 'absolute',
    right:10,
    bottom:80,
    width:120,
    height:120,
  },

 gambar4: {
    position: 'absolute',
    left:5,
    bottom:10,
    width:120,
    height:100,
  },
});