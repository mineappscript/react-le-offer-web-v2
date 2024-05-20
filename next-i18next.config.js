// @ts-check
/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['en', 'ar',"fr"],
    defaultLocale: 'en',
    localeDetection: false
  },
  localePath:
    typeof window === 'undefined'
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
