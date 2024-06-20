import { createI18n } from 'vue-i18n'
import messages from './lang/index.js'
import { getLang } from '@/api/index.js'

const i18n = createI18n({
  legacy: false,
  locale: getLang(),
  messages
})

export default i18n
