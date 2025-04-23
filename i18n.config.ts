export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en: {
      welcome: 'Welcome',
      products: 'Products',
      ui: 'user interface',
      'click-me': 'Click me',
    },
    uk: {
      welcome: 'Ласкаво просимо',
      products: 'продуктів',
      ui: 'інтерфейс користувача',
      'click-me': 'Натисніть мене',
    },
    de: {
      welcome: 'Willkommen',
      products: 'Produkte',
      ui: 'Bedienoberfläche',
      'click-me': 'Klick mich',
    },
  },
}));
