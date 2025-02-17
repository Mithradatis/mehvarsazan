import { LanguageType } from '@/types/language'
import Translation from '@/types/translation'
import fs from 'fs'
import path from 'path'

export function fetchTranslations(locale: LanguageType): Translation {
  const filePath = path.resolve('public', 'locales', locale, 'common.json')

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Translation file not found: ${filePath}`);

      return {}
    }

    const translations = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    return translations
  } catch (error: any) {
    console.error(`Error reading translation file: ${error.message}`);

    return {}
  }
}
