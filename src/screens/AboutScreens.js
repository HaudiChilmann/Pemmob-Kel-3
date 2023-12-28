import React from "react";
import {
    View,
    StyleSheet,
    Linking,
    Image,
    TouchableOpacity
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AboutScreen = () => {

    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Error opening URL: ', err));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/about_img/bg.png')} style={styles.bg} />
            
            <Image source={require('../../assets/images/about_img/circus.png')} style={styles.circus} />
            <Image source={require('../../assets/images/about_img/gajah.png')} style={styles.gajah} />
            <Image source={require('../../assets/images/about_img/burung.png')} style={styles.burung} />
            <Image source={require('../../assets/images/about_img/kelompok.png')} style={styles.kelompok} />
            <Image source={require('../../assets/images/about_img/boba.png')} style={styles.boba} />
            <Image source={require('../../assets/images/about_img/dimsum.png')} style={styles.dimsum} />
            <Image source={require('../../assets/images/about_img/temannyemil.png')} style={styles.temannyemil} />

            <View style={styles.containerRayhan}>
                <TouchableOpacity onPress={() => openLink('https://www.instagram.com/rayhanfr/')} style={styles.rayhan}>
                    <Image source={require('../../assets/images/about_img/rayhan.png')}  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openLink('https://www.instagram.com/m.haaudii/')} style={styles.haudi}>
                    <Image source={require('../../assets/images/about_img/haudi.png')}  />
                </TouchableOpacity>
            </View>

            <View style={styles.containerTren}>
                <TouchableOpacity onPress={() => openLink('https://www.instagram.com/enricozss/')} style={styles.rico}>
                    <Image source={require('../../assets/images/about_img/rico.png')}  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openLink('https://www.instagram.com/trenadyalf/')} style={styles.trenady}>
                <Image source={require('../../assets/images/about_img/trenady.png')}  />
                </TouchableOpacity>
            </View>
            
            <View style={styles.containerAdit}>
                <TouchableOpacity onPress={() => openLink('https://www.instagram.com/aditya.aa.r/')}>
                        <Image source={require('../../assets/images/about_img/adit.png')}  />    
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bg: {
        width: wp(100),
        height: hp(100),
        
    },
    circus: {
        position: "absolute",
        
    },
    gajah: {
        position: "absolute",
        left:0,
        top:50,
    },
    burung: {
        position: "absolute",
        right:0,
        top:20,
    },
    kelompok: {
        position: "absolute",
        top:137,
    },
    boba: {
        position: "absolute",
        left:0,
        bottom:0,
    },
    dimsum: {
        position: "absolute",
        right:0,
        bottom:0,
    },
    temannyemil: {
        position: "absolute",
        bottom:50,
    },
    containerRayhan: {
        flexDirection: 'row',
        position: "absolute",
        marginTop: hp(35),
    },
    containerTren: {
        flexDirection: 'row',
        position: "absolute",
        marginTop: hp(51),
    },
    containerAdit: {
        flexDirection: 'row',
        position: "absolute",
        marginTop: hp(70),
    },
    rayhan: {
        marginRight: wp(4),
    },
    haudi: {
        marginLeft: wp(3),
    },
    rico: {
        marginRight: wp(4),
        marginTop: hp(1),
    },
    trenady: {
        marginLeft: wp(3),
        marginTop: hp(0.7),
    },

});

export default AboutScreen;