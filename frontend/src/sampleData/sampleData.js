export const UserSampleData = [
    {
        id:"usd_1",
        firstName: 'John',
        lastName: 'Doe',
        address_1: '123 Main St',
        address_2: 'Apt 4',
        state: 'California',
        postalCode: 12345,
        phoneNumber: 1234567890,
        email: 'john.doe@example.com',
        password: 'password123',
        refreshTokens: [],
        orders: [
          "osd_1","osd_3"
        ]
      },
      {
        id:"usd_2",
        firstName: 'Jane',
        lastName: 'Smith',
        address_1: '456 Elm St',
        address_2: 'Unit 10',
        state: 'New York',
        postalCode: 67890,
        phoneNumber: 9876543210,
        email: 'jane.smith@example.com',
        password: 'abc123',
        refreshTokens: [],
        orders: [
          "osd_2"
        ]
      },
      {
        id:"usd_3",
        firstName: 'Alice',
        lastName: 'Johnson',
        address_1: '789 Oak Ave',
        address_2: '',
        state: 'Texas',
        postalCode: 54321,
        phoneNumber: 2468135790,
        email: 'alice.johnson@example.com',
        password: 'qwerty',
        refreshTokens: [],
        orders: [
          "osd_5"
        ]
      },
      {
        id:"usd_4",
        firstName: 'Bob',
        lastName: 'Anderson',
        address_1: '321 Pine Rd',
        address_2: '',
        state: 'Florida',
        postalCode: 13579,
        phoneNumber: 3698521470,
        email: 'bob.anderson@example.com',
        password: 'pass123',
        refreshTokens: [],
        orders: [
          "osd_4"
        ]
      },
      {
        id:"usd_5",
        firstName: 'Emily',
        lastName: 'Davis',
        address_1: '987 Cedar Ln',
        address_2: 'Suite 5',
        state: 'California',
        postalCode: 24680,
        phoneNumber: 7852140369,
        email: 'emily.davis@example.com',
        password: 'hello123',
        refreshTokens: [],
        orders: [] // Array of order references
      }
      
]

export const OrderSampleData = [
  {
    id:"osd_1",
    items: [
      {
        item: 'product_id_1',
        item_price: 10.99,
        total_item_price: 21.98,
        item_Code: 'ABC123',
        quantity: 2,
      },
      // Add more items as needed
    ],
    final_cost: 21.98,
    ordered_On: new Date(),
    ordered_by: "usd_1",
    delivery_address: '123 Main St, City, State, Country',
  },
  {
    id:"osd_2",
    items: [
      {
        item: 'product_id_2',
        item_price: 5.99,
        total_item_price: 35.94,
        item_Code: 'DEF456',
        quantity: 6,
      },
      // Add more items as needed
    ],
    final_cost: 35.94,
    ordered_On: new Date(),
    ordered_by: "usd_2",
    delivery_address: '456 Elm St, City, State, Country',
  },
  {
    id:"osd_3",
    items: [
      {
        item: 'product_id_3',
        item_price: 8.99,
        total_item_price: 89.90,
        item_Code: 'GHI789',
        quantity: 10,
      },
      // Add more items as needed
    ],
    final_cost: 89.90,
    ordered_On: new Date(),
    ordered_by: "usd_1",
    delivery_address: '789 Oak Ave, City, State, Country',
  },
  {
    id:"osd_4",
    items: [
      {
        item: 'product_id_4',
        item_price: 14.99,
        total_item_price: 74.95,
        item_Code: 'JKL012',
        quantity: 5,
      },
      // Add more items as needed
    ],
    final_cost: 74.95,
    ordered_On: new Date(),
    ordered_by: "usd_4",
    delivery_address: '987 Cedar Ln, City, State, Country',
  },
  {
    id:"osd_5",
    items: [
      {
        item: 'product_id_5',
        item_price: 9.99,
        total_item_price: 19.98,
        item_Code: 'MNO345',
        quantity: 2,
      },
      // Add more items as needed
    ],
    final_cost: 19.98,
    ordered_On: new Date(),
    ordered_by: "usd_3",
    delivery_address: '654 Elm St, City, State, Country',
  }    
]

