# Mango's Pet Shop - Petshop Checkout

Aplicación móvil para registrar ventas de alimentos y snacks para perros y gatos. Permite seleccionar un producto del catálogo, indicar la cantidad, aplicar un descuento y calcular el cambio o el saldo pendiente del cliente.

La aplicación está construida con **Ionic**, **Angular**, **TypeScript** y **Capacitor**, por lo que puede ejecutarse en el navegador y compilarse para Android.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Flujo de la aplicación](#flujo-de-la-aplicación)
- [Desarrollo paso a paso](#desarrollo-paso-a-paso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Pruebas y calidad](#pruebas-y-calidad)
- [Compilación para producción](#compilación-para-producción)
- [Ejecución en Android](#ejecución-en-android)
- [Capturas de pantalla](#capturas-de-pantalla)
- [Limitaciones actuales](#limitaciones-actuales)

## Funcionalidades

- Pantalla de bienvenida de Mango's Pet Shop.
- Navegación mediante pestañas:
  - **Inicio**: presentación de la aplicación y acceso al proceso de compra.
  - **Compra**: selección de categoría, producto y cantidad.
  - **Pago**: resumen de la venta, descuento, dinero recibido y cálculo de cambio o saldo pendiente.
- Catálogo local de productos para perros y gatos.
- Precio unitario asignado automáticamente según el producto seleccionado.
- Validación de campos obligatorios y valores numéricos.
- Cálculo del subtotal, descuento, total final y diferencia pagada.
- Confirmación visual del cobro mediante un mensaje Toast.
- Opción para iniciar una nueva venta.
- Imágenes remotas con imágenes locales de respaldo cuando no están disponibles.

## Tecnologías

- [Angular](https://angular.dev/) 22
- [Ionic Angular](https://ionicframework.com/) 9
- [Capacitor](https://capacitorjs.com/) 8
- TypeScript 6
- RxJS 7
- SCSS
- Vitest
- pnpm

## Requisitos previos

Instala las siguientes herramientas antes de iniciar:

- Node.js compatible con Angular 22.
- pnpm.
- Git.
- Para Android:
  - Android Studio.
  - Android SDK configurado.
  - Java/JDK compatible con la versión de Gradle usada por el proyecto.

Puedes verificar las instalaciones con:

```bash
node --version
pnpm --version
git --version
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd petshop-checkout
   ```

2. Instala las dependencias usando el lockfile del proyecto:

   ```bash
   pnpm install
   ```

3. Si necesitas trabajar con Android, sincroniza los archivos web con el proyecto nativo:

   ```bash
   pnpm exec cap sync android
   ```

## Ejecución en desarrollo

### Navegador

Inicia el servidor de desarrollo:

```bash
pnpm start
```

Después, abre la dirección que muestra Angular CLI, normalmente:

```text
http://localhost:4200
```

También puedes ejecutar el servidor con una configuración explícita:

```bash
pnpm exec ng serve --configuration development
```

### Android

Para ejecutar la aplicación en un dispositivo o emulador Android:

```bash
pnpm build
pnpm exec cap sync android
pnpm exec cap run android
```

Para abrir el proyecto nativo en Android Studio:

```bash
pnpm build
pnpm exec cap sync android
pnpm exec cap open android
```

## Flujo de la aplicación

1. El usuario entra en **Inicio**.
2. Selecciona **Comenzar Compra**.
3. En **Compra**, selecciona la categoría:
   - Perros.
   - Gatos.
4. Selecciona un producto del catálogo.
5. El precio unitario se completa automáticamente.
6. Indica la cantidad y continúa al pago.
7. En **Pago**, revisa el subtotal.
8. Ingresa un descuento entre `0` y `100`.
9. Ingresa el dinero recibido del cliente.
10. La aplicación calcula:
    - El descuento aplicado.
    - El total final.
    - El cambio a entregar, si el pago es suficiente.
    - El saldo pendiente, si el pago es menor al total.
11. Confirma el cobro o inicia una nueva venta.

## Desarrollo paso a paso

### 1. Crear la base del proyecto

Se utiliza la estructura de una aplicación Ionic con Angular y componentes standalone. La configuración principal se encuentra en:

- `angular.json`: compilación, servidor, pruebas y lint.
- `package.json`: dependencias y scripts.
- `capacitor.config.ts`: configuración de la aplicación móvil y pantalla de inicio.

El identificador actual de Capacitor es `io.ionic.starter`. Antes de publicar la aplicación, conviene reemplazarlo por un identificador propio de la aplicación.

### 2. Definir la navegación

La navegación está organizada mediante pestañas:

- `src/app/tabs/tabs.routes.ts`: declara las rutas `tab1`, `tab2` y `tab3`.
- `src/app/tabs/tabs.page.html`: define la barra de navegación inferior.
- `src/app/app.routes.ts`: carga las rutas principales de la aplicación.

Las páginas se cargan de forma diferida con `loadComponent`, reduciendo el código inicial cargado por la aplicación.

### 3. Construir la pantalla de bienvenida

`src/app/tab1/` contiene la pantalla inicial. Su responsabilidad es presentar la marca y llevar al usuario a la pantalla de registro de compra mediante `Router`.

El botón **Comenzar Compra** navega a `/tabs/tab2`.

### 4. Crear el catálogo de productos

El catálogo se define en `src/app/data/products.data.ts` mediante:

```ts
interface ProductItem {
  id: string;
  name: string;
  category: 'perros' | 'gatos';
  price: number;
}
```

Cada producto tiene un identificador, nombre, categoría y precio. La pantalla de compra filtra el catálogo según la categoría seleccionada.

### 5. Implementar el registro de compra

`src/app/tab2/tab2.page.ts` utiliza un formulario reactivo con los siguientes campos:

- Producto.
- Nombre del producto.
- Cantidad.
- Precio unitario.

Al seleccionar un producto, su nombre y precio se cargan automáticamente. Al enviar el formulario, se calcula:

```text
subtotal = cantidad × precio unitario
```

Los datos se envían a `PurchaseService` y el usuario es redirigido a la pantalla de pago.

### 6. Compartir el estado de la compra

`src/app/services/purchase.ts` centraliza la compra actual con un `BehaviorSubject` de RxJS.

El servicio permite:

- Guardar la compra con `setPurchase`.
- Consultar el valor actual con `getPurchase`.
- Observar cambios mediante `currentPurchase$`.
- Limpiar la compra con `clearPurchase`.

Esto permite que las pantallas de compra y pago compartan datos sin utilizar almacenamiento permanente.

### 7. Implementar el cálculo del pago

`src/app/tab3/tab3.page.ts` crea un formulario para:

- Porcentaje de descuento.
- Dinero recibido.

El cálculo se actualiza al cambiar los valores del formulario:

```text
descuento = subtotal × (porcentaje / 100)
total final = subtotal - descuento
diferencia = dinero recibido - total final
```

Si la diferencia es positiva o cero, se muestra el cambio a entregar. Si es negativa, se muestra el saldo pendiente.

### 8. Validar y confirmar el cobro

Los formularios usan `Validators` de Angular para impedir:

- Productos sin seleccionar.
- Cantidades menores que uno.
- Descuentos fuera del rango de `0` a `100`.
- Valores de pago negativos.

Al confirmar un cobro válido, la aplicación muestra un Toast, limpia la compra actual y regresa al flujo de una nueva venta.

## Estructura del proyecto

```text
.
├── android/                    # Proyecto nativo Android generado por Capacitor
├── assets/                     # Icono y splash usados por la aplicación
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   └── products.data.ts
│   │   ├── services/
│   │   │   └── purchase.ts
│   │   ├── tab1/               # Inicio
│   │   ├── tab2/               # Registro de compra
│   │   ├── tab3/               # Pago y cobro
│   │   └── tabs/               # Navegación inferior
│   ├── assets/                 # Imágenes de la interfaz
│   ├── environments/           # Configuración por entorno
│   ├── global.scss             # Estilos globales
│   └── main.ts                 # Punto de entrada
├── capacitor.config.ts
├── angular.json
├── package.json
└── pnpm-lock.yaml
```

## Pruebas y calidad

Ejecuta las pruebas unitarias:

```bash
pnpm test
```

Para ejecutar las pruebas sin modo interactivo:

```bash
pnpm exec ng test --watch=false
```

Ejecuta el lint:

```bash
pnpm lint
```

Las pruebas existentes cubren componentes de la aplicación y el servicio de compras. Cuando se agreguen reglas de negocio nuevas, se recomienda añadir pruebas para los cálculos de subtotal, descuento, cambio y saldo pendiente.

## Compilación para producción

Genera la versión optimizada para producción:

```bash
pnpm build
```

El resultado se genera en la carpeta `www/`, que es la carpeta configurada como `webDir` en Capacitor.

Para actualizar la aplicación Android después de una compilación web:

```bash
pnpm build
pnpm exec cap copy android
pnpm exec cap sync android
```

## Capturas de pantalla

Guarda las imágenes de la aplicación en `docs/screenshots/` y reemplaza los nombres de archivo de esta sección cuando tengas las capturas definitivas.
### ICONO APLICACIÓN


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/69309890-1dab-4e92-9854-dfe485cf7d81" />


### Splash Screen

<img width="560" height="1200" alt="Screenshot_20261014_202020" src="https://github.com/user-attachments/assets/4c1f362d-a9ca-4873-840a-b7d913fc7816" />


### Pantalla de bienvenida


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/3f3bd2df-b5b6-4a5d-8a3a-cc66899621da" />


### Registro de compra


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/b08ec0aa-4845-45e4-bff9-b8cbd386e206" />


### Selección de producto


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/5bfc2e87-cdb0-4e7a-9560-c2da2606cc65" />


### Pantalla de pago


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/72a6340b-4647-4e38-b371-1da9c13e46aa" />
<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/42881c09-7b4c-465c-99de-b19bef752860" />



### Cálculo de cambio o saldo pendiente


<img width="560" height="1200" alt="image" src="https://github.com/user-attachments/assets/f6b25091-adb1-4f6c-bbc7-37a4fbf55aff" />








