# The Rang Yan Review

Литературно-философский журнал. Построен на Astro + TypeScript + Tailwind CSS.
Контент хранится в Markdown-файлах в репозитории GitHub. Деплой на Cloudflare Pages или Vercel — бесплатно, без внешних баз данных.

---

## Содержание

1. [Установка и локальный запуск](#1-установка-и-локальный-запуск)
2. [Структура папок](#2-структура-папок)
3. [Где лежат тексты и выпуски](#3-где-лежат-тексты-и-выпуски)
4. [Как создать публикацию через Markdown](#4-как-создать-публикацию-через-markdown)
5. [Как пользоваться админкой Decap CMS](#5-как-пользоваться-админкой-decap-cms)
6. [Как настроить GitHub OAuth Worker](#6-как-настроить-github-oauth-worker)
7. [Какие значения заменить в config.yml](#7-какие-значения-заменить-в-configyml)
8. [Как подключить репозиторий GitHub](#8-как-подключить-репозиторий-github)
9. [Как развернуть на Cloudflare Pages](#9-как-развернуть-на-cloudflare-pages)
10. [Как работает автоматический архив выпусков](#10-как-работает-автоматический-архив-выпусков)
11. [Как работает автоматическое появление авторов](#11-как-работает-автоматическое-появление-авторов)
12. [Как редактировать страницу редакции](#12-как-редактировать-страницу-редакции)
13. [Как добавить нового участника редакции](#13-как-добавить-нового-участника-редакции)

---

## 1. Установка и локальный запуск

**Требования:** Node.js 18 или новее.

```bash
# Установить зависимости
npm install

# Запустить локальный сервер разработки (откроется на http://localhost:4321)
npm run dev

# Собрать статический сайт
npm run build

# Предпросмотр собранного сайта
npm run preview
```

---

## 2. Структура папок

```
/
├── public/
│   ├── admin/
│   │   ├── index.html         — страница входа в Decap CMS
│   │   └── config.yml         — конфигурация Decap CMS (ЗАМЕНИТЕ 2 значения)
│   └── images/                — загружаемые изображения (обложки, портреты)
│
├── src/
│   ├── content/               — весь контент в Markdown
│   │   ├── essays/            — эссе
│   │   ├── poetry/            — поэзия
│   │   ├── prose/             — проза
│   │   ├── reading-room/      — читальный зал
│   │   ├── issues/            — выпуски журнала
│   │   ├── authors/           — биографии авторов
│   │   └── editorial-board/   — члены редакции
│   │
│   ├── components/            — компоненты: шапка, подвал, карточки
│   ├── layouts/               — базовые макеты страниц
│   ├── pages/                 — маршруты сайта
│   └── styles/
│       └── globals.css        — глобальные стили
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 3. Где лежат тексты и выпуски

| Тип материала   | Папка                        |
|-----------------|------------------------------|
| Эссе            | `src/content/essays/`        |
| Поэзия          | `src/content/poetry/`        |
| Проза           | `src/content/prose/`         |
| Читальный зал   | `src/content/reading-room/`  |
| Выпуски         | `src/content/issues/`        |
| Авторы          | `src/content/authors/`       |
| Редакция        | `src/content/editorial-board/` |

Каждый файл — это `.md` файл с frontmatter (метаданные в начале файла между `---`) и телом текста в формате Markdown.

---

## 4. Как создать публикацию через Markdown

Создайте новый файл, например `src/content/essays/my-essay.md`:

```markdown
---
title: "Название эссе"
author: "Имя Автора"
authorSlug: "imya-avtora"
date: 2024-11-15
excerpt: "Краткое описание текста (1–2 предложения)."
tags: ["философия", "критическая теория"]
category: "Essays"
issue: "issue-02"
featured: false
draft: false
---

Текст эссе в формате Markdown.

## Подзаголовок

Продолжение текста...
```

**Поля frontmatter:**

| Поле         | Обязательное | Описание |
|--------------|-------------|----------|
| `title`      | да          | Заголовок |
| `author`     | да          | Имя автора (как оно будет показано) |
| `authorSlug` | да          | URL-имя автора: латиница, через дефис |
| `date`       | да          | Дата публикации |
| `excerpt`    | да          | Краткое описание |
| `tags`       | нет         | Теги для фильтрации |
| `category`   | нет         | Рубрика (Essays, Poetry и т.д.) |
| `issue`      | нет         | Slug выпуска (например, `issue-02`) |
| `featured`   | нет         | `true` — показывать на главной |
| `draft`      | нет         | `true` — не публиковать |
| `coverImage` | нет         | Путь к обложке |

---

## 5. Как пользоваться админкой Decap CMS

Decap CMS — это визуальный редактор контента. После настройки (см. разделы 6–8) он доступен по адресу:

```
https://your-site.pages.dev/admin/
```

Или на вашем собственном домене: `https://rangyanreview.org/admin/`

Вход — через кнопку **"Login with GitHub"**. Нужны права на запись в репозиторий.

В админке есть разделы:
- **Эссе** — создавать и редактировать эссе
- **Поэзия** — управлять стихотворениями
- **Проза** — управлять прозой
- **Читальный зал** — тексты для Reading Room
- **Выпуски** — создавать новые номера журнала
- **Авторы** — добавлять и редактировать биографии авторов
- **Редакция** — управлять страницей Editorial Board

После сохранения в Decap CMS изменение автоматически попадает в GitHub, и Cloudflare Pages пересобирает сайт (обычно 1–2 минуты).

---

## 6. Как настроить GitHub OAuth Worker

Decap CMS требует OAuth-авторизацию через GitHub. Для этого нужен маленький прокси-сервер — Cloudflare Worker.

### Шаг 1: Создайте OAuth App в GitHub

1. Перейдите в **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. Заполните:
   - **Application name**: Rang Yan Review CMS
   - **Homepage URL**: `https://ваш-сайт.pages.dev`
   - **Authorization callback URL**: `https://ваш-oauth-worker.workers.dev/callback`
3. Нажмите **Register application**
4. Запишите **Client ID**
5. Нажмите **Generate a new client secret** и запишите **Client Secret**
   ⚠️ Client Secret показывается **один раз** — сохраните его немедленно

### Шаг 2: Разверните OAuth Worker на Cloudflare

Используйте готовый проект [`decap-proxy`](https://github.com/brettchalupa/decap-proxy) или [`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth).

**Вариант с sveltia-cms-auth:**

```bash
# Клонируйте репозиторий
git clone https://github.com/sveltia/sveltia-cms-auth
cd sveltia-cms-auth

# Установите Wrangler (Cloudflare CLI)
npm install -g wrangler
wrangler login

# Создайте Worker
wrangler deploy

# Добавьте секреты (из шага 1)
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
```

После деплоя Worker вы получите URL вида: `https://sveltia-cms-auth.your-account.workers.dev`

Это и есть ваш `base_url`.

### Шаг 3: Обновите Authorization callback URL в GitHub

Вернитесь в настройки OAuth App на GitHub и замените Authorization callback URL на:
```
https://sveltia-cms-auth.your-account.workers.dev/callback
```

---

## 7. Какие значения заменить в config.yml

Откройте файл `public/admin/config.yml` и замените **только два значения**:

```yaml
backend:
  name: github
  branch: main
  # ЗАМЕНИТЕ: ваш GitHub username / название репозитория
  repo: ЗАМЕНИТЬ_НА_GITHUB_USERNAME/ЗАМЕНИТЬ_НА_REPOSITORY
  # ЗАМЕНИТЕ: URL вашего OAuth Worker (из шага 2 раздела 6)
  base_url: ЗАМЕНИТЬ_НА_URL_OAUTH_WORKER
  auth_endpoint: auth
```

**Пример после замены:**
```yaml
  repo: ivanova/rang-yan-review
  base_url: https://rang-yan-oauth.ivanova.workers.dev
```

Больше ничего менять не нужно. Не добавляйте Client Secret или другие секреты в этот файл.

---

## 8. Как подключить репозиторий GitHub

1. Создайте новый репозиторий на GitHub (публичный или приватный)
2. Загрузите в него файлы проекта:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin main
   ```
3. Замените значения в `public/admin/config.yml` (см. раздел 7)
4. Сделайте ещё один коммит и push:
   ```bash
   git add public/admin/config.yml
   git commit -m "Configure CMS backend"
   git push
   ```

---

## 9. Как развернуть на Cloudflare Pages

1. Перейдите на [pages.cloudflare.com](https://pages.cloudflare.com)
2. Нажмите **Create a project → Connect to Git**
3. Авторизуйте GitHub и выберите ваш репозиторий
4. В настройках сборки укажите:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Нажмите **Save and Deploy**

После деплоя сайт будет доступен по адресу вида `your-project.pages.dev`.

**Автоматическая пересборка:** при каждом новом коммите в ветку `main` Cloudflare Pages автоматически пересобирает и публикует сайт.

**Свой домен:** в Cloudflare Pages → Custom domains можно добавить собственный домен.

### Деплой на Vercel (альтернатива)

1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите **New Project → Import Git Repository**
3. Выберите репозиторий
4. Vercel автоматически определит Astro — нажмите **Deploy**

---

## 10. Как работает автоматический архив выпусков

Логика выпусков работает следующим образом:

- **Текущим** считается самый новый (по дате) выпуск со значением `status: current`
- **Если несколько выпусков имеют `status: current`** — текущим будет самый новый по дате, остальные тоже попадут в архив
- **Все выпуски** (в том числе архивные) автоматически отображаются на странице `/archive/`, отсортированные от новых к старым
- Вам **не нужно** вручную менять `status: archive` у старого выпуска, чтобы он появился в архиве — он появится там автоматически

**Правило:** При создании нового выпуска просто укажите для него `status: current`. Старые выпуски можно оставить как есть — они будут отображаться в архиве в любом случае.

---

## 11. Как работает автоматическое появление авторов

- Автор появляется на странице `/authors/` **автоматически** после того, как у него появляется хотя бы одна публикация в любой рубрике
- Если в папке `src/content/authors/` есть файл `{authorSlug}.md` — на странице автора будет показана его биография
- Если файла нет — страница автора всё равно создаётся автоматически, показывается только имя и список публикаций
- Если биография не заполнена — выводится фраза "Biography forthcoming."

**Чтобы добавить биографию:**
1. Создайте файл `src/content/authors/slug-avtora.md`
2. Заполните поля: `name`, `slug`, `shortBio`, `fullBio`, `location`, `links`, `portrait`

Или добавьте биографию через Decap CMS → раздел **Авторы**.

---

## 12. Как редактировать страницу редакции и менять фотографию главного редактора

Страница `/editorial-board/` строится из файлов в `src/content/editorial-board/`.

**Главный редактор** — это запись с полем `featured: true`. Он показывается первым и с расширенным профилем.

Чтобы изменить данные или фото главного редактора:
1. Откройте файл `src/content/editorial-board/miriam-hollander.md` (или соответствующий файл)
2. Замените поля на нужные данные
3. Для фото: загрузите изображение в `public/images/` и укажите путь `/images/имя-файла.jpg`

Через Decap CMS: перейдите в **Редакция** → выберите запись главного редактора → замените фото через загрузчик.

---

## 13. Как добавить нового участника редакции

**Через Markdown:**

Создайте файл `src/content/editorial-board/new-member.md`:

```markdown
---
name: "Имя Фамилия"
slug: "imya-familiya"
role: "Редактор / Переводчик / и т.д."
order: 5
shortBio: "Краткая биография в 1–2 предложениях."
fullBio: "Полная биография."
photo: "/images/portrait-imya.jpg"
location: "Город, Страна"
email: "email@example.com"
links:
  - label: "Сайт"
    url: "https://example.com"
featured: false
---
```

**Через Decap CMS:**

Перейдите в **Редакция** → **New Член редакции** → заполните поля → сохраните.

**Роли для поля `role`:**
- Editor-in-Chief
- Contributing Editor
- Poetry Editor
- Prose Editor
- Translator
- Copy Editor
- Design
- Advisory Board

---

## Лицензия

Исходный код журнала распространяется свободно. Тексты публикаций принадлежат их авторам.
