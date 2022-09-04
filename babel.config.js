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
            '@hooks': './src/hooks',
            '@pages': './src/pages',
            '@common': './src/common',
            '@context': './src/context',
          }
        }
      ]
    ],
  };
};
