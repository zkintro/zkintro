---
title: 'Entendiendo las matemáticas detrás de las ZKP'
date: '2025-02-01'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "understanding-math-behind-zkps"
images: ['../assets/03_zkboo_headshot.png']
summary: "En este artículo explicaremos la matemática detrás de las pruebas de conocimiento cero (ZKP). Está pensado para que lo entienda tanto un estudiante brillante de bachillerato como un graduado en STEM algo oxidado. Te ayudará a desarrollar intuición sobre cómo funciona todo “bajo el capó” y a construir una base sólida de los conceptos clave. Además, incluye una implementación de ejemplo de menos de 100 líneas de código. No son necesarios polinomios ni curvas elípticas."
---

_Este artículo fue traducido por Gelois, Alex Padilla y Yago Pajariño_

![ZKBoo](../assets/03_zkboo_headshot.png 'ZKBoo')

## Introducción
En este artículo explicaremos la matemática detrás de las pruebas de conocimiento cero (ZKP). Está pensado para que lo entienda tanto un estudiante brillante de bachillerato como un graduado en STEM algo oxidado. Te ayudará a desarrollar intuición sobre cómo funciona todo “bajo el capó” y a construir una base sólida de los conceptos clave. Además, incluye una implementación de ejemplo de menos de 100 líneas de código, sin necesidad de polinomios (polynomial) ni curvas elípticas (elliptic curve).

### Prerequisitos
Asumimos dos cosas:
- **Estás familiarizado con los fundamentos de las ZKPs.** Un nivel general es suficiente; por ejemplo, leyendo ["A Friendly Introduction to Zero Knowledge"](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge).
- **No le temes a los símbolos raros (o sea, las matemáticas).** Este texto supone que eres (a) un graduado STEM [^1] que cursó matemáticas hace mucho tiempo, o (b) un estudiante de secundaria inteligente al que le gustan las matemáticas. No necesitas formación formal en informática, matemáticas ni criptografía.

El requisito principal es la curiosidad y las ganas de aprender. Si te falta conocimiento sobre un tema específico, puedes buscarlo fácilmente [^2]. Deliberadamente mantenemos pocos prerrequisitos matemáticos y utilizamos matemáticas básicas.

Aunque es útil haber leído ambos artículos anteriores, estrictamente hablando solo el primero es obligatorio.

En cuanto a conocimientos matemáticos, lo ideal es que entiendas lo básico de lo siguiente:
- Sistema de ecuaciones (resolver más de una ecuación a la vez)
- Aritmética modular (Matemática del reloj)
- Funciones booleanas (AND, OR)
- Funciones hash (como SHA256)
- Noción de aleatoriedad (número aleatorio)
- Probabilidad básica (lanzamiento de una moneda)
- Números primos (saber que existen)
- Notación matemática básica (verificar igualdad; $a_i$ significa el subíndice $i$-ésimo)

Incluso si no dominas todo lo anterior, probablemente irás asimilándolo por ósmosis.

### Visión General
A continuación, tienes una visión general de cómo procederemos. Todos estos conceptos se presentarán en sus respectivas secciones, así que no te preocupes si ahora mismo no todos los términos te resultan familiares.

Empezaremos repasando algunos conceptos clave. Estos son bloques fundamentales como: circuitos (circuits), completitud funcional (functional completeness), compromisos (commitments) , compartición de secretos (secret sharing)  y protocolos sigma (sigma protocols) .

Después examinaremos un protocolo ZKP específico: ZKBoo [^3]. ZKBoo es un protocolo muy sencillo y resulta excelente para desarrollar la intuición de cómo funcionan las cosas bajo el capó. Lo consigue sin requerir matemáticas más avanzadas, como la criptografía de curva elíptica (elliptic curve cryptography) .

Empezaremos usando la compartición de secretos (secret sharing) para demostrar una restricción sencilla y, a partir de ahí, la iremos ampliando. Haremos que el protocolo sea interactivo con un protocolo sigma (sigma protocol) , funcionalmente completo y capaz de verificar múltiples restricciones. Mejoraremos la seguridad, es decir, la solidez (soundness) , ejecutándolo en varias rondas. Después lo volveremos no interactivo mediante la transformada de Fiat-Shamir.

Comprenderás exactamente cómo podemos demostrar este conjunto de restricciones a un Verificador (Verifier) , de un modo sólido, no interactivo y que conserva conocimiento cero sobre ciertas variables:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Tras completar nuestro protocolo ZKBoo básico, veremos cómo ZKBoo se relaciona con otros zkSNARKs que quizá hayas escuchado. Identificaremos lo que le falta a ZKBoo y sentaremos las bases para compararlo con distintos protocolos ZKP modernos.

Por último, hay algunos temas relacionados en el apéndice. En el Apéndice A vemos cómo el núcleo de ZKBoo puede implementarse en apenas unas ~50 líneas de código usando SageMath [^4], lo cual es sorprendentemente compacto. Una versión de juguete de todo el protocolo sigue cabiendo en menos de 100 líneas. También hay un enlace a un repositorio de código en Github para una exploración adicional.

El Apéndice B muestra cómo generalizar nuestros circuitos booleanos a circuitos aritméticos. En el Apéndice C, incluimos algunas definiciones matemáticas adicionales de los zkSNARKs.

Empecemos!


## Conceptos Clave
_En la siguiente sección presentamos algunos conceptos clave, como los circuitos (circuits), la completitud funcional (functional completeness), los compromisos (commitments), la compartición de secretos (secret sharing) y los protocolos sigma (sigma protocols)._

### Circuitos
En una ZKP demostramos que conocemos un secreto tal que, al aplicar cierto cálculo, se obtiene una salida específica sin revelar el propio secreto. El cálculo se compone de un _conjunto de restricciones_ en el que deben satisfacerse todas. Esto lo podemos modelar como un circuito.

Por ejemplo, podemos expresar un cálculo como la satisfacción del siguiente conjunto de restricciones:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$


En este caso, $a, b, d$ son entrada privada, y $e$ es salida pública [^5]. $c$ está determinada por $a$ y $b$, y por lo tanto es una variable intermedia.

Podemos visualizarlo como el siguiente circuito:

![Circuit](../assets/03_circuit.png 'Circuit')

A diferencia de un programa de computadora normal, las restricciones son desordenadas. No importa en qué orden se definan, ya que todas deben cumplirse [^6]. Esto implica que, desde el punto de vista matemático, no hay diferencia real entre la entrada pública y la salida pública.

Con frecuencia dividimos los distintos tipos de variables así [^7]:
- _Variables Testigo (Witness)_ – variables privadas, conocidas solo por el Demostrador (Prover) 
- _Variables de Instancia_ – variables públicas, de entrada o salida, conocidas tanto por el Demostrador (Prover)  como por el Verificador (Verifier)

Diferentes personas usan términos distintos, así que conviene conocer las diversas formas de referirse a estas variables. Desde el punto de vista matemático, podemos expresar el circuito anterior así:

$$
C(x,w) = 0
$$

Donde $x$ es la variable pública ($e$) y $w$ las variables testigo (witness) ($a, b, d$). Es decir, tenemos:

$$
\begin{aligned}
a \cdot b - c = 0 \\
c + d - e = 0
\end{aligned}
$$

Lo que hacemos al demostrar una ZKP es probar que se satisface un conjunto de ecuaciones, sin revelar información sobre cierto conjunto de variables privadas o testigo. [^8]


### Completitud Funcional (Functional Completeness)
¿Cómo conectamos las ecuaciones o restricciones (constraints)  que estamos resolviendo con un programa informático? La manera más sencilla de entenderlo es comenzar con el ejemplo más primitivo: boolean circuit.

Si todos los valores son booleanos, $0$ o $1$, lo llamamos un circuito booleano (boolean circuit). En álgebra booleana (boolean algebra)  todos los valores son 0 o 1. Podemos definir compuertas lógicas, igual que en un circuito eléctrónico (electronic circuit) (de ahí el nombre, circuito). Por ejemplo, XOR es o-exclusivo y puede ilustrarse mediante la siguiente tabla de verdad:

$$
\begin{array}{|c|c|c|c|}
\hline
a & b & \text{XOR} \\
\hline
0 & 0 & 0 \\
0 & 1 & 1 \\
1 & 0 & 1 \\
1 & 1 & 0 \\
\hline
\end{array}
$$

Resulta que solo necesitamos dos compuertas lógicas, `XOR` y `AND`, para expresar cualquier cómputo posible. A esto se le llama _completitud funcional (functional completeness_)  [^9], y significa que podemos describir cualquier tabla de verdad usando únicamente estas dos operaciones.

En el circuito mencionado en la sección anterior dependemos de la suma y la multiplicación. Si operamos sobre valores booleanos, resulta que estas son equivalentes:

$$
\begin{array}{|c|c|c|c|}
\hline
a & b & \text{XOR/(ADD)} & \text{AND/(MUL)} \\
\hline
0 & 0 & 0 & 0 \\
0 & 1 & 1 & 0 \\
1 & 0 & 1 & 0 \\
1 & 1 & 0 & 1 \\
\hline
\end{array}
$$

