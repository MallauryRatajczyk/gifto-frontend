//yarn add react-native-shadow-2
import { StyleSheet, Platform, Dimensions, scroll, start } from 'react-native';
import Colors from './Colors';
import Typography from './Typography';

export default StyleSheet.create({

    //app general style
    appStyle: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'top',
        align: 'center',


    },

    //_________________CONTAINERS_________________


    // Global container for all screens with consistent padding
    screenMainContainer: {
        flex: 1,
        backgroundColor: Colors.background,

        align: 'center',
        display: 'flex',
        scroll: 'true',

    },

    screenHomeContainer: {
        paddingTop: 60,
        paddingHorizontal: 36,
        justifyContent: 'top', //top alignment for all content
        overflow: 'visible',

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
        borderRadius: 16,


        //spaces
        paddingHorizontal: 36,
        paddingVertical: 24,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },
    //big card use
    CardTextContainer: {
        width: '65%',
        margin: -4,
    },

    //item card use
    ItemTextContainer: {
        width: '60%',
        marginTop: 12,
    },

    //white main container 
    CompletionContainer: {
        backgroundColor: Colors.whiteColor,
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },

    //white main container 
    TroquerContainer: {
        backgroundColor: Colors.whiteColor,
        width: Dimensions.get('window').width * 0.85,
        borderRadius: 12,
        justifyContent: 'center',
        marginBottom: 100,
        paddingVertical: 24,
        paddingHorizontal: 24,

    },

    CompletionOverlay: { //darkened background
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    WelcomeContainer: {
        marginBottom: 36,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
        direction: 'horizontal',
    },

    AddPhotoContainer: {
        backgroundColor: Colors.whiteColor,
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').height * 0.44,
        borderRadius: 12,
        //spaces
        paddingVertical: 36,
        marginBottom: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    ModelContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    PictureProfileContainer: {
        backgroundColor: Colors.shadow,
        borderRadius: 100,
        marginRight: 24,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
    },

    whiteSearchContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 40,
        //spaces
        paddingHorizontal: 36,
        paddingVertical: 24,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    SelectArticleContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 14,
        padding: 6,
        height: 70,

        //borderWidth: 2,
        //borderColor: Colors.purpleColor,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    ImageSelectContainer: {
        backgroundColor: Colors.redColor,
        borderRadius: 8,
        width: "28%",
        height: "100%",
    },

    CheckBox: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.purpleColor,
        borderWidth: 2,
        borderRadius: 6,
        width: 24,
        height: 24,
        marginRight: 14,
    },


    GreyCircleButton: {
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },

    RecommendationContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        paddingVertical: 20,
    },

    ImageHolderContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,
        marginLeft: 36,
        width: 300,
        height: 300,

        //positions for icon
        alignItems: 'center',
        justifyContent: 'center',

        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,
        // Android Shadow
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    ItemCardContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,
        height: 120,

        //spaces
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',



        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    ImageTagContainer: {
        width: '35%',
        position: 'relative',
        marginRight: 12,
    },

    MiniImageHolderContainer: {
        backgroundColor: Colors.lightGreyColor,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

    ImageItemContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,
        width: '100%',
        height: 200,
        marginBottom: 24,
        marginTop: 12,

    },


    ImageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },


    //Tiny Tag container
    TagContainer: {
        position: 'absolute',
        top: 5,
        left: 5,
        backgroundColor: Colors.purpleColor,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        paddingVertical: -3,
        zIndex: 2,
    },

    //TabNavigator container with shadow 
    navigatorContainer: {
        backgroundColor: Colors.whiteColor,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 40,
        zIndex: 3,

        //spaces
        marginBottom: 24,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,


        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 80,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //TabNavigator inside container with shadow 
    navigatorInnerContainer: {
        width: '90%',
        //spaces
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },


    //image holder full screen
    imageHolderImage: {
        width: '100%',
        height: '100%',
    },


    //For forms (signin/signup/etc...)
    whiteFormContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,

        //spaces
        padding: 24,
        marginBottom: 24,

        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 40,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //For forms categories
    DropDownFormContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,
        height: 70,

        //spaces
        padding: 24,
        paddingTop: 28,
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 40,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //For description forms
    descriptionFormContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 16,
        height: 200,

        //spaces
        padding: 24,
        marginBottom: 14,

        // iOS Shadow
        shadowColor: Colors.shadow,
        shadowOpacity: 100,
        shadowRadius: 40,

        // Android Shadow
        shadowColor: Colors.shadow,
        elevation: Platform.OS === 'android' ? 20 : 0,
        shadowColor: Platform.OS === 'android' ? Colors.shadowAndroid : Colors.shadow,
    },

    //Login Icons Container
    LoginIconsContainer: {
        flexDirection: 'row',
        marginVertical: 24,
        justifyContent: 'center',

    },

    //Circle button with text Container
    CircleButtonTextContainer: {
        alignItems: 'center',
        marginVertical: 44,
        marginHorizontal: -12,
    },

    //Intro Logo Container
    IntroLogoContainer: {
        alignItems: 'center',
        marginVertical: 10,
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

    locationContainer: {
        alignItems: 'left',
        flexDirection: 'row',
        justifyContent: 'left',

    },

    profileHeaderContainer: {
        alignItems: 'left',
        flexDirection: 'row',
        justifyContent: 'left',
        paddingHorizontal: 24,
    },


    //_________________HEADERS WITH BACKGROUND COLOR & ICONS_________________

    coloredHeader: {
        backgroundColor: Colors.purpleColor,
        borderBottomRightRadius: 60,
        paddingTop: 40,
        alignItems: 'left',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'left',
        height: 140,
    },
    blackHeader: {
        backgroundColor: Colors.textColor,
        borderBottomRightRadius: 60,
        paddingTop: 40,
        alignItems: 'left',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'left',
        height: 140,
    },

    //_________________TITLES_________________
    //H1 black color
    headerTextBlack: {
        ...Typography.h1,
        color: Colors.textColor,
        paddingVertical: 24,
        marginBottom: -30,
    },

    //H1 white color
    headerTextWhite: {
        ...Typography.h1,
        color: Colors.whiteColor,
        paddingVertical: 24,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: -30,
    },

    //H1 purple color
    headerTextPurple: {
        ...Typography.h1,
        color: Colors.purpleColor,
        paddingVertical: 24,
        marginBottom: -30,
    },

    //H1 green color
    headerTextGreen: {
        ...Typography.h1,
        color: Colors.greenColor,
        paddingVertical: 24,
        marginBottom: -30,
    },

    //H1 red color
    headerTextRed: {
        ...Typography.h1,
        color: Colors.redColor,
        paddingVertical: 24,
        marginBottom: -30,
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

    //H3 red color
    subtitleTextRed: {
        ...Typography.h3,
        color: Colors.redColor,
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

    //H4 light grey color
    miniTitleTextLightGrey: {
        ...Typography.h4,
        color: Colors.textColor,
        paddingVertical: 6,
        opacity: 0.2,
    },

    //H4 white color
    miniTitleTextWhite: {
        ...Typography.h4,
        color: Colors.whiteColor,
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
        alignContent: 'center',
    },

    bodyTextComments: {
        ...Typography.paragraphMain,
        color: Colors.textColor,
        opacity: 0.2,
        padding: 4,
        marginTop: 12,
        width: '70%',
        textAlign: 'center',
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

    whiteTinyText: {
        ...Typography.paragraphTiny,
        color: Colors.whiteColor,
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
        width: '80%',
    },

    buttonPrimary: {
        backgroundColor: Colors.purpleColor, // Default color
        borderRadius: 60,
        paddingVertical: 4,
        marginVertical: 12,
        alignItems: 'center',

    },


    buttonTextWhite: {
        ...Typography.cta,
        color: Colors.whiteColor,

    },

    buttonSecondary: {
        borderRadius: 60,
        paddingVertical: 2,
        marginVertical: 12,
        alignItems: 'center',
        //stoke color
        borderWidth: 1.5,
        borderColor: Colors.redColor,
    },

    buttonTextRed: {
        ...Typography.cta,
        color: Colors.redColor,

    },

    buttonTextBlack: {
        ...Typography.cta,
        color: Colors.textColor,

    },

    buttonTextPurple: {
        ...Typography.cta,
        color: Colors.purpleColor,

    },

    buttonTextGreen: {
        ...Typography.cta,
        color: Colors.greenColor,

    },

    buttonTextWhite: {
        ...Typography.cta,
        color: Colors.whiteColor,

    },

    iconText: {
        ...Typography.paragraphSmallGrey,
        color: Colors.textColor,
        marginTop: 2,
    },



    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },

    //for navigation bar
    iconContainer: {
        alignItems: 'center',
        paddingTop: 4,
    },

    editCardContainer: {
        position: 'relative',
        padding: 10,
    },

    bottomUpdateContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    titleText: {
        marginBottom: -8,
    },



    circleButton: {
        width: 78,
        height: 78,
        borderRadius: 50,
        marginHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },

    errorText: {
        ...Typography.paragraphSmallRed,
        color: Colors.textColor,
        marginBottom: 10,
    },

    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 50,

    },

    // BackButton Styles
    backButtonContainer: {
        backgroundColor: Colors.whiteColor,
        borderRadius: 100,
        width: 48,
        padding: 2,
        paddingTop: -1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backContainer: {
        position: 'absolute',
        bottom: 24,
        right: 36,
        zIndex: 1,
    },






});
