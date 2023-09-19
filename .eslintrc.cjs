module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
    /**
     * 'plugin:prettier/recommended' 的作用是：eslint按照prettier格式化的规则校验，否则会报错。
      *不加也是可以的，保存的时候为自行修复的。
      如果要加需安装一下插件
      yarn add eslint-config-prettier eslint-plugin-prettier --dev
    */
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    // 关闭any校验
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
}
