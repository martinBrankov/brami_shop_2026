# BramiShop - Онлайн магазин

Full-stack приложение за онлайн магазин, създадено с NestJS (backend) и Next.js (frontend).

## Технологии

### Backend
- **NestJS** - Node.js framework
- **PostgreSQL** - База данни
- **Prisma** - ORM
- **TypeScript** - Типизиран JavaScript
- **JWT** - Аутентикация
- **Swagger** - API документация

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Типизиран JavaScript
- **Tailwind CSS** - CSS framework
- **Lucide React** - Икони

## Структура на проекта

```
bramiShop-2026/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Аутентикация модул
│   │   ├── users/          # Потребители модул
│   │   ├── products/       # Продукти модул
│   │   ├── categories/     # Категории модул
│   │   ├── cart/           # Количка модул
│   │   ├── orders/         # Поръчки модул
│   │   ├── prisma/         # Prisma конфигурация
│   │   ├── app.module.ts   # Root модул
│   │   └── main.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Prisma schema
│   ├── package.json
│   └── .env                # Environment variables
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App directory (Next.js 13+)
│   │   ├── components/     # React компоненти
│   │   ├── lib/            # Utility функции
│   │   └── types/          # TypeScript types
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
└── README.md
```

## Инсталация и стартиране

### Предварителни изисквания
- Node.js (v18 или по-нова версия)
- PostgreSQL
- npm или yarn

### Backend стартиране

1. Навигирайте до backend директорията:
```bash
cd backend
```

2. Инсталирайте зависимостите:
```bash
npm install
```

3. Настройте environment переменните:
```bash
cp .env.example .env
```
Редактирайте `.env` файл с вашите настройки:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bramishop?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=3000
```

4. Генерирайте Prisma client:
```bash
npm run prisma:generate
```

5. Пуснете database миграции:
```bash
npm run prisma:migrate
```

6. Стартирайте development сървъра:
```bash
npm run start:dev
```

Backend ще стартира на `http://localhost:3000`

API документацията е достъпна на `http://localhost:3000/api`

### Frontend стартиране

1. Навигирайте до frontend директорията:
```bash
cd frontend
```

2. Инсталирайте зависимостите:
```bash
npm install
```

3. Стартирайте development сървъра:
```bash
npm run dev
```

Frontend ще стартира на `http://localhost:3001`

## Бележки

- Frontend е конфигуриран да работи самостоятелно без backend с mock данни
- Backend и frontend могат да работят едновременно на различни портове
- За production, уверете се, че сте променили JWT_SECRET и други sensitive данни

## Database Schema

Приложението използва следните основни таблици:
- `users` - Потребители
- `categories` - Категории продукти
- `products` - Продукти
- `carts` - Колички
- `cart_items` - Продукти в колички
- `orders` - Поръчки
- `order_items` - Продукти в поръчки

## API Endpoints

### Аутентикация
- `POST /auth/login` - Вход на потребител
- `POST /auth/register` - Регистрация на потребител

### Продукти
- `GET /products` - Вземи всички продукти
- `GET /products/:id` - Вземи конкретен продукт
- `POST /products` - Създай нов продукт
- `PUT /products/:id` - Обнови продукт
- `DELETE /products/:id` - Изтрий продукт

### Категории
- `GET /categories` - Вземи всички категории
- `POST /categories` - Създай нова категория

### Количка
- `GET /cart` - Вземи количка на потребител
- `POST /cart/add` - Добави продукт в количка
- `DELETE /cart/remove/:productId` - Премахни продукт от количка

### Поръчки
- `GET /orders` - Вземи поръчки на потребител
- `POST /orders` - Създай нова поръчка

## Лиценз

MIT License
