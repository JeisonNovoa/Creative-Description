const { analyzeWithOpenAI } = require("../services/openaiService");

exports.generateProductDescription = async (req, res, next) => {
  try {
    const { productName, productDescription } = req.body;

    let prompt = `Nombre del producto: ${productName}\n 
Descripción del Producto: ${productDescription}

Actúa como el mejor mejorador de descripciones de productos para un ecommerce. 
Tu objetivo es mejorar la descripción existente del producto basándote en el nombre y la descripción inicial proporcionada. 
Enriquece la descripción, haciéndola más atractiva y persuasiva para los clientes potenciales, incluso si faltan detalles en la descripción inicial. 
Considera añadir detalles relevantes, destacar beneficios clave, utilizar un lenguaje convincente y asegurarte de que la descripción sea clara y concisa. 
Ten en cuenta el público objetivo y el contexto del producto. 

Por favor, proporciona una descripción mejorada para el producto "${productName}" basándote en la información proporcionada y cualquier detalle adicional que creas relevante para hacerla más atractiva para los clientes. 
Recuerda que la descripción debe ser persuasiva y clara, independientemente de cualquier información que pueda faltar inicialmente.`;

    const response = await analyzeWithOpenAI(prompt);

    if (response && response.choices && response.choices.length > 0) {
      const enhancedDescription = response.choices[0].message.content;
      res.status(200).json({ description: enhancedDescription });
    } else {
      console.error("Unexpected response from OpenAI API:", response);
      res.status(500).json({
        message: "Error processing the request",
        error: "Unexpected response from the API",
      });
    }
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      message: "Error processing the request",
      error: error.message,
    });
  }
};