export const ReviewSampleData = [
  {
    id:"rsd_1",
    occation: 'Birthday',
    review: 'Great service and delicious food. Highly recommended!',
    rating: 5,
    from: 'California',
    posted_On: new Date('2023-06-21T08:00:00Z'),
    posted_By: 'John',
    user_Id: "usd_1",
  },
  {
    id:"rsd_2",
    occation: 'Anniversary',
    review: 'We had an amazing experience. The staff was friendly and attentive.',
    rating: 4,
    from: 'New York',
    posted_On: new Date('2023-06-20T12:30:00Z'),
    posted_By: 'Jane',
    user_Id: "usd_2"
  },
  {
    id:"rsd_3",
    occation: 'Graduation',
    review: 'The food was excellent and the ambiance was perfect for our celebration.',
    rating: 4.5,
    from: 'Texas',
    posted_On: new Date('2023-06-19T18:45:00Z'),
    posted_By: 'Alice',
    user_Id: "usd_3"
  },
  {
    id:"rsd_4",
    occation: 'Family Gathering',
    review: 'We had a wonderful time. The staff was courteous and the food was delicious.',
    rating: 4,
    from: 'Florida',
    posted_On: new Date('2023-06-18T09:15:00Z'),
    posted_By: 'Bob',
    user_Id: "usd_4"
  },
  {
    id:"rsd_5",
    occation: 'Date Night',
    review: 'Amazing experience. The service was impeccable and the food exceeded our expectations.',
    rating: 5,
    from: 'California',
    posted_On: new Date('2023-06-17T20:00:00Z'),
    posted_By: 'Emily',
    user_Id: "usd_5",
  }
]

