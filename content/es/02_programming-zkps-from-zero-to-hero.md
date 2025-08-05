---
title: 'Programando ZKPs: De cero a héroe'
date: '2025-07-23'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "programming-zkps-from-zero-to-hero"
images: [../assets/02_combined.png']
summary: "Aprende a escribir y modificar pruebas de conocimiento cero desde cero. Construirás un esquema de firma digital usando compromisos basados en hash, adquiriendo habilidades prácticas e intuición en programación de ZKP. Al final, tendrás todas las herramientas necesarias para implementar cosas como firmas grupales."
---

_Este artículo fue traducido por Gelois, Alex y Yago Pajariño_


_Una introducción práctica para programadores en ejercicio._

¿Sabes por qué las cebras tienen rayas? Una teoría sugiere que funcionan como camuflaje. Al moverse en manada, las rayas confunden al león y le impiden identificar una presa concreta. Para atacar, necesita aislarla del grupo. [^1]

A los humanos también les gusta esconderse en la multitud. Un ejemplo específico es cuando varias personas actúan como una sola bajo un nombre colectivo. Esto se hizo en los Federalist Papers que llevaron a la ratificación de la Constitución de Estados Unidos. Varios individuos escribieron ensayos bajo el seudónimo único "Publius". [^2] Otro ejemplo es Bourbaki, un seudónimo colectivo para un grupo de matemáticos franceses en los años 30. Esto llevó a una reescritura completa de grandes partes de las matemáticas modernas, enfocándose en el rigor y el método axiomático. [^3]


![Bourbaki Congress](../assets/02_bourbaki.png 'Bourbaki Congress')


*_Congreso de Bourbaki en 1938_*

En la era digital, supongamos que estás en un grupo de chat y quieres enviar un mensaje controvertido. Quieres probar que eres uno de sus miembros, sin revelar cuál. ¿Cómo podemos lograr esto en el mundo digital usando criptografía? Podemos usar algo llamado _firmas de grupo_.

Tradicionalmente, las firmas de grupo son bastante complejas desde el punto de vista matemático y difíciles de implementar. Sin embargo, con las Pruebas de Conocimiento Cero (ZKPs), este problema matemático se convierte en una tarea de programación sencilla. Al final de este artículo, serás capaz de programar firmas de grupo por ti mismo.

## Introducción

Esta publicación te mostrará cómo escribir Pruebas de Conocimiento Cero (ZKPs) básicas desde cero.
Al aprender una nueva stack tecnológico, queremos familiarizarnos lo antes posible con el ciclo de editar, compilar y ejecutar. Solo entonces podremos empezar a aprender de nuestra propia experiencia.

Comenzaremos configurando tu entorno, escribiendo un programa simple, realizando la llamada configuración confiable (trusted setup), y luego generando y verificando pruebas de la manera más rápida posible. Después, identificaremos algunas formas de mejorar nuestro programa, implementaremos estas mejoras y las probaremos. A lo largo del proceso, construiremos un modelo mental más claro de las partes involucradas en la programación práctica de Pruebas de Conocimiento Cero (ZKPs). Al final, estarás familiarizado con (una forma de) escribir ZKPs desde cero.

Construiremos paso a paso un esquema de firma simple que te permitirá demostrar que enviaste un mensaje específico. Podrás entender qué hace este fragmento de código y por qué:

```javascript
template SignMessage () {
  signal input identity_secret;
  signal input identity_commitment;
  signal input message;
  signal output signature;

  component identityHasher = Poseidon(1);
  identityHasher.inputs[0] <== identity_secret;
  identity_commitment === identityHasher.out;

  component signatureHasher = Poseidon(2);
  signatureHasher.inputs[0] <== identity_secret;
  signatureHasher.inputs[1] <== message;
  signature <== signatureHasher.out;
}

component main {public [identity_commitment, message]} = SignMessage();
```
También habrás recibido todas las herramientas y técnicas necesarias para modificar esto y soportar el esquema de firmas de grupo mencionado anteriormente.

### Pre-requisitos

Asumimos que eres un ingeniero de software con experiencia práctica en más de un lenguaje de programación y que tienes familiaridad básica con el uso de interfaces de línea de comandos estilo Unix. También asumimos que conoces conceptos como _firmas digitales_, _criptografía de clave pública_ y _funciones hash_. No obstante, iremos presentando sus propiedades relevantes a medida que sean necesarias.

En cuanto a las _Pruebas de Conocimiento Cero_, asumimos que has leído mi publicación anterior, [_Una introducción amigable a Zero Knowledge_](https://zkintro.com/es/articles/friendly-introduction-to-zero-knowledge/). Si no la has leído, aquí haremos un breve repaso de los aspectos más importantes. Para una mejor comprensión, recomendamos leer primero el artículo mencionado. Si ya lo has leído, puedes omitir lo siguiente con seguridad.


### Recapitulazición de ZKPs

Las Pruebas de Conocimiento Cero (ZKPs) son una forma relativamente nueva de criptografía que ha visto aplicaciones más prácticas últimamente. Mientras que la criptografía tradicional nos permite realizar tareas como firmas y cifrado, las ZKPs nos permiten demostrar afirmaciones arbitrarias de manera general.

Además de permitirnos probar afirmaciones arbitrarias, las ZKPs nos brindan dos propiedades clave: privacidad y compresión. Estas también se conocen como conocimiento cero y sucintez, respectivamente. Privacidad significa que podemos probar algo sin revelar ninguna otra información. Compresión significa que la prueba de una afirmación arbitraria mantiene un tamaño aproximadamente constante, sin importar cuán compleja sea la computación que estamos demostrando. Las ZKPs también son de propósito general. En términos generales, esta es la diferencia entre una calculadora, diseñada para una tarea específica, y una computadora, que puede realizar cualquier cálculo.
Dos ejemplos concretos de ZKPs:

- Podemos tomar una tarjeta de identidad digital y demostrar que somos mayores de 18 años  
  - Sin revelar ninguna otra información, como tu nombre completo o dirección  
- Podemos probar que todas las transiciones de estado se han ejecutado correctamente  
  - Por ejemplo, en una blockchain pública, con la prueba resultante siendo muy pequeña  

Podemos programar diversos tipos habituales de ZKPs escribiendo programas especiales llamados circuitos. Esto permite que una parte, llamada demostrador, cree una prueba de alguna afirmación. Otra parte, conocida como verificador, puede entonces verificar esta prueba. Al igual que un programa normal, este programa puede recibir entradas y producir salidas. Para estos programas especiales, podemos especificar si la entrada es privada o pública. Si es privada, significa que solo el demostrador puede ver esta entrada. Programamos circuitos especificando restricciones. Un ejemplo de restricción es "en un rompecabezas de Sudoku, todos los números del 1 al 9 deben usarse exactamente una vez en una fila".

Las ZKPs son relativamente nuevas, pero ya se utilizan mucho en blockchains públicas, por ejemplo, para permitir pagos privados con dinero fungible o para procesar más transacciones de manera más rápida.

Cada día se descubren y desarrollan más aplicaciones. También existen muchas variantes de ZKPs, cada una con sus propios compromisos, y es un área de investigación muy activa. Estas variantes se están desarrollando rápidamente y permiten una mayor eficiencia y otras ventajas.

## Visión general

Vamos a usar Circom y Groth16. Circom es un lenguaje específico de dominio (DSL) para escribir circuitos de ZKP. Groth16 es un sistema de pruebas común y popular. En términos generales, un sistema de pruebas es solo una forma de programar ZKPs. También existen otros DSLs y sistemas de pruebas.

Comenzaremos instalando algunas herramientas y dependencias. Después, avanzaremos en los siguientes pasos aproximados:

- Escribir (write circuit)  
- Compilar (build circuit)  
- Configurar (trusted setup)  
- Probar (generate proof)  
- Verificar (verify proof)
  
Después de haber recorrido este flujo una vez, analizaremos algunos problemas con el enfoque actual. Luego, haremos varias mejoras incrementales, hasta llegar al esquema de firma mencionado arriba. A lo largo del camino, explicaremos los conceptos y la sintaxis necesarios.

Al final de cada sección, también incluiremos algunos ejercicios simples para comprobar tu comprensión. Se recomienda realizar estos ejercicios. Al final del artículo, incluiremos además una lista de problemas. Estos problemas son opcionales y requieren un esfuerzo mucho mayor.


### Preparación

Primero, tenemos que instalar algunas herramientas y dependencias. Hemos preparado un [repositorio git](https://github.com/oskarth/zkintro-tutorial) que facilita que comiences sin perderte en los detalles. Si prefieres no instalar ningún software, consulta el final de esta sección.

Los prerrequisitos que requerimos son:

- `rust` (el lenguaje de programación)  
- `just` (un `make` moderno)  
- `npm` (administrador de paquetes para JavaScript)  

Las herramientas de ZKP que usaremos realmente son:

- `circom` (para construir nuestro programa especial, o _circuito_)  
- `snarkjs` (para la configuración y la generación/verificación de pruebas)  
- tareas de `just` (para simplificar operaciones comunes relacionadas con lo anterior)  

Para instalar lo anterior y facilitar la compilación y ejecución, puedes clonar y usar el [repositorio git](https://github.com/oskarth/zkintro-tutorial). Esto debería funcionar en cualquier sistema tipo Unix como MacOS y Linux. Si usas Windows, recomendamos usar una máquina virtual Linux, el Subsistema de Windows para Linux (WSL) o algo similar para el desarrollo.

```shell
# Clona el repositorio y ejecuta el script de preparación
git clone git@github.com:oskarth/zkintro-tutorial.git
cd zkintro-tutorial

# Revisa el contenido de este archivo antes de ejecutarlo
less ./scripts/prepare.sh
./scripts/prepare.sh
```

Recomendamos que revises rápidamente el contenido de `./scripts/prepare.sh` para ver qué se instalará, o si prefieres instalar las cosas manualmente. Una vez ejecutado, deberías ver el mensaje `Installation complete` y ningún error.

Si te quedas atorado, consulta la documentación oficial más reciente [aquí](https://docs.circom.io/getting-started/installation/). Al finalizar, deberías tener instaladas las siguientes versiones (o superiores):

```shell
> circom --version
circom compiler 2.1.8

> snarkjs | head -n 1
snarkjs@0.7.4
```
En el repositorio hay un `justfile` que define un conjunto de comandos comunes. Estos comandos de `just` buscan simplificar las operaciones habituales sobre ZKPs, para que puedas enfocarte en la comprensión conceptual de los pasos involucrados. Esto hace que el proceso sea mucho menos propenso a errores cuando estás comenzando.

Si en algún momento quieres ver con más detalle qué comandos se están ejecutando, te recomendamos revisar el `justfile` y los distintos scripts en la carpeta `scripts`.

Recomendamos encarecidamente instalar el software mencionado para seguir el tutorial y desarrollar intuición. Sin embargo, si no deseas instalar nada, puedes seguir con capacidades limitadas usando una herramienta REPL (Read-Eval-Print Loop) en línea como [zkrepl.dev](https://zkrepl.dev). Si no quieres instalar `just` y prefieres ejecutar todos los comandos tú mismo, puedes hacerlo con un poco más de esfuerzo usando los scripts de shell que acompañan este repositorio.


## Primera iteración

Ya estamos listos para comenzar a programar. Para llegar al esquema de firma mencionado anteriormente, empezaremos con un programa muy simple, el equivalente a un "Hola Mundo" en otros lenguajes de programación.

En términos prácticos, escribiremos un programa especial que nos permitirá probar el conocimiento de dos números secretos cuyo producto es un número público, _sin revelar nunca los números secretos en sí_. Por ejemplo, el número público podría ser "33" y los números secretos "11" y "3". 

Este es un paso fundamental hacia las firmas digitales y ayudará a desarrollar intuición sobre cómo funcionan las ZKPs. Si estás familiarizado con la criptografía de clave pública, puedes —muy libremente— pensar en los números secretos como una "clave privada" y en el número público como una "clave pública".

Como este es un enfoque distinto de programación que implica muchos conceptos nuevos, no te preocupes si al principio algo no tiene sentido. Siempre puedes seguir avanzando, concentrarte en el código, generar pruebas, etc., y volver a una sección específica más adelante.


### Escribe un programa especial

A diferencia de la mayoría de los otros tipos de programación, escribir estos programas especiales, llamados circuitos, luce un poco diferente. Lo que nos interesa es probar un _conjunto de restricciones_. [^4] El conjunto más simple de restricciones que podemos probar consiste en una sola restricción. [^5] Lo que vamos a restringir es que dos números multiplicados entre sí sean iguales a un tercer número.

Ve a la carpeta `example1` en el repositorio `zkintro-tutorial` mencionado arriba. Allí encontrarás un programa base en `example1.circom`. Modifícalo para que se vea así:
```javascript
pragma circom 2.0.0;

template Multiplier2 () {
  signal input a;
  signal input b;
  signal output c;
  c <== a * b;
}

component main = Multiplier2();
```

Este es nuestro programa especial, o _circuito_. [^6] Línea por línea:

- `pragma circom 2.0.0;` - define la versión de Circom que se está utilizando  
- `template Multiplier()` - las plantillas (templates) son el equivalente a objetos en la mayoría de los lenguajes de programación, una forma común de abstracción  
- `signal input a;` - nuestra primera entrada, `a`; las entradas son privadas por defecto  
- `signal input b;` - nuestra segunda entrada, `b`; también privada por defecto  
- `signal output c;` - nuestra salida, `c`; las salidas son siempre públicas  
- `c <== a * b;` - esto hace dos cosas: asigna un valor a la señal `c` _y_ restringe que `c` sea igual al producto de `a` y `b`  
- `component main = Multiplier2();` - instancia nuestro componente principal  

La línea más importante es `c <== a * b;`. Aquí es donde realmente declaramos nuestra restricción. Esta expresión es en realidad una combinación de dos: `<--` (asignación) y `===` (restricción de igualdad). [^7] Una restricción en Circom solo puede usar operaciones que involucren constantes, suma o multiplicación. Esta instrucción obliga a que ambos lados de la ecuación sean iguales. [^8]


### Sobre las restricciones

¿Cómo funcionan las restricciones (constraints)? En el contexto de algo como el Sudoku, podríamos decir que una restricción es "un número entre 1 y 9". Sin embargo, en el contexto de Circom, esto no es una única restricción, sino algo que tenemos que expresar usando un conjunto de restricciones de igualdad más simples (===). [^9]

¿Por qué es así? Esto se debe a lo que matemáticamente ocurre detrás de escena. Fundamentalmente, la mayoría de las ZKP usan _circuitos aritméticos_ que representan cálculos sobre _polinomios_. Al trabajar con polinomios, puedes introducir constantes fácilmente, sumarlas, multiplicarlas y verificar si son iguales entre sí. [^10] Otras operaciones deben expresarse en términos de estas operaciones fundamentales. No necesitas entender esto en detalle para escribir ZKPs, pero puede ser útil tener cierta intuición de lo que ocurre detrás de escena. [^11]

Podemos visualizar el circuito de la siguiente manera:

![example1 circuit](../assets/02_example1_circuit.png 'example1 circuit')

### Construyendo nuestro circuito

Para tu referencia, el archivo final se encuentra en `example1-solution.circom`. Para más detalles sobre la sintaxis, consulta la [documentación oficial](https://docs.circom.io/circom-language/signals/).

Podemos compilar nuestro circuito ejecutando:


```shell
just build example1
```
![02_example1_build](https://hackmd.io/_uploads/rkgFp9C8gl.png)

Este es un contenedor ligero para llamar a circom y crear los archivos example1.r1cs y example1.wasm. Deberías ver algo como:

```shell
template instances: 1
non-linear constraints: 1
linear constraints: 0
public inputs: 0
private inputs: 2
public outputs: 1
wires: 4
labels: 4
Written successfully: example/target/example1.r1cs
Written successfully: example/target/example1_js/example1.wasm
```
En este caso, tenemos lo siguiente:

- dos entradas privadas, `a` y `b`
- una salida pública, `c`
- una restricción (no lineal), `c <== a * b`

Por ahora ignoraremos las demás partes del output mencionado arriba. [^12] Ahora tenemos dos archivos: `example1.r1cs` y `example1.wasm`.

`r1cs` significa _Rank 1 Constraint System_. Este archivo contiene nuestro circuito en forma binaria y corresponde a cómo definimos nuestras restricciones matemáticamente. [^13]

El archivo `.wasm` contiene WebAssembly, que es lo que necesitamos para generar nuestro _testigo_ (_witness_). El testigo es la forma en que especificamos las entradas que queremos mantener privadas mientras las usamos para crear una prueba.

Aún no estamos listos para crear pruebas. Primero, necesitamos realizar una _configuración_ (_setup_) para obtener nuestra clave de prueba (_prover key_) y clave de verificación (_verification key_).

No te preocupes si aún no entiendes todo. Es una nueva forma de hacer las cosas y toma tiempo acostumbrarse.


### Trusted setup
Con los artefactos que generamos arriba, podemos realizar una _configuración confiable_ (trusted setup).

El Trust Setup es un proceso que se ejecuta una sola vez como paso previo. Esto genera lo que se llama una _Cadena de Referencia Común_ (CRS, por sus siglas en inglés), que consiste en una _clave de prueba_ (proving key) y una _clave de verificación_ (verification key). Estas claves se usan cada vez que queremos generar y verificar pruebas, respectivamente.

![Trusted setup](../assets/02_example1_setup1.png 'Trusted setup')

¿Por qué necesitamos estas claves y quién debería tener acceso a ellas? La clave del demostrador contiene toda la información necesaria para poder generar una prueba que preserve el conocimiento cero para ese circuito específico. De manera similar, la clave del verificador contiene toda la información necesaria para verificar que la prueba es correcta. Estas no son claves privadas, sino información que puede y debe distribuirse públicamente. Cualquier parte que necesite generar o verificar una prueba debería tener acceso a ellas. [^14]

¿Por qué llamamos a esto una trusted setup? Realizar una trusted setup es un proceso que involucra a varios participantes y a veces se denomina una ceremonia. [^15] Todos los participantes cooperan para crear un "secreto" criptográfico, que es la base para construir las claves de demostración y verificación. Si este proceso es manipulado, podría ser posible crear pruebas falsas o aceptar pruebas inválidas como válidas desde el punto de vista criptográfico. Por eso, existe la suposición de que al menos algunos participantes son honestos en el proceso, lo que da origen al término "trusted setup".

Como punto de partida, vamos a ejecutar la trusted setup nosotros mismos. Ejecuta lo siguiente:

`just trusted_setup example1`

![example1 trusted setup](../assets/02_example1_setup2.png 'example1 trusted setup')

Se te pedirá proporcionar texto aleatorio o entropía dos veces. [^16] Una vez completado, deberías ver "Trusted setup completed." y la ubicación de las claves. El archivo que termina en `.zkey` es nuestra clave de prueba（proving key）. Aunque entrar en detalles sobre trusted setups está fuera del alcance de este artículo, hay algunas cosas importantes que conviene conocer.

Primero, ¿cuál es el problema con el enfoque anterior? Como sólo hay un participante, todos los demás que usan el material criptográfico de esa configuración están confiando en esa persona y en su entorno informático. Esto no funcionaría en escenarios de producción, donde querríamos maximizar el número de participantes para hacer la configuración más confiable. Si participan 100 personas, debido a cómo se construye este secreto criptográfico, basta que una sola sea honesta. [^17]

También vale la pena saber que distintos sistemas ZKP tienen diferentes propiedades en términos de seguridad, rendimiento y capacidades. Aunque todos los sistemas ZKP requieren alguna forma de configuración, no todos requieren un trusted setup. De los que sí, algunos difieren en sus requerimientos.

Con Circom usamos el _sistema de prueba Groth16_ que sí requiere un trusted setup. Específicamente, la configuración se divide en dos fases: fase 1 y fase 2. La fase 1 es independiente del circuito y puede usarse para cualquier programa ZKP hasta cierto tamaño, mientras que la fase 2 es _específica del circuito_. Cuando ejecutamos el comando anterior, realizamos ambas fases.

Quizás te preguntes, ¿por qué usar un trusted setup si se puede evitar? Muchas personas comparten esta opinión. Sin embargo, aún hay buenas razones para usar estos sistemas, como herramientas y ecosistemas más maduros, además de costos bajos de verificación. Los costos bajos de verificación son tradicionalmente muy importantes, especialmente cuando verificamos pruebas en una blockchain pública como Ethereum. Dependiendo de tu caso de uso, tu elección probablemente varíe. En otro artículo profundizaremos en los trusted setups y sus compensaciones, así como en diferentes sistemas de prueba.


### Generar la prueba

Con el trusted setup completado arriba, tenemos una clave de prueba（proving key） y una clave de verificación（verification key）. Ahora podemos generar una prueba de que conocemos dos valores secretos cuyo producto es otro número público.

Específicamente, probemos que sabemos que 33 puede construirse multiplicando los números 3 y 11. Recuerda que nuestra entrada privada consiste en las señales `a` y `b`. Lo especificamos en el archivo `example1/input.json` de la siguiente manera:

```json
{
  "a": "3",
  "b": "11"
}
```
Es decir, especificamos la entrada como un mapa JSON, donde la clave es el nombre de la señal y el valor es el valor que queremos asignarle. Nota que el valor es una cadena, aunque conceptualmente sea un número. Esto es una particularidad de Circom y su API en JS. Debido a la naturaleza de las ZKP, a menudo trabajamos con números muy grandes que requieren el uso de _BigInt_. La forma más sencilla de especificar un número tan grande en un archivo JSON es como una cadena, que luego se convertirá a un BigInt.

Podemos crear una prueba usando nuestro circuito compilado (en forma WASM), nuestra clave de prueba y la entrada ejecutando lo siguiente:

`just generate_proof example1`

![example1 generate proof](../assets/02_example1_generate_proof.png 'example1 generate proof')

En esencia, este comando toma la entrada y genera un _testigo_ para nuestro circuito específico. [^18] Normalmente, por testigo simplemente entendemos la entrada privada que usamos para generar una prueba. En el contexto de Circom, un testigo es la asignación completa de todas las señales, tanto privadas como públicas, en una forma que el software del demostrador pueda procesar. Esta forma es una representación interna en formato binario. [^19]

Con este testigo generado, podemos crear una prueba usando `snarkjs`. Finalmente, obtenemos una prueba y algunos resultados públicos.

La prueba se ve algo así:

```json
{
  "pi_a": ["15932[...]3948", "66284[...]7222", "1"],
  "pi_b": [
    ["17667[...]0525", "13094[...]1600"],
    ["12020[...]5738", "10182[...]7650"],
    ["1", "0"]
  ],
  "pi_c": ["18501[...]3969", "13175[...]3552", "1"],
  "protocol": "groth16",
  "curve": "bn128"
}
```

Esto especifica la prueba en términos de ciertos elementos matemáticos (tres elementos de una curva elíptica): `pi_a`, `pi_b` y `pi_c`. [^20] También incluye algunos metadatos sobre el protocolo utilizado (`groth16`) y la _curva_ correspondiente (`bn128`, un detalle de implementación matemática que, por el momento, dejaremos de lado). Esto permite que el verificador sepa cómo interpretar esta prueba para verificarla correctamente.

Observá lo breve que es la prueba; independientemente de cuán complejo sea nuestro programa particular, siempre tendrá este tamaño. Esto ejemplifica la propiedad de _concisión_ de las ZKP, que mencionamos en nuestra [_introducción amigable_](https://zkintro.com/es/articles/friendly-introduction-to-zero-knowledge/#:~:text=est%C3%A1n%20por%20venir.-,Compresi%C3%B3n,-Hice%20esto%20m%C3%A1s).

El comando anterior también genera nuestra _salida pública_:

```json
["33"]
```

Esta es una lista de todas las salidas públicas que corresponden a nuestro testigo y al circuito. En este caso, hay una única salida pública que corresponde a `c`: 33. [^21]

¿Qué hemos probado? Que conocemos dos valores secretos, `a` y `b`, cuyo producto es 33. Esto ejemplifica la propiedad de _privacidad_ que mencionamos en el artículo anterior.

Tené en cuenta que la prueba no es útil por sí sola; requiere la salida pública que la acompaña.

## Verificar la prueba

A continuación, verifiquemos esta prueba. Ejecutá:

`just verify_proof example1`

![example1 verify proof](../assets/02_example1_verify_proof.png 'example1 verify proof')

Esto toma la clave de verificación（verification key）, la salida pública y la prueba. Con eso, podemos verificar la prueba. Debería imprimirse "Proof verified". Notá cómo el verificador nunca accede a las entradas privadas.

¿Qué pasa si cambiamos la salida? Abrí `example1/target/public.json` y cambiá el 33 por 34, luego ejecutá nuevamente el comando anterior.

Vas a notar que la prueba ya no se verifica. Esto se debe a que nuestra prueba no demuestra que conocemos dos números cuyo producto sea 34.

¡Felicitaciones! Acabás de escribir tu primer programa ZKP, ejecutar un trusted setup, generar una prueba y, finalmente, verificarla.



### Ejercicios

1. ¿Cuáles son las dos propiedades clave de las ZKP y qué significan?

2. ¿Cuál es el rol del demostrador（prover） y qué entrada necesita? ¿Y el verificador（verifier）?

3. Explicá qué hace la línea `c <== a * b;`.

4. ¿Por qué necesitamos realizar un trusted setup? ¿Cómo usamos sus artefactos?

5. Código: Completá `example1` hasta generar y verificar una prueba.

## Segunda iteración

Con el circuito anterior, estamos probando que conocemos el producto de dos números (secretos). Esto está estrechamente relacionado con el problema de la _factorización en primos_, que es la base de buena parte de la criptografía. [^22] La idea es que, si tenés un número muy grande, es difícil encontrar dos números primos cuyo producto sea ese número. Por otro lado, es muy fácil verificar si el producto de dos números es igual a otro número. [^23]

Sin embargo, hay un gran problema con nuestro circuito. ¿Lo notás?

Podemos fácilmente cambiar nuestra entrada a "1" y "33". Es decir, un número `c` siempre es el producto de 1 y `c`. Eso no es nada impresionante, ¿no?

Lo que queremos hacer es agregar otra _restricción_: que ni `a` ni `b` puedan ser igual a 1. De ese modo, nos vemos forzados a realizar una factorización entera válida.

¿Cómo podemos agregar esta restricción y qué cambios necesitamos hacer?


### Actualizar nuestro circuito

Vamos a trabajar en la carpeta `example2` para estos cambios. Lamentablemente, no podemos simplemente escribir `a !== 1`, porque eso no es una restricción válida. [^24] No está compuesta solo por constantes, sumas, multiplicaciones y verificaciones de igualdad. ¿Cómo expresamos que “algo no es”?

Esto no es algo intuitivo de entrada, y este tipo de problemas es donde entra en juego buena parte del arte de escribir circuitos. Desarrollar esta habilidad lleva tiempo y está fuera del alcance de este tutorial inicial; por suerte, existen muchos recursos excelentes al respecto. [^25]

Sin embargo, hay ciertos patrones comunes. La idea básica es usar una plantilla `IsZero()` que verifica si una expresión es igual a cero o no. Devuelve 1 si es verdadero, y 0 si es falso.

Suele ser útil usar una tabla de verdad [^26] para visualizar los valores posibles. Esta es la tabla de verdad para `IsZero()`:

| entrada | salida |
|--------|--------|
| 0      | 1      |
| n ≠ 0  | 0      |

Este bloque de construcción es tan útil que está incluido en la biblioteca de Circom, `circomlib`. En `circomlib` también hay muchos otros componentes útiles. [^27]

Podemos incluir esto creando un proyecto `npm` (JavaScript) y agregándolo como dependencia. En la carpeta `example2` ya lo tenemos listo para vos. Para importar el módulo correspondiente, sumamos esta línea al inicio de `example2.circom`:

`include "circomlib/circuits/comparators.circom";`

Usando `IsZero()`, podemos verificar si `a` o `b` es igual a 1. Modificá el archivo `example2.circom` para que contenga las siguientes líneas:

```javascript
component isZeroCheck = IsZero();
isZeroCheck.in <== (a - 1) * (b - 1);
isZeroCheck.out === 0;
```
En el fragmento de código anterior, creamos un nuevo componente `isZeroCheck`, instanciando la plantilla `IsZero()`. Si `a` o `b` es igual a 1, `isZeroCheck.in` será 0 y `isZeroCheck.out` será 1. Como tenemos la restricción `isZeroCheck.out === 0`, esta restricción fallará. Esto significa que ya no podremos ingresar valores donde `a` o `b` sean iguales a 1.

Te invito a que te convenzas por vos mismo, ya sea mentalmente o con lápiz y papel (¿quizás usando una tabla de verdad?), de que esto es cierto. Si te animás a un desafío, podés intentar entender cómo está implementado `IsZero()`. Son solo unas pocas líneas de código. Podés revisar el código en el archivo `comparators.circom` de `circomlib`. [^28]

Para que tengas referencia, el archivo final está en `example2-solution.circom`. Con los cambios anteriores, podemos instalar la dependencia `circomlib` de npm y compilar nuestro circuito con:

`just build example2`

### Volviendo a correr nuestro trusted setup

Con Circom y Groth16, cada vez que modificamos nuestro circuito tenemos que volver a ejecutar nuestro trusted setup. Por eso, más vale que estés seguro de que tu circuito está sólido antes de liberarlo, especialmente si vas a hacer una ceremonia formal con muchos participantes.

Más específicamente, solo tenemos que volver a correr la parte específica del circuito (fase 2) del trusted setup. Esto se debe a que la fase 1 es genérica para _cualquier_ circuito Groth16 escrito en Circom, hasta cierto tamaño. Cuando hicimos el trusted setup antes, corrimos ambas fases, pero omitimos los detalles de la fase 1 para simplificar. Acá te dejo más detalles de la fase 1 para que tengas una imagen más completa.

![Trusted setup (both phases)](../assets/02_example2_setup_both.png 'Trusted setup (both phases)')

El resultado de la fase 1 del trusted setup se guarda en un archivo `.ptau`, donde ptau significa powers of tau (potencias de tau). [^29] Matemáticamente, este archivo contiene potencias de algunos secretos aleatorios. Esto es lo que nos permite "alojar" cierta cantidad de restricciones. No hace falta entender cómo funciona matemáticamente, pero hay dos datos clave que conviene saber: (a) `.ptau` es independiente del circuito (b) su tamaño indica su capacidad. La "capacidad" de un ptau dado es `2^n - 1` restricciones, donde `n` es un número. Por ejemplo, `pot12.ptau` indica que puede alojar `2^12 - 1`, un poco más de 4000 restricciones.

Como no queremos volver a correr la fase 1, solo ejecutamos la fase 2. Esta usará el `pot12.ptau` generado previamente (guardado en el directorio `ptau`) como entrada. Podemos correr la parte de fase 2 del trusted setup con:

```
just trusted_setup_phase2 example2
```

![example2 trusted setup](../assets/02_example2_setup2.png 'example2 trusted setup')

### Probando nuestros cambios

Con esto, podemos ejecutar:

```
just generate_proof example2
just verify_proof example2
```
Todavía genera y verifica la prueba como se espera.

Si cambiamos las entradas en `example2/input.json` a, por ejemplo, `1` y `33` y tratamos de ejecutar lo anterior, veremos un error de aserción. Es decir, Circom ni siquiera nos permitirá generar una prueba porque la entrada viola nuestras restricciones.

### Diagrama completo del flujo

Ahora que hemos recorrido todo el flujo dos veces, demos un paso atrás y veamos cómo encajan todas las piezas.

![example2 complete flow](../assets/02_example2_complete_flow.png 'example2 complete flow')

Esperamos que las cosas estén empezando a tener sentido. Con eso, vamos a subir el nivel y hacer nuestro circuito más útil.

### Ejercicios

6. ¿Por qué tenemos que ejecutar la fase 2 pero no la fase 1 de nuestra configuración confiable para `example2`?

7. ¿Cuál fue el problema principal con el ejemplo anterior y cómo lo solucionamos?

8. Código: Completa `example2` hasta que no puedas generar una prueba.

## Tercera interación

Con el circuito anterior hemos probado que conocemos el producto de dos valores secretos. Eso por sí solo no es muy útil. Algo que sí es útil en el mundo real es un _esquema de firma digital_. Con él, puedes demostrarle a alguien más que escribiste un mensaje específico. ¿Cómo implementaríamos esto usando ZKPs? Para llegar a eso, primero debemos cubrir algunos conceptos básicos.

Ahora es un buen momento para hacer una pausa corta y prepararte una taza fresca de tu bebida favorita.

### Firmas digitales

Las firmas digitales ya existen y están en todas partes en nuestra era digital. El Internet moderno no funcionaría sin ellas. Usualmente, se implementan mediante _criptografía de clave pública_. En la criptografía de clave pública tienes una clave privada y una clave pública. La clave privada es solo para tus ojos, y la clave pública se comparte públicamente, representando tu identidad.

Un esquema de firma digital consta de las siguientes partes:
- **Generación de claves**: Generar una clave privada y una clave pública correspondiente
- **Firma**: Crear una firma usando la clave privada y el mensaje
- **Verificación de la firma**: Verificar que el mensaje fue firmado con la clave pública correspondiente
- 
Aunque los detalles parezcan diferentes, el programa que escribimos y el algoritmo de generación de claves comparten un elemento común: ambos usan una _función unidireccional_, y más específicamente una _función con trampa_. Una trampa es algo en lo que es fácil caer y difícil salir (a menos que puedas encontrar una escalera oculta). [^30]
![example3 trapdoor](../assets/02_example3_trapdoor.png 'example3 trapdoor')

En la criptografía de clave pública, es fácil construir la clave pública a partir de la clave privada, pero muy difícil hacerlo al revés. Lo mismo ocurre con nuestro programa anterior. Si los dos números secretos son números primos muy grandes, es muy difícil convertir ese producto nuevamente en los valores originales. La criptografía de clave pública moderna a menudo utiliza _criptografía de curva elíptica_ en segundo plano.

Tradicionalmente, crear protocolos criptográficos como estos esquemas de firma digital requiere mucho trabajo y diseñar un protocolo específico que implique matemáticas ingeniosas. No queremos hacer eso. En cambio, queremos escribir un programa usando ZKPs que logre el mismo resultado.

En lugar de esto: [^31]

![Signature verification](../assets/02_example3_sigverify.png 'Signature verification')


Solo queremos escribir un programa, generar una prueba（proof）de lo que queremos, y luego verificar esa prueba.

### Funciones hash y compromisos

En lugar de usar criptografía de curva elíptica, vamos a utilizar dos herramientas mucho más simples: _funciones hash_ y _compromisos_.

Una función hash también es una función unidireccional. Por ejemplo, en la línea de comandos podemos usar la función hash SHA-256 así:

```shell
echo -n "foo" | shasum -a 256

```

Para producir el hash de "foo": `0beec7[...]a8a33` (abreviado). [^32]

Por sí sola, una función hash no es una función trapdoor. No existe ningún conocimiento especial que nos permita recuperar el valor original. Funciona más como una picadora de carne y menos como una trampa con una escalera oculta.

¿Y qué pasa con los compromisos? Un _compromiso_ es simplemente una forma de comprometerse ("prometer") con un valor secreto para no poder cambiar de opinión más tarde. En nuestro caso, usaremos un compromiso para generar el equivalente de una clave pública usando algún valor secreto. Podemos hacer esto usando una función hash.


Los esquemas de compromiso son un primitivo criptográfico muy común. [^33] Nos permiten:

- **commit**: Comprometerse a un valor específico manteniéndolo oculto

- **reveal**: Revelar este valor para que pueda verificarse que es correcto

Esto nos da dos propiedades clave:

- **hiding**: el valor permanece oculto

- **binding**: no puedes cambiar de opinión sobre el valor

Una forma de entender un compromiso es imaginar que le das una caja fuerte a un amigo. No puedes cambiar el contenido de la caja después, pero tu amigo no puede mirar dentro. Solo cuando le das la llave puede abrirla.
![example3 lockbox](../assets/02_example3_lockbox.png 'example3 lockbox')

Volviendo a nuestro esquema de firma digital, tenemos:

- **Key generation**: Crear una cadena secreta y hacerle hash para crear un compromiso

- **Signing**: Crear una firma haciendo hash del secreto junto con el mensaje

- **Verification**: Verificar la prueba usando el compromiso, mensaje y firma (salida pública)

En pseudo-código, esto es lo que queremos hacer en nuestro circuito:

```python
commitment = hash(some_secret)
signature = hash(some_secret, message)
```

En este punto probablemente tengas algunas preguntas. Vamos a responder algunas que seguramente tienes en mente.

Primero, ¿por qué funciona esto y por qué necesitamos una ZKP para esto? Cuando alguien verifica la prueba, solo tiene acceso al compromiso, mensaje y firma. No hay forma directa de verificar que el compromiso corresponde al secreto sin revelar el secreto. En este caso, solo "revelamos" el secreto al generar nuestra prueba, por lo que el secreto se mantiene seguro.

Segundo, ¿por qué usar estas funciones hash y compromisos en lugar de criptografía de clave pública dentro de la ZKP? Sí, definitivamente se podría usar criptografía de clave pública dentro de una ZKP, y hay razones válidas para hacerlo. Sin embargo, es mucho más costoso de implementar en términos de restricciones que lo anterior. Esto lo vuelve mucho más lento que el esquema simple que vimos. Como veremos en la siguiente sección, la elección de la función hash resulta ser muy importante.

Finalmente, ¿por qué usar una ZKP si ya tenemos criptografía de clave pública? En este ejemplo simple, no hay necesidad de una ZKP. Sin embargo, esta sirve como un bloque de construcción para aplicaciones más interesantes, como el ejemplo de firma grupal mencionado al inicio de este artículo. Al fin y al cabo, queremos _programar criptografía_.

¡Fue mucho! Por suerte, ya superamos la parte difícil. Vamos a ponernos a programar. No te preocupes si no todo lo anterior te quedó completamente claro al principio. Toma un tiempo acostumbrarse a este tipo de razonamiento.


### Volviendo al código

Vamos a trabajar desde el directorio `example3`.

Para implementar firmas digitales, lo primero que debemos hacer es generar nuestras claves. Estas corresponden a la clave privada y pública en criptografía de clave pública. Como las claves corresponden a una identidad (tú, el demostrador), las llamaremos `identity_secret` y `identity_commitment`, respectivamente. Juntas forman un par de identidad.

Estas se usarán como entrada al circuito, junto con el mensaje que estamos firmando. Como salida pública, tendremos la firma, compromiso y mensaje. Esto permitirá que alguien verifique que la firma es efectivamente correcta.

Debido a que necesitamos el par de identidad como entrada al circuito, los generamos por separado:

`just generate_identity`

Esto produce algo así:

```shell
identity_secret: 43047[...]2270
identity_commitment: 21618[...]0684
```

Para mantener el secreto seguro, usamos un número grande y aleatorio. A diferencia de lo que vimos antes, no usamos una función hash como SHA-256 para crear el compromiso. En su lugar, usamos lo que se llama una _función hash amigable con ZK_. Es una función hash especial optimizada para usarse en ZKPs. Esto importa mucho en términos de rendimiento cuando haces mucho hashing. La función hash amigable con ZK que usamos se llama _Poseidon hash function_. [^34]

Por debajo, esto usa la librería `circomlibjs` para envolver `circomlib`. Es una librería en JavaScript que nos permite usar circuitos Circom. Esto asegura que nuestro `identity_commitment` se genere exactamente igual en JavaScript/en la línea de comandos que en nuestro circuito. Si quieres leer el código fuente del script, está disponible en `example3/generate_identity.js`.

Al igual que hicimos antes con `IsZero`, necesitamos incluir la plantilla Poseidon. Lo hacemos con la siguiente inclusión:

```
include "circomlib/circuits/poseidon.circom";
```

La plantilla de hash Poseidon se usa de la siguiente manera:

```javascript
component hasher = Poseidon(2);
hasher.inputs[0] = foo;
hasher.inputs[1] = bar;
quux <== hasher.out
```

Especificamos que el componente `hasher` espera dos argumentos, indicados en el arreglo `.inputs[]`. Luego asigna la señal de salida a `.out`. En este ejemplo, toma `foo` y `bar` como entradas, las hashea juntas y el resultado es `quux`. [^35]
 
Finalmente, presentamos una nueva sintaxis:

```javascript
component main {public [identity_commitment, message]} = SignMessage();
```
Por defecto, todas las entradas a nuestro circuito son privadas. Con esto, marcamos explícitamente `identity_commitment` y `message` como públicas. Esto significa que serán parte de la salida pública.

Con esta información deberías tener suficiente para completar el circuito `example3.circom`. Si aún estás atascado, puedes consultar `example3-solution.circom` para ver el código completo.

Como antes, tenemos que compilar el circuito y ejecutar la fase 2 del trusted setup:

```shell
just build example3
just trusted_setup_phase2 example3
```
Al compilar el circuito, puede que notes que la cantidad de restricciones aumentó bastante en comparación con `example2`. Esto se debe principalmente al uso de dos hashes Poseidon. [^36]

### Probando nuestro circuito

Como referencia, aquí hay una ilustración de nuestro circuito completado:

![example3 circuit](../assets/02_example3_circuit.png 'example3 circuit')

Ahora podemos generar una prueba. Tenemos la siguiente entrada en `example3/input.json`:

```json
{
  "identity_secret": "21879[...]1709",
  "identity_commitment": "48269[...]7915",
  "message": "42"
}
```

Siéntete libre de cambiar el par de identidad por el que generaste tú mismo con `just generate_identity`. ¡Después de todo, quieres mantener el secreto de tu identidad para ti!

Quizás notes que el mensaje es solo un número citado como cadena (`"42"`). Desafortunadamente, debido a cómo funcionan las restricciones matemáticamente (usando álgebra lineal y _circuitos aritméticos_), solo podemos usar números y no cadenas. Las únicas operaciones que se soportan dentro de los circuitos son operaciones aritméticas básicas como suma y multiplicación. [^37]

Ahora podemos generar y verificar una prueba:
```
just generate_proof example3
just verify_proof example3
```
Como antes, la prueba mantiene el mismo tamaño, aunque estemos haciendo muchas más cosas. La salida pública que se encuentra en `example3/target/public.json` es:

```json
["48968[...]5499", "48269[...]7915", "42"]
```

Esto corresponde a la firma, el compromiso y el mensaje, respectivamente.

Veamos cómo pueden salir las cosas mal si no tenemos cuidado. [^38]

Primero, ¿qué pasa si cambiamos el compromiso de identidad por algo aleatorio en el `input.json`? Notarás que ya no podemos generar pruebas. Esto es porque también estamos verificando el compromiso de identidad dentro del circuito. Es crítico que se mantenga esta relación entre el secreto de identidad y el compromiso.

Segundo, ¿qué pasa si no incluimos el mensaje en la salida? Sí obtenemos una prueba y esta se verifica. Pero el mensaje podría ser _cualquier cosa_, por lo que no prueba que hayas enviado un mensaje específico. De manera similar, ¿qué pasa si no incluimos el compromiso de identidad en la salida pública? Esto significa que el compromiso de identidad podría ser cualquiera, así que en realidad no sabemos _quién_ firmó el mensaje.

Como ejercicio mental, convéncete a ti mismo (o prueba) qué podría salir mal si omitimos alguna de estas dos restricciones clave:

- `identity_commitment === identityHasher.out`
- `signature <== signatureHasher.out`

¡Felicidades, ahora sabes cómo programar criptografía! [^39]


### Ejercicios
9. ¿Cuáles son los tres componentes de un esquema de firma digital?  
10. ¿Cuál es el propósito de usar una "función hash amigable con conocimiento cero" como Poseidon?  
11. ¿Qué son los compromisos? ¿Cómo podemos usarlos en un esquema de firma digital?  
12. ¿Por qué marcamos el compromiso de identidad y el mensaje como públicos?  
13. ¿Por qué necesitamos las restricciones del compromiso de identidad y la firma?  
14. Código: Termina `example3` hasta que hayas generado y verificado una prueba.


## Próximos pasos

Con el esquema de firma digital anterior, y algunos trucos que vimos antes en el artículo, tienes todas las herramientas a tu disposición para implementar el _esquema de firma grupal_ mencionado al inicio del artículo. [^40]

Existe un código base en `example4`. Solo necesitas entre 5 y 10 líneas de código. La única sintaxis nueva es un ciclo `for`, que funciona igual que en la mayoría de los otros lenguajes. [^41].

Este circuito te permitirá:
- firmar un mensaje
- probar que eres una de tres personas (compromisos de identidad)
- pero sin revelar cuál

Puedes pensarlo como un rompecabezas. La idea clave se reduce esencialmente a una sola expresión aritmética. Intenta resolverlo en papel si puedes. Si te quedas atascado, puedes consultar la solución como antes.

Finalmente, si quieres algunos desafíos extra, aquí tienes algunas formas de extenderlo:
1. Permitir un número arbitrario de personas en el grupo
2. Implementar un nuevo circuito `reveal` que pruebe que firmaste un mensaje específico
3. Implementar un nuevo circuito `deny` que pruebe que no firmaste un mensaje específico

Crear un protocolo criptográfico como este usando herramientas clásicas sería una tarea enorme que requiere mucho conocimiento especializado. [^42] Con ZKPs puedes volverte productivo y peligroso en una tarde, tratando estos problemas como tareas de programación. Y esto es solo la punta del iceberg de lo que podemos hacer.


### Ejercicios
15. ¿Qué hacen las firmas de grupo sobre las firmas normales? ¿Cómo pueden ser usadas?

## Problemas
Estos problemas son opcionales y requieren mucho más esfuerzo.
1. Averigua cómo se implementa `IsZero()`.
2. Código: Termina el esquema de firma de grupo anterior (ver `example4`). 
3. Código: Extiende el ejemplo de firma de grupo anterior: Permite más personas e implementa los circuitos `reveal` y/o `deny`.  
4. ¿Cómo diseñarías un sistema de "Identidad ZK" para probar que tienes más de 18 años? ¿Qué otras propiedades podrías querer probar? A grandes rasgos, ¿cómo lo implementarías y qué desafíos ves? Investiga soluciones existentes para entender mejor cómo están implementadas.
5. Para blockchains públicas como Ethereum, a veces se usa una _Capa 2_ (L2) para permitir transacciones más rápidas, baratas y numerosas. A grandes rasgos, ¿cómo diseñarías una L2 usando ZKPs? Explica algunos desafíos que ves. Investiga soluciones existentes para entender mejor cómo están implementadas.

## Conclución

En esta introducción al tutorial, nos familiarizamos con cómo escribir y modificar pruebas de conocimiento cero básicas desde cero. Configuramos nuestro entorno de programación y escribimos un circuito básico. Luego realizamos una configuración confiable, creamos y verificamos pruebas. Identificamos algunos problemas y mejoramos nuestro circuito, asegurándonos de probar los cambios. Después de eso, implementamos un esquema básico de firma digital usando funciones hash y compromisos.

También aprendimos las habilidades y herramientas suficientes para poder implementar firmas de grupo, algo que sería difícil de lograr sin las ZKP.

Espero que hayas desarrollado un mejor modelo mental de lo que implica escribir ZKP, y que tengas una mejor idea de cómo se ve en la práctica el ciclo de editar, compilar y ejecutar. Esto servirá como una buena base para cualquier otro programa de ZKP que escribas en el futuro, sin importar qué stack tecnológico uses.


## Agradecimientos
Gracias a Hanno Cornelius, Marc Köhlbrugge, Michelle Lai, lenilsonjr y Chih-Cheng Liang por leer los borradores y brindar retroalimentación sobre esto.

Gracias a [Alex](https://x.com/padimaster), [Gelois](https://x.com/Gelois_0) y [Yago Pajariño](https://x.com/0xyago) por la traducción de este artículo.

### Imágenes 
- _Congreso Bourbaki 1938_ - Desconocido, dominio público, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Bourbaki_congress1938.png)
- _Cebras de Hartmann_ - J. Huber, CC BY-SA 2.0, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Hartmann_zebras_hobatereS.jpg)
- _Araña Trampa_ - P.S. Foresman, dominio público, vía [Wikimedia](<https://commons.wikimedia.org/wiki/File:Trapdoor_(PSF).png>)
- _Caja fuerte Kingsley_ - P.S. Foresman, dominio público, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Kingsley_lockbox.jpg)

## Referencias

[^1]: Aunque es ilustrativo como metáfora, esta es solo una de varias teorías. Si tienes curiosidad, consulta https://en.wikipedia.org/wiki/Zebra#Function.
[^2]: Consulta [Federalist Papers (Wikipedia)](https://en.wikipedia.org/wiki/The_Federalist_Papers#Authorship).
[^3]: Consulta [Bourbaki (Wikipedia)](https://en.wikipedia.org/wiki/Nicolas_Bourbaki#Membership).
[^4]: A menos que hayas hecho algún tipo de programación declarativa (es decir, no procedimental, como Prolog), esto probablemente sea nuevo para ti. En cierta medida también lo hacemos en SQL. Describimos _qué_ queremos, no necesariamente _cómo_ queremos que se haga.
[^5]: Técnicamente, cero restricción también es un conjunto de restricciones. Aunque dicho en broma, los circuitos con restricciones insuficientes son un gran problema que puede causar muchos errores graves. Veremos un ejemplo de esto más adelante.
[^6]: Lo llamamos un _circuito_, o más precisamente un _circuito aritmético_, porque conecta entradas y salidas de forma similar a las puertas lógicas como NAND, AND, NOT, XOR, etc. A partir de esto podemos construir una computadora universal, o circuito universal.
[^7]: En general, no se recomienda usar `<--` y casi siempre deberías evitarlo usando `<==` en su lugar.
[^8]: Esto hace que escribir restricciones sea bastante desafiante, como puedes imaginar. Consulta https://docs.circom.io/circom-language/constraint-generation/ para más detalles sobre restricciones en Circom.
[^9]: Para decir "este número está entre 1 y 9" tenemos que implementar una _verificación de rango_. Esto incluye descomponer el número en bits y realizar comprobaciones de igualdad sobre ellos. Por suerte, muchas de estas restricciones ya han sido escritas y se pueden reutilizar, como veremos más adelante con _circomlib_.
[^10]: Por ejemplo, `p(x) = ax^2 + bx + c` se puede sumar, multiplicar o comparar fácilmente con `q(x) = dx^2 + 2bx + e`. Cabe destacar que en ZKPs operamos sobre campos finitos, no números reales. Esto queda fuera del alcance de este artículo.
[^11]: Aunque la mayoría de los ZKPs usan _circuitos aritméticos_, existen otros sistemas de prueba que trabajan con otras abstracciones. Por ejemplo, zkSTARKs y Bulletproofs.
[^12]: Restricción lineal significa que se puede expresar como una combinación lineal usando solo sumas. Esto equivale a usar multiplicaciones con constantes. Lo principal a tener en cuenta es que las restricciones lineales son menos complejas que las no lineales. Consulta [generación de restricciones](https://docs.circom.io/circom-language/constraint-generation/) para más detalles. Los cables y etiquetas se refieren a cómo es el _circuito aritmético_. Esto no es algo de lo que normalmente tengas que preocuparte. Consulta [circuitos aritméticos](https://docs.circom.io/background/background/#arithmetic-circuits) para más detalles.
[^13]: Matemáticamente, lo que hacemos es asegurarnos de que la ecuación `Az * Bz = Cz` se cumpla, donde `Z=(W,x,1)`. `A`, `B` y `C` son matrices, `W` es el testigo (entrada privada) y `x` es la entrada/salida pública. Aunque es útil saberlo, no es necesario entenderlo para escribir circuitos. Consulta [sistema de restricción rango-1](https://docs.circom.io/background/background/#rank-1-constraint-system) para más detalles.
[^14]: Un término mejor, pero menos común, aquí sería "parámetros de prueba" y "parámetros de verificación", respectivamente. Esto sería un poco más intuitivo ya que las llaves suelen ser privadas. Seguiremos usando "llave" en lugar de "parámetro" porque es lo que probablemente encontrarás en la práctica.
[^15]: Como se [menciona](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge#user-content-fn-33) en el artículo de introducción amigable, hay un excelente podcast para no expertos sobre la Ceremonia que Zcash realizó en 2016 que puedes escuchar [aquí](https://radiolab.org/podcast/ceremony). Desde entonces, mucho ha cambiado en términos de configuraciones confiables, y ahora son mucho más fáciles de ejecutar y participar.
[^16]: Esto es porque confiamos en la aleatoriedad para que la generación de llaves de prueba y verificación sea segura. En una configuración confiable real, obtener más fuentes de entropía es deseable.
[^17]: Esto se llama un modelo de confianza 1-de-N. Existen muchos otros modelos de confianza; el que probablemente conoces es el de mayoría, donde confías en que la mayoría tome la decisión correcta. Básicamente así funciona la democracia y la mayoría de los sistemas de votación.
[^18]: Como siempre generamos el testigo junto con la prueba, el archivo binario resultante `witness.wtns` es mayormente un paso intermedio y un detalle de implementación. Lo usamos inmediatamente para generar la prueba, por eso no aparece en el diagrama.
[^19]: En la literatura, un testigo es solo la parte `W` del vector `Z=(W,x,1)` usado en R1CS, donde `x` son todas las señales públicas/entrada. En Circom, todo el vector se llama testigo. También ver nota 13.
[^20]: Los números se han abreviado por brevedad con `[...]`. Matemáticamente, estos son puntos de curva elíptica en la curva _bn128_, con un tamaño de campo de 254 bits. Un número de 254 bits puede tener hasta 77 dígitos en su representación decimal.
[^21]: La salida es un poco contraintuitiva porque no se mapea al nombre original de la señal así: `{"c": "33"}`. Esto requiere que el desarrollador reasigne las salidas según el orden en que fueron definidas en el circuito. Esto se debe a la implementación de `snarkjs` donde perdemos la información de las variables para la generación de la prueba.
[^22]: También conocido como una _asunción de dificultad criptográfica_. Consulta [Computational hardness assumption (Wikipedia)](https://en.wikipedia.org/wiki/Computational_hardness_assumption#Common_cryptographic_hardness_assumptions).
[^23]: Consulta https://en.wikipedia.org/wiki/Integer_factorization para más información.
[^24]: Aunque podemos añadir _asserts_, estos no son realmente restricciones sino solo se usan para sanear la entrada. Consulta https://docs.circom.io/circom-language/code-quality/code-assertion/ para cómo funciona y https://www.chainsecurity.com/blog/circom-assertions-misconceptions-and-deceptions para un ejemplo de cómo el mal uso de asserts puede fallar. Para más intuición sobre qué son las restricciones, consulta la sección anterior _Sobre restricciones_.
[^25]: Este recurso de 0xPARC es excelente si quieres profundizar en el arte de escribir circuitos (Circom): https://learn.0xparc.org/materials/circom/learning-group-1/circom-1/ (en particular los talleres de Circom). Leer la biblioteca estándar también puede ser iluminador, consulta la nota 26.
[^26]: Debido a la naturaleza de escribir restricciones, esto aparece mucho. Consulta https://en.wikipedia.org/wiki/Truth_table.
[^27]: Consulta https://github.com/iden3/circomlib para más sobre circomlib.
[^28]: Consulta https://github.com/iden3/circomlib/blob/master/circuits/comparators.circom.
[^29]: La gente suele compartir estos archivos `ptau` entre proyectos para mayor seguridad. Consulta https://github.com/privacy-scaling-explorations/perpetualpowersoftau para detalles. También puedes encontrar una lista de estos archivos ptau, de varios tamaños, en https://github.com/iden3/snarkjs.
[^30]: Aquí la escalera representa algún valor que nos permite ir por el camino opuesto, el "difícil". Otra forma de pensarlo es como un candado. Puedes cerrarlo fácilmente, pero es difícil abrirlo, a menos que tengas una llave. Las funciones trapdoor también tienen una definición más formal, consulta https://en.wikipedia.org/wiki/Trapdoor_function.
[^31]: Captura de pantalla de Wikipedia. Consulta [ECDSA (Wikipedia)](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm#Signature_verification_algorithm).
[^32]: Este comando debería funcionar en la mayoría de sistemas tipo Unix. Usamos `-n` para especificar que no queremos un carácter de nueva línea (`foo`, no `foo\n`), y `-a` para especificar que queremos SHA256.
[^33]: Consulta https://en.wikipedia.org/wiki/Commitment_scheme. Nota que no siempre necesitamos la propiedad de "ocultamiento". Por ejemplo, cuando usamos ZKPs para hacer Ethereum más escalable, solo queremos una revelación eficiente y parcial del trie del estado.
[^34]: Usamos Poseidon, pero hay muchas otras. ¿Por qué es más rápido? Estas funciones hash amigables con ZK se implementan usando operaciones aritméticas en campos primos, no operaciones bit a bit como SHA256. Esto requiere muchas menos restricciones para implementarlas, lo que resulta en tiempos de prueba más rápidos. La diferencia de rendimiento puede ser hasta de dos órdenes de magnitud. Por otro lado, una función hash como SHA256 ha sido estudiada más rigurosamente que la mayoría de estas nuevas funciones hash amigables con ZK.
[^35]: En ZKPs, a menudo queremos hashear múltiples cosas juntas. A diferencia de un contexto tradicional, no podemos simplemente concatenar cadenas ("foo bar"), así que en cambio especificamos cuántas entradas tiene nuestra función hash.}
[^36]: Como se mencionó en la nota anterior, si esto usara SHA-256 o hiciera algo de matemática de curva elíptica, el conteo de restricciones sería mucho mayor. Si tuviéramos más de 4000 restricciones, tendríamos que hacer (o reutilizar) otra configuración confiable fase 1 con un ptau de mayor capacidad.
[^37]: Sin embargo, podemos codificar nuestra cadena como un arreglo de bytes, usando Unicode o ASCII. En una aplicación real probablemente usarías el hash de tu mensaje en su representación BigInt.
[^38]: En un esquema real de firma digital, donde se intercambian múltiples mensajes, probablemente también querríamos introducir un nonce criptográfico. Esto es para evitar ataques de repetición, donde alguien podría reutilizar la misma firma más tarde. Consulta https://en.wikipedia.org/wiki/Replay_attack.
[^39]: Para aplicaciones del mundo real, trata de reutilizar trabajos existentes y buenas prácticas tanto como sea posible. Hay muchas cosas que pueden salir mal si no tienes cuidado. Por suerte, esto se está haciendo cada vez más fácil a medida que el ecosistema ZKP madura. En cierto punto, muchas aplicaciones de alto riesgo hacen auditorías de seguridad para asegurarse de que sus aplicaciones sean seguras (o al menos no sean demostrablemente inseguras).
[^40]: La implementación de firmas grupales en ZKP fue inspirada por 0xPARC, consulta https://0xparc.org/blog/zk-group-sigs.
[^41]: Consulta https://docs.circom.io/circom-language/control-flow/.
[^42]: En comparación, un artículo que implementa firmas grupales como https://eprint.iacr.org/2015/043.pdf involucra criptografía y matemáticas avanzadas.



