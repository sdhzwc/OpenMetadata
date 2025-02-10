/*
 *  Copyright 2024 Collate.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { Locale } from 'antd/es/locale-provider';
import deDE from 'antd/es/locale/de_DE';
import enUS from 'antd/es/locale/en_US';
import esES from 'antd/es/locale/es_ES';
import frFR from 'antd/es/locale/fr_FR';
import jaJP from 'antd/es/locale/ja_JP';
import nlNL from 'antd/es/locale/nl_NL';
import ptBR from 'antd/es/locale/pt_BR';
import ruRU from 'antd/es/locale/ru_RU';
import zhCN from 'antd/es/locale/zh_CN';

const locales: Record<string, Locale> = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'fr-FR': frFR,
  'ja-JP': jaJP,
  'pt-BR': ptBR,
  'es-ES': esES,
  'ru-RU': ruRU,
  'de-DE': deDE,
  'nl-NL': nlNL,
};

// he-HE、pr-PR antd locale not found
export const getAntdLocale = (lang: string): Locale => {
  return locales[lang] || enUS;
};