export const ProductSampleData = [
  {
    
    id:"psd_1",
    item_name: 'Chocolate Cake',
    description: 'Rich and decadent chocolate cake',
    category: 'cake',
    img_Url: ['https://example.com/chocolate-cake.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [
      "rsd_1"
    ], // Array of review references
  },
  {
    id:"psd_2",
    item_name: 'Sugar Cookies',
    description: 'Delicious homemade sugar cookies',
    category: 'cookie',
    img_Url: ['https://example.com/sugar-cookies.jpg'],
    item_code: [
      {
        weight: '200g',
        code: 'SC-200',
        price: 10.99,
      },
      // Add more item codes as needed
    ],
    reviews: [
      "rsd_2",
      "rsd_3",
    ], // Array of review references
  },
  {
    id:"psd_3",
    item_name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread with a crispy crust',
    category: 'bread',
    img_Url: ['https://example.com/sourdough-bread.jpg'],
    item_code: [
      {
        weight: '1kg',
        code: 'SB-1000',
        price: 8.99,
      },
      // Add more item codes as needed
    ],
    reviews: [
      "rsd_4",
      "rsd_5"
    ], // Array of review references
  },
  {
    id:"psd_4",
    item_name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese with a sharp flavor',
    category: 'cake',
    img_Url: ['https://example.com/cheddar-cheese.jpg'],
    item_code: [
      {
        weight: '250g',
        code: 'CC-250',
        price: 6.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_5",
    item_name: 'Red Velvet Cake',
    description: 'Classic red velvet cake with cream cheese frosting',
    category: 'cake',
    img_Url: ['https://example.com/red-velvet-cake.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_6",
    item_name: 'Chocolate Chip Cookies',
    description: 'Homemade cookies with chocolate chips',
    category: 'cookie',
    img_Url: ['https://example.com/chocolate-chip-cookies.jpg'],
    item_code: [
      {
        weight: '300g',
        code: 'CCC-300',
        price: 12.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_7",
    item_name: 'Baguette',
    description: 'Traditional French baguette with a crispy crust',
    category: 'bread',
    img_Url: ['https://example.com/baguette.jpg'],
    item_code: [
      {
        weight: '400g',
        code: 'BG-400',
        price: 4.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_8",
    item_name: 'Blueberry Muffins',
    description: 'Freshly baked muffins with juicy blueberries',
    category: 'bread',
    img_Url: ['https://example.com/blueberry-muffins.jpg'],
    item_code: [
      {
        weight: '150g',
        code: 'BM-150',
        price: 6.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_9",
    item_name: 'Butter Croissants',
    description: 'Flaky and buttery croissants',
    category: 'bread',
    img_Url: ['https://example.com/butter-croissants.jpg'],
    item_code: [
      {
        weight: '100g',
        code: 'BC-100',
        price: 3.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_10",
    item_name: 'Oatmeal Raisin Cookies',
    description: 'Cookies made with oats and plump raisins',
    category: 'cookie',
    img_Url: ['https://example.com/oatmeal-raisin-cookies.jpg'],
    item_code: [
      {
        weight: '250g',
        code: 'ORC-250',
        price: 8.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_11",
    item_name: 'Cheesecake',
    description: 'Creamy and indulgent cheesecake with a graham cracker crust',
    category: 'cake',
    img_Url: ['https://example.com/cheesecake.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_12",
    item_name: 'Peanut Butter Cookies',
    description: 'Classic cookies made with creamy peanut butter',
    category: 'cookie',
    img_Url: ['https://example.com/peanut-butter-cookies.jpg'],
    item_code: [
      {
        weight: '200g',
        code: 'PBC-200',
        price: 9.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_13",
    item_name: 'Vanilla Cupcakes',
    description: 'Moist and fluffy vanilla cupcakes with buttercream frosting',
    category: 'cake',
    img_Url: ['https://example.com/vanilla-cupcakes.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_14",
    item_name: 'Chocolate Chunk Brownies',
    description: 'Rich and fudgy brownies with chunks of chocolate',
    category: 'cake',
    img_Url: ['https://example.com/chocolate-chunk-brownies.jpg'],
    item_code: [
      {
        weight: '150g',
        code: 'CCB-150',
        price: 6.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_15",
    item_name: 'Gingerbread Cookies',
    description: 'Spiced cookies with a hint of ginger and molasses',
    category: 'cookie',
    img_Url: ['https://example.com/gingerbread-cookies.jpg'],
    item_code: [
      {
        weight: '180g',
        code: 'GC-180',
        price: 7.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_16",
    item_name: 'Multigrain Bread',
    description: 'Healthy and nutritious bread made with a variety of grains',
    category: 'bread',
    img_Url: ['https://example.com/multigrain-bread.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'MB-500',
        price: 6.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_17",
    item_name: 'Ice Cream Cake',
    description: 'Delicious cake layered with ice cream and toppings',
    category: 'cake',
    img_Url: ['https://example.com/ice-cream-cake.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_18",
    item_name: 'Macarons',
    description: 'Colorful and delicate French macarons in various flavors',
    category: 'cookie',
    img_Url: ['https://example.com/macarons.jpg'],
    item_code: [
      {
        weight: '20g',
        code: 'MC-20',
        price: 2.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_19",
    item_name: 'Cinnamon Raisin Bread',
    description: 'Freshly baked bread with swirls of cinnamon and raisins',
    category: 'bread',
    img_Url: ['https://example.com/cinnamon-raisin-bread.jpg'],
    item_code: [
      {
        weight: '400g',
        code: 'CRB-400',
        price: 5.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
  {
    id:"psd_20",
    item_name: 'Fruit Tart',
    description: 'Buttery pastry crust filled with custard and topped with fresh fruits',
    category: 'cake',
    img_Url: ['https://example.com/fruit-tart.jpg'],
    item_code: [
      {
        weight: '500g',
        code: 'C0',
        price: 9.99,
      },{
        weight: '1kg',
        code: 'C1',
        price: 19.99,
      },{
        weight: '1.5kg',
        code: 'C2',
        price: 29.99,
      },{
        weight: '2kg',
        code: 'C3',
        price: 39.99,
      },
      // Add more item codes as needed
    ],
    reviews: [], // Array of review references
  },
]