module.exports = {
  stories: [
    "./stories.tsx"
  ],
  addons: [
    "@storybook/addon-essentials"
  ],
  webpackFinal
}

async function webpackFinal(config, { configType }) {
  config.node = {
    // module: 'empty',
    // dgram: 'empty',
    // dns: 'mock',
    fs: 'empty',
    // http2: 'empty',
    // net: 'empty',
    // tls: 'empty',
    // child_process: 'empty',
  }

  return config;
}