Es decir, `XOR` se comporta como `ADD` y `AND` se comporta como `MUL`. Por ejemplo, $1+1 = 0$ en álgebra booleana (módulo 2). De modo similar, podemos expresar fácilmente las compuertas `OR` y `NAND` (NOT-AND) así:

$$
\begin{aligned}
\text{OR(a,b)} &= a + b - (a \cdot b) \\
\text{NAND(a,b)} &= 1 - (a \cdot b)
\end{aligned}
$$

Con compuertas booleanas tan simples como estas podemos construir una computadora moderna. Para comprender cómo es posible, existe un libro y curso llamado _From Nand to Tetris_ que muestra cómo construir una computadora moderna desde cero usando solo una compuerta booleana `NAND`. [^10]

El sistema ZKP que veremos se llama ZKBoo, originalmente definido para circuitos booleanos. En el texto que sigue, asumiremos en cambio que _circuitos aritméticos (arithmetic circuits_)  operan sobre "enteros normales" [^11]. En el Apéndice B, veremos cómo "justificar" matemáticamente los circuitos aritméticos. Por ahora, lo único que necesitas saber es que podemos generalizar lo anterior y utilizaremos enteros normales como $1, 4, 7$, etc., como valores para nuestras variables.

### Compromisos (Commitments)
Anteriormente presentamos los compromisos (commitments)  en _Programming ZKPs: From Zero To Hero_ [^12]. Aquí haremos un breve repaso.

Los compromisos nos permiten comprometernos (es decir, "prometer") con un valor sin revelarlo. Nos comprometemos de tal forma que no podamos cambiar de opinión acerca de aquello a lo que nos comprometimos. Existen muchos tipos de compromisos, pero el más sencillo es comprometerse con un único mensaje y usar una _función hash como `SHA256` para hacerlo [^13].

Los Compromisos tienen 2 propiedades clave:
- **Vinculante (Binding)**: Una vez que te comprometes, no puedes cambiar de opinión acerca de aquello a lo que te comprometiste.
- **Ocultamiento (Hiding)**: El compromiso (commitment)  no revela ninguna información sobre el valor al que nos comprometimos.

Nos permiten realizar dos operaciones:
- **Comprometerse**: Comprometerse con un valor específico mientras se mantiene oculto.
- **Revelar**: Revelar el valor para que pueda verificarse que es correcto (coincide con aquello a lo que nos comprometimos anteriormente).

La operación de revelar también se denomina a veces "abrir" (open) en la literatura criptográfica.

Cuando nos comprometemos con un mensaje, le añadimos cierta aleatoriedad. Esto dificulta el ataque por fuerza bruta al valor que está siendo hasheado cuando el mensaje puede adivinarse fácilmente. Por ejemplo, si sabes que el mensaje es un número del 1 al 100, basta con probar todas las combinaciones hasta recrear el compromiso.

Comprometerse usando una función hash podría verse así:

$$
\text{com} = \text{SHA256}(m||r)
$$

Aquí concatenamos ($||$) el mensaje $m$ con algo de aleatoriedad $r$. Usar una función hash, como SHA256 garantiza que no podamos recuperar fácilmente el mensaje a partir de $\text{com}$.

De forma más concreta, podríamos tener:

```
SHA256('foobar213151') = '419d....1611'
```

Esto toma el mensaje `foobar`, le añade algo de aleatoriedad y obtenemos un compromiso(commitment), un hash `419d...1611`. Si entregamos este compromiso a otra persona, más tarde podemos optar por revelar los valores $m, r$. Esa persona puede entonces verificar que nuestro compromiso coincide con nuestro mensaje original $m$.

Los compromisos son muy comunes en los protocolos criptográficos porque nos permiten (a) vincularnos a valores y (b) ocultarlos. En concreto, son uno de los componentes clave de ZKBoo.

### Compartición de Secretos (Secret Sharing)
Otro componente clave de ZKBoo es la _compartición de secretos (secret sharing)_. La idea esencial es dividir un secreto en varias partes, de modo que no pueda reconstruirse sin contar con todas ellas.

Si tenemos un valor $x$, podemos dividirlo así:
$$x = x_1 + x_2 + x_3$$

Donde $x_1, x_2, x_3$ son valores elegidos aleatoriamente que suman $x$.

Si entregamos los valores $x_2$ y $x_3$ a alguien, esto no le dice nada sobre qué son $x$ o $x_1$. Por ejemplo, si tengo $7 = 4 + 2 + 1$ con $x = 7, x_1 = 4$ y te doy $2$ y $1$, no hay forma de que averigües cuál es $x$. Podríamos tener $x = 4, x_1 = 1$, $x = 5, x_1 = 2$, etc [^14].

En el contexto de ZKBoo, este tipo de compartición de secretos de variables también se conoce como _MPC-In-The-Head_. MPC significa multi-party-computation (computación multipartita) [^15] y, tradicionalmente, implica que varios actores (personas, servidores) se unan para realizar un cómputo conjunto. Aunque MPC puede ser bastante complejo, en este caso ocurre "en la cabeza", por lo que simplemente lo simulamos mentalmente. Puedes imaginar que tienes tres actores dentro de tu cabeza y a cada uno le das una parte del secreto. Visualiza estos secretos compartidos como piezas de un rompecabezas, y necesitas todas las piezas para ver la imagen completa [^16]:

![Puzzle](../assets/03_puzzle.png 'Puzzle')

### Protocolo Sigma (Sigma Protocol)
Al combinar compromisos (commitments) y la compartición de secretos (secret sharing)  en un denominado _protocolo sigma_, tenemos todos los ingredientes necesarios para ZKBoo. Un protocolo sigma es un protocolo que consta de dos partes, un Demostrador (Prover) y un Verificador (Verifier). Estas partes intercambian tres mensajes de la siguiente forma: un compromiso, un desafío y una respuesta.

$$
\begin{array}{c}
\textbf{Un Protocolo Sigma} \\[10pt]
\text{Demostrador} \xrightarrow{\text{1. Compromiso}} \text{Verificador} \\[10pt]
\text{Demostrador} \xleftarrow{\text{2. Desafío}} \text{Verificador} \\[10pt]
\text{Demostrador} \xrightarrow{\text{3. Respuesta}} \text{Verificador} \\[15pt]
\end{array}
$$

Como consiste en interacciones entre dos partes, también es un _protocolo interactivo_. Se denomina protocolo sigma porque la interacción se asemeja a la letra griega Sigma, $\Sigma$ [^17]. Un protocolo sigma permite que un Provador, de forma interactiva, convenza a un Verificador de que cierta Declaración (Statement)  es verdadera sin revelar información secreta. Puedes considerarlo un ZKP primitivo.

Al comprometerse primero con ciertos valores, el Demostrador no puede cambiar de opinión sobre ellos. Después, el Verificador desafía al Demostrador con una pregunta complicada. El Demostrador responde, y si el Verificador está satisfecho con la respuesta, queda convencido.

Existen muchos protocolos sigma distintos [^18]. Por lo general, todos comparten las siguientes propiedades clave [^19]:

- **Completitud (Completeness) **: Si un Demostrador (Prover) conoce la solución de un conjunto de restricciones (constraints) , siempre puede convencer al Verificador (Verifier).
- **Solidez (Soundness) **: El Verificador solo queda convencido si el Demostrador realmente conoce el secreto; si el Demostrador intenta hacer trampa, la probabilidad de tener éxito es despreciable.
- **Conocimiento Cero (Zero-knowledge) **: El Verificador no aprende nada sobre el secreto del Demostrador, salvo que este posee una solución válida.

Lo anterior puede parecer un poco abstracto, pero se volverá mucho más concreto una vez que veamos cómo se utiliza en la práctica para ZKBoo.

A continuación se presentan algunos ejercicios sencillos para comprobar tu comprensión.

### Ejercicios
1. En $x + 1 = y; y + 5 = z$, si $x$ es algo que el Demostrador quiere mantener en secreto, ¿cuál es la variable witness y la salida pública?
2. ¿Por qué no importa el orden de las restricciones? ¿Qué sucede si intercambiamos el orden de las dos restricciones anteriores?
3. Alice se compromete a un número usando `SHA256(x || r)`. Si luego afirma que se comprometió a 42, ¿cómo puede demostrarlo?
4. Si Bob divide `x=12` en 3 participaciones tales que $x_1 + x_2 + x_3 = x$, ¿cuál es un posible conjunto de valores para $(x_1, x_2, x_3)$? ¿Por qué revelar $x_2$ y $x_3$ no nos da ninguna información sobre $x$?
5. En un protocolo sigma, ¿por qué el Demostrador tiene que comprometerse antes de que el Verificador envíe el desafío?

## ZKBoo
_En esta sección explicaremos cómo funciona ZKBoo. Partimos de una sola restricción de suma, pasamos a múltiples restricciones y avanzamos hasta un protocolo interactivo completo. Luego lo hacemos estadísticamente sólido y, por último, lo volvemos no interactivo._

