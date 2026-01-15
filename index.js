import { registerRootComponent } from "expo"; // Envuelve la app en el runtime de Expo
import App from "./App"; // Componente raíz definido en App.tsx

// Registra la app para que se cargue correctamente en Expo y en builds nativos
registerRootComponent(App);
