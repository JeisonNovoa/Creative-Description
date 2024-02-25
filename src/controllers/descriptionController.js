const { analyzeWithOpenAI } = require("../services/openaiService");

exports.generateProductDescription = async (req, res, next) => {
  try {
    const productDescriptionHTML = req.body;

    let prompt = `Descripción del Producto: ${productDescriptionHTML}

    Basado en la descripción proporcionada, realiza lo siguiente:
    
    1. Identifica y describe el tipo de producto.
    2. Determina las posibles necesidades y deseos del cliente ideal para este tipo de producto.
    3. Selecciona el estilo de escritura más adecuado (informal, técnico, persuasivo) para este producto y público objetivo.
    4. Proporciona instrucciones específicas sobre cómo debería ser la descripción para maximizar el atractivo del producto, incluyendo aspectos clave a destacar.
    
    Genera una descripción creativa y única del producto que cumpla con los siguientes criterios:
    
    - Sea altamente relevante y detallada para el tipo de producto identificado.
    - Hable directamente a las necesidades y deseos del cliente ideal.
    - Utilice el estilo de escritura seleccionado para enganchar al público objetivo.
    - Destaque entre la competencia, enfocándose en características únicas o ventajas del producto.
    
    La descripción generada debe ser adecuada para su uso directo en un ecommerce, proporcionando a los clientes toda la información necesaria para tomar una decisión de compra informada. Todo esto debe ser devuelto en formato HTML, siguiendo la estructura y clases proporcionadas. Puedes modificar, agregar o quitar elementos de la lista ('li') según sea necesario para mejorar la descripción, pero asegúrate de no introducir nuevos elementos o clases que no estén presentes en la estructura original tampoco cambies los datos de la imagen.`;

    const response = await analyzeWithOpenAI(prompt);

    if (response && response.choices && response.choices.length > 0) {
      const enhancedDescriptionHTML = response.choices[0].message.content;
      const startIndex = enhancedDescriptionHTML.indexOf(
        '<div className="description">'
      );
      const endIndex = enhancedDescriptionHTML.lastIndexOf("</div>");
      const cleanedHTML = enhancedDescriptionHTML.substring(
        startIndex,
        endIndex
      );
      res.status(200).header("Content-Type", "text/html").send(cleanedHTML);
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
