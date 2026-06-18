const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const parseRequiredPrice = (price) => {
  const finalPrice = Number(price);

  if (!Number.isFinite(finalPrice) || finalPrice <= 0) {
    throw new Error("Valid product price is required");
  }

  return finalPrice;
};

const parseStock = (stock) => {
  const finalStock = Number(stock);

  if (!Number.isFinite(finalStock) || finalStock < 0) {
    throw new Error("Valid product stock is required");
  }

  return finalStock;
};

const getOrCreateSellerProfile = async (userId) => {
  let sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId },
  });

  if (!sellerProfile) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    sellerProfile = await prisma.sellerProfile.create({
      data: {
        userId,
        businessName: user.fullName,
        phoneNumber: user.phone || "",
      },
    });
  }

  return sellerProfile;
};

exports.createOrUpdateSellerProfile = async (userId, payload) => {
  const existingProfile = await prisma.sellerProfile.findUnique({
    where: { userId },
  });

  const data = {
    businessName: payload.businessName,
    businessAddress: payload.businessAddress,
    phoneNumber: payload.phoneNumber,
    city: payload.city,
    storeDescription: payload.storeDescription,
    storeLogo: payload.storeLogo,
  };

  if (existingProfile) {
    return prisma.sellerProfile.update({
      where: { userId },
      data,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            username: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });
  }

  return prisma.sellerProfile.create({
    data: {
      userId,
      ...data,
    },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          profileImageUrl: true,
        },
      },
    },
  });
};

exports.getMySellerProfile = async (userId) => {
  const sellerProfile = await prisma.sellerProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          phone: true,
          profileImageUrl: true,
        },
      },
      products: {
        include: {
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return sellerProfile;
};

exports.createProduct = async (userId, payload = {}) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  const {
    title,
    description,
    category,
    status,
    price,
    stock,
    location,
    breed,
    age,
    gender,
    vaccinated,
    brand,
    weight,
    size,
    sku,
    images,
  } = payload;

  if (!title || !category || price === undefined || price === "") {
    throw new Error("Title, category and price are required");
  }

  const finalPrice = parseRequiredPrice(price);
  const finalStock = stock === undefined || stock === "" ? 0 : parseStock(stock);

  const product = await prisma.marketplaceProduct.create({
    data: {
      seller: {
        connect: {
          id: sellerProfile.id,
        },
      },
      title,
      description,
      category,
      status: status || "ACTIVE",
      price: finalPrice,
      stock: finalStock,
      location,
      breed,
      age,
      gender,
      vaccinated,
      brand,
      weight,
      size,
      sku,
      images: {
        create:
          Array.isArray(images) && images.length > 0
            ? images.map((img) => ({
                publicUrl: img.publicUrl,
                publicId: img.publicId,
              }))
            : [],
      },
    },
    include: {
      images: true,
      seller: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profileImageUrl: true,
            },
          },
        },
      },
    },
  });

  return product;
};

exports.getMyProducts = async (userId) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  return prisma.marketplaceProduct.findMany({
    where: {
      sellerId: sellerProfile.id,
      status: {
        not: "ARCHIVED",
      },
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.updateProduct = async (userId, productId, payload = {}) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  const product = await prisma.marketplaceProduct.findFirst({
    where: {
      id: productId,
      sellerId: sellerProfile.id,
    },
  });

  if (!product) {
    throw new Error("Product not found or not allowed");
  }

  const data = {
    title: payload.title,
    description: payload.description,
    category: payload.category,
    status: payload.status,
    price:
      payload.price !== undefined && payload.price !== ""
        ? parseRequiredPrice(payload.price)
        : undefined,
    stock:
      payload.stock !== undefined && payload.stock !== ""
        ? parseStock(payload.stock)
        : undefined,
    location: payload.location,
    breed: payload.breed,
    age: payload.age,
    gender: payload.gender,
    vaccinated: payload.vaccinated,
    brand: payload.brand,
    weight: payload.weight,
    size: payload.size,
    sku: payload.sku,
  };

  if (Array.isArray(payload.images) && payload.images.length > 0) {
    data.images = {
      deleteMany: {},
      create: payload.images.map((img) => ({
        publicUrl: img.publicUrl,
        publicId: img.publicId,
      })),
    };
  }

  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data,
    include: {
      images: true,
    },
  });
};

exports.deleteProduct = async (userId, productId) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  const product = await prisma.marketplaceProduct.findFirst({
    where: {
      id: productId,
      sellerId: sellerProfile.id,
    },
  });

  if (!product) {
    throw new Error("Product not found or not allowed");
  }

  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data: {
      status: "ARCHIVED",
    },
  });
};

exports.updateProductStock = async (userId, productId, stock) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  const product = await prisma.marketplaceProduct.findFirst({
    where: {
      id: productId,
      sellerId: sellerProfile.id,
    },
  });

  if (!product) {
    throw new Error("Product not found or not allowed");
  }

  const finalStock = Number(stock);

  return prisma.marketplaceProduct.update({
    where: { id: productId },
    data: {
      stock: finalStock,
      status: finalStock <= 0 ? "SOLD_OUT" : "ACTIVE",
    },
    include: {
      images: true,
    },
  });
};

exports.getSellerOrders = async (userId) => {
  const sellerProfile = await getOrCreateSellerProfile(userId);

  return prisma.marketplaceOrder.findMany({
    where: {
      sellerId: sellerProfile.id,
    },
    include: {
      buyer: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
      items: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
