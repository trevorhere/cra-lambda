// productRead.js

// Load the server
// Load the Product Model
import Product from './productModel'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  console.log('test test test')
  
  try {
    // Use Product.Model to find all products
    const products = await Product.find(),
          response = {
            msg: "Products successfully found",
            data: products
          }
    
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
    
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}

