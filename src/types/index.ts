// Типы данных, приходящие через API
export interface ProductApi {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface OrderApi {
  items: ProductApi[];
  total: number;
  address: string;
  email: string;
  phone: string;
  payment: string;
}

// Интерфейс API-клиента
export interface IApiClient {
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object): Promise<T>;
}

// Интерфейсы модели данных
export interface ProductModel {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inBasket: boolean;
}

export interface OrderModel {
  items: ProductModel[];
  total: number;
  address: string;
  email: string;
  phone: string;
  payment: string;
}

// Интерфейсы отображений
export interface ProductViewProps {
  product: ProductModel;
  onAddToBasket: (id: string) => void;
}

export interface BasketViewProps {
  items: ProductModel[];
  total: number;
  onRemove: (id: string) => void;
}

// Интерфейсы базовых классов
export interface IEventEmitter {
  on<T>(event: string, callback: (data: T) => void): void;
  emit<T>(event: string, data?: T): void;
  off(event: string, callback: Function): void;
}

// Перечисление событий и их интерфейсы
export enum AppEvents {
  AddToBasket = 'add-to-basket',
  RemoveFromBasket = 'remove-from-basket',
  SubmitOrder = 'submit-order',
  OrderSuccess = 'order-success',
}

export interface AddToBasketEvent {
  productId: string;
}

export interface RemoveFromBasketEvent {
  productId: string;
}

export interface SubmitOrderEvent {
  order: OrderModel;
}

export interface OrderSuccessEvent {
  orderId: string;
  total: number;
}