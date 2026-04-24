# ⚡ Y2K САЙТ — ОПТИМИЗАЦИЯ И ЧЕК-ЛИСТ

Практическое руководство по оптимизации производительности вашего Y2K-сайта.

---

## 📊 ТЕКУЩИЙ АНАЛИЗ

### Сильные стороны ✅

- ✅ React 19 + TypeScript (новые версии)
- ✅ Vite (быстрый bundler)
- ✅ Code splitting + lazy loading (уже реализовано)
- ✅ Tailwind CSS (эффективная система стилей)
- ✅ Responsive design foundation

### Области для улучшения ⚠️

- ❌ Изображения не оптимизированы
- ❌ Шрифты могут загружаться медленнее
- ❌ CSS может содержать неиспользуемые стили
- ❌ React компоненты могут ненужно перерендериваться
- ❌ SEO теги отсутствуют
- ❌ Нет динамического контента для примеров

---

## 🎯 ПРИОРИТИЗИРОВАННЫЙ ПЛАН ОПТИМИЗАЦИИ

### КРИТИЧЕСКИЕ (Неделя 1)

- [ ] **Оптимизация изображений** (40-60% улучшения скорости)
- [ ] **Улучшение шрифтов** (20-30% улучшения скорости загрузки)
- [ ] **Очистка Tailwind CSS** (50-70% уменьшения CSS бандла)
- [ ] **React.memo для heavy компонентов** (30-40% улучшения rendering)

### ВАЖНЫЕ (Неделя 2)

- [ ] **SEO оптимизация** (видимость в поисковиках)
- [ ] **Mobile responsive optimization**
- [ ] **Loading states и error boundaries**
- [ ] **Bundle analysis** (Lighthouse > 90)

### ЖЕЛАТЕЛЬНЫЕ (Неделя 3+)

- [ ] **Advanced animations optimization**
- [ ] **Service Worker** для offline support
- [ ] **Compression** (gzip, brotli)
- [ ] **CDN для статических файлов**

---

## 🔧 ПОШАГОВЫЕ ИНСТРУКЦИИ

### 1. ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ

#### Шаг 1: Анализ текущих изображений

```bash
# Windows PowerShell
Get-ChildItem -Path "src\assets\img" -Recurse |
  ForEach-Object {
    "{0} - {1} KB" -f $_.Name, ($_.Length / 1024)
  }
```

#### Шаг 2: Конвертация в WebP (инструменты)

**Вариант 1: Online (быстро)**

- https://convertio.co/ru/jpg-webp/
- https://ilovepdf.com/ru

**Вариант 2: FFmpeg (локально)**

```bash
# Установить FFmpeg
# https://ffmpeg.org/download.html

# Конвертировать одно изображение
ffmpeg -i image.jpg -c:v libwebp -quality 80 image.webp

# Конвертировать все PNG в WebP
for /f "delims=" %i in ('dir /b *.png') do (
  ffmpeg -i "%i" -c:v libwebp -quality 80 "%~ni.webp"
)
```

**Вариант 3: ImageMagick**

```bash
magick convert image.png -quality 80 image.webp
```

#### Шаг 3: Оптимизация размера GIF/анимаций

```bash
# Конвертировать GIF в Video (меньше размер)
ffmpeg -i animation.gif -c:v libvpx-vp9 -pix_fmt yuva420p animation.webm
ffmpeg -i animation.gif -c:v libx264 -pix_fmt yuva420p animation.mp4

# Сжать GIF
ffmpeg -i animation.gif -vf "scale=iw/2:ih/2" -loop 0 animation_small.gif
```

#### Шаг 4: Создать srcset для responsive images

```bash
# Создавать разные размеры
# original: 1280px
# medium: 640px
# small: 320px

# Пример с ImageMagick для всех изображений:
for /f "delims=" %i in ('dir /b *.webp') do (
  magick convert "%i" -resize 50%% "%~ni-medium.webp"
  magick convert "%i" -resize 25%% "%~ni-small.webp"
)
```

#### Шаг 5: Обновить HTML/React

```tsx
// Использовать оптимизированные изображения
<OptimizedImage
  src="assets/img/archive-large.webp"
  srcSet="
    assets/img/archive-small.webp 320w,
    assets/img/archive-medium.webp 640w,
    assets/img/archive-large.webp 1280w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 100vw"
  alt="Y2K archive interface"
  loading="lazy"
/>
```

**Результаты оптимизации:**

```
ДО:
- image1.png: 850 KB
- image2.jpg: 1.2 MB
- animation.gif: 3.5 MB
Итого: ~5.5 MB

ПОСЛЕ:
- image1.webp: 120 KB (-86%)
- image2.webp: 180 KB (-85%)
- animation.webm: 400 KB (-89%)
Итого: ~700 KB (91% уменьшение!)
```

---

### 2. ОПТИМИЗАЦИЯ ШРИФТОВ

#### Шаг 1: Добавить font-display и preload