ZKBoo es un protocolo ZKP sencillo. Se basa en circuitos booleanos (boolean circuits) , compromisos (commitments) , compartición secreta (MPC-in-the-Head) y protocolos sigma (sigma protocols). Actualmente no se usa mucho en la práctica, principalmente porque la gente prefiere sistemas de prueba (proof systems)  con pruebas más pequeñas [^20]. Entonces, ¿por qué aprenderlo?

Es conceptualmente muy simple. Esto significa que puedes comprender toda la matemática que hay detrás e implementarlo por tu cuenta. No requiere matemáticas avanzadas ni mucha criptografía para asimilarlo. Esto lo hace ideal para desarrollar intuición sobre cómo funciona la matemática detrás de las ZKPs en la práctica. Una vez que entiendas un protocolo ZKP en detalle, será mucho más fácil compararlo con otros protocolos ZKP. Veremos esto hacia el final del artículo y en artículos futuros. Esto te ayudará a tomar decisiones informadas sobre qué protocolo ZKP usar según las circunstancias.

### Dividiendo nuestras variables con compartición secreta
Recordemos el sistema de ecuaciones presentado anteriormente:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Para simplificar, centrémonos en demostrar que $c + d = e$, donde $c$ y $d$ son privados y $e$ es público. Empleando compartición secreta (secret sharing), dividimos cada variable en tres partes aleatorias:

$$
\begin{aligned}
c &= c_1 + c_2 + c_3 \\
d &= d_1 + d_2 + d_3 \\
e &= e_1 + e_2 + e_3 \\
\end{aligned}
$$

Las participaciones deben preservar la relación $c + d = e$, siendo $c_i + d_i = e_i$ para cada $i$. En el paradigma MPC-in-the-Head, cada columna con subíndice $_0, _1, _2$ representa a un actor interno que contiene una parte del secreto. Podemos visualizar la compartición de secretos en la siguiente tabla:

$$
\begin{array}{c|ccc}
 & \text{Columna 1} & \text{Columna 2} & \text{Columna 3} \\ \hline
\text{Fila 1} & c_1 & c_2 & c_3 \\
\text{Fila 2} & d_1 & d_2 & d_3 \\
\text{Fila 3} & e_1 & e_2 & e_3 \\
\end{array}
$$

Así es como dividimos estas variables para lograrlo:

- Para la primera fila, generamos aleatoriamente $c_1, c_2, c_3$ de modo que $c_1 + c_2 + c_3 = c$
- Para la segunda fila, hacemos lo mismo para $d_1, d_2, d_3$ y $d$
- Para la tercera fila, definimos $e_1 = c_1 + d_1$, $e_2 = c_2 + d_2$ y $e_3 = c_3 + d_3$, asegurándonos de que $e = e_1 + e_2 + e_3$

Si el Verificador desafía al Demostrador a revelar dos columnas aleatorias, por ejemplo $(2,3)$, verifica que:

$$
\begin{aligned}
c_2 + d_2 \stackrel{?}{=} e_2 \\
c_3 + d_3 \stackrel{?}{=} e_3
\end{aligned}
$$

Debido a que las partes se generan aleatoriamente, revelar dos columnas no aporta ninguna información sobre $c, d$, y aun así demuestra que la relación (relation) se mantiene.

De aquí en adelante, no construiremos la tabla con filas ni columnas de forma explícita, pero siempre puedes dibujarla por tu cuenta. Solo recuerda que una columna corresponde a una parte.

### Protocolo Sigma para ZKBoo
Como Demostrador, quieres convencer al Verificador de que conoces $c$ y $d$ que satisfacen la ecuación anterior sin revelarlos. A continuación mostramos cómo lograrlo con un protocolo sigma.

6. El Demostrador realiza un compromiso con cada columna, $1..3$, y lo envía al Verificador
7. El Verificador desafía al Demostrador pidiéndole que revele dos columnas, $(i, j)$
8. El Demostrador responde con los valores de las columnas que el Verificador solicita

Una vez que el Verificador dispone de esos valores, realizará dos verificaciones:
- Chequeo de consistencia: verifica que los valores sumen, p. ej. $c_i + d_i = e_i$
- Chequeo de compromiso: verifica que los compromisos coincidan con los valores que el Demostrador respondió

Si ambas verificaciones se superan, entonces el Verificador queda razonablemente convencido [^21] de que el Demostrador conoce $c$ y $d$. Al comprometerse, el Demostrador también utiliza cierta aleatoriedad para garantizar que los valores no puedan forzarse por fuerza bruta. Gracias a las propiedades de ocultamiento de los compromisos y de la compartición secreta, el Demostrador no revela nada acerca de $c$ y $d$ en sí mismos.

Aquí tienes un diagrama de este protocolo sigma:

$$
\begin{array}{c}
\textbf{Demostrador \hspace{4cm} Verificador} \\
\xrightarrow{\text{Compromiso: } \{\text{com}_1, \text{com}_2, \text{com}_3\}\ \text{ donde } \text{com}_k = \text{hash}(c_k, d_k, e_k, r_k) \text{ for } k =1,2,3} \\
\xleftarrow{\text{Desafío: Revela dos columnas } (i, j)} \\
\xrightarrow{\text{Respuesta: } (c_i, d_i, e_i, r_i), (c_j, d_j, e_j, r_j)} \\
\text{Chequeo del Verificador:} \\
\begin{aligned}
9. &\quad c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j, \\
10. &\quad \text{com}_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, \text{com}_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j).
\end{aligned}
\end{array}
$$

Esto logra las tres propiedades que nos importan:
- Completitud (completeness)  – El Demostrador (Prover) conoce una solución y siempre puede convencer al Verificador (Verificador)
- Solidez (soundness)  – El Verificador solo queda convencido si el Demostrador realmente conoce el secreto (veremos a continuación el caso en que el Demostrador hace trampa)
- Conocimiento cero (zero-knowledge)  – El Verificador no aprende nada sobre $c$ y $d$ (salvo que suman $e$)

Aunque los compromisos impiden que el Demostrador altere los valores de las columnas ya que no puede cambiar el contenido de las mismas, todavía existen algunos problemas. ¿Qué pasa si el Prover adivina qué columnas le va a desafiar el Verificador? Solo hay tres opciones posibles $(1,2), (1,3), (2,3)$. En ese caso, puede hacer trampa asegurándose únicamente de que esas columnas sumen, sin conocer $c$ y $d$. ¡Esto significa que existe una enorme probabilidad de hacer trampa de $\frac{1}{3}$!

Esto pone de relieve la naturaleza estadística de la solidez. En la criptografía práctica, las probabilidades suelen desempeñar un papel para garantizar la seguridad. El objetivo es reducir el riesgo de hacer trampa a un nivel despreciable — astronómicamente pequeño. Veremos cómo lograrlo pronto, utilizando múltiples rondas del protocolo.

Pero antes, veamos cómo tratamos la multiplicación y las restricciones múltiples.

### Soporte para multiplicación
Regresemos a nuestro conjunto original de restricciones:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

La suma como $c+d=e$ era suficientemente sencilla. ¿Qué hay de la multiplicación? Queremos descomponer la relación $a \cdot b = c$ en partes secretas. ¿Cómo podemos hacerlo?

Primero observamos lo siguiente. Si dividimos ingenuamente $a, b, c$ y fijamos $c_i = a_i \cdot b_i$, esto no funciona. ¿Por qué?


$$
\begin{aligned}
a \cdot b & = (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) \\
&= a_1 b_1 + a_1 b_2 + a_1 b_3  + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
&\neq a_1 b_1 + a_2 b_2 + a_3 b_3
\end{aligned}
$$

Esto se debe a que la multiplicación no es lineal, por lo que obtenemos términos cruzados:

$$
a_1b_2, a_1b_3, a_2b_1, a_2b_3, a_3b_1, a_3b_2
$$

Necesitamos encontrar una mejor forma de asignar $c_i$ para mantener las relaciones coherentes. Podemos lograrlo dividiendo los términos cruzados de manera equitativa entre cada parte [^22]:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 \\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 \\
\end{aligned}
$$

Ahora la relación se cumple. Tenemos:

$$
\begin{aligned}
a \cdot b &= (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) = \dots = c_1 + c_2 + c_3 = c
\end{aligned}
$$

Sin embargo, surge un nuevo problema. Al revelar dos columnas, por ejemplo $(1,2)$, filtramos información sobre la tercera. Con $(1,2)$ revelamos parte de la información de la tercera columna mediante los factores $a_2 b_3 + a_3 b_2$. Dependiendo de lo que representen los valores, el Verificador podría inferir cuáles son $a_3$ y $b_3$.

Podemos solucionar esto añadiendo algo de aleatoriedad:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 + r_1 - r_2\\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 + r_2 - r_3 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 + r_3 - r_1 \\
\end{aligned}
$$

Ahora, seguimos teniendo $c = c_1 + c_2 + c_3$, porque todas las variables aleatorias se anulan:

$$
r_1 - r_2 + r_2 - r_3 + r_3 - r_1 =0
$$

