# configuration for SQL based databases

---

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "<SQL_PROVIDER>"
  url      = env("DATABASE_URL")
}

model Store {
  id String @id @default(uuid()) @map("_id") @db.String
  name String
  userId String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders Order[]
  sizes Size[]
  billboards Billboard[]
  categories Category[]
  products Product[]
}

model Billboard {
  id String @id @default(uuid()) @map("_id") @db.String
  storeId String @db.String()
  label String
  imageUrl String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  categories Category[]
  store Store @relation(fields: [storeId], references: [id])
}

model Category {
  id String @id @default(uuid()) @map("_id") @db.String
  storeId String @db.String()
  name String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  billboardId String @db.String()

  products Product[]

  billboard Billboard @relation(fields: [billboardId], references: [id])
  store Store @relation(fields: [storeId], references: [id])

}

model Size {
  id String @id @default(uuid()) @map("_id") @db.String
  name String
  storeId String @db.String()
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  value String

  products Product[]
  store Store @relation(fields: [storeId], references: [id])
}

model Product {
  id String @id @default(uuid()) @map("_id") @db.String
  storeId String @db.String
  categoryId String @db.String()
  name String
  price Float
  isFeatured Boolean @default(false)
  isArchived Boolean @default(false)
  sizeId String @db.String()
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orderItems OrderItem[]
  images Image[]
  size Size @relation(fields: [sizeId], references: [id])
  store Store @relation(fields: [storeId], references: [id])
  category Category @relation(fields: [categoryId], references: [id])
}

model Image {
  id String @id @default(uuid()) @map("_id") @db.String
  productId String @db.String()
  createdAt DateTime @default(now())
  url String
  updatedAt DateTime @updatedAt
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Order {
  id String @id @default(uuid()) @map("_id") @db.String
  storeId String @db.String()
  isPaid Boolean @default(false)
  phone String @default("")
  address String @default("")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orderItems OrderItem[]
  store Store @relation(fields: [storeId], references: [id], onDelete: Cascade)
}

model OrderItem {
  id String @id @default(uuid()) @map("_id") @db.String
  orderId String @db.String()
  productId String @db.String()

  product Product @relation(fields: [productId], references: [id])
  order Order @relation(fields: [orderId], references: [id])
}
```
