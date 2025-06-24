/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clean existing data (optional - remove if you want to keep existing data)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.size.deleteMany();
  await prisma.billboard.deleteMany();
  await prisma.store.deleteMany();

  // Create Stores
  const store1 = await prisma.store.create({
    data: {
      name: "Fashion Hub",
      userId: "user_2ysby1Oi9MOX9cPEu9Klk5JToA9", // Replace with your actual Clerk user ID
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: "Tech World",
      userId: "user_2ysby1Oi9MOX9cPEu9Klk5JToA9", // Replace with your actual Clerk user ID
    },
  });

  const store3 = await prisma.store.create({
    data: {
      name: "Home & Garden",
      userId: "user_2ysby1Oi9MOX9cPEu9Klk5JToA9", // Replace with your actual Clerk user ID
    },
  });

  console.log("✅ Created stores");

  // Create Billboards for Fashion Hub
  const billboard1 = await prisma.billboard.create({
    data: {
      label: "Summer Collection 2024",
      imageUrl:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
      storeId: store1.id,
    },
  });

  const billboard2 = await prisma.billboard.create({
    data: {
      label: "Winter Sale",
      imageUrl:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop",
      storeId: store1.id,
    },
  });

  // Create Billboards for Tech World
  const billboard3 = await prisma.billboard.create({
    data: {
      label: "Latest Gadgets",
      imageUrl:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop",
      storeId: store2.id,
    },
  });

  // Create Billboards for Home & Garden
  const billboard4 = await prisma.billboard.create({
    data: {
      label: "Garden Essentials",
      imageUrl:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop",
      storeId: store3.id,
    },
  });

  console.log("✅ Created billboards");

  // Create Categories
  const categories = await Promise.all([
    // Fashion Hub Categories
    prisma.category.create({
      data: {
        name: "Men's Clothing",
        storeId: store1.id,
        billboardId: billboard1.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Women's Clothing",
        storeId: store1.id,
        billboardId: billboard1.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Accessories",
        storeId: store1.id,
        billboardId: billboard2.id,
      },
    }),
    // Tech World Categories
    prisma.category.create({
      data: {
        name: "Smartphones",
        storeId: store2.id,
        billboardId: billboard3.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Laptops",
        storeId: store2.id,
        billboardId: billboard3.id,
      },
    }),
    // Home & Garden Categories
    prisma.category.create({
      data: {
        name: "Furniture",
        storeId: store3.id,
        billboardId: billboard4.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Plants",
        storeId: store3.id,
        billboardId: billboard4.id,
      },
    }),
  ]);

  console.log("✅ Created categories");

  // Create Sizes
  const sizes = await Promise.all([
    // Fashion sizes
    prisma.size.create({
      data: {
        name: "Extra Small",
        value: "XS",
        storeId: store1.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Small",
        value: "S",
        storeId: store1.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Medium",
        value: "M",
        storeId: store1.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Large",
        value: "L",
        storeId: store1.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Extra Large",
        value: "XL",
        storeId: store1.id,
      },
    }),
    // Tech sizes
    prisma.size.create({
      data: {
        name: "64GB",
        value: "64GB",
        storeId: store2.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "128GB",
        value: "128GB",
        storeId: store2.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "256GB",
        value: "256GB",
        storeId: store2.id,
      },
    }),
    // Home sizes
    prisma.size.create({
      data: {
        name: "Small",
        value: "SM",
        storeId: store3.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Medium",
        value: "MD",
        storeId: store3.id,
      },
    }),
    prisma.size.create({
      data: {
        name: "Large",
        value: "LG",
        storeId: store3.id,
      },
    }),
  ]);

  console.log("✅ Created sizes");

  // Create Products with Images
  const products = [];

  // Fashion Hub Products
  const fashionProducts = [
    {
      name: "Classic White T-Shirt",
      price: 29.99,
      categoryId: categories[0].id, // Men's Clothing
      sizeId: sizes[2].id, // Medium
      storeId: store1.id,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop",
      ],
    },
    {
      name: "Summer Dress",
      price: 79.99,
      categoryId: categories[1].id, // Women's Clothing
      sizeId: sizes[1].id, // Small
      storeId: store1.id,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop",
      ],
    },
    {
      name: "Leather Wallet",
      price: 49.99,
      categoryId: categories[2].id, // Accessories
      sizeId: sizes[0].id, // XS
      storeId: store1.id,
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      ],
    },
  ];

  // Tech World Products
  const techProducts = [
    {
      name: "iPhone 15 Pro",
      price: 999.99,
      categoryId: categories[3].id, // Smartphones
      sizeId: sizes[6].id, // 128GB
      storeId: store2.id,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      ],
    },
    {
      name: 'MacBook Pro 16"',
      price: 2499.99,
      categoryId: categories[4].id, // Laptops
      sizeId: sizes[7].id, // 256GB
      storeId: store2.id,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
      ],
    },
  ];

  // Home & Garden Products
  const homeProducts = [
    {
      name: "Modern Sofa",
      price: 899.99,
      categoryId: categories[5].id, // Furniture
      sizeId: sizes[10].id, // Large
      storeId: store3.id,
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
      ],
    },
    {
      name: "Monstera Plant",
      price: 39.99,
      categoryId: categories[6].id, // Plants
      sizeId: sizes[8].id, // Small
      storeId: store3.id,
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1545241047-6083a3684587?w=500&h=500&fit=crop",
      ],
    },
  ];

  // Create all products
  for (const productData of [
    ...fashionProducts,
    ...techProducts,
    ...homeProducts,
  ]) {
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        price: productData.price,
        categoryId: productData.categoryId,
        sizeId: productData.sizeId,
        storeId: productData.storeId,
        isFeatured: productData.isFeatured,
        isArchived: false,
      },
    });

    // Create images for each product
    for (const imageUrl of productData.images) {
      await prisma.image.create({
        data: {
          url: imageUrl,
          productId: product.id,
        },
      });
    }

    products.push(product);
  }

  console.log("✅ Created products with images");

  // Create Mock Orders
  const orders = [];

  for (let i = 0; i < 10; i++) {
    const randomStore = [store1, store2, store3][Math.floor(Math.random() * 3)];
    const storeProducts = randomStore
      ? products.filter(p => p.storeId === randomStore.id)
      : [];

    if (randomStore && storeProducts.length) {
      const order = await prisma.order.create({
        data: {
          storeId: randomStore.id,
          isPaid: Math.random() > 0.3, // 70% paid orders
          phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
          address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State ${Math.floor(Math.random() * 90000) + 10000}`,
          createdAt: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
          ), // Random date within last 30 days
        },
      });

      // Add 1-3 random products to each order
      const numItems = Math.floor(Math.random() * 3) + 1;
      const selectedProducts = storeProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, numItems);

      for (const product of selectedProducts) {
        await prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
          },
        });
      }

      orders.push(order);
    }
  }

  console.log("✅ Created mock orders");

  console.log("🎉 Database seeding completed!");
  console.log(`Created:`);
  console.log(`- ${3} stores`);
  console.log(`- ${4} billboards`);
  console.log(`- ${categories.length} categories`);
  console.log(`- ${sizes.length} sizes`);
  console.log(`- ${products.length} products`);
  console.log(`- ${orders.length} orders`);
}

main()
  .catch(e => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
