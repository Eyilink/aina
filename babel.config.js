module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      '@babel/plugin-proposal-optional-chaining',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@constants': './src/constants',
            '@helpers': './src/helpers',
            '@i18n': './src/i18n',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@store': './src/store',
            '@styles': './src/styles',
          },
        },
      ],
    ],
  };
};
