require("dotenv").config();
const express = require("express");
const descriptionRoutes = require("./routes/descriptionRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Configuración para analizar solicitudes con formato JSON y URL codificadas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/creativeDescription", descriptionRoutes);

// Manejador de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
