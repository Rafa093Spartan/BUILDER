.login-page {
  --background: #fff7e6;
  background-color: var(--background);
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

/* Fondo con iconos herramientas */
.login-page::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('https://i.imgur.com/zAfcV6r.png'); /* Imagen repetitiva con herramientas - subir una propia o crear patrón */
  background-repeat: repeat;
  background-position: center;
  opacity: 0.1;
  z-index: 0;
}

.ion-padding {
  position: relative;
  z-index: 1;
  padding: 40px 20px 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 50px;
}

.logo {
  font-weight: 900;
  font-size: 48px;
  color: #f18326;
  margin: 0;
  letter-spacing: -2px;
  font-family: 'Arial Black', sans-serif;
}

.subtitle {
  font-weight: 500;
  font-size: 18px;
  color: #222;
  margin-top: 6px;
}

/* Formulario */
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
}

.login-input {
  --padding-start: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 36px;
  font-size: 16px;
  color: #333;
  background: #fff;
  outline: none;
  transition: border-color 0.3s ease;
}

.login-input:focus {
  border-color: #f18326;
}

/* Botón Entrar */
.btn-enter {
  margin-top: 20px;
  background-color: #f18326;
  border-radius: 20px;
  font-weight: 600;
  font-size: 18px;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 0;
  --padding-end: 0;
  box-shadow: 2px 2px 5px rgba(241, 131, 38, 0.5);
}

/* Mensajes de error */
.error-text {
  margin: 10px 0;
  font-weight: bold;
  color: #b00020 !important;
}

/* Toggle Entrar / Registrar */
.toggle-register {
  display: flex;
  justify-content: center;
  margin: 40px 0 20px;
  gap: 15px;
}

.btn-toggle {
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background-color: #f18326;
  color: white;
  box-shadow: 2px 2px 5px rgba(241, 131, 38, 0.5);
  transition: background-color 0.3s ease;
}

.btn-toggle[disabled] {
  background-color: #ddd;
  color: #999;
  cursor: default;
  box-shadow: none;
}

.btn-toggle.active {
  background-color: #f18326;
  color: white;
}

/* Texto "iniciar otro servicio" */
.other-service {
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  color: #222;
  margin-bottom: 20px;
}

/* Botones sociales */
.social-buttons {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.btn-social {
  border: none;
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 1px 1px 5px rgba(241, 131, 38, 0.3);
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-social img {
  width: 24px;
  height: 24px;
}