Al añadir algo de aleatoriedad, no revelamos ninguna información sobre la tercera columna. De este modo, utilizamos la aleatoriedad para enmascarar información sensible, un truco habitual en criptografía.

A qué “pertenecen” $r_1, r_2, r_3$? Los añadimos como otra variable. Visto como una tabla con filas y columnas, tenemos:

$$
\begin{array}{c|ccc}
 & \text{Columna 1} & \text{Columna 2} & \text{Columna 3} \\ \hline
a & a_1 & a_2 & a_3 \\
b & b_1 & b_2 & b_3 \\
r & r_1 & r_2 & r_3 \\[6pt]
c & c_1 & c_2 & c_3 \\
\end{array}
$$
donde $c_1$, $c_2$ y $c_3$ se fijan como arriba. Observa cómo al revelar las columnas $(1,2)$ se revelan $r_1$ y $r_2$, pero $r_3$ queda desconocido, ocultando así el valor de la tercera columna.

### Combinándolo todo
Por último, para combinar lo anterior con el conjunto original de restricciones:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Como Demostrador, hacemos lo siguiente:
- Establecemos las partes $a, b, d$ aleatoriamente, como se indicó arriba
- Definimos $c$ tal que $a \cdot b = c$, y lo mismo para todas sus partes
- Definimos $e$ tal que $c+d=e$, y de forma similar para todas sus partes

A continuación mostramos nuestro protocolo sigma actualizado con compromiso-desafío-respuesta:

$$
\begin{array}{c}
\textbf{Demostrador \hspace{4cm} Verificador} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ donde } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ for } k = 1,2,3} \\
\xleftarrow{\text{Revela dos columnas } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

El Verificador realiza (a) chequeos de consistencia y (b) chequeos de compromiso.

Chequeo de consistencia para cada restricción:
- Verifica $a \cdot b = c$ para las partes:
  - $c_i \stackrel{?}{=} (a_i b_i + a_i b_j + a_j b_i) + (r_i - r_j)$,
  - $c_j \stackrel{?}{=} (a_j b_j + a_j b_k + a_k b_j) + (r_j - r_k)$
  - Nótese que los subíndices i,j,k para los términos r se toman $\mod 3$.
- Verifica $c + d = e$ para las partes: $c_i + d_i \stackrel{?}{=} e_i, \quad  c_j + d_j \stackrel{?}{=} e_j$

Chequeos de compromiso:

- $com_i \stackrel{?}{=} \text{hash}(a_i, b_i, c_i, d_i, e_i, r_i), \quad com_j \stackrel{?}{=} \text{hash}(a_j, b_j, c_j, d_j, e_j, r_j)$

Como se indicó arriba, $r_k$ corresponde a la $k$-ésima columna, que no se revela. Dependiendo de cómo ejecutemos múltiples rondas, esta columna puede o no ser revelada. Aun así verificamos $c_i$, dado que las columnas $i$ y $j$-ésima sí se revelan.

Con esto, hemos probado un conjunto de restricciones utilizando suma y multiplicación, demostrando así la completitud funcional. Lo hicimos de una forma que mantiene los valores privados protegidos y convence al Verificador de que el Demostrador los conoce. A continuación, veremos cómo mejorar la solidez ejecutando el protocolo en múltiples rondas.

### Mejorando la Solidez
Analicemos más críticamente el protocolo sigma que especificamos anteriormente. ¿Qué pasa si el Demostrador hace trampa? Supongamos que adivina que el Verificador elegirá la columna $(2,3)$. Entonces, en realidad no necesita conocer los valores privados. Por ejemplo, en $c + d = e$ no tiene que conocer $c$ ni $d$, ni $c_1$ ni $d_1$. Puede simplemente inventar valores que hagan que la prueba de consistencia se cumpla. Esto se debe a que el Verificador solo comprueba la segunda y la tercera columna.

Recuerda las comprobaciones que realiza el Verificador:

- Chequeo de consistencia: $c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j$
- Chequeo de compromiso: $com_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, com_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j)$

Más concretamente, podemos elegir valores aleatorios para $c_2, d_2$ tales que $c_2 + d_2 = e_2$, y lo mismo para $c_3, d_3$. Esto no exige conocer $c$ ni $d$. Si el Demostrador supone que se escogerá $(2,3)$, el Verificador solo comprueba que $c_2 + d_2 = e_2$ y $c_3 + d_3 = e_3$. Esto no sirve.

Por supuesto, debido a los compromisos (commitments) , el Demostrador no puede cambiar de opinión. Sin este chequeo de compromiso, podría hacer trampa en cada intento. Por eso necesitamos la propiedad de enlace de los compromisos y por eso el compromiso se envía antes de que el Verificador decida qué partes inspeccionar.

¿Cuál es la probabilidad de adivinar correctamente? Existen tres combinaciones posibles de dos columnas: $(1,2), (1,3), (2,3)$. Esto implica que hay una probabilidad de $\frac{1}{3}$ de hacer trampa [^23]. A esto lo llamamos el error de solidez (soundness error). Nos gustaría reducirlo a una probabilidad mucho menor.

¿Cómo podemos hacerlo? Resulta que podemos ejecutar el protocolo sigma en múltiples rondas. Cada vez el Verificador elige un nuevo par de partes aleatorias. Por supuesto, después de que el Verificador haya elegido, por ejemplo, $(1,2)$ y $(2,3)$, conoce los valores de las tres partes y puede reconstruir fácilmente los originales $c$ y $d$, lo cual no nos conviene.

La forma de evitar este problema, manteniendo baja la probabilidad de engaño, es crear nuevas partes secretas en cada ronda. Para una variable dada, la dividimos como $x = x_1 + x_2 + x_3$, donde $x_1, x_2, x_3$ son valores aleatorios que hacen que la ecuación se cumpla. Hacemos esto para cada variable. El Verificador lanza el desafío, pide dos partes y realiza las pruebas de consistencia y compromiso. En la siguiente ronda volvemos a usar nuevas partes aleatorias para dividir nuestras variables. De este modo, el Verificador no puede combinar la información que recibió en rondas distintas, porque lo único que ve son partes aleatorias diferentes.

Con esto, ¿cuál es la probabilidad de engañar? Para la restricción de suma vista arriba, en cada ejecución es $\frac{1}{3}$, y si hacemos $n$ ejecuciones obtenemos:

$$
\left(\frac{1}{3}\right)^n
$$

Si $n$ es lo bastante grande, la probabilidad de hacer trampa es despreciable. Por ejemplo, si realizamos 100 rondas obtenemos una probabilidad de $(\frac{1}{3})^{100} \approx 10^{-48}$. Esto es extremadamente bajo. Para seguridad adicional, basta con ejecutar más rondas. Para más detalles sobre el error de solidez (soundness error), véase la nota al pie [^24].

Aunque esto es mucho más seguro, requiere numerosas interacciones entre el Demostrador y el Verificador. En cada ronda hay que intercambiar 3 mensajes, y en 100 rondas eso suma 300 mensajes ida y vuelta, ¡nada práctico en la vida real! Para solucionarlo, veamos cómo convertir este protocolo en no interactivo y reducirlo a un único mensaje mediante la _Transformación de Fiat-Shamir.

### Transformada de Fiat-Shamir
Logramos que el protocolo fuera estadísticamente seguro ejecutándolo en múltiples rondas. Aquí está el protocolo sigma que teníamos para una sola ronda:

