// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = defaultConfig;


// "react-native-google-mobile-ads": {
//     "android_app_id": "ca-app-pub-9000006057030614/4846580106",
//     "ios_app_id": "ca-app-pub-9000006057030614/4846580106",
//     "user_tracking_usage_description": "This identifier will be used to deliver personalized ads to you.",
//     "delay_app_measurement_init": true
//   }