// Database types (generated from Prisma schema)
export type Store = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Billboard = {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  storeId: string;
  name: string;
  billboardId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Size = {
  id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  price: number;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Image = {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: string;
  storeId: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
};

// Extended types with relations
export type ProductWithDetails = Product & {
  category: Category;
  size: Size;
  images: Image[];
};

export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    product: Product;
  })[];
};

export type CategoryWithBillboard = Category & {
  billboard: Billboard;
};

// API Response types
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Form types
export type StoreFormData = {
  name: string;
};

export type BillboardFormData = {
  label: string;
  imageUrl: string;
};

export type CategoryFormData = {
  name: string;
  billboardId: string;
};

export type SizeFormData = {
  name: string;
  value: string;
};

export type ProductFormData = {
  name: string;
  price: number;
  categoryId: string;
  sizeId: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: { url: string }[];
};

// Component props types
export type PageProps<T = Record<string, never>> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type LayoutProps<T = Record<string, never>> = {
  children: React.ReactNode;
  params: Promise<T>;
};

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & Record<string, never>;

export type NonEmptyArray<T> = [T, ...T[]];

export type StringKeys<T> = Extract<keyof T, string>;

// Error types
export type AppError = {
  code: string;
  message: string;
  details?: unknown;
};

// Chart data types
export type ChartData = {
  name: string;
  total: number;
};

// Dashboard stats
export type DashboardStats = {
  totalRevenue: number;
  salesCount: number;
  stockCount: number;
  graphData: ChartData[];
};