$$
\begin{array}{c}
\textbf{Demostrador \hspace{4cm} Verificador} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ donde } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ for } k = 1,2,3} \\
\xleftarrow{\text{Revela dos columnas } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

El objetivo de la _Transformada de Fiat-Shamir_ es convertir este _protocolo interactivo_ en uno _no interactivo_, donde el Demostrador envía un único mensaje, una prueba, y el Verificador posee toda la información necesaria para verificarla.

¿Por qué el Verificador envía el desafío después de los compromisos? Porque no quiere que el Demostrador cambie de opinión y haga trampa eligiendo él mismo las columnas. Esto rompería la _solidez (soundness)_. Desde la perspectiva del Demostrador, esta selección es aleatoria. ¿Podemos obtener esa aleatoriedad de otro modo, sin que la genere el Verificador?

Aquí entra en juego la Transformada de Fiat-Shamir. La idea clave es sustituir la aleatoriedad que usa el Verificador por una función de hash determinista. Dado que las funciones de hash se comportan como pseudo-aleatorias [^25], podemos emplearlas para generar un número aleatorio que luego se use para seleccionar dos columnas al azar.

A un alto nivel, en lugar de esto:
$$
\begin{array}{c}
\textbf{Un Protocolo Sigma} \\[10pt]
\text{Demostrador} \xrightarrow{\text{1. Compromiso}} \text{Verificador} \\[10pt]
\text{Demostrador} \xleftarrow{\text{2. Desafío}} \text{Verificador} \\[10pt]
\text{Demostrador} \xrightarrow{\text{3. Respuesta}} \text{Verificador} \\[15pt]
\end{array}
$$

Hacemos esto:
$$
\begin{array}{c}
\textbf{Un Protocolo No Interactivo} \\[10pt]
\text{Demostrador} \xrightarrow{\text{\{Compromiso, Desafío, y Respuesta\}}} \text{Verificador} \\[15pt]
\end{array}
$$

El desafío (challenge) debe generarse mediante un hash e incluir compromisos (commitments) así como cierta información pública. Es algo en lo que el Demostrador y el Verificador acuerdan en silencio, no algo que el demostrador pueda decidir por su cuenta. De hecho, ni siquiera necesitamos enviar el desafío, ya que puede calcularse por ambas partes. El demostrador crea los compromisos, calcula los desafíos y las respuestas —todo localmente— y envía esto al verificador. A su vez, el verificador anota los compromisos, vuelve a calcular el desafío por su cuenta y verifica las respuestas y los compromisos.

¿Cómo se calcula el desafío? ¿Por qué funciona esto? Como entrada para nuestro hash, usamos cierta información pública, y esto actúa como semilla aleatoria[^26] que ni el demostrador ni el público pueden controlar la salida. Esto significa que no tenemos que comunicar esta información, sino que cada uno puede calcular esta fuente de aleatoriedad por su cuenta. A continuación se muestra cómo podría verse el desafío en la práctica:

$$
\text{Desafío} = \text{hash}(com_1, com_2, com_3, \text{<información pública>})
$$

Al añadir cierta información pública `<información pública>`, como el nombre del circuito (circuit)  (por ejemplo, `zkboo-example`) y la entrada pública (por ejemplo, el valor `5` de e), el demostrador no controla toda la entrada de la función hash. También es crucial incluir todos los compromisos como entrada a esta función hash, para que el demostrador no pueda cambiar de opinión sobre lo que comprometió. Dado que las funciones hash como SHA256 son determinísticas, el verificador recreará el mismo desafío, siempre que tenga acceso a toda su entrada.

En nuestro caso, el verificador elige dos columnas $(i,j)$ de un total de 3. Hay tres posibilidades, así que podemos simplemente tomar nuestro hash aleatorio y aplicar $\mod 3$ para obtener la selección de columnas de forma determinística.

Si solo hacemos una ronda, es muy fácil que el demostrador haga trampa adivinando qué columnas se elegirán, luego cree compromisos y calcule el desafío. Si el desafío resulta en que haya "adivinado correctamente", puede entonces fabricar una prueba falsa. Si no, puede ajustar las entradas para crear compromisos ligeramente diferentes y esperar tener suerte en la siguiente ejecución del hash. Después de todo, todo esto se realiza localmente, por lo que el verificador no se entera de ello.   

Por eso es crucial ejecutar múltiples rondas del protocolo. Y, específicamente, necesitamos usar cada ronda anterior como entrada para el desafío de la ronda siguiente. Solo así podemos alcanzar las mismas garantías de solidez[^27].

Para garantizar la solidez, el desafío de cada ronda debe depender de todos los compromisos anteriores. Esto impide que el demostrador "retroceda" para generar resultados favorables. Calculamos el desafío para la ronda $k$ de la siguiente manera:

$$
\text{desafío}_k = \text{hash}(com_{1,1}, com_{1,2}, com_{1,3}, \dots, com_{k,3}, \text{<información pública>}, k) \mod 3
$$

Donde $com_{k,i}$ es el compromiso (commitment) correspondiente a la k-ésima ronda de la parte $i$, y la `<información pública>` es un marcador de posición para cierto conocimiento público compartido predeterminado. Al añadir $k$ garantizamos que cada ronda tenga un desafío (challenge)  único, incluso si se repiten los commitments y la información pública. La información pública actúa como una fuente fija de aleatoriedad, lo que significa que ni el Demostrador ni el Verificador controlan la salida del hash. Finalmente, tomamos el resultado $\mod 3$ para que corresponda con una elección de columna $(i, j)$.

El Demostrador envía los compromisos y las respuestas para todas las rondas. Toda esta información constituye la prueba (proof)  $\Pi$. El Verificador recalcula los desafíos de cada ronda, verifica las respuestas y los compromisos, y acepta o rechaza la prueba
    
$$
\begin{array}{c}
\text{Demostrador} \xrightarrow{\Pi = \{\text{Compromisos: } \{com_{k,1}, com_{k,2}, com_{k,3}\}, \text{Respuestas: } \{(c_{k,i_k}, \dots)\}} \text{Verificador} \\[15pt]
\end{array}
$$

¿Por qué funciona esto? Estamos usando la propiedad _vinculante (binding)_ de los compromisos (commitments)  para asegurar que el Demostrador no pueda cambiar entradas anteriores una vez que se genera el desafío (challenge) . Todos los desafíos dependen de compromisos previos, y como ejecutamos el protocolo en $k$ rondas garantizamos la solidez (soundness)  con muy alta probabilidad.

Esto es excelente, y ahora solo necesitamos un único mensaje para convencer al Verificador. Sin embargo, sigue habiendo un problema: esto requiere una cantidad considerable de datos. Observa cómo cada prueba requiere $3 \cdot k$ compromisos, así como $n \cdot k$ respuestas, donde $n$ es el número de variables y $k$ es el número de rondas. Si tenemos un número significativo de variables, y si $k$ es aproximadamente 100, el tamaño de la prueba es bastante grande.

Desafortunadamente, con nuestras herramientas actuales no podremos hacer que esta prueba sea más _concisa_. Para ello, necesitaremos añadir más herramientas a nuestra caja de herramientas. Pero eso es para otra ocasión. Lo abordaremos hacia el final del artículo.

Si estás interesado en cómo pasamos de circuitos booleanos (boolean circuits)  a circuitos aritméticos (arithmetic circuits) , consulta el Apéndice B. A continuación, veamos cómo ZKBoo encaja en el panorama más amplio de ZKP.

### Ejercicios
1. En un protocolo sigma (sigma protocol) con 3 partes, donde se revelan dos partes, ¿cuál es la probabilidad de que un Demostrador (Prover) tramposo convenza a un Verificador (Verifier) en una sola ronda? ¿Cómo ayuda ejecutar múltiples rondas?
2. Si el Demostrador supiera de antemano qué columnas elegiría el Verificador, ¿Cómo podría hacer trampa?
3. En Fiat-Shamir, ¿Por qué calcular el hash de todos los commitments antes de generar el desafío hace más difícil hacer trampa?

## zkSNARKs
_Explica la conexión entre el ZKP anterior y los zkSNARKs (Zero-Knowledge Succinct Non-Interactive ARguments of Knowledge). Desglosamos cada propiedad y vemos cómo se relaciona con ZKBoo._

Es posible que hayas notado que llamamos a ZKBoo una prueba (proof) de conocimiento cero (zero-knowledge), o ZKP (Zero Knowledge Proof), y no un zkSNARK, un término que tal vez hayas oído antes. Aunque no todo el mundo utiliza los términos correctamente [^28], es útil comprender a qué se refiere cada una de estas propiedades.

Coloquialmente, llamamos a las ZKPs "pruebas". Técnicamente, sin embargo, se trata de argumentos de conocimiento (Arguments of Knowledge). La distinción está relacionada con la naturaleza de la solidez (soundness). Vimos previamente cómo obteníamos completitud (completeness), solidez y conocimiento cero mediante los protocolos sigma. En conjunto, las propiedades de completitud y solidez nos brindan argumentos de conocimiento. En la práctica, dependemos de la _solidez computacional_ (computational soundness), lo que, técnicamente, los convierte en un argumento de conocimiento y no en una prueba. [^29]

La propiedad de conocimiento cero que acabamos de revisar implica que no revelamos nada sobre nuestro testigo (witness) al Verifier. Curiosamente, muchos proyectos "ZK" y "zkSNARKs" en la práctica ni siquiera ofrecen realmente la propiedad de conocimiento cero. Un término más preciso sería quizá _cómputo verificable_ y (S)NARKs, pero suena mucho menos atractivo.

Ya revisamos la propiedad no interactiva (la "N" en zkSNARKs). Resulta que podemos tomar prácticamente cualquier ZKP y volverlo no interactivo mediante la transformada de Fiat-Shamir. Lo habitual es definir primero un protocolo sigma interactivo y, posteriormente, convertirlo en no interactivo con Fiat-Shamir.

Por último, la propiedad que aún no hemos tratado es la _concisión (succinctness)_. Esto implica dos cosas: (a) la prueba es corta y (b) la prueba se verifica rápidamente. Desafortunadamente, ZKBoo carece de esta propiedad. Para lograrla necesitaremos herramientas matemáticas más avanzadas; en particular, polinomios (polynomials)  y criptografía de curva elíptica (elliptic curve cryptography) . Profundizaremos en ello en un artículo futuro.

### Sobre la concisión (succinctness)
¿Por qué ZKBoo no es conciso? Cuando hablamos de concisión nos referimos a dos propiedades distintas:
- Tamaño de prueba conciso: la prueba es corta
- Tiempo de verificación conciso: la prueba se verifica rápidamente

Por lo general, estas propiedades aparecen juntas, pero las analizamos por separado [^30].

Primero enfoquémonos en cuán grande es la prueba. Ya señalamos que cada prueba requiere un número de compromisos (commitments)  y respuestas proporcional a $n$, donde $n$ es el número de restricciones (constraints) , o el tamaño del circuito (circuit) , $|C|$. Cuando decimos que una prueba es corta, nos interesa principalmente cómo cambia su tamaño en función del número de restricciones. Por tamaño nos referimos a cuántas piezas de datos deben enviarse, lo que en la práctica se correlaciona con los bytes totales necesarios para representar una prueba.

A menudo usamos la notación _Big-Oh_ (también escrita _Big-O_) para describir cómo se comporta una función a medida que aumenta el número de elementos sobre los que opera [^31]. En el caso de ZKBoo, el tamaño de la prueba crece linealmente con el número de restricciones, es decir, $O(n)$ en notación Big-Oh. Por ejemplo, si el circuito tiene $n = 1000$ restricciones, la prueba necesitará del orden de 1000 compromisos y respuestas.

Con la notación Big-Oh podemos hablar del orden de aproximación sin perdernos en los detalles [^32]. A continuación se muestra una ilustración de algunas clases de complejidad comunes:

![Big Oh Complexity](../assets/03_bigoh.png 'Big Oh Complexity')

Para que una prueba sea concisa, idealmente debe ser "sublineal". ¿Qué significa sublineal? Cualquier complejidad estrictamente "por debajo" de $O(n)$ en la gráfica anterior. Por ejemplo, $O(\log n)$ (logarítmica) o $O(1)$ (constante) [^31], [^33].

Intuitivamente, esto implica que al añadir más restricciones, el tamaño de la prueba aumenta cada vez menos. El mejor rendimiento es $O(1)$, donde el tamaño de la prueba permanece igual sin importar el número de restricciones.

¿Qué sucede con el tiempo requerido para verificar la prueba? El Verificador debe realizar comprobaciones de consistencia para todas las restricciones. Esto equivale esencialmente a volver a evaluar todo el circuito. Esto implica que el tiempo de verificación es lineal, es decir, $O(n)$, donde $n$ es el número de restricciones $|C|$. Por lo tanto, ZKBoo no posee un tiempo de verificación sublineal. Aquí, el tiempo corresponde al número de operaciones que un Verificador debe efectuar y, en la práctica, se correlaciona con el "tiempo de reloj" real. En consecuencia, ZKBoo carece de un tiempo de verificación conciso (succinct).

A menudo deseamos la concisión (succinctness), ya que implica que podemos demostrar cómputos arbitrarios en poco espacio (y rápidamente). ¿Por qué ZKBoo no nos ofrece esto y qué se puede hacer al respecto?

En el fondo, el problema es que las herramientas que utilizamos son demasiado primitivas. Con nuestro esquema de compromiso (commitment scheme) actual y la compartición de secretos (secret sharing), debemos representar y evaluar todas las restricciones. En su lugar, podemos emplear _polinomios (polynomials)_ para comprimir nuestras restricciones en un espacio más reducido. Esto nos lleva al concepto de _esquemas de compromiso polinomial (polynomial commitment schemes)_. Pero esa es una historia para otra ocasión.

### Siguiente
_Adelantos de lo que viene, con polinomios, concisión (succinctness), PCS, IOP y comparaciones; ya sea para una gran pausa de café o para el próximo artículo._

Hemos visto cómo crear un ZKP no interactivo de extremo a extremo con ZKBoo. Esto nos brinda una base excelente para comprender el panorama más amplio de los zkSNARKs.

A continuación, algunas cosas que podemos esperar:
- Comprender la importancia de los polinomios y cómo permiten la concisión
- Generalizar los compromisos hacia esquemas de compromiso polinomial (PCS)
- Generalizar el protocolo sigma hacia pruebas de oráculo interactivo polinomial (IOP)
- Entender el marco PCS + IOP polinomial para los sistemas ZKP modernos
- Explorar los distintos PCS: KZG / FRI / IPA
- Comprender los diferentes dominios de prueba: generación del lado servidor vs. del lado cliente
- Analizar dimensiones clave: tamaño del campo, seguridad post-cuántica, trusted setups, supuestos de seguridad
- Cómo las blockchains públicas pueden utilizarse para verificar pruebas
- Por qué los STARKs son SNARKs
- Circuitos estructurados vs. no estructurados
- Otros ZKPs novedosos

No profundizaremos tanto en esos temas, pero te proporcionaremos suficientes recursos para que te sientas seguro de (a) profundizar más por tu cuenta o (b) elegir un zkSNARK que se adapte a tus necesidades específicas.

### Ejercicios
4. ¿Qué propiedades obtenemos de ZKBoo?
5. ¿Por qué ZKBoo no es conciso? De forma intuitiva.

### Problemas
Estos son problemas opcionales que requerirán un poco más de esfuerzo.
6. Implementar múltiples rondas en SageMath (ver Apéndice A)
7. Implementar Fiat-Shamir en SageMath (ver Apéndice A)
8. Encontrar algunos sistemas de prueba que conozcas. Identificar en qué se parecen y en qué difieren entre sí. Compáralos y contrástalos con ZKBoo.

### Conclusión
_Resumen de lo que vimos._

En este artículo partimos de una comprensión básica de las ZKPs y un bagaje mínimo de matemáticas. Luego presentamos conceptos clave como los circuitos (circuits) , la completitud funcional (functional completeness) , los compromisos (commitments) , la compartición de secretos (secret sharing)  y los protocolos sigma (sigma protocols) .

Luego tomamos esos conceptos clave y vimos cómo usarlos para construir un ZKP con ZKBoo. Examinamos un conjunto de restricciones y observamos cómo podíamos demostrarlas, comenzando con una restricción de suma sencilla. Vimos cómo hacerlo funcionar para múltiples restricciones y cómo aprovechamos la aleatoriedad en las restricciones de multiplicación. Analizamos la seguridad del protocolo y mejoramos su solidez ejecutándolo varias veces. Finalmente, volvimos todo el proceso no interactivo mediante Fiat-Shamir.

Después de eso, profundizamos un poco más en temas específicos. Vimos cómo generalizar los circuitos booleanos a circuitos aritméticos usando campos finitos (finite fields) , y repasamos las propiedades de los zkSNARKs y cómo se aplican a ZKBoo. Desarrollamos una intuición de por qué ZKBoo no logra concisión. Y, por último, insinuamos algunos temas más avanzados que podremos explorar a continuación.

Si quieres profundizar en tu comprensión, una buena idea es revisar los fragmentos de código (Appendix A) y ver cómo puedes ampliarlos o modificarlos. Si algo resultó confuso, ¡no dudes en contactar! Mucha suerte en tu viaje ZK y nos vemos pronto.

## Agradecimientos
Gracias a Hanno Cornelius, dmpierre, Aayush Gupta, Adrian Li, Chih-Cheng Liang y r4bbit por leer los borradores y aportar sus comentarios sobre este trabajo.

Gracias a [Alex Padilla](https://x.com/padimaster), Gelois y [Yago Pajariño](https://x.com/0xyago) por la traducción de este artículo.

### Imágenes
- _Big O cheatsheet_ - Eric Rowell, Dominio Público, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Big-O_Cheatsheet.png)

## Apéndice A: Código de ZKBoo
_Lo que sigue es un ejemplo de código para implementar ZKBoo de forma concisa en SageMath._

Hay un repositorio de código disponible aquí: https://github.com/oskarth/zkintro-math

Muestra una implementación de varios constructos especificados en el artículo anterior. Aunque no es obligatorio, puede ser útil relacionar las ecuaciones matemáticas con código real. Está implementado en SageMath, un software matemático construido sobre Python. Se lee prácticamente como pseudocódigo, y nos permite expresar las matemáticas de forma concisa en código.

En el repositorio tenemos los siguientes ejemplos:
- `commitments_shares.sage` - compromisos básicos y compartición de secretos
- `zkboo_add.sage` - restricción básica de suma en ZKBoo
- `zkboo_mul.sage` - restricciones básicas de suma y multiplicación en ZKBoo

Extender lo anterior para soportar múltiples rondas y la transformada de Fiat-Shamir queda por ahora como ejercicio para el lector.

En total, el protocolo ZKBoo puede describirse sin problemas en menos de 100 líneas de código [^34]. Una vez que existe un prototipo matemático en Sage, resulta mucho más sencillo "migrarlo" a lenguajes como Python, JavaScript, Rust o Go para su uso en el mundo real.

El siguiente fragmento de código (`zkboo_mul.sage`) demuestra la completitud funcional de una ronda interactiva de ZKBoo en 60 líneas de código con comentarios. Puede ampliarse para usar múltiples rondas y volverse no interactivo mediante Fiat-Shamir en menos de 100 líneas de código

```python
import random, hashlib
from sage.all import GF

p = 101  # Prime field modulus
F = GF(p)  # Finite field

def secret_share(v):
    """Split 'v' into 3 random shares mod p."""
    s1, s2 = F.random_element(), F.random_element()
    return [s1, s2, (v - s1 - s2) % p]

def commit(vals):
    """Hash tuple of values to produce a commitment."""
    return hashlib.sha256(",".join(map(str, vals)).encode()).hexdigest()

def multiply_shares(a, b):
    """Compute c_i for a single gate a*b=c with offsets r_i."""
    r = [F.random_element() for _ in range(3)]
    c = [(a[i] * b[i] + a[i] * b[(i + 1) % 3] +
          a[(i + 1) % 3] * b[i] + r[i] - r[(i + 1) % 3]) % p
         for i in range(3)]
    assert sum(c) % p == (sum(a) * sum(b)) % p
    return c, r

def zkboo_prover(a, b, d):
    """Generate shares for a,b,d and compute c=a*b, e=c+d with random offsets."""
    a_sh, b_sh, d_sh = secret_share(a), secret_share(b), secret_share(d)
    c_sh, r_sh = multiply_shares(a_sh, b_sh)
    e_sh = [(c_sh[i] + d_sh[i]) % p for i in range(3)]
    commits = [commit((a_sh[i], b_sh[i], c_sh[i], d_sh[i],
                       e_sh[i], r_sh[i])) for i in range(3)]
    return a_sh, b_sh, c_sh, d_sh, e_sh, commits, r_sh

def zkboo_verifier_challenge():
    """Pick two random shares to reveal."""
    return random.sample(range(3), 2)

def zkboo_prover_response(ch, a, b, c, d, e, r):
    """Reveal the requested two shares with all data."""
    return [{"a": a[i], "b": b[i], "c": c[i], "d": d[i],
             "e": e[i], "r": r[i]} for i in ch]

def zkboo_verify(ch, resp, commits):
    """Check commitments and verify correctness of revealed shares."""
    if any(commit((resp[i]["a"], resp[i]["b"], resp[i]["c"],
                   resp[i]["d"], resp[i]["e"], resp[i]["r"]))
           != commits[ch[i]] for i in range(2)):
        return False

    def check_c(sh_i, sh_j):
        """Ensure multiplication consistency of revealed shares."""
        return (sh_i["a"] * sh_i["b"] + sh_i["a"] * sh_j["b"] +
                sh_j["a"] * sh_i["b"] + (sh_i["r"] - sh_j["r"])) % p == sh_i["c"]

    # Check correct share pairs are used for verification
    if (ch[0] + 1) % 3 == ch[1] and not check_c(resp[0], resp[1]):
        return False
    if (ch[1] + 1) % 3 == ch[0] and not check_c(resp[1], resp[0]):
        return False
    return all((share["c"] + share["d"]) % p == share["e"] for share in resp)

def test_zkboo_single_round():
    """Test a single-round reveal for a,b,d = 3,4,5."""
    a, b, d = F(3), F(4), F(5)
    a_sh, b_sh, c_sh, d_sh, e_sh, commits, r_sh = zkboo_prover(a, b, d)
    ch = zkboo_verifier_challenge()
    resp = zkboo_prover_response(ch, a_sh, b_sh, c_sh, d_sh, e_sh, r_sh)
    assert zkboo_verify(ch, resp, commits), "ZKBoo single-round failed"
    print("Single-round test passed!")

test_zkboo_single_round()
```

## Apéndice B: Circuitos Aritméticos
_Esta sección explica cómo generalizar los circuitos booleanos anteriores a circuitos aritméticos._

En matemáticas existe un área llamada _álgebra abstracta_. Estudia diversas estructuras algebraicas y las operaciones definidas sobre ellas. Por ejemplo, tenemos el conjunto de _números naturales_ o el _conjunto de números enteros_:


$$
\begin{aligned}
\mathbb{N} &= \{1, 2, 3, \dots\} \\
\mathbb{Z} &= \{\dots, -2, -1 ,0, 1, 2, \dots\}
\end{aligned}
$$

Combinamos estos conjuntos con algunas operaciones, como la _suma_ o _la multiplicación_, que funcionan de una manera particular. Con ello podemos hablar de estructuras como _conjuntos_, _grupos_, _anillos_ y _campos_. Las definiciones concretas de estas estructuras no son tan importantes por ahora. La idea clave es que cada estructura aporta más capacidades

$$
Conjuntos \subset Grupos \subset Anillos \subset Campos
$$

En particular, los campos permiten la _división_ (salvo entre cero). Esto se debe a que existe un inverso multiplicativo para cada elemento de un campo. En cambio, esto no ocurre en el conjunto de los enteros con suma y multiplicación, escrito $(\mathbb{Z}, +, \cdot)$ [^35].

Por ejemplo, el inverso multiplicativo de $3$ es $\frac{1}{3}$ (ya que $3 \cdot \frac{1}{3} = 1$), algo que no existe en $\mathbb{Z}$ porque $\frac{1}{3}$ no es un entero [^36]. Si habláramos del conjunto de los números reales $\mathbb{R}$, no habría problema, pues $0.33\ldots$ pertenece a él; así, $(\mathbb{R}, +, \cdot)$ constituye un campo.

Sin embargo, las computadoras funcionan sobre hardware físico y solo manejan números de tamaño limitado. Por ello, en criptografía nos interesan los _campos finitos_ (finite fields) , es decir, campos con un conjunto finito de elementos. Por ejemplo:

$$
\mathbb{F}_5 = \{{0, 1, 2, 3, 4}\}
$$

Muchos protocolos criptográficos requieren división y una aritmética modular bien definida. Resulta que podemos construir un campo finito simplemente restringiéndolo a $\mod p$, donde $p$ es un número primo [^37]. Escribimos esto ya sea como $\mathbb{F}_p$ o $\mathbb{GF}(p)$. El $\mathbb{GF}$ significa campo de Galois (Galois Field) , que es otro nombre para los campos finitos [^38].

En el ejemplo anterior, si excluimos $0$ (ya que la división entre $0$ no está permitida; indicado por $^*$), tenemos:

$$
\mathbb{F}^*_5 = \mathbb{GF}^*(5) = \{{1,2,3,4}\}
$$

Podemos ver que cada elemento tiene un inverso multiplicativo en el conjunto. Por ejemplo, $2 \cdot 3 \mod 5 \equiv 1$。

En el ZKBoo anterior, estamos usando $\mathbb{GF}(2)$, el finite field más simple, para boolean circuits. Arithmetic circuits generalizan esto a $\mathbb{GF}(p)$, donde $p$ es un número primo. Esto significa que todas las operaciones, adición y multiplicación, se realizan $\mod p$, asegurando que los valores permanezcan dentro de ese field. Esto nos permite trabajar con números mayores que 0 y 1. En este field, adición y multiplicación funcionan bien, por lo que podemos realizar aritmética modular bien definida. Podemos usar enteros como esperamos, siempre y cuando estén acotados por (menores que) un número primo específico. En la práctica, a menudo usamos números primos muy grandes [^39]. Esto implica que podemos expresar números muy grandes y la aritmética asociada de manera bien definida.

## Apéndice C: definiciones matemáticas de zkSNARKs
Hagamos la sección anterior sobre zkSNARKs un poco más precisa, manteniendo un tono matemáticamente informal [^40]. Si estás satisfecho con el texto principal, puedes omitir este apéndice.

**Completitud (Completeness)** - para todo par $(x, w)$ en $C(x,w)$ la probabilidad de que el Verificador (Verifier)  V acepte la Prueba (Proof)  del Demostrador (Prover)  $P(x,w)$ es 1. Es decir:

$$
\forall x, w: C(x,w) = 0 \implies Pr[V(x, P(x, w)) = \text{accept }] = 1
$$

**Solidez** (Soundness) - V acepta la prueba $\pi$ $\implies$ P "conoce" $w$ s.t. $C(x,w) = 0$, y si la prueba $\pi$ es falsa, $Pr[\text{V acepta } \pi] \leq \text{probabilidad despreciable, e.g }2^{-80}$ [^41]

**Conocimiento Cero (Zero-Knowledge)** - $C(x, \pi$) con la prueba $\pi$ no revela nada sobre $w$

**Concisión (Succinctness)** - la prueba $\pi$ es "corta" y $V(x, \pi)$ es "rápido" de verificar.

Corto tiene diferentes definiciones, pero usualmente significa $\text{len}(\pi) = \text{sublinear}(|w|)$, donde $|w|$ es el tamaño del testigo (witness) [^33].

Rápido de verificar significa $\text{tiempo}(V) = O_{\lambda}((|x|, \text{sublineal}(|C|))$, donde $O_{\lambda}$ significa "orden de" en Notación Big-Oh[^31], y $|C|$ es el tamaño del circuito (circuit) .

A veces quasi-lineal, p. ej. $O(n \log n)$, se acepta como suficientemente conciso.

**No interactivo (Non-interactive)** - Basta con que el Demostrador (Prover) envíe $\pi$ al Verificador (Verifier) para convencerlo; el Verificador puede Verificar la Prueba (Proof) con $x$ y $\pi$.[^42]

## Referencias
[^1]: Graduado en STEM significa alguien que estudió Ciencia, Tecnología, Ingeniería o Matemáticas en una universidad o equivalente.
[^2]: Por ejemplo, usando un motor de búsqueda, un LLM (Modelo de Lenguaje a Gran Escala (Large Language Model) , p. ej. usando herramientas de IA como ChatGPT), o un amigo. Por ejemplo, podrías pedirle a un LLM que ELI5 (Explain Like I'm Five) un concepto específico.
[^3]: Crédito a Aayush Gupta por la idea de usar ZKBoo para explicar ZKPs, basada en su [experiencia previa (video)](https://www.youtube.com/watch?v=CGWjjEiLN9w). También puedes leer el [artículo original](https://eprint.iacr.org/2016/163.pdf), aunque es un poco difícil de penetrar. Geometry Research también tiene una [publicación](https://geometry.xyz/notebook/paper-speedrun-zkboo) explicando el protocolo, pero requiere más conocimientos de fondo para entenderlo.
[^4]: [SageMath](https://www.sagemath.org/) es un sistema matemático construido sobre Python que nos permite centrarnos en lo esencial. Se lee como pseudocódigo, traduciendo naturalmente los símbolos matemáticos en código.
[^5]: Si $a, b$ son números primos grandes, entonces es muy difícil obtenerlos a partir de la salida pública $e$.
[^6]: Suponiendo que las variables intermedias están definidas, pero esto es un detalle de implementación; como sistema de ecuaciones es solo otra variable desconocida que se determina por las demás restricciones. Por ejemplo, podríamos igualmente escribir el conjunto de restricciones anterior como $c+d=e; a \cdot b = c$.
[^7]: Las variables intermedias también a veces se llaman variables internas, y son más un detalle de implementación. Vale la pena notar que estas solo son conocidas por el demostrador (prover) , ya que podrían filtrar información sobre las entradas privadas.
[^8]: Hay diferentes formas de expresar este conjunto de ecuaciones, como R1CS, Plonkish, etc. A esto lo llamamos _arithmetization_.
[^9]: Aunque no son idénticos, la [completitud funcional](https://en.wikipedia.org/wiki/Functional_completeness) está relacionada con el concepto de [completitud de Turing](https://en.wikipedia.org/wiki/Turing_completeness).
[^10]: Consulta el libro _Elements of Computing Systems (Nisan, 2005_) y el curso complementario [From Nand to Tetris](https://www.nand2tetris.org). También hay un libro llamado _But How Do It Know? (Scott, 2009)_ que explica cómo funcionan las computadoras partiendo del álgebra booleana.
[^11]: Enteros acotados por $\mod{p}$ para algún número primo $p$. Consulta el Apéndice B para más detalles.
[^12]: Consulta [Programming ZKPs: From Zero to Hero](https://zkintro.com/articles/programming-zkps-from-zero-to-hero). Esto no es un requisito, pero podría aclarar la conexión entre las matemáticas y el código.
[^13]: Consulta [funciones hash criptográficas](https://en.wikipedia.org/wiki/Cryptographic_hash_function) para más detalles. Hay muchas funciones hash criptográficas diferentes, pero SHA256 es una de las más usadas.
[^14]: Técnicamente hablando, dado solo $x_2$ y $x_3$, tanto $x$ como $x_1$ permanecen indeterminados, lo que significa que tenemos dos [grados de libertad](https://en.wikipedia.org/wiki/Degrees_of_freedom). La ecuación está [indeterminada](https://en.wikipedia.org/wiki/Underdetermined_system), porque hay más incógnitas que valores conocidos.
[^15]: Consulta [computación segura multipartita](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Es, de hecho, un área separada de ZK. Un modelo mental útil es que MPC trata con secretos compartidos entre múltiples participantes, mientras que ZK se ocupa de los secretos de una sola persona.
[^16]: Alternativamente, en $x = x_1 + x_2 + x_3$, si conoces $x$ y dos de las otras partes, puedes reconstruir la tercera parte, ya que $x - x_1 - x_2 = x_3$. En la metáfora del rompecabezas, esto correspondería a tener dos de las tres piezas y saber cómo debería verse la imagen final, aunque falte una pieza.
[^17]: Puede que tengas que entrecerrar los ojos para verlo; las puntas de flecha superior e inferior forman la parte superior e inferior de la Sigma, y la punta de flecha del medio forma la parte central.
[^18]: Probablemente el ejemplo más canónico de un [protocolo sigma](https://en.wikipedia.org/wiki/Proof_of_knowledge#Sigma_protocols) es la prueba de conocimiento del [logaritmo discreto](https://en.wikipedia.org/wiki/Discrete_logarithm). Aunque es "más simple", requiere un poco más de conocimientos matemáticos para entenderlo. Tampoco nos acerca a comprender ZKBoo, por lo que omitimos este ejemplo.
[^19]: La mayoría de los protocolos sigma tienen las tres propiedades, pero algunos no tienen la propiedad de conocimiento cero (zero-knowledge) .
[^20]: Dos razones para esto: ZKBoo llegó más tarde que otros protocolos, y las pruebas (proofs)  no son concisas. Veremos más sobre esto al final del artículo.
[^21]: Pronto analizaremos más a fondo la noción de _solidez (soundness) _.
[^22]: Con todos los cálculos realizados $\mod p$. Consulta el Apéndice B para más detalles.
[^23]: En el ejemplo de restricción de multiplicación (multiplication constraint) , dado que solo se comprueba efectivamente una columna, esto significa que la probabilidad de engañar, asumiendo únicamente restricciones de multiplicación, es $\frac{2}{3}$. Intuitivamente, la mayoría de los ejemplos del mundo real tendrían una mezcla de suma y multiplicación, y basta con que falle una verificación de consistencia para detectarlo. Consulta el artículo original para un análisis de solidez más preciso.
[^24]: En la práctica, a menudo hablamos del error de solidez en términos de _bits de seguridad_ que tiene un protocolo. Esto indica la dificultad de romper un protocolo y, por lo tanto, cuán seguro es. Para ZKBoo, si queremos tener 80 bits de seguridad, debemos hacer 137 rondas. Esto se puede calcular usando $n = \frac{\sigma}{\log_2(3) - 1}$. Consulta el artículo para más detalles.
[^25]: Es decir, parecen estadísticamente aleatorios pese a ser generados por un proceso determinista. Consulta [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness).
[^26]: Consulta [semilla aleatoria](https://en.wikipedia.org/wiki/Random_seed).
[^27]: Hay muchas maneras de tropezar con Fiat-Shamir en la práctica; consulta [Fiat-Shamir in the Wild (artículo)](https://orbilu.uni.lu/handle/10993/62161) y [How to Prove False Statements (artículo)](https://eprint.iacr.org/2025/118).
[^35]: $(\mathbb{Z}, +, \cdot)$ es un _anillo (ring) _; más precisamente, es un _anillo conmutativo (commutative ring) _ (o anillo abeliano (abelian ring) ) dado que la multiplicación es conmutativa ($a \cdot b = b \cdot a$).
[^36]: Llamamos aquí a $1$ el elemento identidad (identity element)  $e$. Existe tanto para la adición (normalmente 0) como para la multiplicación (normalmente 1). Consulta la [definición de campo (field) ](<https://en.wikipedia.org/wiki/Field_(mathematics)#Definition>) para más.
[^37]: Y también lo que se denomina extensiones de campo primarias (prime extension fields) , como $p^n$.
[^38]: En criptografía aplicada y ciencias de la computación, la notación $\mathbb{GF}(p)$ es más común, mientras que en matemáticas puras es más común $\mathbb{F}_p$. El nombre campo de Galois (Galois Field) honra al matemático francés Galois, quien los descubrió. Él sentó las bases del álgebra abstracta y murió en un duelo a los 20 años.
[^39]: Por ejemplo, $2^{255} - 19$. La elección precisa del número primo es un tema más profundo, con nociones como pairing-friendliness, especialmente en sistemas criptográficos. Consulta, por ejemplo, por qué se eligió BN254 en Zcash.
[^40]: En esta explicación omitimos la noción de un paso de preprocesamiento (preprocessing setup)  $\text{Setup}(C) \rightarrow (pp, vp)$, con parámetros del demostrador (prover)  ($pp$)  y parámetros del verificador (verifier)  ($vp$) 。Por lo general esto se incluye en las definiciones, pero no lo necesitamos en ZKBoo.
[^41]: No entraremos en los detalles precisos de lo que significa aquí "conocer" al testigo (witness) , porque requiere entender nociones como solidez de conocimiento adaptativa (adaptive knowledge soundness)  y extractores (extractors) , que no son necesarias para tener una comprensión conceptual de la solidez estadística (statistical soundness) . Si quieres profundizar, el libro de Thaler o las clases de Boneh son buenos recursos. Consulta también la nota al pie 29.
[^42]: Así como otra información predefinida, como el algoritmo de desafío (challenge)  Fiat-Shamir, y posiblemente algunas "claves de verificación" (verification keys)  (aunque no en el caso de ZKBoo) .