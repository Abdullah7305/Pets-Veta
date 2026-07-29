const prisma = require("../config/prisma");

exports.getMarketplaceProducts = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const category = query.category || "";
  const location = query.location || "";

  const where = {
    status: "ACTIVE",
    ...(search && {
      title: {
        contains: search,
        mode: "insensitive",
      },
    }),
    ...(category &&
      category !== "All" && {
        category,
      }),
    ...(location &&
      location !== "All" && {
        location: {
          contains: location,
          mode: "insensitive",
        },
      }),
  };

  const [products, total] = await Promise.all([
    prisma.marketplaceProduct.findMany({
      where,
      skip,
      take: limit,
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
        savedBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.marketplaceProduct.count({ where }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.getMarketplaceProductById = async (productId) => {
  const product = await prisma.marketplaceProduct.findFirst({
    where: {
      id: productId,
      status: {
        not: "ARCHIVED",
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
              phone: true,
              profileImageUrl: true,
            },
          },
        },
      },
      savedBy: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

exports.saveListing = async (userId, productId) => {
  if (!userId) {
    throw new Error("Unauthorized user");
  }

  const product = await prisma.marketplaceProduct.findFirst({
    where: {
      id: productId,
      status: "ACTIVE",
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return prisma.savedListing.upsert({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    update: {},
    create: {
      userId,
      productId,
    },
  });
};

exports.removeSavedListing = async (userId, productId) => {
  if (!userId) {
    throw new Error("Unauthorized user");
  }

  const saved = await prisma.savedListing.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!saved) {
    throw new Error("Saved listing not found");
  }

  return prisma.savedListing.delete({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });
};

exports.getSavedListings = async (userId) => {
  if (!userId) {
    throw new Error("Unauthorized user");
  }

  return prisma.savedListing.findMany({
    where: {
      userId,
    },
    include: {
      product: {
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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};