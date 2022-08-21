module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root:['./src'],
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            '@pages': './src/pages',
            '@mocks': './src/mocks',
            '@common': './src/common',
          }
        }
      ]
    ],
  };
};