```html
<!-- В index.html -->
<link
  rel="preload"
  as="font"
  href="/fonts/terminatorcyr_semi_expandedbold.ttf"
  type="font/ttf"
  crossorigin="anonymous"
/>

<link
  rel="preload"
  as="font"
  href="/fonts/planet.ttf"
  type="font/ttf"
  crossorigin="anonymous"
/>
```

#### Шаг 2: Обновить @font-face

```css
/* src/index.css */
@font-face {
  font-family: "Terminator";
  src: url("/fonts/terminatorcyr_semi_expandedbold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap; /* swap = показать текст вместо шрифта */
  size-adjust: 90%; /* компенсировать размер fallback */
}

@font-face {
  font-family: "Planet";
  src: url("/fonts/planet.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  size-adjust: 95%;
}
```

#### Шаг 3: Конвертировать TTF в WOFF2 (меньше на 30%)

```bash
# Установить fonttools
pip install fonttools

# Конвертировать
fonttools ttLib convert --flavor=woff2 terminatorcyr_semi_expandedbold.ttf

# Получится: terminatorcyr_semi_expandedbold.woff2
```

#### Шаг 4: Использовать WOFF2

```css
@font-face {
  font-family: "Terminator";
  src:
    url("/fonts/terminatorcyr.woff2") format("woff2"),
    url("/fonts/terminatorcyr.ttf") format("truetype");
  font-weight: 700;
  font-display: swap;
}
```

**Результаты:**

```
Terminator.ttf: 280 KB
Terminator.woff2: 95 KB (-66%)

Planet.ttf: 180 KB
Planet.woff2: 55 KB (-69%)

Итого сэкономлено: ~310 KB
```

---

### 3. ОЧИСТКА TAILWIND CSS

#### Шаг 1: Проверить текущий размер CSS

```bash
# npm dev
# Открыть DevTools → Network → фильтр .css
# Записать размер текущего CSS файла
```

#### Шаг 2: Улучшить tailwind.config.ts

**Текущий файл (неоптимизирован):**

```typescript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bartle: ["'BBH Bartle'", "cursive"],
        caveat: ["Caveat", "cursive"],
        terminator: ["Terminator", "sans-serif"],
        planet: ["Planet", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

**Оптимизированный файл:**

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    // Явно перечислить классы, которые генерируются динамически
    /^bg-\[#/, // Для bg-[#060811]
    /^text-\[/, // Для text-[цвет]
    /^border-\[/, // Для border-[цвет]
    /^shadow-\[/, // Для shadow-[значение]
    /^animate-/, // Для всех анимаций
    /^group-/, // Для group hover
  ],
  theme: {
    extend: {
      fontFamily: {
        terminator: ["Terminator", "sans-serif"],
        planet: ["Planet", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Убрать неиспользуемые spacing варианты
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        // убрать: 9: '2.25rem', 10: '2.5rem', 11: '2.75rem', и т.д.
      },
      colors: {
        // Только нужные цвета
        cyan: {
          300: "#7df9ff",
        },
        purple: {
          300: "#8d6dff",
        },
        pink: {
          300: "#ff59d1",
        },
        lime: {
          300: "#d6ff60",
        },
      },
    },
  },
  corePlugins: {
    // Отключить неиспользуемые plugins
    aspectRatio: false, // если не используется
    backdropBlur: true, // используется
    backdropBrightness: false,
    backdropContrast: false,
    backdropFilter: true,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backgroundColor: true, // используется
    backgroundImage: true, // используется
    backgroundOpacity: true, // используется
    backgroundPosition: false,
    backgroundRepeat: true, // используется
    backgroundSize: true, // используется
    // ... и т.д. для каждого plugin
  },
  plugins: [],
} satisfies Config;
```

#### Шаг 3: Проверить результат

```bash
npm run build
# Проверить размер dist/*.css
# Целевой размер: 15-20 KB (вместо 60+ KB)
```

---

### 4. ОПТИМИЗАЦИЯ REACT КОМПОНЕНТОВ

#### Шаг 1: Добавить React.memo для heavy компонентов

**Текущий компонент (перерендер на каждый parent update):**

```tsx
export default function GameCard({ game }) {
  return <div className="p-4">{game.name}</div>;
}
```

**Оптимизированный компонент:**

```tsx
import { memo } from "react";

interface GameCardProps {
  game: Game;
}

export const GameCard = memo(
  function GameCard({ game }: GameCardProps) {
    return <div className="p-4">{game.name}</div>;
  },
  (prevProps, nextProps) => {
    // Кастомное сравнение если нужно
    return prevProps.game.id === nextProps.game.id;
  },
);
```

#### Шаг 2: Использовать useMemo для дорогих вычислений

**Медленно (перевычисляется каждый рендер):**

```tsx
function GamesList() {
  const [filter, setFilter] = useState("all");
  const games = []; // большой массив

  const filtered = games.filter((g) => g.category === filter);

  return (
    <div>
      {filtered.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </div>
  );
}
```

**Быстро (перевычисляется только при изменении зависимостей):**

