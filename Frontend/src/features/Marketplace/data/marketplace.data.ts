export const categories = [
    "All Categories",
    "Pet Food",
    "Toys & Accessories",
    "Health & Medicine",
    "Grooming",
    "Supplements",
    "Beds & Furniture",
    "Collars & Leashes",
    "Training & Behavior",
];

export const products = Array.from({ length: 100 }, (_, index) => {
    const categories = [
        "Pet Food",
        "Toys & Accessories",
        "Supplements",
        "Beds & Furniture",
        "Collars & Leashes",
        "Grooming",
        "Health & Medicine",
        "Training",
        "Travel",
        "Cat Supplies",
    ];

    const productNames = [
        "Premium Dog Food",
        "Interactive Pet Toy",
        "Vitamin Supplement",
        "Luxury Pet Bed",
        "Adjustable Collar",
        "Pet Shampoo",
        "Dental Care Kit",
        "Training Clicker",
        "Travel Carrier",
        "Cat Scratching Post",
    ];

    return {
        id: index + 1,
        name: `${productNames[index % productNames.length]} ${index + 1}`,
        category: categories[index % categories.length],
        price: +(Math.random() * 50 + 5).toFixed(2),
        oldPrice: +(Math.random() * 60 + 10).toFixed(2),
        rating: +(Math.random() * 1 + 4).toFixed(1), // 4.0 - 5.0
        reviews: Math.floor(Math.random() * 500) + 50,
        image: `https://picsum.photos/seed/pet${index + 1}/600/600`,
        badge:
            index % 5 === 0
                ? "Best Seller"
                : index % 3 === 0
                    ? "20% OFF"
                    : "",
    };
});

export const benefits = [
    {
        title: "100% Genuine Products",
        subtitle: "Trusted pet brands",
    },

    {
        title: "Easy Returns",
        subtitle: "Within 7 days",
    },

    {
        title: "Fast Delivery",
        subtitle: "Quick & reliable",
    },

    {
        title: "Secure Payments",
        subtitle: "100% protected",
    },
];