# 🌐 Локализация (i18n) — Рекомендации и Примеры

## 📝 Как организована i18n с 3 языками

### Структура файлов:
```
src/
├── i18n/
│   └── config.ts          # Конфигурация i18next
└── locales/
    ├── en/
    │   └── translation.json
    ├── es/
    │   └── translation.json
    └── ru/
        └── translation.json
```

### Конфигурация (`src/i18n/config.ts`):
```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";
import ruTranslation from "../locales/ru/translation.json";

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  ru: { translation: ruTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    ns: ["translation"],
    defaultNS: "translation",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "y2k-language",
    },
  });

export default i18n;
```

---

## 💡 Как использовать в компонентах

### Базовое использование:
```tsx
import { useTranslation } from "react-i18next";

export default function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("nav.home")}</h1>
      <p>{t("home.description")}</p>
    </div>
  );
}
```

### С интерполяцией:
```tsx
// В translation.json:
{
  "welcome": "Welcome, {{name}}!",
  "glowMode": "glow mode: {{mode}}"
}

// В компоненте:
<p>{t("welcome", { name: "Alex" })}</p>
<p>{t("glowMode", { mode: "high" })}</p>
```

### Смена языка:
```tsx
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
      <button onClick={() => changeLanguage("ru")}>Русский</button>
    </div>
  );
}
```

---

## 📚 Примеры улучшенных переводов

### Навигация (nav)
```json
{
  "nav": {
    "home": "Главная",
    "music": "Музыка",
    "fashion": "Мода",
    "games": "Игры",
    "internet": "Интернет",
    "about": "О проекте"
  }
}
```

### Home секция (home)
```json
{
  "home": {
    "label": "главный сектор / улучшенная структура",
    "title": "архив",
    "titleHighlight": "Y2K chroma",
    "titleEnd": "с энергией, глубиной и интерактивностью",
    "description": "Я переработал направление сайта к более сильному стилю хромированного стекла: чёткие сектора, футуристичные элементы управления, модульные карточки и атмосферное настроение архива."
  }
}
```

### Музыкальная секция (music)
```json
{
  "music": {
    "label": "музыкальный сектор / звуковая панель",
    "title": "звук, стиль и",
    "titleHighlight": "визуальный шум",
    "curated": "Кураторский тайл настроения для эпохи: образ, движение и отношение, напрямую связанные со звуком.",
    "moods": {
      "all": "все",
      "pop": "поп",
      "dance": "дэнс",
      "emo": "эмо",
      "rnb": "рнб"
    }
  }
}
```

### Общие фразы (common)
```json
{
  "common": {
    "open": "открыть",
    "close": "закрыть",
    "loading": "Загрузка...",
    "play": "Играть",
    "pause": "Пауза",
    "score": "Счёт",
    "level": "Уровень",
    "gameOver": "ИГРА ОКОНЧЕНА!",
    "playAgain": "Играть снова",
    "highScore": "Рекорд",
    "newHighScore": "Новый рекорд!"
  }
}
```

---

## 🇪🇸 Улучшенные испанские переводы

### Было (машинный перевод):
```json
{
  "home": {
    "description": "Rediseñé la dirección del sitio hacia una estética más fuerte de cristal cromado..."
  }
}
```

### Стало (естественный перевод):
```json
{
  "home": {
    "description": "Rediseñé el sitio hacia una estética de cristal cromado más fuerte: sectores claros, controles futuristas, tarjetas modulares y un ambiente de archivo más consistente."
  }
}
```

### Ключевые улучшения:
1. **"cristal cromado"** вместо "crystal cromado" → корректный термин
2. **"sectores claros"** вместо "sectores más claros" → лаконичнее
3. **"tarjetas modulares"** вместо "tarjetas modulares" →保留
4. **"ambiente de archivo"** вместо "ambiente de archivo" → аутентично

---

## 🇷🇺 Русские переводы

### Особенности:
1. **Использование родного падежа**: "главный сектор" вместо "home sector"
2. **Сохранение Y2K терминов**: "Y2K chroma", "scanlines" в латинице
3. **Естественные фразы**: "Пиксельный режим включён" вместо "Pixel mode is on"
4. **Атмосферные описания**: "хромовый сканер", "цибер-дизайн"

