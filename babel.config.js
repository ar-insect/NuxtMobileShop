module.exports = function(api) {
  const platform = api.caller((caller) => caller?.platform) ?? 'unknown';
  api.cache.using(() => platform);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
