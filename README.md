# 💡 Проектная работа «Веб-ларек»

## 🚀 Используемый стек

- **HTML** — разметка страниц
- **SCSS** — стилизация интерфейса
- **TypeScript** — типизация и логика приложения
- **Webpack** — сборка проекта

---

## ⚙️ Инструкция по запуску

1. Установите зависимости:
   ```sh
   npm install
   # или
   yarn
   ```

2. Запустите проект в режиме разработки:
   ```sh
   npm run start
   # или
   yarn start
   ```

3. Соберите проект для продакшена:
   ```sh
   npm run build
   # или
   yarn build
   ```

---

## 🏗️ Архитектура проекта

### Основные слои

- **Модели данных**  
  Описывают структуру и состояние сущностей (товар, заказ).

- **Компоненты отображения**  
  Реализуют визуальные элементы: карточки, модальные окна, формы.

- **Брокер событий**  
  [`EventEmitter`](src/components/base/events.ts) — обеспечивает коммуникацию между частями приложения.

- **Клиент API**  
  [`Api`](src/components/base/api.ts) — взаимодействие с сервером.

- **Утилиты**  
  Вспомогательные функции для работы с DOM и данными ([`utils.ts`](src/utils/utils.ts)).

- **Константы**  
  Глобальные настройки ([`constants.ts`](src/utils/constants.ts)).

---

### 🧩 Описание базовых классов

- **EventEmitter**  
  [`EventEmitter`](src/components/base/events.ts) — управление событиями: подписка, отписка, вызов слушателей.

- **Api**  
  [`Api`](src/components/base/api.ts) — методы для получения и отправки данных на сервер.

---

### 🖼️ Описание компонентов

- **Card**  
  Карточка товара, отображает информацию о продукте.

- **Modal**  
  Модальные окна для корзины, заказа, успешной покупки.

- **Basket**  
  Корзина пользователя, управление списком товаров.

- **Form**  
  Формы для оформления заказа и ввода контактов.

---

### 🔗 Связи между компонентами

- Все компоненты взаимодействуют через брокер событий [`EventEmitter`](src/components/base/events.ts).
- Для работы с сервером используется [`Api`](src/components/base/api.ts).
- Визуальные компоненты получают данные от моделей и обновляются при изменениях.

---

### 📦 Типы данных

- **ProductApi**  
  Интерфейс товара, приходящего с API  
  ```ts
  interface ProductApi {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }
  ```

- **OrderApi**  
  Интерфейс заказа, приходящего с API  
  ```ts
  interface OrderApi {
    items: ProductApi[];
    total: number;
    address: string;
    email: string;
    phone: string;
    payment: string;
  }
  ```

- **ProductModel**  
  Интерфейс модели товара для отображения  
  ```ts
  interface ProductModel {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    inBasket: boolean;
  }
  ```

- **OrderModel**  
  Интерфейс модели заказа для отображения  
  ```ts
  interface OrderModel {
    items: ProductModel[];
    total: number;
    address: string;
    email: string;
    phone: string;
    payment: string;
  }
  ```

- **ProductViewProps**  
  Свойства компонента отображения товара  
  ```ts
  interface ProductViewProps {
    product: ProductModel;
    onAddToBasket: (id: string) => void;
  }
  ```

- **BasketViewProps**  
  Свойства компонента отображения корзины  
  ```ts
  interface BasketViewProps {
    items: ProductModel[];
    total: number;
    onRemove: (id: string) => void;
  }
  ```

- **IApiClient**  
  Интерфейс клиента API  
  ```ts
  interface IApiClient {
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object): Promise<T>;
  }
  ```

- **IEventEmitter**  
  Интерфейс брокера событий  
  ```ts
  interface IEventEmitter {
    on<T>(event: string, callback: (data: T) => void): void;
    emit<T>(event: string, data?: T): void;
    off(event: string, callback: Function): void;
  }
  ```

- **AppEvents**  
  Перечисление событий приложения  
  ```ts
  enum AppEvents {
    AddToBasket = 'add-to-basket',
    RemoveFromBasket = 'remove-from-basket',
    SubmitOrder = 'submit-order',
    OrderSuccess = 'order-success',
  }
  ```

- **AddToBasketEvent, RemoveFromBasketEvent, SubmitOrderEvent, OrderSuccessEvent**  
  Интерфейсы событий  
  ```ts
  interface AddToBasketEvent {
    productId: string;
  }

  interface RemoveFromBasketEvent {
    productId: string;
  }

  interface SubmitOrderEvent {
    order: OrderModel;
  }

  interface OrderSuccessEvent {
    orderId: string;
    total: number;
  }
  ```

---

### 🔄 Процессы

- Взаимодействие компонентов — через события (EventEmitter).
- Получение данных — через API-клиент.
- Отображение — через компоненты, которые получают данные из моделей.

---

## 📁 Структура проекта

```
src/
  components/
    base/
      events.ts
      api.ts
  utils/
    utils.ts
    constants.ts
  common.blocks/    # SCSS стили
  pages/
    index.html
  index.ts          # точка входа приложения
  scss/
    styles.scss
```
