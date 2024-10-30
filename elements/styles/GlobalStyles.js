//yarn add react-native-shadow-2
import { StyleSheet, Platform } from 'react-native';
import Colors from './Colors';
import Typography from './Typography';

export default StyleSheet.create({

//_________________CONTAINERS_________________

  // Global container for all screens with consistent padding
  screenMainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 36,  
    paddingVertical: 36,   
    justifyContent: 'top', //top alignment for all content
    align: 'center',
    display: 'flex',
    
  },

  //white main container with shadow
  whiteContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    
    //spaces
    padding: 24,
    marginBottom: 24,

    // iOS Shadow
    shadowColor: Colors.shadow,
    shadowOpacity: 100,
    shadowRadius: 80,
    
    // Android Shadow
    shadowColor: Colors.shadow,
    elevation: Platform.OS === 'android' ? 20 : 0,
    shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
  },

    //white card container with shadow (for information cards mainly for items)
    whiteCardContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
        
    //spaces
    padding: 12,
    marginBottom: 24,
    
    // iOS Shadow
    shadowColor: Colors.shadow,
    shadowOpacity: 100,
    shadowRadius: 80,
        
    // Android Shadow
    shadowColor: Colors.shadow,
    elevation: Platform.OS === 'android' ? 20 : 0,
    shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },


    //For forms (signin/signup/etc...)
    whiteFormContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        
        //spaces
        padding: 12,
        paddingTop: 24,
        paddingLeft: 24,
        marginBottom: 24,
    
        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,
        
        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //white card container with RED stroke (pour le demende en cours)
    requestContainerRedStoke: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.redColor,
                
        //spaces
        padding: 12,
        marginBottom: 0,
        zIndex: 2,
            
        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,
                
        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //white card container with PURPLE stroke (pour le demende en cours)
    requestContainerPurpleStoke: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.purpleColor,
                
        //spaces
        padding: 12,
        marginBottom: 0,
        zIndex: 2,
            
        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,
                
        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //white card container with GREEN stroke (pour le demende en cours)
    requestContainerGreenStoke: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.greenColor,
                
        //spaces
        padding: 12,
        marginBottom: 0,
        zIndex: 2,
            
        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,
                
        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

      //white main container with shadow
    requestContainer: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    
    //spaces
    padding: 24,
    paddingTop: 36,
    marginBottom: 24,
    marginTop: -14,
    zIndex: 1,

    // size definition
    margin: 20,

    // iOS Shadow
    shadowColor: Colors.shadow,
    shadowOpacity: 100,
    shadowRadius: 80,
    
    // Android Shadow
    shadowColor: Colors.shadow,
    elevation: Platform.OS === 'android' ? 20 : 0,
    shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
  },

    //_________________TITLES_________________
    //H1 black color
    headerTextBlack: {
        ...Typography.h1,
        color: Colors.textColor,
        paddingVertical: 24,
    },

    //H1 white color
    headerTextWhite: {
        ...Typography.h1,
        color: Colors.whiteColor,
        paddingVertical: 24,
    },

    //H1 purple color
    headerTextPurple: {
        ...Typography.h1,
        color: Colors.purpleColor,
        paddingVertical: 24,
    },

    //H1 green color
    headerTextGreen: {
        ...Typography.h1,
        color: Colors.greenColor,
        paddingVertical: 24,
    },

    //H1 red color
    headerTextRed: {
    ...Typography.h1,
    color: Colors.redColor,
    paddingVertical: 24,
    },

    //H2 black color
    titleTextBlack: {
        ...Typography.h2,
        color: Colors.textColor,
        paddingVertical: 12,
    },

    //H2 white color
    titleTextWhite: {
        ...Typography.h2,
        color: Colors.whiteColor,
        paddingVertical: 12,
    },

    //H2 red color
    titleTextRed: {
        ...Typography.h2,
        color: Colors.redColor,
        paddingVertical: 12,
    },

    //H2 green color
    titleTextGreen: {
        ...Typography.h2,
        color: Colors.greenColor,
        paddingVertical: 12,
    },

    //H2 purple color
    titleTextPurple: {
        ...Typography.h2,
        color: Colors.purpleColor,
        paddingVertical: 12,
    },
    
    //H3 black color
    subtitleTextBlack: {
        ...Typography.h3,
        color: Colors.textColor,
        paddingVertical: 6,
    },

    //H3 grey color
    subtitleTextGrey: {
        ...Typography.h3,
        color: Colors.textColor,
        paddingVertical: 6,
        opacity: 0.5,
    },

    //H3 light grey color
    subtitleTextLightGrey: {
        ...Typography.h3,
        color: Colors.textColor,
        paddingVertical: 6,
        opacity: 0.2,
        },

    
    //H4 black color
    miniTitleTextBlack: {
        ...Typography.h4,
        color: Colors.textColor,
        paddingVertical: 4,
    },


    //_________________BODYCOPY_________________
    bodyTextBlack: {
        ...Typography.paragraphMain,
        color: Colors.textColor,
        paddingVertical: 4,
    },

    bodyTextGrey: {
        ...Typography.paragraphMain,
        color: Colors.textColor,
        opacity: 0.5,
        paddingVertical: 4,
    },

    bodyTextLightGrey: {
        ...Typography.paragraphMain,
        color: Colors.textColor,
        opacity: 0.2,
        paddingVertical: 4,
    },

    //for subcategories
    bodyTextGreen: {
        ...Typography.paragraphMain,
        color: Colors.greenColor,
        paddingVertical: 4,
    },

    bodyTextPurple: {
        ...Typography.paragraphMain,
        color: Colors.purpleColor,
        paddingVertical: 4,
    },

    bodyTextRed: {
        ...Typography.paragraphMain,
        color: Colors.redColor,
        paddingVertical: 4,
    },


    smallTextBlack: {
        ...Typography.paragraphSmall,
        color: Colors.textColor,
        paddingVertical: 4,
    },

    smallTextGrey: {
        ...Typography.paragraphSmall,
        color: Colors.textColor,
        paddingVertical: 4,
        opacity: 0.5,
    },

    smallTextLightGrey: {
        ...Typography.paragraphSmall,
        color: Colors.textColor,
        paddingVertical: 4,
        opacity: 0.2,
    },

    smallTextPurple: {
        ...Typography.paragraphSmall,
        color: Colors.purpleColor,
        paddingVertical: 4,
    },
      
    tinyText: {
        ...Typography.paragraphTiny,
        color: Colors.textColor,
        paddingVertical: 4,
    },



    //_________________BUTTONS_________________


    //For settings page buttons
    bodyTextLightBlue: {
        ...Typography.paragraphMain,
        color: Colors.shadow,
        paddingVertical: 4,
    },

    //divider (pour le demende en cours) 
    divider: {
        height: 1,
        backgroundColor: Colors.shadow,
        marginVertical: 8,
    },


  buttonPrimary: {
    backgroundColor: Colors.purpleColor, // Default color
    borderRadius: 60,
    paddingVertical: 4,
    marginVertical: 36,
    alignItems: 'center',

  },

  buttonTextWhite: {
    ...Typography.cta,
    color: Colors.whiteColor,

  },

  buttonSecondary: {
    borderRadius: 60,
    paddingVertical: 4,
    marginVertical: 36,
    alignItems: 'center',
    //stoke color
    borderWidth: 1.5,
    borderColor: Colors.redColor,
  },

  buttonTextRed: {
    ...Typography.cta,
    color: Colors.redColor,

  },




});
