module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      unitPrecision: 8,
      viewportUnit: 'vw',
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 750
    },
    'postcss-design-convert': {
      multiple: 2,
      units: ['vw'],
      selector: /\.van-/
    }
  }
}
