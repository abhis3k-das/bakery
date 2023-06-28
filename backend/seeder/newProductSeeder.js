const Product = require('../models/Product');
const mongoose = require("mongoose")
const mongoUrl = "mongodb+srv://abhis3k:v9KTK8NfiKU6qOcx@bakery.ys4rene.mongodb.net/bakery?retryWrites=true&w=majority"
require("dotenv").config()
mongoose
	.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Successfully connected to Bakery")
	})
	.catch((err) => {
		console.log("Failed to conned to Bakery")
	})
const items = [
    { name: "Chocolate Cake", category: "cake" },
    { name: "Cheesecake", category: "cake" },
    { name: "Milk", category: "dairy" },
    { name: "Chocolate Chip Cookie", category: "cookie" },
    { name: "Baguette", category: "bread" }
  ];
  
  console.log(items);
  
const createNewProduct = async(name,category)=>{
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    let code = ["code_01","code_02","code_03","code_04"]
    let weight = ["500gm","1kg","1.5kg","2kg"]
    let weightObject = {}
    let quantityObject ={}
    let priceObject = {}
    for ( let i = 0 ; i < randomNumber ; i++){
        let ind =  Math.floor(Math.random() * code.length);
        weightObject[code[ind]] = weight[ind]
        priceObject[code[ind]] = 100 + Math.random()*100
        quantityObject[code[ind]] = 10 + Math.random()*50
        weight = weight.filter((each)=>each !== weight[ind])
        code = code.filter((each)=>each !== code[ind])
    }
    const newProduct = new Product({
        item_name:name,
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium semper turpis, a porta mauris fermentum eget. Integer ut tincidunt diam, vitae fermentum mauris. Quisque sodales ante at augue suscipit, vel interdum turpis aliquet. Quisque vitae mi iaculis, condimentum dui et, vehicula nunc. Nulla sapien erat, dignissim vel enim ut, condimentum sagittis sapien. Aenean dictum libero vitae diam vehicula iaculis. In congue et arcu sit amet aliquet. Vestibulum finibus tortor vel aliquet dictum. Pellentesque eu neque tincidunt, rhoncus ex at.",
        category:category,
        image: {
            url:'https://res.cloudinary.com/dyiasu9hz/image/upload/v1687861954/bakery/Chocolate%20cake.jpg',
            original_name: 'homePage.jpeg',
            current_filename: 'bakery/Chocolate cake',
        },
        weight: weightObject,
        availability: quantityObject,
        price: priceObject,
    })
    await newProduct.save()
}

for(let i = 0 ; i<5;i++){
    createNewProduct(items[i].name,items[i].category)
}