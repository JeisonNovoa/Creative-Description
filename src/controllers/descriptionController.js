const { analyzeWithOpenAI } = require("../services/openaiService");

exports.generateProductDescription = async (req, res, next) => {
  try {
    const { productName, productDescription } = req.body;

    let prompt = `Nombre del producto: ${productName}\n 
    Descripción del Producto: ${productDescription}

    Actúa como el mejor mejorador de descripciones de productos para un ecommerce. 
    Imagina que tienes que mejorar la descripción de un producto basándote en el nombre y la 
    descripción inicial proporcionada. Tu objetivo es enriquecer la descripción existente, 
    haciéndola más atractiva y persuasiva para los clientes potenciales. 
    Considera añadir detalles relevantes, destacar beneficios clave, 
    utilizar un lenguaje convincente y asegurarte de que la descripción sea clara y concisa. 
    También, ten en cuenta el público objetivo y el contexto del producto. Por ejemplo, 
    si el producto es una aspiradora, podrías resaltar su potencia de succión, 
    su diseño ergonómico para facilitar la limpieza y cómo puede mejorar la calidad 
    del aire en el hogar. Antes de darme la respuesta, hazme cualquier pregunta para que 
    puedas darme la mejor respuesta posible. Importante responder con la descripcion mejorada con lo que tepase como descripcion
    si tienes que inventar algo que no se especificó hazlo, incluyendo el publico objetivo entre otros aspectos,
    recuerda que el precio no se especifica en la descripcion, ya que eso lo especifico en otro lado.Todo esto debe ser devuelto en un campo de texto sin ningún formato adicional.`;

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