```tsx
import { useMemo } from "react";

function GamesList() {
  const [filter, setFilter] = useState("all");
  const games = [];

  const filtered = useMemo(
    () => games.filter((g) => g.category === filter),
    [games, filter],
  );

  return (
    <div>
      {filtered.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </div>
  );
}
```

#### Шаг 3: Использовать useCallback для функций-props

**Проблема: функция создается заново на каждый рендер**

```tsx
function Parent() {
  const handleClick = () => {
    /* ... */
  };
  return <Child onClick={handleClick} />;
}

// Child вернет: prevProps.onClick !== nextProps.onClick
// => React.memo не сработает
```

**Решение:**

```tsx
import { useCallback } from "react";

function Parent() {
  const handleClick = useCallback(() => {
    /* ... */
  }, []);
  return <Child onClick={handleClick} />;
}
```

#### Шаг 4: Использовать Virtual Scrolling для больших списков

```tsx
import { FixedSizeList } from "react-window";

function LargeList() {
  const items = new Array(1000).fill(null);

  const Row = ({ index, style }) => (
    <div style={style} className="p-2 border-b">
      Item {index}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

### 5. SEO ОПТИМИЗАЦИЯ

#### Шаг 1: Добавить React Helmet

```bash
npm install react-helmet-async
```

#### Шаг 2: Обновить App.tsx

```tsx
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return <HelmetProvider>{/* Routes */}</HelmetProvider>;
}
```

#### Шаг 3: Добавить SEO мета-теги на каждой странице

```tsx
// src/pages/Home.tsx
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CULTURE Y2K — Interactive Archive of 2000s Internet</title>
        <meta
          name="description"
          content="Explore the nostalgia of early 2000s internet culture: music, fashion, games, and Y2K aesthetic."
        />
        <meta
          name="keywords"
          content="Y2K, 2000s, nostalgia, internet archive, retro"
        />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="CULTURE Y2K" />
        <meta property="og:description" content="..." />
        <meta
          property="og:image"
          content="https://culturey2k.com/og-image.png"
        />
        <meta property="og:url" content="https://culturey2k.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Содержимое */}
    </>
  );
}
```

#### Шаг 4: Создать sitemap.xml

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://culturey2k.com/</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://culturey2k.com/music</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://culturey2k.com/games</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://culturey2k.com/fashion</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### Шаг 5: Создать robots.txt

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://culturey2k.com/sitemap.xml
```

---

## 🧪 ПРОВЕРКА РЕЗУЛЬТАТОВ

### Lighthouse Audit

```bash
# 1. npm run build
# 2. npm run preview
# 3. Открыть DevTools → Lighthouse
# 4. Run audit

Целевые значения:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
```

### PageSpeed Insights

Перейти на: https://pagespeed.web.dev/

Вставить URL вашего сайта и проверить метрики:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### WebPageTest

Перейти на: https://www.webpagetest.org/

Проверить:

- Время загрузки первого байта (TTFB)
- Waterfall chart
- Filmstrip view

---

## 📋 ФИНАЛЬНЫЙ ЧЕК-ЛИСТ

### Неделя 1: Foundation

- [ ] Анализ текущих изображений
- [ ] Конвертация изображений в WebP
- [ ] Создание srcset для responsive
- [ ] Оптимизация шрифтов (WOFF2)
- [ ] Добавление preload в index.html
- [ ] Очистка Tailwind CSS
- [ ] Запуск Lighthouse audit (Target > 80)

### Неделя 2: React Optimization

- [ ] Добавить React.memo для heavy компонентов
- [ ] Добавить useMemo для дорогих вычислений
- [ ] Добавить useCallback для функций
- [ ] Реализовать Virtual Scrolling где нужно
- [ ] Проверить реренденты (React DevTools Profiler)

### Неделя 3: SEO & Polish

- [ ] Добавить React Helmet
- [ ] SEO мета-теги на каждой странице
- [ ] Создать sitemap.xml
- [ ] Создать robots.txt
- [ ] Alt text для всех изображений
- [ ] Structured Data (JSON-LD)
- [ ] Финальный Lighthouse audit (Target > 90)

### Финальная проверка

- [ ] Mobile responsiveness (DevTools)
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Performance на медленной сети (DevTools throttling)
- [ ] Accessibility (WAVE, axe DevTools)
- [ ] Error handling (попробовать сломать)

---

## 📊 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

| Метрика                      | До     | После  | Улучшение |
| ---------------------------- | ------ | ------ | --------- |
| Размер CSS                   | 65 KB  | 18 KB  | ⬇️ 72%    |
| Размер изображений           | 5.5 MB | 700 KB | ⬇️ 87%    |
| Размер шрифтов               | 460 KB | 150 KB | ⬇️ 67%    |
| Первоначальная загрузка      | 6.5 MB | 1.2 MB | ⬇️ 82%    |
| FCP (First Contentful Paint) | 3.2s   | 1.1s   | ⬇️ 66%    |
| Lighthouse Performance       | 62     | 95     | ⬆️ +33    |

---

**Обновлено:** 24 апреля 2026  
**Версия:** 1.0  
**Статус:** Готов к применению ✅
