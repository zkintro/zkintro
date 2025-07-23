---
title: 'Programando ZKPs: De cero a héroe'
date: '2025-07-23'
tags: ['conocimiento cero']
draft: false
layout: PostSimple
slug: "/es/programming-zkps-from-zero-to-hero"
images: [../assets/02_combined.png']
summary: "Aprende a escribir y modificar pruebas de conocimiento cero desde cero. Construirás un esquema de firma digital usando compromisos basados en hash, adquiriendo habilidades prácticas e intuición en programación de ZKP. Al final, tendrás todas las herramientas necesarias para implementar cosas como firmas grupales."
---

_A tutorial introduction for the working programmer._

_Una introducción práctica para programadores en ejercicio._

Do you know why zebras have stripes? One theory is that it is a form of camouflage. When zebras are in a herd together, it makes it harder for the lion to distinguish their prey. Lions have to isolate their prey from the flock to be able to go after it. [^1]


¿Sabes por qué las cebras tienen rayas? Una teoría sugiere que funcionan como camuflaje. Al moverse en manada, las rayas confunden al león y le impiden identificar una presa concreta. Para atacar, necesita aislarla del grupo. [^1]


Humans like to hide in a crowd too. One specific example of this is when multiple people act as one under a collective name. This was done for the Federalist Papers which led to the ratification of the United States Constitution. Multiple individuals wrote essays under the single Pseudonym "Publius". [^2] Another example is Bourbaki, a collective pseudonym for a group of French mathematicians in the 1930s. This lead to a complete re-write of large parts of modern mathematics with their focus on rigor and the axiomatic method. [^3]


A los humanos también les gusta ocultarse entre la multitud. Un ejemplo concreto de esto es cuando varias personas actúan como una sola bajo un nombre colectivo. Esto se hizo con los *Federalist Papers*, que llevaron a la ratificación de la Constitución de los Estados Unidos. Varios individuos escribieron ensayos bajo el seudónimo único de "Publius". \[2] Otro ejemplo es Bourbaki, un seudónimo colectivo utilizado por un grupo de matemáticos franceses en la década de 1930. Esto condujo a una reescritura completa de grandes partes de las matemáticas modernas, con un enfoque en el rigor y el método axiomático.


![02_bourbaki](https://hackmd.io/_uploads/Hk1EN8N8lg.png)


*_Congreso de Bourbaki en 1938_*

In the digital age, let's say you are in a group chat and want to send a controversial message. You want to prove that you are one of its members, without revealing which one. How can we do this in the digital realm using cryptography? We can use something called _group signatures_.

En la era digital, supongamos que estás en un grupo de chat y quieres enviar un mensaje controvertido. Quieres probar que eres uno de sus miembros, sin revelar cuál. ¿Cómo podemos lograr esto en el mundo digital usando criptografía? Podemos usar algo llamado _firmas de grupo_.


Traditionally speaking, group signatures are quite mathematically involved and hard to implement. However, with Zero Knowledge Proofs (ZKPs), this math problem becomes a straightforward programming task. By the end of this article, you'll be able to program group signatures yourself.




Tradicionalmente, las firmas de grupo son bastante complejas desde el punto de vista matemático y difíciles de implementar. Sin embargo, con las Pruebas de Conocimiento Cero (ZKPs), este problema matemático se convierte en una tarea de programación sencilla. Al final de este artículo, serás capaz de programar firmas de grupo por ti mismo.



## Introducción

This post will show you how to write basic Zero Knowledge Proofs (ZKPs) from scratch.

Esta publicación te mostrará cómo escribir Pruebas de Conocimiento Cero (ZKPs) básicas desde cero.


When learning a new tech stack, we want to get a hang of the edit-build-run cycle as soon as possible. Only then can we start to learn from our own experience.

Al aprender una nueva stack tecnológico, queremos familiarizarnos lo antes posible con el ciclo de editar, compilar y ejecutar. Solo entonces podremos empezar a aprender de nuestra propia experiencia.



We will start by getting you to setup your environment, write a simple program, perform a so-called trusted setup, and then generate and verify proofs as quickly as possible. After that, we'll identify some ways to improve our program, implement these improvements and test them. Along the way, we'll build up a better mental model of the pieces involved in programming ZKPs in practice. At the end of, you'll be familiar with (one way of) writing ZKPs from scratch.

Comenzaremos configurando tu entorno, escribiendo un programa simple, realizando la llamada configuración confiable (trusted setup), y luego generando y verificando pruebas de la manera más rápida posible. Después, identificaremos algunas formas de mejorar nuestro programa, implementaremos estas mejoras y las probaremos. A lo largo del proceso, construiremos un modelo mental más claro de las partes involucradas en la programación práctica de Pruebas de Conocimiento Cero (ZKPs). Al final, estarás familiarizado con (una forma de) escribir ZKPs desde cero.




We will build up step by step to a simple signature scheme where you can prove that you sent a specific message. You'll be able to understand what this piece of code is doing and why:


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

You'll also have been given all the tools and techniques necessary to modify this to support the group signature scheme mentioned above.

También habrás recibido todas las herramientas y técnicas necesarias para modificar esto y soportar el esquema de firmas de grupo mencionado anteriormente.


### Pre-requisitos

We assume you are a software engineer with working experience in more than one programming language, who has basic familiar with using Unix-style command line interfaces. We also assume you have a passing familiarity with concepts like _digital signatures_, _public-key cryptography_ and _hash functions_. Nonetheless, we'll introduce their relevant properties as they become relevant.

Asumimos que eres un ingeniero de software con experiencia práctica en más de un lenguaje de programación y que tienes familiaridad básica con el uso de interfaces de línea de comandos estilo Unix. También asumimos que conoces conceptos como _firmas digitales_, _criptografía de clave pública_ y _funciones hash_. No obstante, iremos presentando sus propiedades relevantes a medida que sean necesarias.


When it comes to _Zero Knowledge Proofs_, we assume you've read my previous post, [_A Friendly Introduction to Zero Knowledge_](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge). If you haven't read this article, we'll quickly recap the most important things here. For better understanding, we recommend reading the above article first. If you have already read it, you can safely skip the below.

En cuanto a las _Pruebas de Conocimiento Cero_, asumimos que has leído mi publicación anterior, [_Una introducción amigable a Zero Knowledge_](https://zkintro.com/es/articles/friendly-introduction-to-zero-knowledge/). Si no la has leído, aquí haremos un breve repaso de los aspectos más importantes. Para una mejor comprensión, recomendamos leer primero el artículo mencionado. Si ya lo has leído, puedes omitir lo siguiente con seguridad.


### Recapitulazición de ZKPs

Zero Knowledge Proofs (ZKPs) are a fairly new form of cryptography that have seen more practical applications lately. While traditional cryptography allows us to do things like signatures and encryption, ZKPs allows us to prove arbitrary statements in a general-purpose way.

Las Pruebas de Conocimiento Cero (ZKPs) son una forma relativamente nueva de criptografía que ha visto aplicaciones más prácticas últimamente. Mientras que la criptografía tradicional nos permite realizar tareas como firmas y cifrado, las ZKPs nos permiten demostrar afirmaciones arbitrarias de manera general.


Outside of proving arbitrary statements, ZKPs give us two key properties: privacy and compression. These are also known as zero knowledge and succinctness, respectively. Privacy means we can prove something without revealing anything else. Compression means the proof of an arbitrary statement stays roughly the same size regardless of how complex the computation we are proving is. ZKPs are also general-purpose. Roughly speaking, this is the difference between a calculator, made for a specific task, and a computer, that can compute anything.

Además de permitirnos probar afirmaciones arbitrarias, las ZKPs nos brindan dos propiedades clave: privacidad y compresión. Estas también se conocen como conocimiento cero y sucintez, respectivamente. Privacidad significa que podemos probar algo sin revelar ninguna otra información. Compresión significa que la prueba de una afirmación arbitraria mantiene un tamaño aproximadamente constante, sin importar cuán compleja sea la computación que estamos demostrando. Las ZKPs también son de propósito general. En términos generales, esta es la diferencia entre una calculadora, diseñada para una tarea específica, y una computadora, que puede realizar cualquier cálculo.


Two concrete examples of ZKPs:

- We can take a digital identity card and prove that we are over 18 years old
  - Without revealing anything else, like your full name or address
- We can prove that all state transitions have been executed correctly
  - Such as in a public blockchain, with the resulting proof being very small

Dos ejemplos concretos de ZKPs:

- Podemos tomar una tarjeta de identidad digital y demostrar que somos mayores de 18 años  
  - Sin revelar ninguna otra información, como tu nombre completo o dirección  
- Podemos probar que todas las transiciones de estado se han ejecutado correctamente  
  - Por ejemplo, en una blockchain pública, con la prueba resultante siendo muy pequeña  


We can program many common types of ZKPs by writing special programs known as circuits. This allows one party, a prover, to create a proof of some statement. Another party, known as a verifier, can then verify this proof. Like a normal program, this program can take input and produce output. For these special programs, we can specify if the input is private or public. If it is private, it means only the prover can see this input. We program circuits by specifying constraints. One example of a constraint is "in a Sudoku puzzle all numbers 1 through 9 must be used exactly once in a row".

Podemos programar diversos tipos habituales de ZKPs escribiendo programas especiales llamados circuitos. Esto permite que una parte, llamada demostrador, cree una prueba de alguna afirmación. Otra parte, conocida como verificador, puede entonces verificar esta prueba. Al igual que un programa normal, este programa puede recibir entradas y producir salidas. Para estos programas especiales, podemos especificar si la entrada es privada o pública. Si es privada, significa que solo el demostrador puede ver esta entrada. Programamos circuitos especificando restricciones. Un ejemplo de restricción es "en un rompecabezas de Sudoku, todos los números del 1 al 9 deben usarse exactamente una vez en una fila".


ZKPs are fairly new but they are already used a lot in public blockchains, for example, to allow private payments with fungible money, or to allow more transactions to be processed faster.

Las ZKPs son relativamente nuevas, pero ya se utilizan mucho en blockchains públicas, por ejemplo, para permitir pagos privados con dinero fungible o para procesar más transacciones de manera más rápida.


More and more applications are being discovered and developed every day. There are also a lot of different flavors of ZKPs, all with their own set of trade-offs, and it is a very active area of research. These different flavors are being developed rapidly, and allow for increased efficiency and other affordances.

Cada día se descubren y desarrollan más aplicaciones. También existen muchas variantes de ZKPs, cada una con sus propios compromisos, y es un área de investigación muy activa. Estas variantes se están desarrollando rápidamente y permiten una mayor eficiencia y otras ventajas.


## Visión general

We are going to use Circom and Groth16. Circom is a domain-specific language (DSL) for writing ZKP circuits. Groth16 is a common and popular proving system. Roughly speaking, a proving system is just one way that you can program ZKPs. Other DSLs and proving systems also exists.

Vamos a usar Circom y Groth16. Circom es un lenguaje específico de dominio (DSL) para escribir circuitos de ZKP. Groth16 es un sistema de pruebas común y popular. En términos generales, un sistema de pruebas es solo una forma de programar ZKPs. También existen otros DSLs y sistemas de pruebas.


We'll start by installing some tools and dependencies. After that, we'll proceed in the following rough steps:

- Write (write circuit)
- Build (build circuit)
- Setup (trusted setup)
- Prove (generate proof)
- Verify (verify proof)

Comenzaremos instalando algunas herramientas y dependencias. Después, avanzaremos en los siguientes pasos aproximados:

- Escribir (write circuit)  
- Compilar (build circuit)  
- Configurar (trusted setup)  
- Probar (generate proof)  
- Verificar (verify proof)  


After having gone through this flow once, we'll look at some problems with the current approach. We'll then make several incremental improvements, building up to the signature scheme above. Along the way, we'll explain necessary concepts and syntax.

Después de haber recorrido este flujo una vez, analizaremos algunos problemas con el enfoque actual. Luego, haremos varias mejoras incrementales, hasta llegar al esquema de firma mencionado arriba. A lo largo del camino, explicaremos los conceptos y la sintaxis necesarios.


At the end of each section, we'll also include some simple exercises that will check your understanding. These exercises are recommended. At the very end of the article we'll also include a list of problems. Problems are optional and require a lot more effort.

Al final de cada sección, también incluiremos algunos ejercicios simples para comprobar tu comprensión. Se recomienda realizar estos ejercicios. Al final del artículo, incluiremos además una lista de problemas. Estos problemas son opcionales y requieren un esfuerzo mucho mayor.


### Preparación

First up, we have to install some tools and dependencies. We have prepared a [git repo](https://github.com/oskarth/zkintro-tutorial) that makes it easier for you to get started without getting lost in the weeds with details. If you prefer not to install any software, see the end of this section.

Primero, tenemos que instalar algunas herramientas y dependencias. Hemos preparado un [repositorio git](https://github.com/oskarth/zkintro-tutorial) que facilita que comiences sin perderte en los detalles. Si prefieres no instalar ningún software, consulta el final de esta sección.


The pre-requisites we require are:

- `rust` (the programming language)
- `just` (a modern `make`)
- `npm` (package manager for JavaScript)

Los prerrequisitos que requerimos son:

- `rust` (el lenguaje de programación)  
- `just` (un `make` moderno)  
- `npm` (administrador de paquetes para JavaScript)  

The ZKP tools we will actually use are:

- `circom` (for building our special program, or _circuit_)
- `snarkjs` (for setup, and generating/verifying proofs)
- `just` tasks (to simplify common operations related to above)

Las herramientas de ZKP que usaremos realmente son:

- `circom` (para construir nuestro programa especial, o _circuito_)  
- `snarkjs` (para la configuración y la generación/verificación de pruebas)  
- tareas de `just` (para simplificar operaciones comunes relacionadas con lo anterior)  


To install the above as well as make building and running things easier you can clone and use the [git repo](https://github.com/oskarth/zkintro-tutorial). This should work on any Unix-like system like MacOS and Linux. If you use Windows we suggest using a Linux VM, Windows Subsystem for Linux (WSL), or similar for development.


```shell
# Clone the repo and run the prepare script
git clone git@github.com:oskarth/zkintro-tutorial.git
cd zkintro-tutorial

# Skim the contents of this file before executing it
less ./scripts/prepare.sh
./scripts/prepare.sh
```

Para instalar lo anterior y facilitar la compilación y ejecución, puedes clonar y usar el [repositorio git](https://github.com/oskarth/zkintro-tutorial). Esto debería funcionar en cualquier sistema tipo Unix como MacOS y Linux. Si usas Windows, recomendamos usar una máquina virtual Linux, el Subsistema de Windows para Linux (WSL) o algo similar para el desarrollo.


```shell
# Clona el repositorio y ejecuta el script de preparación
git clone git@github.com:oskarth/zkintro-tutorial.git
cd zkintro-tutorial

# Revisa el contenido de este archivo antes de ejecutarlo
less ./scripts/prepare.sh
./scripts/prepare.sh
```

We recommend you skim the contents of `./scripts/prepare.sh` to see what this will install, or if you prefer to install things manually. Once executed you should see `Installation complete` and no errors.

Recomendamos que revises rápidamente el contenido de `./scripts/prepare.sh` para ver qué se instalará, o si prefieres instalar las cosas manualmente. Una vez ejecutado, deberías ver el mensaje `Installation complete` y ningún error.


If you get stuck, please see the latest official documentation [here](https://docs.circom.io/getting-started/installation/). Once done, you should have the following versions (or higher) installed:

Si te quedas atorado, consulta la documentación oficial más reciente [aquí](https://docs.circom.io/getting-started/installation/). Al finalizar, deberías tener instaladas las siguientes versiones (o superiores):


```shell
> circom --version
circom compiler 2.1.8

> snarkjs | head -n 1
snarkjs@0.7.4
```

In the repo there is a `justfile` that defines a set of common commands. These `just` commands aim to simplify common operations on ZKPs, so you can focus on conceptual understanding of the actual steps involved. This makes the process much less error-prone when you are starting out.

En el repositorio hay un `justfile` que define un conjunto de comandos comunes. Estos comandos de `just` buscan simplificar las operaciones habituales sobre ZKPs, para que puedas enfocarte en la comprensión conceptual de los pasos involucrados. Esto hace que el proceso sea mucho menos propenso a errores cuando estás comenzando.


If at any time you want to see in more detail what commands are being executed, we recommend you look at the `justfile` and the various scripts in the `scripts` folder.

Si en algún momento quieres ver con más detalle qué comandos se están ejecutando, te recomendamos revisar el `justfile` y los distintos scripts en la carpeta `scripts`.


We highly recommend installing the above software for following along the tutorial and building intuition. However, If you do not want to install any software, you can follow along in a limited capacity using an online REPL (Read-Eval-Print Loop) tool such [zkrepl.dev](https://zkrepl.dev). If you do not want to install `just` and prefer to execute all the commands yourself you can do so with a little extra effort by using the accompanying shell scripts.

Recomendamos encarecidamente instalar el software mencionado para seguir el tutorial y desarrollar intuición. Sin embargo, si no deseas instalar nada, puedes seguir con capacidades limitadas usando una herramienta REPL (Read-Eval-Print Loop) en línea como [zkrepl.dev](https://zkrepl.dev). Si no quieres instalar `just` y prefieres ejecutar todos los comandos tú mismo, puedes hacerlo con un poco más de esfuerzo usando los scripts de shell que acompañan este repositorio.


## Primera iteración

We are now ready to start coding. To build up to the signature scheme mentioned above, we will start with a very simple program, the equivalent of a "Hello World" in other programming languages.

Ya estamos listos para comenzar a programar. Para llegar al esquema de firma mencionado anteriormente, empezaremos con un programa muy simple, el equivalente a un "Hola Mundo" en otros lenguajes de programación.


In practical terms, we will write a special program that will help us prove knowledge of two secret numbers whose product is a public number, _without ever revealing the secret numbers themselves_. For example, the public number might be "33" and the secret numbers are "11" and "3". This is an important stepping stone towards digital signatures and will build help intuition for how ZKPs work. If you are familiar with public-key cryptography, you can - very loosely - think of the secret numbers as a "private key" and the public number as a "public key".

En términos prácticos, escribiremos un programa especial que nos permitirá probar el conocimiento de dos números secretos cuyo producto es un número público, _sin revelar nunca los números secretos en sí_. Por ejemplo, el número público podría ser "33" y los números secretos "11" y "3". Este es un paso fundamental hacia las firmas digitales y ayudará a desarrollar intuición sobre cómo funcionan las ZKPs. Si estás familiarizado con la criptografía de clave pública, puedes —muy libremente— pensar en los números secretos como una "clave privada" y en el número público como una "clave pública".


Since this is a different way of programming involving many new concepts, don't worry if things don't make sense at first. You can always keep going, focusing on the code, generating proofs, etc and come back to a specific section later on.

Como este es un enfoque distinto de programación que implica muchos conceptos nuevos, no te preocupes si al principio algo no tiene sentido. Siempre puedes seguir avanzando, concentrarte en el código, generar pruebas, etc., y volver a una sección específica más adelante.


### Escribe un programa especial

Unlike most other programming, writing these special programs, circuits, look a bit different. What we are interested in is proving a _set of constraints_. [^4] The simplest set of constraints we can prove consists of a single constraint. [^5] What we will constrain is that two numbers multiplied by each other equal a third one.

A diferencia de la mayoría de los otros tipos de programación, escribir estos programas especiales, llamados circuitos, luce un poco diferente. Lo que nos interesa es probar un _conjunto de restricciones_. [^4] El conjunto más simple de restricciones que podemos probar consiste en una sola restricción. [^5] Lo que vamos a restringir es que dos números multiplicados entre sí sean iguales a un tercer número.


Go to the `example1` folder in the `zkintro-tutorial` repository above. There's a skeleton program in `example1.circom`. Modify it to look like this:

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

This is our special program, or _circuit_. [^6] Going line by line:

- `pragma circom 2.0.0;`- defines the version of Circom being used
- `template Multiplier()` - templates are the equivalent to objects in most programming languages, a common form of abstraction
- `signal input a;` - our first input, `a`; inputs are private by default
- `signal input b;` - our second input, `b`; also private by default
- `signal output c;` - our output, `c`; outputs are always public
- `c <== a * b;` - this does two things: assigns the signal `c` a value _and_ constrains `c` to be equal to the product of `a` and `b`
- `component main = Multiplier2()` - instantiates our main component

Este es nuestro programa especial, o _circuito_. [^6] Línea por línea:

- `pragma circom 2.0.0;` - define la versión de Circom que se está utilizando  
- `template Multiplier()` - las plantillas (templates) son el equivalente a objetos en la mayoría de los lenguajes de programación, una forma común de abstracción  
- `signal input a;` - nuestra primera entrada, `a`; las entradas son privadas por defecto  
- `signal input b;` - nuestra segunda entrada, `b`; también privada por defecto  
- `signal output c;` - nuestra salida, `c`; las salidas son siempre públicas  
- `c <== a * b;` - esto hace dos cosas: asigna un valor a la señal `c` _y_ restringe que `c` sea igual al producto de `a` y `b`  
- `component main = Multiplier2();` - instancia nuestro componente principal  


The most important line is `c <== a * b;`. This is where we actually declare our constraint. This expression is actually a combination of two: `<--` (assignment) and `===` (equality constraint). [^7] A constraint in Circom can only use operations involving constants, addition or multiplication. It enforces that both sides of the equation must be equal. [^8]

La línea más importante es `c <== a * b;`. Aquí es donde realmente declaramos nuestra restricción. Esta expresión es en realidad una combinación de dos: `<--` (asignación) y `===` (restricción de igualdad). [^7] Una restricción en Circom solo puede usar operaciones que involucren constantes, suma o multiplicación. Esta instrucción obliga a que ambos lados de la ecuación sean iguales. [^8]


### Sobre las restricciones

How do constraints work? In the context of something like Sudoku, we might say a constraint is "a number between 1 and 9". In the context of Circom however, this is not a single constraint, but instead something we have to express using a set of simpler equality constraints (`===`). [^9]

¿Cómo funcionan las restricciones (constraints)? En el contexto de algo como el Sudoku, podríamos decir que una restricción es "un número entre 1 y 9". Sin embargo, en el contexto de Circom, esto no es una única restricción, sino algo que tenemos que expresar usando un conjunto de restricciones de igualdad más simples (===). [^9]

Why is this the case? This has to do with what is mathematically going on under the hood. Fundamentally, most ZKPs use _arithmetic circuits_ which represents computation over _polynomials_. When dealing with polynomials, you can easily introduce constants, add them together, multiply them and check if they are equal to each other. [^10] Other operations have to be expressed in terms of these fundamental operations. You do not have to understand this in detail in order to write ZKPs, but it can be useful to have some intuitition of what is going on under the hood. [^11]

¿Por qué es así? Esto se debe a lo que matemáticamente ocurre detrás de escena. Fundamentalmente, la mayoría de las ZKP usan _circuitos aritméticos_ que representan cálculos sobre _polinomios_. Al trabajar con polinomios, puedes introducir constantes fácilmente, sumarlas, multiplicarlas y verificar si son iguales entre sí. [^10] Otras operaciones deben expresarse en términos de estas operaciones fundamentales. No necesitas entender esto en detalle para escribir ZKPs, pero puede ser útil tener cierta intuición de lo que ocurre detrás de escena. [^11]


We can visualize the circuit as follows:

Podemos visualizar el circuito de la siguiente manera:

![02_example1_circuit](https://hackmd.io/_uploads/HkYWCqAIll.png)


### Construyendo nuestro circuito


For your reference, the final file can be found in `example1-solution.circom`. For more details on the syntax, see the [official documentation](https://docs.circom.io/circom-language/signals/).

Para tu referencia, el archivo final se encuentra en `example1-solution.circom`. Para más detalles sobre la sintaxis, consulta la [documentación oficial](https://docs.circom.io/circom-language/signals/).


We can compile our circuit by running:

Podemos compilar nuestro circuito ejecutando:

```shell
just build example1
```

![02_example1_circuit](https://hackmd.io/_uploads/BJdW39AUxg.png)


### Construyendo nuestro circuito

For your reference, the final file can be found in `example1-solution.circom`. For more details on the syntax, see the [official documentation](https://docs.circom.io/circom-language/signals/).

Para tu referencia, el archivo final se encuentra en `example1-solution.circom`. Para más detalles sobre la sintaxis, consulta la [documentación oficial](https://docs.circom.io/circom-language/signals/).


We can compile our circuit by running:

Podemos compilar nuestro circuito ejecutando:


```shell
just build example1
```
![02_example1_build](https://hackmd.io/_uploads/rkgFp9C8gl.png)

This is a thin wrapper for calling `circom` to create a `example1.r1cs` and `example1.wasm` file. You should see something like:

Este es un envoltorio ligero para ejecutar `circom` y crear los archivos `example1.r1cs` y `example1.wasm`. Deberías ver algo como:


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

In this case, we have the following:

- two private inputs, `a` and `b`
- one public output, `c`
- one (non-linear) constraint, `c <== a * b`

En este caso, tenemos lo siguiente:

- dos entradas privadas, `a` y `b`
- una salida pública, `c`
- una restricción (no lineal), `c <== a * b`


We will ignore other parts of the output above for now. [^12] Now we have two files: `example1.r1cs` and `example1.wasm`.

Por ahora ignoraremos las demás partes del output mencionado arriba. [^12] Ahora tenemos dos archivos: `example1.r1cs` y `example1.wasm`.


`r1cs` stands for _Rank 1 Constraint System_. This file contains our circuit in binary form. and corresponds to how we define our constraints mathematically. [^13]

`r1cs` significa _Rank 1 Constraint System_. Este archivo contiene nuestro circuito en forma binaria y corresponde a cómo definimos nuestras restricciones matemáticamente. [^13]


The `.wasm` file contains WebAssembly, which is what we need to generate our _witness_. The witness is how we specify the inputs that we want to keep private while still using them to create a proof.

El archivo `.wasm` contiene WebAssembly, que es lo que necesitamos para generar nuestro _testigo_ (_witness_). El testigo es la forma en que especificamos las entradas que queremos mantener privadas mientras las usamos para crear una prueba.


We are not quite ready to make proofs yet though. First we need to perform a _setup_ to get our prover and verification key.

Aún no estamos listos para crear pruebas. Primero, necesitamos realizar una _configuración_ (_setup_) para obtener nuestra clave de prueba (_prover key_) y clave de verificación (_verification key_).



Don't worry if it all doesn't make sense yet. It is a new way of doing things and it takes a while to get used to.

No te preocupes si aún no entiendes todo. Es una nueva forma de hacer las cosas y toma tiempo acostumbrarse.


### Trusted setup

With the artifacts we generated above, we can perform a _trusted setup_.

Con los artefactos que generamos arriba, podemos realizar una _configuración confiable_ (trusted setup).

A trusted setup is something we run once as a pre-processing step. This generates what is called a _Common Reference String_ (CRS), which consists of a _proving key_ and a _verification key_. These keys can then be used every time we want to generate and verify proofs, respectively.

El Trust Setup es un proceso que se ejecuta una sola vez como paso previo. Esto genera lo que se llama una _Cadena de Referencia Común_ (CRS, por sus siglas en inglés), que consiste en una _clave de prueba_ (proving key) y una _clave de verificación_ (verification key). Estas claves se usan cada vez que queremos generar y verificar pruebas, respectivamente.

![02_example1_setup1](https://hackmd.io/_uploads/BkYuei0Iex.png)



Why do we need these keys and who should have access to them? The prover key embeds all the information necessary to be able to generate a proof in a zero-knowledge preserving fashion for that specific circuit. Similarly, the verifier key embeds all the information necessary to verify that the proof is indeed correct. These aren't private keys, but instead information that can and should be publicly distributed. Any party that needs to generate or verify a proof should have access to them. [^14]

¿Por qué necesitamos estas claves y quién debería tener acceso a ellas? La clave del demostrador contiene toda la información necesaria para poder generar una prueba que preserve el conocimiento cero para ese circuito específico. De manera similar, la clave del verificador contiene toda la información necesaria para verificar que la prueba es correcta. Estas no son claves privadas, sino información que puede y debe distribuirse públicamente. Cualquier parte que necesite generar o verificar una prueba debería tener acceso a ellas. [^14]




Why do we call it a trusted setup? Performing a setup is a process that involves multiple participants and it is sometimes called a _ceremony_. [^15] All participants cooperate to create a cryptographic "secret", and this is the basis of how the proving and verification keys are constructed. If this process is manipulated, cryptographically it may be possible to create false proofs or falsely claim invalid proofs as verified. Hence, there's an assumption of trust that least some participants are honest in the setup process, giving rise to the term "trusted setup".

¿Por qué llamamos a esto una trusted setup? Realizar una trusted setup es un proceso que involucra a varios participantes y a veces se denomina una ceremonia. [^15] Todos los participantes cooperan para crear un "secreto" criptográfico, que es la base para construir las claves de demostración y verificación. Si este proceso es manipulado, podría ser posible crear pruebas falsas o aceptar pruebas inválidas como válidas desde el punto de vista criptográfico. Por eso, existe la suposición de que al menos algunos participantes son honestos en el proceso, lo que da origen al término "trusted setup".

As a starting point, we are going to run the trusted setup ourselves. Run the following:

Como punto de partida, vamos a ejecutar la trusted setup nosotros mismos. Ejecuta lo siguiente:

`just trusted_setup example1`

![02_example1_setup2](https://hackmd.io/_uploads/rJY5boRLex.png)



You'll be asked to supply some random text or entropy twice. [^16] Once completed you should see "Trusted setup completed." and the location of the keys. The file ending in `.zkey` is our proving key. While going into the details of trusted setups is outside of the scope of this article, there are a few things that are useful to be aware of.

You'll be asked to supply some random text or entropy twice. [^16] Once completed you should see "Trusted setup completed." and the location of the keys. The file ending in `.zkey` is our proving key. While going into the details of trusted setups is outside of the scope of this article, there are a few things that are useful to be aware of.

Se te pedirá proporcionar texto aleatorio o entropía dos veces. [^16] Una vez completado, deberías ver "Trusted setup completed." y la ubicación de las claves. El archivo que termina en `.zkey` es nuestra clave de prueba（proving key）. Aunque entrar en detalles sobre trusted setups está fuera del alcance de este artículo, hay algunas cosas importantes que conviene conocer.

First, what is the problem with the above approach? Since we have just one participant, everyone else who is using the cryptographic key material from that setup is trusting that individual and their computer environment. This wouldn't work in a production scenarios where we'd want to maximize the number of participants to make the setup more trustworthy. If we have 100 people who participate, because of how this cryptographic secret is constructed, it is enough if one single individual is honest. [^17]

Primero, ¿cuál es el problema con el enfoque anterior? Como sólo hay un participante, todos los demás que usan el material criptográfico de esa configuración están confiando en esa persona y en su entorno informático. Esto no funcionaría en escenarios de producción, donde querríamos maximizar el número de participantes para hacer la configuración más confiable. Si participan 100 personas, debido a cómo se construye este secreto criptográfico, basta que una sola sea honesta. [^17]

It is also worth knowing that different ZKP systems have different properties in terms of security, performance and affordances. While all ZKP systems require some form of setup, not all of them require a trusted setup. Of those that do, some differ in their requirements.

También vale la pena saber que distintos sistemas ZKP tienen diferentes propiedades en términos de seguridad, rendimiento y capacidades. Aunque todos los sistemas ZKP requieren alguna forma de configuración, no todos requieren un trusted setup. De los que sí, algunos difieren en sus requerimientos.

With Circom we are using the _Groth16 proof system_ which does requires a trusted setup. Specifically, the setup is split into two phases: phase 1 and phase 2. Phase 1 is independent of a circuit and can be used by any ZKP program up to a certain size, whereas phase 2 is _circuit-specific_. When we ran the above command, we performed both phases.

Con Circom usamos el _sistema de prueba Groth16_ que sí requiere un trusted setup. Específicamente, la configuración se divide en dos fases: fase 1 y fase 2. La fase 1 es independiente del circuito y puede usarse para cualquier programa ZKP hasta cierto tamaño, mientras que la fase 2 es _específica del circuito_. Cuando ejecutamos el comando anterior, realizamos ambas fases.

You might be wondering, why would you use a trusted setup at all if you can avoid it? A lot of people agree with this view. However, there are still good reasons people use these systems - such as more mature tooling and ecosystem, as well as cheap verification costs. Cheap verification costs is something that is traditionally very important, especially when we are verifying proofs on a public blockchain like Ethereum. Depending on your use case, your choice will likely differ. In a different article we'll look more into trusted setups and their trade-offs, as well as different proof systems.

Quizás te preguntes, ¿por qué usar un trusted setup si se puede evitar? Muchas personas comparten esta opinión. Sin embargo, aún hay buenas razones para usar estos sistemas, como herramientas y ecosistemas más maduros, además de costos bajos de verificación. Los costos bajos de verificación son tradicionalmente muy importantes, especialmente cuando verificamos pruebas en una blockchain pública como Ethereum. Dependiendo de tu caso de uso, tu elección probablemente varíe. En otro artículo profundizaremos en los trusted setups y sus compensaciones, así como en diferentes sistemas de prueba.


### Generar la prueba

With the trusted setup completed above, we have a proving key and verification key. We can now generate a proof that we know two secret values whose product is another public number.

Con el trusted setup completado arriba, tenemos una clave de prueba（proving key） y una clave de verificación（verification key）. Ahora podemos generar una prueba de que conocemos dos valores secretos cuyo producto es otro número público.

Specifically, let's prove that we know that 33 can be constructed from multiplying the numbers 3 and 11. Recall that our private input consists of signals `a` and `b`. We specify this in the `example1/input.json` file as follows:

Específicamente, probemos que sabemos que 33 puede construirse multiplicando los números 3 y 11. Recuerda que nuestra entrada privada consiste en las señales `a` y `b`. Lo especificamos en el archivo `example1/input.json` de la siguiente manera:

```json
{
  "a": "3",
  "b": "11"
}
```

That is, we specify the input as a JSON map, where the key is the signal name and the value is the value we want to assign it. Notice that the value is a string, even though it is conceptually a number. This is a quirk in Circom and its JS API. Due to the nature of ZKPs, we often deal with very large numbers that require the use of _BigInt_. The easiest way to specify such a large number in a JSON file is as a string that will then be converted to a BigInt.

Es decir, especificamos la entrada como un mapa JSON, donde la clave es el nombre de la señal y el valor es el valor que queremos asignarle. Nota que el valor es una cadena, aunque conceptualmente sea un número. Esto es una particularidad de Circom y su API en JS. Debido a la naturaleza de las ZKP, a menudo trabajamos con números muy grandes que requieren el uso de _BigInt_. La forma más sencilla de especificar un número tan grande en un archivo JSON es como una cadena, que luego se convertirá a un BigInt.

We can create a proof using our compiled circuit (in WASM form), our proving key and the input by running the following:

Podemos crear una prueba usando nuestro circuito compilado (en forma WASM), nuestra clave de prueba y la entrada ejecutando lo siguiente:

`just generate_proof example1`

![02_example1_generate_proof](https://hackmd.io/_uploads/HyhLNjCUex.png)

Under the hood, this command takes the input and generates a _witness_ for our specific circuit. [^18] Normally, by witness, we simply mean the private input we use to generate a proof. In the context of Circom, a witness is the complete assignment of all signals, both private and public, in a form that the prover software can process. This form is an internal representation in a binary format. [^19]

En esencia, este comando toma la entrada y genera un _testigo_ para nuestro circuito específico. [^18] Normalmente, por testigo simplemente entendemos la entrada privada que usamos para generar una prueba. En el contexto de Circom, un testigo es la asignación completa de todas las señales, tanto privadas como públicas, en una forma que el software del demostrador pueda procesar. Esta forma es una representación interna en formato binario. [^19]

With this generated witness, we can create a proof using `snarkjs`. Finally, we end up with a proof and some public output.

Con este testigo generado, podemos crear una prueba usando `snarkjs`. Finalmente, obtenemos una prueba y algunos resultados públicos.

The proof looks something like this:

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

This specifies the proof in the form of some mathematical objects (three elliptic curve elements), `pi_a`, `pi_b`, and `pi_c`. [^20] It also includes some metadata about the protocol (`groth16`) and the _curve_ (`bn128`, a mathematical implementation detail we'll ignore for now) used. This allows the verifier to know what to do with this proof to verify it correctly.

Esto especifica la prueba en términos de ciertos elementos matemáticos (tres elementos de una curva elíptica): `pi_a`, `pi_b` y `pi_c`. [^20] También incluye algunos metadatos sobre el protocolo utilizado (`groth16`) y la _curva_ correspondiente (`bn128`, un detalle de implementación matemática que, por el momento, dejaremos de lado). Esto permite que el verificador sepa cómo interpretar esta prueba para verificarla correctamente.

Notice how short the proof is; regardless of how complex our special program is it'll only be this size. This showcases the _succinctness_ property of ZKPs we talked about in our [_friendly introduction_](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge#compression).

Observá lo breve que es la prueba; independientemente de cuán complejo sea nuestro programa particular, siempre tendrá este tamaño. Esto ejemplifica la propiedad de _concisión_ de las ZKP, que mencionamos en nuestra [_introducción amigable_](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge#compression).

The command above also outputs our _public output_:

El comando anterior también genera nuestra _salida pública_:

```json
["33"]
```

This is a list of all the public outputs corresponding to our witness and circuit. In this case, there's a single public output that corresponds to `c`: 33. [^21]

Esta es una lista de todas las salidas públicas que corresponden a nuestro testigo y al circuito. En este caso, hay una única salida pública que corresponde a `c`: 33. [^21]

What have we proven? That we know two secret values, `a` and `b`, whose product is 33. This showcases the _privacy_ property we talked about in the previous article.

¿Qué hemos probado? Que conocemos dos valores secretos, `a` y `b`, cuyo producto es 33. Esto ejemplifica la propiedad de _privacidad_ que mencionamos en el artículo anterior.

Note that the proof isn't useful in isolation, it requires the public output that comes with it.

Tené en cuenta que la prueba no es útil por sí sola; requiere la salida pública que la acompaña.

## Verificar la prueba

Next up, let's verify this proof. Run:

A continuación, verifiquemos esta prueba. Ejecutá:

`just verify_proof example1`

![02_example1_verify_proof](https://hackmd.io/_uploads/r1xiLs08xl.png)


This takes the verification key, the public output, and the proof. With this we are able to verify the proof. It should print "Proof verified". Notice how the verifier is never exposed to any of the private inputs.

Esto toma la clave de verificación（verification key）, la salida pública y la prueba. Con eso, podemos verificar la prueba. Debería imprimirse "Proof verified". Notá cómo el verificador nunca accede a las entradas privadas.

What happens if we change the output? Open `example1/target/public.json` and change the 33 to 34, then run the command above again.

¿Qué pasa si cambiamos la salida? Abrí `example1/target/public.json` y cambiá el 33 por 34, luego ejecutá nuevamente el comando anterior.

You'll notice that the proof is not verified anymore. This is because our proof does not prove that we have two numbers whose product is 34.

Vas a notar que la prueba ya no se verifica. Esto se debe a que nuestra prueba no demuestra que conocemos dos números cuyo producto sea 34.

Congratulations, you've now written your first ZKP program, performed a trusted setup, generated a proof and finally verified it!

¡Felicitaciones! Acabás de escribir tu primer programa ZKP, ejecutar un trusted setup, generar una prueba y, finalmente, verificarla.



### Ejercicios

1. What are the two key properties of ZKPs and what do they mean?

1. ¿Cuáles son las dos propiedades clave de las ZKP y qué significan?

2. What is the role of a prover and what input does she need? What about a verifier?

2. ¿Cuál es el rol del demostrador（prover） y qué entrada necesita? ¿Y el verificador（verifier）?

3. Explain what the line `c <== a * b;` does.

3. Explicá qué hace la línea `c <== a * b;`.

4. Why do we need to perform a trusted setup? How do we use its artifacts?

4. ¿Por qué necesitamos realizar un trusted setup? ¿Cómo usamos sus artefactos?

5. Code: Finish `example1` until you generated and verified a proof.

5. Código: Completá `example1` hasta generar y verificar una prueba.

## Segunda iteración

With the above circuit, we are proving that we know the product of two (secret) numbers. This is closely related to the problem of _prime factorization_, which is the basis of a lot of cryptography. [^22] The idea is that if you have a very large number, it is hard to find two prime numbers whose product is that large number. On the flip side, it is very easy to check if the product of two numbers is equal to another number. [^23]

Con el circuito anterior, estamos probando que conocemos el producto de dos números (secretos). Esto está estrechamente relacionado con el problema de la _factorización en primos_, que es la base de buena parte de la criptografía. [^22] La idea es que, si tenés un número muy grande, es difícil encontrar dos números primos cuyo producto sea ese número. Por otro lado, es muy fácil verificar si el producto de dos números es igual a otro número. [^23]

However, there is a big problem with our circuit. Can you see it?

Sin embargo, hay un gran problema con nuestro circuito. ¿Lo notás?

We can easily change our input to be "1" and "33". That is, a number `c` is always the product of 1 and `c`. That's not very impressive at all is it?

Podemos fácilmente cambiar nuestra entrada a "1" y "33". Es decir, un número `c` siempre es el producto de 1 y `c`. Eso no es nada impresionante, ¿no?

What we want to do is to add another _constraint_, that neither `a` or `b` can be equal to 1. That way, we are forced to do proper integer factorization.

Lo que queremos hacer es agregar otra _restricción_: que ni `a` ni `b` puedan ser igual a 1. De ese modo, nos vemos forzados a realizar una factorización entera válida.

How can we add this constraint and what changes do we need to make?

¿Cómo podemos agregar esta restricción y qué cambios necesitamos hacer?


### Actualizar nuestro circuito

We are going to work with the `example2` folder for these changes. Unfortunately, we can't just write `a !== 1`, because this isn't a valid constraint. [^24] It isn't made up of only constants, addition, multiplication and equality checks. How do we express that "something is not"?

Vamos a trabajar en la carpeta `example2` para estos cambios. Lamentablemente, no podemos simplemente escribir `a !== 1`, porque eso no es una restricción válida. [^24] No está compuesta solo por constantes, sumas, multiplicaciones y verificaciones de igualdad. ¿Cómo expresamos que “algo no es”?

This is not immediately intuitive, and this type of problem is where a lot of the art of writing circuits come into play. Developing this skill takes time and is outside of the scope of this initial tutorial; fortunately there are many good resources for this. [^25]

Esto no es algo intuitivo de entrada, y este tipo de problemas es donde entra en juego buena parte del arte de escribir circuitos. Desarrollar esta habilidad lleva tiempo y está fuera del alcance de este tutorial inicial; por suerte, existen muchos recursos excelentes al respecto. [^25]

There are some common idioms though. The basic idea is to use a `IsZero()` template that checks if an expression is equal to zero or not. It outputs 1 for true, and 0 for false.

Sin embargo, hay ciertos patrones comunes. La idea básica es usar una plantilla `IsZero()` que verifica si una expresión es igual a cero o no. Devuelve 1 si es verdadero, y 0 si es falso.

It is often helpful to use a truth table [^26] to show possible values. Here's the truth table for `IsZero()`:

Suele ser útil usar una tabla de verdad [^26] para visualizar los valores posibles. Esta es la tabla de verdad para `IsZero()`:

| in  | out |
| --- | --- |
| 0   | 1   |
| n   | 0   |

| entrada | salida |
|--------|--------|
| 0      | 1      |
| n ≠ 0  | 0      |


This is such a useful building block that it is included in Circom's library, `circomlib`. In `circomlib` there are also many other useful components. [^27]

Este bloque de construcción es tan útil que está incluido en la biblioteca de Circom, `circomlib`. En `circomlib` también hay muchos otros componentes útiles. [^27]

We can include this by creating an `npm` project (JavaScript) and adding it as a dependency. In the `example2` folder we have already done this for you. To import the relevant module, we add the following line to the top of `example2.circom`:

Podemos incluir esto creando un proyecto `npm` (JavaScript) y agregándolo como dependencia. En la carpeta `example2` ya lo tenemos listo para vos. Para importar el módulo correspondiente, sumamos esta línea al inicio de `example2.circom`:




`include "circomlib/circuits/comparators.circom";`

Using `IsZero()`, we can check if either a or b is equal to 1. Modify the `example2.circom` file to contain the following lines:

Usando `IsZero()`, podemos verificar si `a` o `b` es igual a 1. Modificá el archivo `example2.circom` para que contenga las siguientes líneas:

```javascript
component isZeroCheck = IsZero();
isZeroCheck.in <== (a - 1) * (b - 1);
isZeroCheck.out === 0;
```

In the above code snippet, we create a new component `isZeroCheck`, instantiating the `IsZero()` template. If either a or b is equal to 1, `isZeroCheck.in` will be assigned 0, and `isZeroCheck.out` will be 1. Since we have a constraint that says `isZeroCheck.out === 0`, this constraint will fail. This means that we can no longer provide inputs where either a or b is equal to 1.

En el fragmento de código anterior, creamos un nuevo componente `isZeroCheck`, instanciando la plantilla `IsZero()`. Si `a` o `b` es igual a 1, `isZeroCheck.in` será 0 y `isZeroCheck.out` será 1. Como tenemos la restricción `isZeroCheck.out === 0`, esta restricción fallará. Esto significa que ya no podremos ingresar valores donde `a` o `b` sean iguales a 1.

I encourage you to convince yourself, either in your head or using pen and paper (perhaps using a truth table?), that this is true. If you are up for a challenge, you can try to figure out how `IsZero()` is implemented. it is only a few lines of code. You can see the code in `circomlib`'s `comparators.circom` file. [^28]

Te invito a que te convenzas por vos mismo, ya sea mentalmente o con lápiz y papel (¿quizás usando una tabla de verdad?), de que esto es cierto. Si te animás a un desafío, podés intentar entender cómo está implementado `IsZero()`. Son solo unas pocas líneas de código. Podés revisar el código en el archivo `comparators.circom` de `circomlib`. [^28]

For your reference, the final file can be found in `example2-solution.circom`. With the changes above, we can install the npm `circomlib` dependency and build our circuit with:

`just build example2`

Para que tengas referencia, el archivo final está en `example2-solution.circom`. Con los cambios anteriores, podemos instalar la dependencia `circomlib` de npm y compilar nuestro circuito con:

`just build example2`

### Volviendo a correr nuestro trusted setup

With Circom and Groth16, any time we change our circuit we have to re-run our trusted setup. This means you better be sure your circuit is solid before you release it. Especially if you are running a proper ceremony involving many participants.

Con Circom y Groth16, cada vez que modificamos nuestro circuito tenemos que volver a ejecutar nuestro trusted setup. Por eso, más vale que estés seguro de que tu circuito está sólido antes de liberarlo, especialmente si vas a hacer una ceremonia formal con muchos participantes.

More specifically, we only have to run the circuit-specific (phase 2) trusted setup again. This is because phase 1 is generic for _any_ Groth16 circuit written in Circom, up to a certain size. When we performed the trusted setup above, we did both phase 1 and phase 2, but omitted the details of phase 1 for simplicity. Here are some more details on phase 1 to give a more complete picture.

Más específicamente, solo tenemos que volver a correr la parte específica del circuito (fase 2) del trusted setup. Esto se debe a que la fase 1 es genérica para _cualquier_ circuito Groth16 escrito en Circom, hasta cierto tamaño. Cuando hicimos el trusted setup antes, corrimos ambas fases, pero omitimos los detalles de la fase 1 para simplificar. Acá te dejo más detalles de la fase 1 para que tengas una imagen más completa.

![02_example2_setup_both](https://hackmd.io/_uploads/Hkp2tsCLxe.png)


The result of the phase 1 trusted setup is kept in a `.ptau` file, where ptau stands for powers of tau. [^29] Mathematically, this file contains powers of some random secrets. This is what allows us to "accommodate" some number of number of constraints. We don't need to understand how this works mathematically, but there are two key facts that are useful to know: (a) `.ptau` is circuit-independent (b) the size of it indicates its capacity. The "capacity" of a given ptau is `2^n - 1` constraints, where `n` is some number. For example, `pot12.ptau` indicates that the number of constraints it can accommodate is `2^12 - 1`, or slighty over 4000 constraints.

El resultado de la fase 1 del trusted setup se guarda en un archivo `.ptau`, donde ptau significa powers of tau (potencias de tau). [^29] Matemáticamente, este archivo contiene potencias de algunos secretos aleatorios. Esto es lo que nos permite "alojar" cierta cantidad de restricciones. No hace falta entender cómo funciona matemáticamente, pero hay dos datos clave que conviene saber: (a) `.ptau` es independiente del circuito (b) su tamaño indica su capacidad. La "capacidad" de un ptau dado es `2^n - 1` restricciones, donde `n` es un número. Por ejemplo, `pot12.ptau` indica que puede alojar `2^12 - 1`, un poco más de 4000 restricciones.

Since we don't want to re-run our phase 1 again, we just want to run phase 2. This will use the previously generated `pot12.ptau` (stored in the `ptau` directory) as input. We can run our phase 2 trusted setup with:

Como no queremos volver a correr la fase 1, solo ejecutamos la fase 2. Esta usará el `pot12.ptau` generado previamente (guardado en el directorio `ptau`) como entrada. Podemos correr la parte de fase 2 del trusted setup con:

```
just trusted_setup_phase2 example2
```

![02_example2_setup2](https://hackmd.io/_uploads/Hyp-qo0Lgg.png)


### Probando nuestros cambios

With this, we can run:

Con esto, podemos ejecutar:

```
just generate_proof example2
just verify_proof example2
```

It still generates and verifies the proof as expected.

Todavía genera y verifica la prueba como se espera.

If we change the `example2/input.json` inputs to say `1` and `33` and try to run above we will see an assert error. That is, Circom won't even let us generate a proof, because the input is breaking our constraints.

Si cambiamos las entradas en `example2/input.json` a, por ejemplo, `1` y `33` y tratamos de ejecutar lo anterior, veremos un error de aserción. Es decir, Circom ni siquiera nos permitirá generar una prueba porque la entrada viola nuestras restricciones.

### Diagrama completo del flujo

Now that we have gone through the entire flow twice, let's take a step back and see how all of the pieces fit together.

Ahora que hemos recorrido todo el flujo dos veces, demos un paso atrás y veamos cómo encajan todas las piezas.

![02_example2_complete_flow](https://hackmd.io/_uploads/HyGfoo0Ulg.png)


Hopefully things are starting to make some sense. With that, let's kick it up a notch and make our circuit more useful.

Esperamos que las cosas estén empezando a tener sentido. Con eso, vamos a subir el nivel y hacer nuestro circuito más útil.

### Ejercicios

6. Why do we have to run phase 2 but not phase 1 of our trusted setup for `example2`?

6. ¿Por qué tenemos que ejecutar la fase 2 pero no la fase 1 de nuestra configuración confiable para `example2`?

7. What was the main problem with the previous example and how did we fix it?

7. ¿Cuál fue el problema principal con el ejemplo anterior y cómo lo solucionamos?

8. Code: Finish `example2` until you failed to generate a proof.

8. Código: Completa `example2` hasta que no puedas generar una prueba.

## Tercera interación

With the above circuit we have proven that we know the product of two secret values. That on its own is not very useful. Something that is useful in the real world is a _digital signature scheme_. With it, you can prove to someone else that you wrote a specific message. How would we go about implementing this using ZKPs? To get there, we must first cover some basic concepts.

Con el circuito anterior hemos probado que conocemos el producto de dos valores secretos. Eso por sí solo no es muy útil. Algo que sí es útil en el mundo real es un _esquema de firma digital_. Con él, puedes demostrarle a alguien más que escribiste un mensaje específico. ¿Cómo implementaríamos esto usando ZKPs? Para llegar a eso, primero debemos cubrir algunos conceptos básicos.

Now would be a good time for a short break to get a fresh cup of your favorite beverage.

Ahora es un buen momento para hacer una pausa corta y prepararte una taza fresca de tu bebida favorita.

### Firmas digitales

Digital signatures exists already and are everywhere in our digital age. The modern Internet wouldn't function without them. Usually, these are implemented using _public-key cryptography_. In public-key cryptography you have a private key and a public key. The private key is for your eyes only, and the public key is shared publicly, representing your identity.

Las firmas digitales ya existen y están en todas partes en nuestra era digital. El Internet moderno no funcionaría sin ellas. Usualmente, se implementan mediante _criptografía de clave pública_. En la criptografía de clave pública tienes una clave privada y una clave pública. La clave privada es solo para tus ojos, y la clave pública se comparte públicamente, representando tu identidad.

A digital signature scheme consist of the following parts:

Un esquema de firma digital consta de las siguientes partes:

- **Key generation**: Generate a private key and a corresponding public key  
- **Generación de claves**: Generar una clave privada y una clave pública correspondiente

- **Signing**: Create a signature using the private key and the message  
- **Firma**: Crear una firma usando la clave privada y el mensaje

- **Signature verification**: Verify message was signed by corresponding public key  
- **Verificación de la firma**: Verificar que el mensaje fue firmado con la clave pública correspondiente

While the specifics look different, the program we wrote and the key generation algorithm above share a common element: they both use a _one-way function_, and more specifically a _trapdoor function_. A trapdoor is something that is easy to fall into and hard to climb out of (unless you can find a hidden ladder). [^30]

Aunque los detalles parezcan diferentes, el programa que escribimos y el algoritmo de generación de claves comparten un elemento común: ambos usan una _función unidireccional_, y más específicamente una _función con trampa_. Una trampa es algo en lo que es fácil caer y difícil salir (a menos que puedas encontrar una escalera oculta). [^30]
![02_example3_trapdoor](https://hackmd.io/_uploads/ry_9k3AUgl.png)

For public-key cryptography, it is easy to construct the public key from the private key, but very hard to go the other way. The same is true for our previous program. If the two secret numbers are very large prime numbers, it is very hard to turn that product back into the original values. Modern public-key cryptography often uses _elliptic curve cryptography_ under the hood.

En la criptografía de clave pública, es fácil construir la clave pública a partir de la clave privada, pero muy difícil hacerlo al revés. Lo mismo ocurre con nuestro programa anterior. Si los dos números secretos son números primos muy grandes, es muy difícil convertir ese producto nuevamente en los valores originales. La criptografía de clave pública moderna a menudo utiliza _criptografía de curva elíptica_ en segundo plano.

Traditionally, creating cryptographic protocols like these digital signature schemes is a lot of hard work and requires coming up with a specific protocol that involves using some clever math. We don't want to do that. Instead, we want to write a program using ZKPs that achieves the same result.

Tradicionalmente, crear protocolos criptográficos como estos esquemas de firma digital requiere mucho trabajo y diseñar un protocolo específico que implique matemáticas ingeniosas. No queremos hacer eso. En cambio, queremos escribir un programa usando ZKPs que logre el mismo resultado.

Instead of this: [^31]

En lugar de esto: [^31]

![02_example3_sigverify](https://hackmd.io/_uploads/H1Wkg3RIxl.png)


We just want to write a program, generate a proof of what we want, and then verify this proof.

Solo queremos escribir un programa, generar una prueba（proof）de lo que queremos, y luego verificar esa prueba.

### Funciones hash y compromisos

Instead of using elliptic curve cryptography, we are going to use two much simpler tools: _hash functions_ and _commitments_.

En lugar de usar criptografía de curva elíptica, vamos a utilizar dos herramientas mucho más simples: _funciones hash_ y _compromisos_.

A hash function is also a one-way function. For example, on the command line we can use the SHA-256 hash function like this:

Una función hash también es una función unidireccional. Por ejemplo, en la línea de comandos podemos usar la función hash SHA-256 así:

```shell
echo -n "foo" | shasum -a 256

```

To produce the hash of "foo": `0beec7[...]a8a33` (abbreviated). [^32]

Para producir el hash de "foo": `0beec7[...]a8a33` (abreviado). [^32]

On its own, a hash function is not a trapdoor function. There's no special knowledge that allows us to retrieve the original value. It acts more as a meat grinder and less as a trapdoor with a hidden ladder.

Por sí sola, una función hash no es una función trapdoor. No existe ningún conocimiento especial que nos permita recuperar el valor original. Funciona más como una picadora de carne y menos como una trampa con una escalera oculta.

What about commitments? A _commitment_ is simply a way to commit ("to promise") to a secret value so we can't change our mind about it later. In our case, we will use a commitment to generate the equivalent of a public key using some secret value. We can do this using a hash function.

¿Y qué pasa con los compromisos? Un _compromiso_ es simplemente una forma de comprometerse ("prometer") con un valor secreto para no poder cambiar de opinión más tarde. En nuestro caso, usaremos un compromiso para generar el equivalente de una clave pública usando algún valor secreto. Podemos hacer esto usando una función hash.

Commitment schemes are a very common cryptographic primitive. [^33] They allow us to:

- **commit**: Commit to a specific value while keeping it hidden

- **reveal**: Reveal this value so it can be verified to be correct


Los esquemas de compromiso son un primitivo criptográfico muy común. [^33] Nos permiten:

- **commit**: Comprometerse a un valor específico manteniéndolo oculto

- **reveal**: Revelar este valor para que pueda verificarse que es correcto

This gives us two key properties:

- **hiding**: the value stays hidden
- **binding**: you can't change your mind about the value

Esto nos da dos propiedades clave:


- **hiding**: el valor permanece oculto

- **binding**: no puedes cambiar de opinión sobre el valor

One way to think about a commitment is to imagine giving a lock box to a friend. You can't change the contents of the box after the fact, but your friend can't look inside it. Only when you give them the key can they open it.

Una forma de entender un compromiso es imaginar que le das una caja fuerte a un amigo. No puedes cambiar el contenido de la caja después, pero tu amigo no puede mirar dentro. Solo cuando le das la llave puede abrirla.
![02_example3_lockbox](https://hackmd.io/_uploads/HyVWX2AIle.png)


Going back to our digital signature scheme, we have:

- **Key generation**: Create some secret string and hash it to create a commitment
- **Signing**: Create a signature by hashing the secret together with the message
- **Verification**: Verify proof using commitment, message and signature (public output)

Volviendo a nuestro esquema de firma digital, tenemos:

- Key generation: Crear una cadena secreta y hacerle hash para crear un compromiso

- Signing: Crear una firma haciendo hash del secreto junto con el mensaje

- Verification: Verificar la prueba usando el compromiso, mensaje y firma (salida pública)

In pseudo-code this is what we want to do in our circuit:

En pseudo-código, esto es lo que queremos hacer en nuestro circuito:

```python
commitment = hash(some_secret)
signature = hash(some_secret, message)
```

At this point you probably have some questions. Let's address a few likely questions you have in your mind.

En este punto probablemente tengas algunas preguntas. Vamos a responder algunas que seguramente tienes en mente.

First of all, why does this work and why do we need a ZKP for this? When someone is verifying the proof, they only have access to the commitment, message, and signature. There's no direct way to verify that the commitment corresponds to the secret, without revealing the secret. In this case, we are just "revealing" the secret when generating our proof, so our secret stays safe.

Primero, ¿por qué funciona esto y por qué necesitamos una ZKP para esto? Cuando alguien verifica la prueba, solo tiene acceso al compromiso, mensaje y firma. No hay forma directa de verificar que el compromiso corresponde al secreto sin revelar el secreto. En este caso, solo "revelamos" el secreto al generar nuestra prueba, por lo que el secreto se mantiene seguro.

Second, why use these hash functions and commitments instead of public key cryptography inside the ZKP? You absolutely could do public key cryptography inside a ZKP, and there are valid reasons to do so. It is a lot more costly to implement in terms of constraints than the above. This makes it a lot slower than the above, simpler scheme. As we'll see in the next section, the choice of hash function turns out to very important.

Segundo, ¿por qué usar estas funciones hash y compromisos en lugar de criptografía de clave pública dentro de la ZKP? Sí, definitivamente se podría usar criptografía de clave pública dentro de una ZKP, y hay razones válidas para hacerlo. Sin embargo, es mucho más costoso de implementar en términos de restricciones que lo anterior. Esto lo vuelve mucho más lento que el esquema simple que vimos. Como veremos en la siguiente sección, la elección de la función hash resulta ser muy importante.

Finally, why use a ZKP at all when we already have public key cryptography? In this simple example, there's no need for a ZKP. However, it acts as a building block for more interesting applications, such as the group signature example mentioned in the beginning of this article. After all, we want to _program cryptography_.

Finalmente, ¿por qué usar una ZKP si ya tenemos criptografía de clave pública? En este ejemplo simple, no hay necesidad de una ZKP. Sin embargo, esta sirve como un bloque de construcción para aplicaciones más interesantes, como el ejemplo de firma grupal mencionado al inicio de este artículo. Al fin y al cabo, queremos _programar criptografía_.

That was a lot! Luckily, we are over the hump now. Let's get coding. Don't worry if not all of the above made complete sense to you at first. It takes a while to get used to this type of reasoning.

¡Fue mucho! Por suerte, ya superamos la parte difícil. Vamos a ponernos a programar. No te preocupes si no todo lo anterior te quedó completamente claro al principio. Toma un tiempo acostumbrarse a este tipo de razonamiento.


### Volviendo al código

We are going to work from the `example3` directory.

Vamos a trabajar desde el directorio `example3`.

To implement digital signatures, the first thing we need to do is to generate our keys. These correspond to the private and public key in public-key cryptography. Because the keys correspond to an identity (you, the prover), we will call these `identity_secret` and `identity_commitment`, respectively. Together they form an identity pair.

Para implementar firmas digitales, lo primero que debemos hacer es generar nuestras claves. Estas corresponden a la clave privada y pública en criptografía de clave pública. Como las claves corresponden a una identidad (tú, el demostrador), las llamaremos `identity_secret` y `identity_commitment`, respectivamente. Juntas forman un par de identidad.

These will be used as input to the circuit, together with the message we are signing. As public output, we'll have the signature, commitment and message. This will allow someone to verify that the signature is indeed correct.

Estas se usarán como entrada al circuito, junto con el mensaje que estamos firmando. Como salida pública, tendremos la firma, compromiso y mensaje. Esto permitirá que alguien verifique que la firma es efectivamente correcta.

Because we need the identity pair as input to the circuit, we generate these separately:

Debido a que necesitamos el par de identidad como entrada al circuito, los generamos por separado:

`just generate_identity`

This produces something like this:

Esto produce algo así:

```shell
identity_secret: 43047[...]2270
identity_commitment: 21618[...]0684
```

In order to keep the secret secure, we use a big and random number. Unlike what we saw before, we are not using a hash function such as SHA-256 to create the commitment. Instead, we are using what is called a _ZK-Friendly hash function_. That is a special hash function that is optimzed for being used in ZKPs. This matters a lot in terms of performance when you do a lot hashing. The ZK friendly hash function we are using is called the _Poseidon hash function_. [^34]

Para mantener el secreto seguro, usamos un número grande y aleatorio. A diferencia de lo que vimos antes, no usamos una función hash como SHA-256 para crear el compromiso. En su lugar, usamos lo que se llama una _función hash amigable con ZK_. Es una función hash especial optimizada para usarse en ZKPs. Esto importa mucho en términos de rendimiento cuando haces mucho hashing. La función hash amigable con ZK que usamos se llama _Poseidon hash function_. [^34]

Under the hood, this is using the `circomlibjs` library to wrap `circomlib`. This is a JavaScript library that allows us to use Circom circuits. This ensures our `identity_commitment` is generated in exactly the same way in JavaScript/on the command line as in our circuit. If you want to read the script source code it is available in `example3/generate_identity.js`.

Por debajo, esto usa la librería `circomlibjs` para envolver `circomlib`. Es una librería en JavaScript que nos permite usar circuitos Circom. Esto asegura que nuestro `identity_commitment` se genere exactamente igual en JavaScript/en la línea de comandos que en nuestro circuito. Si quieres leer el código fuente del script, está disponible en `example3/generate_identity.js`.

Just like we did before with `IsZero`, we need to include the Poseidon template. We do this with the following include:

Al igual que hicimos antes con `IsZero`, necesitamos incluir la plantilla Poseidon. Lo hacemos con la siguiente inclusión:

```
include "circomlib/circuits/poseidon.circom";
```

The Poseidon hash template is used as follows:

La plantilla de hash Poseidon se usa de la siguiente manera:

```javascript
component hasher = Poseidon(2);
hasher.inputs[0] = foo;
hasher.inputs[1] = bar;
quux <== hasher.out
```
We specify that the `hasher` component expects two arguments, specified in the `.inputs[]` array. It then assigns the output signal to `.out`. In this example, it takes `foo` and `bar` as inputs, hashes them together and the result is `quux`. [^35]

Especificamos que el componente `hasher` espera dos argumentos, indicados en el arreglo `.inputs[]`. Luego asigna la señal de salida a `.out`. En este ejemplo, toma `foo` y `bar` como entradas, las hashea juntas y el resultado es `quux`. [^35]

Finally, we introduce a new piece of syntax:
 
Finalmente, presentamos una nueva sintaxis:

```javascript
component main {public [identity_commitment, message]} = SignMessage();
```
By default, all inputs to our circuit are private. With this, we explicitly mark `identity_commitment` and `message` as public. This means they'll be part of the public output.

Por defecto, todas las entradas a nuestro circuito son privadas. Con esto, marcamos explícitamente `identity_commitment` y `message` como públicas. Esto significa que serán parte de la salida pública.

With this information you should have enough to complete the `example3.circom` circuit. If you are still stuck, you can refer to `example3-solution.circom` for the full code.

Con esta información deberías tener suficiente para completar el circuito `example3.circom`. Si aún estás atascado, puedes consultar `example3-solution.circom` para ver el código completo.

Like before, we have to build the circuit and run phase 2 of the trusted setup:

Como antes, tenemos que compilar el circuito y ejecutar la fase 2 del trusted setup:

```shell
just build example3
just trusted_setup_phase2 example3
```

When building the circuit, you might notice how the number of constraints went up quite a lot compared to `example2`. This is primarily due to the use of two Poseidon hashes. [^36]

Al compilar el circuito, puede que notes que la cantidad de restricciones aumentó bastante en comparación con `example2`. Esto se debe principalmente al uso de dos hashes Poseidon. [^36]

### Probando nuestro circuito

For reference, here's an illustration of our completed circuit:

Como referencia, aquí hay una ilustración de nuestro circuito completado:

![02_example3_circuit](https://hackmd.io/_uploads/Hyl6S20Ugx.png)

We can now generate a proof. We have the following input in `example3/input.json`:

Ahora podemos generar una prueba. Tenemos la siguiente entrada en `example3/input.json`:

```json
{
  "identity_secret": "21879[...]1709",
  "identity_commitment": "48269[...]7915",
  "message": "42"
}
```

Feel free to change the identity pair to the one you generated yourself with `just generate_identity`. After all, you want to keep the identity secret to yourself!

Siéntete libre de cambiar el par de identidad por el que generaste tú mismo con `just generate_identity`. ¡Después de todo, quieres mantener el secreto de tu identidad para ti!

You might notice how the message is just a number quoted as a string (`"42"`). Unfortunately, because of how constraints work mathematically (using linear algebra and _arithmetic circuits_) we can only use numbers and not strings. The only operations that are supported inside of circuits are basic arithmetic ones like addition and multiplication. [^37]

Quizás notes que el mensaje es solo un número citado como cadena (`"42"`). Desafortunadamente, debido a cómo funcionan las restricciones matemáticamente (usando álgebra lineal y _circuitos aritméticos_), solo podemos usar números y no cadenas. Las únicas operaciones que se soportan dentro de los circuitos son operaciones aritméticas básicas como suma y multiplicación. [^37]

We can now generate and verify a proof:

Ahora podemos generar y verificar una prueba:


```
just generate_proof example3
just verify_proof example3
```

As before, the proof stays the same size, even though we are doing a lot more things. The public output found in `example3/target/public.json` is:

Como antes, la prueba mantiene el mismo tamaño, aunque estemos haciendo muchas más cosas. La salida pública que se encuentra en `example3/target/public.json` es:

```json
["48968[...]5499", "48269[...]7915", "42"]
```

This corresponds to the signature, commitment, and message respectively.

Esto corresponde a la firma, el compromiso y el mensaje, respectivamente.

Let's look at how things can go wrong if we are not careful. [^38]

Veamos cómo pueden salir las cosas mal si no tenemos cuidado. [^38]

First, what happens if we change the identity commitment to something random in the `input.json`? You'll notice we can't generate proofs anymore. This is because we are also checking the identity commitment inside the circuit itself. It is critical that this relationship between the identity secret and commitment is maintained.

Primero, ¿qué pasa si cambiamos el compromiso de identidad por algo aleatorio en el `input.json`? Notarás que ya no podemos generar pruebas. Esto es porque también estamos verificando el compromiso de identidad dentro del circuito. Es crítico que se mantenga esta relación entre el secreto de identidad y el compromiso.

Second, what happens if we don't include the message in the output? We do get a proof and it gets verified. But the message could be _anything_, so it doesn't actually prove that the you sent a specific message. Similary, what if we don't include the identity commitment in the public output? This means that the identity commitment could be anything, so we don't actually know _who_ signed the message.

Segundo, ¿qué pasa si no incluimos el mensaje en la salida? Sí obtenemos una prueba y esta se verifica. Pero el mensaje podría ser _cualquier cosa_, por lo que no prueba que hayas enviado un mensaje específico. De manera similar, ¿qué pasa si no incluimos el compromiso de identidad en la salida pública? Esto significa que el compromiso de identidad podría ser cualquiera, así que en realidad no sabemos _quién_ firmó el mensaje.

As a thought exercise, convince yourself (or try out) what could go wrong if we omit either of these two key constraints:

Como ejercicio mental, convéncete a ti mismo (o prueba) qué podría salir mal si omitimos alguna de estas dos restricciones clave:

- `identity_commitment === identityHasher.out`
- `signature <== signatureHasher.out`

Congratulations, you now know how to program cryptography! [^39]

¡Felicidades, ahora sabes cómo programar criptografía! [^39]


### Ejercicios

9. What are the three components of a digital signature scheme?  
10. What is the purpose of using a "ZK-Friendly hash function" like Poseidon?  
11. What are commitments? How can we use them for a digital signature scheme?  
12. Why do we mark the identity commitment and message as public?  
13. Why do we need the identity commitment and signature constraints?  
14. Code: Finish `example3` until you generated and verified a proof.  
 ---
9. ¿Cuáles son los tres componentes de un esquema de firma digital?  
10. ¿Cuál es el propósito de usar una "función hash amigable con conocimiento cero" como Poseidon?  
11. ¿Qué son los compromisos? ¿Cómo podemos usarlos en un esquema de firma digital?  
12. ¿Por qué marcamos el compromiso de identidad y el mensaje como públicos?  
13. ¿Por qué necesitamos las restricciones del compromiso de identidad y la firma?  
14. Código: Termina `example3` hasta que hayas generado y verificado una prueba.


## Próximos pasos

With the above digital signature scheme, and some tricks we saw earlier in the article, you have all the tools at your disposal to implement the _group signature scheme_ mentioned at the start of the article. [^40]

Con el esquema de firma digital anterior, y algunos trucos que vimos antes en el artículo, tienes todas las herramientas a tu disposición para implementar el _esquema de firma grupal_ mencionado al inicio del artículo. [^40]

Skeleton code exists in `example4`. All you need is 5-10 lines of code. The only new syntax is a `for` loop, which works just as in most other language. [^41].

Existe un código base en `example4`. Solo necesitas entre 5 y 10 líneas de código. La única sintaxis nueva es un ciclo `for`, que funciona igual que en la mayoría de los otros lenguajes. [^41].

This circuit will allow you to:

Este circuito te permitirá:

- sign a message  
- firmar un mensaje

- proving that you are one of three people (identity commitments)  
- probar que eres una de tres personas (compromisos de identidad)

- but not reveal which one  
- pero sin revelar cuál

You can think of it as a puzzle. The key insight essentially boils down to a single arithmetic expression. Try to work it out on paper if you can. If you get stuck, you can check the solution as before.

Puedes pensarlo como un rompecabezas. La idea clave se reduce esencialmente a una sola expresión aritmética. Intenta resolverlo en papel si puedes. Si te quedas atascado, puedes consultar la solución como antes.

Finally, if you want some extra challenges, here are some ways to extend it:

Finalmente, si quieres algunos desafíos extra, aquí tienes algunas formas de extenderlo:

1. Allow arbitrary many people in the group  
1. Permitir un número arbitrario de personas en el grupo

2. Implement a new circuit `reveal` that proves you signed a specific message  
2. Implementar un nuevo circuito `reveal` que pruebe que firmaste un mensaje específico

3. Implement a new circuit `deny` that proves you did not sign a specific message  
3. Implementar un nuevo circuito `deny` que pruebe que no firmaste un mensaje específico

Creating a cryptographic protocol like this using classical tools would be a huge task requiring a lot of specialized knowledge. [^42] With ZKPs you can become productive and dangerous in an afternoon, treating these problems as programming tasks. And this is just the tip of the iceberg of what we can do.

Crear un protocolo criptográfico como este usando herramientas clásicas sería una tarea enorme que requiere mucho conocimiento especializado. [^42] Con ZKPs puedes volverte productivo y peligroso en una tarde, tratando estos problemas como tareas de programación. Y esto es solo la punta del iceberg de lo que podemos hacer.


### Ejercicios

15. What do group signatures do over normal signatures? How can they be used?  
15. ¿Qué hacen las firmas de grupo sobre las firmas normales? ¿Cómo pueden ser usadas?

## Problems

These problems are optional and require a lot more effort.

1. Figure out how `IsZero()` is implemented.  
1. Averigua cómo se implementa `IsZero()`.

2. Code: Finish the group signature scheme above (see `example4`).  
2. Código: Termina el esquema de firma de grupo anterior (ver `example4`).

3. Code: Extend the group signature example above: Allow for more people and implement `reveal` and/or `deny` circuits.  
3. Código: Extiende el ejemplo de firma de grupo anterior: Permite más personas e implementa los circuitos `reveal` y/o `deny`.

4. How would you design a "ZK Identity" system for proving you are over 18? What are some other properties you might want to prove? At a high level, how would you implement it, and what challenges do you see? Research existing solutions to get a better understanding of how they are implemented.  
4. ¿Cómo diseñarías un sistema de "Identidad ZK" para probar que tienes más de 18 años? ¿Qué otras propiedades podrías querer probar? A grandes rasgos, ¿cómo lo implementarías y qué desafíos ves? Investiga soluciones existentes para entender mejor cómo están implementadas.

5. For public blockchains like Ethereum, sometimes a _Layer 2_ (L2) is used to allow for faster, cheaper and more transactions. At a high level, how would you design an L2 using ZKPs? Explain some challenges you see with this. Research existing solutions to get a better understanding of how they are implemented.  
5. Para blockchains públicas como Ethereum, a veces se usa una _Capa 2_ (L2) para permitir transacciones más rápidas, baratas y numerosas. A grandes rasgos, ¿cómo diseñarías una L2 usando ZKPs? Explica algunos desafíos que ves. Investiga soluciones existentes para entender mejor cómo están implementadas.

## Conclución

In this tutorial introduction, we've gotten familiar with how to write and modify basic ZKPs from scratch. We setup our programming environment and wrote a basic circuit. We then performed a trusted setup, created and verified proofs. We identified some problems and improved our circuit, making sure to test our changes. After that, we implemented a basic digital signature scheme using hash functions and commitments.

En esta introducción al tutorial, nos familiarizamos con cómo escribir y modificar pruebas de conocimiento cero básicas desde cero. Configuramos nuestro entorno de programación y escribimos un circuito básico. Luego realizamos una configuración confiable, creamos y verificamos pruebas. Identificamos algunos problemas y mejoramos nuestro circuito, asegurándonos de probar los cambios. Después de eso, implementamos un esquema básico de firma digital usando funciones hash y compromisos.

We also learned enough skills and tools to be able to implement group signatures, something that would be difficult to implement without ZKPs.

También aprendimos las habilidades y herramientas suficientes para poder implementar firmas de grupo, algo que sería difícil de lograr sin las ZKP.

I hope you have developed a better mental model of what is involved in writing ZKPs, and have a better sense of what the edit-run-debug cycle looks like in practice. This will work as a good foundation for any other ZKPs program you may write in the future, regardless of what tech stack you end up using.

Espero que hayas desarrollado un mejor modelo mental de lo que implica escribir ZKP, y que tengas una mejor idea de cómo se ve en la práctica el ciclo de editar, compilar y ejecutar. Esto servirá como una buena base para cualquier otro programa de ZKP que escribas en el futuro, sin importar qué stack tecnológico uses.


## Agradecimientos

Thanks to Hanno Cornelius, Marc Köhlbrugge, Michelle Lai, lenilsonjr, and Chih-Cheng Liang for reading drafts and providing feedback on this.

Gracias a Hanno Cornelius, Marc Köhlbrugge, Michelle Lai, lenilsonjr y Chih-Cheng Liang por leer los borradores y brindar retroalimentación sobre esto.


### Imágenes

- _Bourbaki Congress 1938_ - Unknown, Public domain, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Bourbaki_congress1938.png)  
- _Congreso Bourbaki 1938_ - Desconocido, dominio público, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Bourbaki_congress1938.png)

- _Hartmann's Zebras_ - J. Huber, CC BY-SA 2.0, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Hartmann_zebras_hobatereS.jpg)  
- _Cebras de Hartmann_ - J. Huber, CC BY-SA 2.0, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Hartmann_zebras_hobatereS.jpg)

- _Trapdoor Spider_ - P.S. Foresman, Public domain, via [Wikimedia](<https://commons.wikimedia.org/wiki/File:Trapdoor_(PSF).png>)  
- _Araña Trampa_ - P.S. Foresman, dominio público, vía [Wikimedia](<https://commons.wikimedia.org/wiki/File:Trapdoor_(PSF).png>)

- _Kingsley Lockbox_ - P.S. Foresman, Public domain, via [Wikimedia](https://commons.wikimedia.org/wiki/File:Kingsley_lockbox.jpg)  
- _Caja fuerte Kingsley_ - P.S. Foresman, dominio público, vía [Wikimedia](https://commons.wikimedia.org/wiki/File:Kingsley_lockbox.jpg)






