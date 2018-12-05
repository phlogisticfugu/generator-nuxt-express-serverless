import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: './src-express/create_express_app.js',
    output: {
      name: 'express-app',
      file: './dist/create_express_app.bundle.js',
      format: 'cjs'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      commonjs()
    ],
    external (id) {
      return /^[a-z]/.test(id)
    }
  }
]