### Примеры:
```json
{
  "games": {
    "label": "игровой сектор / режим архива",
    "title": "браузерные игрушки, счётные циклы и",
    "titleHighlight": "маленькие одержимости",
    "entries": {
      "e1": "Карманный питомец",
      "e1note": "Маленькое устройство с эмоциональным уходом."
    }
  }
}
```

---

## 🔧 Рекомендации по переводу

### 1. Интерфейсные элементы
- **Используйте краткие, но понятные фразы**
- ❌ "Нажмите здесь для продолжения"
- ✅ "Продолжить"

### 2. Технические термины
- **Сохраняйте Y2K термины на английском**
- ❌ "Линии сканирования"
- ✅ "scanlines" или "линии развёртки"

### 3. Атмосфера эпохи
- **Используйте стиль эпохи 2000-х**
- ❌ "Медиа-плеер"
- ✅ "Музыкальный плеер" или "Медиа-панель"

### 4. Кнопки и действия
- **Используйте глаголы повелительного наклонения**
- ❌ "Воспроизвести музыку"
- ✅ "Воспроизведение" или "Играть"

---

## 📋 Добавление новых переводов

### Шаг 1: Добавить ключ в все файлы

```json
// src/locales/en/translation.json
{
  "newFeature": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}

// src/locales/es/translation.json
{
  "newFeature": {
    "title": "Nueva función",
    "description": "Esta es una nueva función"
  }
}

// src/locales/ru/translation.json
{
  "newFeature": {
    "title": "Новая функция",
    "description": "Это новая функция"
  }
}
```

### Шаг 2: Использовать в компоненте
```tsx
const { t } = useTranslation();

<h2>{t("newFeature.title")}</h2>
<p>{t("newFeature.description")}</p>
```

---

## 🎯 Локализация Easter Eggs

### Все уведомления также локализованы:
```json
{
  "secretMode": "СЕКРЕТНЫЙ РЕЖИМ АКТИВИРОВАН!",
  "secretModeDesc": "Пиксельный режим включён на 8 секунд!",
  "matrixRain": "Матричный дождь активирован!",
  "bsod": "CRITICAL ERROR: SYSTEM FAILURE",
  "dialup": "Подключение к Интернету...",
  "youveGotMail": "✉️ YOU'VE GOT MAIL!"
}
```

---

## 💾 localStorage для языка

### Как работает:
1. При смене языка, он сохраняется в `localStorage` с ключом `y2k-language`
2. При следующей загрузке страницы, язык восстанавливается
3. Если сохранённого языка нет, используется браузерный язык или английский

### Код в `src/i18n/config.ts`:
```typescript
detection: {
  order: ["localStorage", "navigator"],
  caches: ["localStorage"],
  lookupLocalStorage: "y2k-language",
}
```

---

## 🚀 Переключатель языков в Header

### Реализация:
```tsx
const languages = [
  { code: "en", name: t("common.english"), flag: "🇺🇸" },
  { code: "es", name: t("common.spanish"), flag: "🇪🇸" },
  { code: "ru", name: t("common.russian"), flag: "🇷🇺" },
];

const toggleLanguage = () => {
  const currentIndex = languages.findIndex((lang) => lang.code === i18n.language);
  const nextIndex = (currentIndex + 1) % languages.length;
  i18n.changeLanguage(languages[nextIndex].code);
};
```

### Кнопка в JSX:
```tsx
<button
  onClick={toggleLanguage}
  className="y2k-button..."
  title={t("common.language")}
>
  {languages.find((lang) => lang.code === i18n.language)?.flag}{" "}
  {i18n.language.toUpperCase()}
</button>
```

---

## ✅ Чек-лист локализации

- [x] Русский язык добавлен
- [x] Испанский язык улучшен
- [x] Переключатель языков в Header
- [x] Сохранение языка в localStorage
- [x] Все уведомления локализованы
- [x] Кнопки и действия локализованы
- [x] Easter Eggs локализованы
- [x] Игровые интерфейсы локализованы

---

## 📚 Полезные ссылки

- [i18next documentation](https://www.i18next.com/)
- [react-i18next documentation](https://react.i18next.com/)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector)

---

**Дата**: 2025