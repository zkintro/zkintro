---
title: 'Understanding the Math Behind ZKPs'
date: '2025-02-21'
tags: ['zero-knowledge']
draft: false
layout: PostSimple
slug: "understanding-math-behind-zkps"
images: ['../assets/03_zkboo_headshot.png']
summary: "In this article we'll explain the math behind ZKPs. Accessible to a smart high school student, or a rusty STEM graduate. Develop intuition for how things work under the hood, and build a foundational framework for the key concepts involved. Accompanied by a toy implementation in less than 100 lines of code. No polynomials or elliptic curves necessary."
---

![ZKBoo](../assets/03_zkboo_headshot.png 'ZKBoo')

## Introduction

In this article we'll explain the math behind ZKPs. Accessible to a smart high school student, or a rusty STEM graduate. Develop intuition for how things work under the hood, and build a foundational framework for the key concepts involved. Accompanied by a toy implementation in less than 100 lines of code. No polynomials or elliptic curves necessary.

### Prerequisites

We assume two things:

- **You are familiar with the basics of ZKPs.** High level is fine, for example by reading [a friendly introduction to Zero Knowledge](https://zkintro.com/articles/friendly-introduction-to-zero-knowledge).
- **You aren't afraid of squiggly symbols (aka math)**. This text assumes you are either (a) a STEM graduate [^1] who has taken a course in math a long time ago, or (b) you are a smart high school student who likes math. You don't need a formal background in computer science, mathematics, or cryptography.

The main requirement is curiosity and drive to learn. If you are lacking knowledge about a specific topic, you can easily look it up [^2]. We deliberately keep the mathematical pre-requisites few and use basic math.

While it is useful to have read both previous articles, strictly speaking only the first is required.

In terms of math background, these are things you should ideally have a basic understanding of:

- System of equations (solving more than one equation at a time)
- Modular arithmetic (clock math)
- Boolean functions (AND, OR)
- Hash functions (like SHA256)
- Notion of randomness (random number)
- Basic probability (random coin toss)
- Prime numbers (knowing they exist)
- Basic math notation (checking equality; $a_i$ means the $i$-th subscript)

Even if you aren't fluent in the above, you'll probably pick things up by osmosis.

### Overview

Here's an overview of how we will proceed. All of these concepts will be introduced in their respective sections, so don't worry if all these terms don't make sense to you right now.

We'll start by going over some key concepts. These are foundational building blocks such as: circuits, functional completeness, commitments, secret sharing, and sigma protocols.

After that we'll look at a specific ZKP protocol: ZKBoo [^3]. ZKBoo is a very simple protocol, and is excellent for developing intuition for how things work under the hood. It does so without requiring more advanced mathematics, such as elliptic curve cryptography.

We'll start by using secret sharing to prove a simple constraint, then build on it from there. Making the protocol interactive with a sigma protocol, functionally complete, and proving multiple constraints. We'll improve the security, the soundness, of it by performing the protocol multiple rounds. Then we'll make it non-interactive using the Fiat-Shamir transform.

You'll understand exactly how we can prove this set of constraints to a Verifier, in a way that is sound, non-interactive, and maintains zero knowledge of some variables:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

After having completed our basic ZKBoo protocol, we'll see how ZKBoo connects to other zkSNARKs you might have heard about. We'll see what ZKBoo is missing, and lay the groundwork for comparing it against different modern ZKP protocols.

Finally, there are some related topics in the appendix. In Appendix A, we see how the core of ZKBoo can be implemented in just ~50 lines of code using SageMath [^4] - remarkably compact. A toy version of the entire protocol still fits in under 100 lines. There's also a link to a Github code repo for further exploration.

Appendix B shows how to generalize our boolean circuits to arithmetic circuits. In Appendix C, we include some more mathematical definitions of zkSNARKs.

Let's get started.

## Key Concepts

_In the following section we introduce some key concepts, such as circuits, functional completeness, commitments, secret sharing, and sigma protocols._

### Circuits

In a ZKP we are proving that we know a secret, such that applying some computation on it results in some specific output, without revealing the secret itself. The computation is made up of some _set of constraints_ that all have to be satisfied. We can model this as a _circuit_.

For example, we can express a computation as satisfying the following set of constraints:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

In this case, $a, b, d$ are private input, and $e$ is public output [^5]. $c$ is determined by $a, b$, and is thus an intermediate variable.

We can visualize this as the following circuit:

![Circuit](../assets/03_circuit.png 'Circuit')

Unlike a normal computer program, constraints are unordered. It doesn't matter which order constraints are defined in, as they all have to be satisfied [^6]. This means there's no real difference between public input and public output, mathematically speaking.

We often split up the different types of variables as [^7]:

- _Witness variables_ - private variables, known only to the Prover
- _Instance variables_ - public variables, input or output, known both to Prover and Verifier

Different people use different words, so it is useful to be be aware of different ways of referring to these variables. Mathematically speaking, we can express the circuit above as:

$$
C(x,w) = 0
$$

Where $x$ is the public variable ($e$), $w$ the witness variables ($a, b, d$). That is, we have:

$$
\begin{aligned}
a \cdot b - c = 0 \\
c + d - e = 0
\end{aligned}
$$

What we are doing when we are proving a ZKP is proving that a set of equations hold, without revealing information about some set of private variables or witness. [^8]

### Functional Completeness

How do we connect the equations or constraints we are solving to a computer program? The simplest way to understand this is to start with the most primitive example: _boolean circuits_.

If all the values are boolean, $0$ or $1$, we call it a _boolean circuit_. In boolean algebra all values are 0 or 1. We can define simple logical gates, just like in an electronic circuit (hence the name, circuit). For example, XOR is exclusive-or and can be illustrated by the following truth table:

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

It turns out that we only need two logical gates, `XOR` and `AND` in order to express any computation possible. This is called _functional completeness_ [^9], and means we can express any truth table with only these two operations.

In the circuit mentioned in the previous section we are relying on addition and multiplication. If we operate on boolean values, it turns out that these are equivalent:

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

That is, `XOR` behaves like `ADD` and `AND` behaves like `MUL`. For example, $1+1 = 0$ in boolean algebra (modulo 2). Similarly, we can easily express `OR` and `NAND` (NOT-AND) gates like this:

$$
\begin{aligned}
\text{OR(a,b)} &= a + b - (a \cdot b) \\
\text{NAND(a,b)} &= 1 - (a \cdot b)
\end{aligned}
$$

With simple boolean gates like this we can build a modern computer. To understand how this is possible, there's a book and course called _From Nand to Tetris_ that shows how you can build a modern computer from scratch with a simple `NAND` boolean gate. [^10]

The ZKP system we will look at is called ZKBoo, which was originally defined for boolean circuits. In the text below, we'll instead assume _arithmetic circuits_ which operate on "normal integers" [^11]. In Appendix B, we look at how we can "justify" arithmetic circuits mathematically speaking. For now all you need to know is that we can generalize the above, and we'll be using normal integers like $1, 4, 7$ etc as values for our variables.

### Commitments

We previously introduced commitments in _Programming ZKPs: From Zero To Hero_ [^12]. We'll briefly recap them here.

Commitments allow us to commit ("promise") to some value without revealing it. We commit in such a way that we can't change our mind about what we committed to. There are many types of commitments, but the simplest is to commit to a single message, and to use a _hash function_ like `SHA256` to do so [^13].

Commitments have two key properties:

- **Binding**: Once you commit you can't change your mind about what you committed to
- **Hiding**: The commitment doesn't leak any information about the value we committed to

They allow us to do two operations:

- **Commit**: Commit to a specific value while keeping it hidden
- **Reveal**: Reveal the value so it can be verified to be correct (matching what we previously committed to)

Reveal is also sometimes called "open" in the cryptographic literature.

When we commit to a message, we add some randomness to it. This makes it harder to brute-force the message being hashed if the message can be easily guessed. For example, if you know the message is a number from 1 to 100, you can simply try all combinations until you recreate the commitment.

Committing using a hash function might look like this:

$$
\text{com} = \text{SHA256}(m||r)
$$

Here we concatenate ($||$) the message $m$ with some randomness $r$. Using a hash function, like `SHA256`, ensures we can't easily retrieve the message from $\text{com}$.

More concretely, we might have:

```
SHA256('foobar213151') = '419d....1611'
```

This takes the message `foobar`, adds some randomness to it and we get a commitment, a hash `419d...1611` as a result. If we give this commitment to someone else, we can later choose to reveal value $m, r$. That person can then verify that our commitment matches our original message $m$.

Commitments are very common in cryptographic protocols because they allow us to (a) bind to values (b) hide them. Specifically they are one of the key components in ZKBoo.

### Secret Sharing

Another key component of ZKBoo is _secret sharing_. The key idea is to split up a secret into multiple parts, so you can't reconstruct it without having all the parts.

If we have a value $x$ we can split it up as follows:
$$x = x_1 + x_2 + x_3$$
Where $x_1, x_2, x_3$ are some randomly selected values that add up to $x$.

If we give the values $x_2$ and $x_3$ to someone this doesn't tell us anything about what $x$ or $x_1$ is. For example, if I have $7 = 4 + 2 +1$ with $x=7, x_1=4$ and I give you $2$ and $1$ there's no way for you to find out what x is. We could have $x=4, x_1 = 1$, $x = 5, x_1=2$, etc [^14].

In the context of ZKBoo this type of secret sharing of variables is also called _MPC-In-The-Head_. MPC stands for multi-party-computation [^15], and traditionally it consists of multiple actors (people, servers) all coming together to do some computation together. While MPC can get quite complex, in this case it is "in the head", so we are simply simulating it in our own head. You can imagine you have three actors inside your head and you give them a share of the secret each. You can visualize these secret shares as puzzle pieces, and you need all of them to see the full picture [^16]:

![Puzzle](../assets/03_puzzle.png 'Puzzle')

### Sigma Protocol

By combining commitments and secret sharing into a so-called _sigma protocol_ we have all the ingredients we need for ZKBoo. A sigma protocol is a protocol that consists of two parties, a Prover and a Verifier. They exchange three messages as follows: commitment, challenge and response.

$$
\begin{array}{c}
\textbf{A Sigma Protocol} \\[10pt]
\text{Prover} \xrightarrow{\text{1. Commitment}} \text{Verifier} \\[10pt]
\text{Prover} \xleftarrow{\text{2. Challenge}} \text{Verifier} \\[10pt]
\text{Prover} \xrightarrow{\text{3. Response}} \text{Verifier} \\[15pt]
\end{array}
$$

Because it consists of interactions between two parties, it is also an _interactive protocol_. It is called a sigma protocol because the interaction resembles the Greek letter Sigma, $\Sigma$ [^17]. A sigma protocol allows a Prover to, in an interactive fashion, convince a Verifier that some statement is true, without revealing some secret information. You can think of it as a primitive ZKP.

By committing to some values first, the Prover can't change their mind about those values. After that, the Verifier challenges the Prover with some tricky question. The Prover responds, and if the Verifier is happy with the response they are convinced.

Many different sigma protocols exists [^18]. Generally they all have the following key properties [^19]:

- **Completeness**: If a Prover knows the solution to a set of constraints, they can always convince the Verifier
- **Soundness**: The Verifier is only convinced if the Prover actually knows the secret; if the Prover tries to cheat, then the probability to succeed is negligible
- **Zero-Knowledge:** The Verifier doesn't learn anything about the Prover's secret, except that they have a valid solution

The above might seem a bit abstract, but it will become a lot more concrete once we see how this is used in practice for ZKBoo.

What follows are some simple exercises to check your understanding.

### Exercises

1. In $x + 1 = y; y + 5 = z$, if $x$ is something the Prover wants to keep secret, what is the witness variable and public output?
2. Why does the order of constraints not matter? What happens if we swap the order of the two constraints above?
3. Alice commits to a number using `SHA256(x || r)`. If she later claims she committed to 42, how can she prove it?
4. If Bob splits `x=12` into 3 shares such that $x_1 + x_2 + x_3 = x$, what is a possible set of values for $(x_1, x_2, x_3)$? Why does revealing $x_2$ and $x_3$ not give us any information about $x$?
5. In a sigma protocol, why does the Prover have to commit before the Verifier sends the challenge?

## ZKBoo

_In this section we explain how ZKBoo works. We gradually build up from one addition constraint, to multiple constraints, to a complete interactive protocol. Then we make it statistically sound and finally we make it non-interactive._

ZKBoo is a simple ZKP protocol. It is based on boolean circuits, commitments, secret sharing (MPC-in-the-Head) and sigma protocols. It is currently not used a lot in practice, primarily because people prefer proof systems with smaller proofs [^20]. So why learn it?

It is conceptually very simple. This means you can understand all the math behind it and implement it yourself. It doesn't require advanced mathematics or a lot of cryptography to grok. This makes it ideal for building intuition for how the math behind ZKPs work in practice. Once you understand a ZKP protocol in detail, it is a lot easier to compare it with other ZKP protocols. We'll look at this towards the end of the article and in future articles. This will help you make informed decisions about what ZKP protocol to use under what circumstances.

### Splitting our variables with secret sharing

Recall the system of equations from earlier:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

To simplify, let's focus on proving $c + d = e$, where $c,d$ are private and $e$ is public. Using secret sharing, we split each variable into three random shares:

$$
\begin{aligned}
c &= c_1 + c_2 + c_3 \\
d &= d_1 + d_2 + d_3 \\
e &= e_1 + e_2 + e_3 \\
\end{aligned}
$$

The shares must preserve the relationship $c + d = e$, meaning $c_i + d_i = e_i$ for each $i$. In the MPC-in-the-Head paradigm each column with subscript $_1, _2, _3$ corresponds to an "actor" in your head, holding part of the secret. We can visualize the secret shares in the following table format:

$$
\begin{array}{c|ccc}
 & \text{Column 1} & \text{Column 2} & \text{Column 3} \\ \hline
\text{Row 1} & c_1 & c_2 & c_3 \\
\text{Row 2} & d_1 & d_2 & d_3 \\
\text{Row 3} & e_1 & e_2 & e_3 \\
\end{array}
$$

Here's how we split these variables to achieve this:

- For the first row, we randomly generate $c_1, c_2, c_3$ such that $c_1 + c_2 + c_3 =c$
- For the second row, we do the same thing for $d_1, d_2, d_3$ and $d$
- For the third row, we set $e_1 = c_1 + d_1$, $e_2 = c_2 + d_2$, and $e_3 = c_3 + d_3$, ensuring that $e = e_1 + e_2 + e_3$

If the Verifier challenges the Prover to reveal two random columns, e.g. $(2,3)$, they check that:

$$
\begin{aligned}
c_2 + d_2 \stackrel{?}{=} e_2 \\
c_3 + d_3 \stackrel{?}{=} e_3
\end{aligned}
$$

Because the shares are generated randomly, revealing two columns doesn't provide any information about $c, d$, while still proving the relationship holds.

Going forward, we won't make the table with rows or columns explicitly, but you can always draw it out for yourself. Just remember that a column corresponds to a share.

### Sigma protocol for ZKBoo

As a Prover, you want to convince the Verifier that you know $c$ and $d$ that fulfill the equation above, without revealing them. Here's how we'll achieve this, with a sigma protocol.

6. Prover commits to each column, $1..3$ and sends this to the Verifier
7. Verifier challenges the Prover by asking it to reveal two columns, $(i, j)$
8. The Prover responds with the values from the columns that the Verifier asks for

Once the Verifier has those values, it'll perform two checks:

- Consistency check: verify that the values add up, e.g. $c_i + d_i = e_i$
- Commitment check: verify that the commitments matches the values Prover responded with

If both of those checks pass, then the Verifier is reasonably convinced [^21] that the Prover knows $c$ and $d$. When committing, the Prover also uses some randomness to make sure the values can't be brute-forced. By using the hiding properties of commitments and secret sharing, the Prover doesn't reveal anything about $c$ and $d$ itself.

Here's a diagram of this sigma protocol:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\text{Commitment: } \{\text{com}_1, \text{com}_2, \text{com}_3\}\ \text{ where } \text{com}_k = \text{hash}(c_k, d_k, e_k, r_k) \text{ for } k =1,2,3} \\
\xleftarrow{\text{Challenge: Reveal two columns } (i, j)} \\
\xrightarrow{\text{Response: } (c_i, d_i, e_i, r_i), (c_j, d_j, e_j, r_j)} \\
\text{Verifier checks:} \\
\begin{aligned}
9. &\quad c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j, \\
10. &\quad \text{com}_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, \text{com}_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j).
\end{aligned}
\end{array}
$$

This achieves the three properties we care about:

- Completeness - The Prover knows a solution, and they can always convince the Verifier
- Soundness - The Verifier is only convinced if the Prover actually knows the secret (we will look at the case where the Prover is cheating next)
- Zero-knowledge - The Verifier doesn't learn anything about $c$ and $d$ (except that they add up to $e$)

While committing to values per column means the Prover can't later change their mind about the content of those columns, there are still some problems. What if the Prover guesses which columns the Verifier will challenge them with? There are only three possible options $(1,2), (1,3), (2,3)$. If so, they can cheat by only making sure those columns add up, without knowing $c$ and $d$. This means there's a whopping $\frac{1}{3}$ chance of cheating!

This touches on the statistical nature of _soundness_. In cryptography in practice, probabilities often play a role in ensuring security. The goal is to reduce the risk of cheating to a negligible -astronomically so - level. We'll see how to do that soon, using multiple rounds of the protocol.

But first, let's see how we deal with multiplication and multiple constraints.

### Supporting multiplication

Let's go back to our original set of constraints:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

Addition like $c+d=e$ was easy enough. What about multiplication? We want to decompose the relationship $a \cdot b = c$ into secret shares. How can we do this?

First we notice the following. If we naively split $a, b, c$ and set $c_i = a_i \cdot b_i$, this doesn't work. Why?

$$
\begin{aligned}
a \cdot b & = (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) \\
&= a_1 b_1 + a_1 b_2 + a_1 b_3  + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
&\neq a_1 b_1 + a_2 b_2 + a_3 b_3
\end{aligned}
$$

This is because multiplication is not linear, so we get cross-terms:

$$
a_1b_2, a_1b_3, a_2b_1, a_2b_3, a_3b_1, a_3b_2
$$

We need to find a better way of assigning $c_i$ to keep the relationships consistent. We can do this by splitting the cross-terms evenly across each share [^22]:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 \\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 \\
\end{aligned}
$$

Now the relationship holds. We have:

$$
\begin{aligned}
a \cdot b &= (a_1 + a_2 + a_3) \cdot (b_1 + b_2 + b_3) = \dots = c_1 + c_2 + c_3 = c
\end{aligned}
$$

However, there's a new problem. As we reveal two columns, say $(1,2)$ we leak information about the third one. With $(1,2)$ we reveal some information about the third column through the factors $a_2 b_3 +a_3 b_2$. Depending on what the values represent, the Verifier might be able to infer what $a_3$ and $b_3$ are.

We can get around this by adding some randomness:

$$
\begin{aligned}
c_1 = a_1 b_1 + a_1 b_2 + a_2 b_1 + r_1 - r_2\\
c_2 = a_2 b_2 + a_2 b_3 + a_3 b_2 + r_2 - r_3 \\
c_3 = a_3 b_3 + a_1 b_3 + a_3 b_1 + r_3 - r_1 \\
\end{aligned}
$$

Now, we still have $c = c_1 + c_2 + c_3$, because all the random variables cancel out:

$$
r_1 - r_2 + r_2 - r_3 + r_3 - r_1 =0
$$

By adding some randomness, we don't reveal any information about the third column. We are thus using randomness to mask sensitive information, a common trick used in cryptography.

Where does $r_1, r_2, r_3$ "belong"? We add them as another variable. Seen as a table with rows and columns, we have:

$$
\begin{array}{c|ccc}
 & \text{Column 1} & \text{Column 2} & \text{Column 3} \\ \hline
a & a_1 & a_2 & a_3 \\
b & b_1 & b_2 & b_3 \\
r & r_1 & r_2 & r_3 \\[6pt]
c & c_1 & c_2 & c_3 \\
\end{array}
$$

where $c_1$, $c_2$, and $c_3$ are set as above. Notice how revealing columns $(1,2)$ reveals $r_1$ and $r_2$ but leaves $r_3$ unknown, thus masking the third column's value.

### Putting it all together

Finally, to combine the above with the original set of constraints:

$$
\begin{aligned}
a \cdot b &= c \\
c+d &= e
\end{aligned}
$$

As a Prover, we:

- Set $a, b, d$ shares randomly, as above
- Set $c$ such that $a \cdot b = c$, and same for all shares
- Set $e$ such that $c+d=e$, and similarly for all its shares

Here's our updated sigma protocol with commitment-challenge-response:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ where } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ for } k = 1,2,3} \\
\xleftarrow{\text{Reveal two columns } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

Verifier does (a) consistency checks and (b) commitment checks.

Consistency check for each constraint:

- Verify $a \cdot b = c$ for shares:
  - $c_i \stackrel{?}{=} (a_i b_i + a_i b_j + a_j b_i) + (r_i - r_j)$,
  - $c_j \stackrel{?}{=} (a_j b_j + a_j b_k + a_k b_j) + (r_j - r_k)$
  - Note that $r$ subscripts $i, j, k$ are $\mod 3$
- Verify $c + d = e$ for shares: $c_i + d_i \stackrel{?}{=} e_i, \quad  c_j + d_j \stackrel{?}{=} e_j$

Commitment checks:

- $com_i \stackrel{?}{=} \text{hash}(a_i, b_i, c_i, d_i, e_i, r_i), \quad com_j \stackrel{?}{=} \text{hash}(a_j, b_j, c_j, d_j, e_j, r_j)$

In the above, $r_k$ corresponds to the $k$-th column, which is not revealed. Depending on how we perform multiple rounds, this may or may no be revealed. We still check $c_i$ though, since the $i$ and $j$-th columns are revealed.

With this, we have proven a set of constraints using addition and multiplication, thus demonstrating functional completeness. We did so in a way that kept the private values private, and convinced the Verifier that the Prover knows them. Next, we'll look at how to improve the soundness by running the protocol multiple rounds.

### Improving soundness

Let's look more critically at the sigma protocol we specified above. What if the Prover cheats? Let's say she guesses that the Verifier will pick column $(2,3)$. Then she doesn't actually have to know the private values. For example, in $c +d =e$ they don't have to know $c$ or $d$, $c_1$ or $d_1$. She can just make up values that make the _consistency check_ succeed. This is because the verifier only checks the second and third column.

Recall the checks the Verifier performs:

- Consistency check: $c_i + d_i \stackrel{?}{=} e_i, \, c_j + d_j \stackrel{?}{=} e_j$
- Commitment check: $com_i \stackrel{?}{=} \text{hash}(c_i, d_i, e_i, r_i), \, com_j \stackrel{?}{=} \text{hash}(c_j, d_j, e_j, r_j)$

More concretely, we can just pick random values for $c_2, d_2$ such that $c_2 + d_2 = e_2$, and likewise for $c_3, d_3$. This doesn't require any knowledge of $c$ or $d$. Assuming the Prover thinks $(2,3)$ will be picked, then the Verifier is only checking that $c_2 + d_2 = e_2$ and $c_3 + d_3 = e_3$. This is no good.

Of course, due to the commitments, the Prover can't change their mind. if we didn't have this commitment check then they could cheat every single time. That's why we need the binding property of commitments, and why the commitment is communicated _before_ the Verifier decides which shares to look at.

What is the probability of guessing correctly? There are three choices of two columns: $(1,2), (1,3), (2,3)$. This means there's a $\frac{1}{3}$ chance of cheating [^23]. We call this the _soundness error_. We'd like to reduce this to a much smaller probability.

How can we do this? Turns out we can do this by doing the sigma protocol multiple rounds. Each time the Verifier picks a new set of two random shares. Of course, after the Verifier has picked, say, $(1,2)$ and $(2,3)$ they know the values of all three shares and can easily reconstruct the original $c$ and $d$, which is no good.

The way we get around this problem, but still keep the probability of cheating low, is to create new secret shares every round. For a given variable, we split it as $x = x_1 + x_2 + x_3$, where $x_1, x_2, x_3$ are random values to make the equation hold. We do this for every variable. The Verifier performs the challenge, asking for two shares, and performs consistency and commitment checks. In the next round, we again use new random shares to split our variables. This way, the Verifier can't combine the information they received in different rounds, because all they are seeing are different random shares.

With this, what is the probability of cheating? For the addition constraint above, each run it is $\frac{1}{3}$, and if we do $n$ runs we get:

$$
\left(\frac{1}{3}\right)^n
$$

If $n$ is sufficiently large, the probability of cheating is negligible. For example, if we do 100 rounds we get a probability of $(\frac{1}{3})^{100} \approx 10^{-48}$. This is extremely low. For additional security, we can just run more rounds. For more details on soundness error, see footnote [^24].

While this is a lot more secure, this requires a lot of interactions between the Prover and Verifier. For each round we need to send 3 messages, and for 100 rounds that's 300 messages back and forth! That's not very practical in the real world. To address that, let's look at how can make this protocol non-interactive, and get that down to a single message with the use of the _Fiat Shamir Transform_.

### Fiat-Shamir Transform

We managed to make the protocol statistically secure by running multiple rounds. Here's the sigma protocol we had for a single round:

$$
\begin{array}{c}
\textbf{Prover \hspace{4cm} Verifier} \\
\xrightarrow{\{\text{com}_1, \text{com}_2, \text{com}_3\} \ \text{ where } \text{com}_k = \text{hash}(a_k, b_k, c_k, d_k, e_k, r_k) \text{ for } k = 1,2,3} \\
\xleftarrow{\text{Reveal two columns } (i, j)} \\
\xrightarrow{(a_i, b_i, c_i, d_i, e_i, r_i), (a_j, b_j, c_j, d_j, e_j, r_j)} \\
\end{array}
$$

The goal of the _Fiat-Shamir Transform_ is to turn this _interactive protocol_ into a _non-interactive_ one, where the Prover sends a single message, a proof, and the Verifier has all the information they need to verify the proof.

Why is the Verifier sending the challenge after the commitments in the first place? Because he doesn't want the Prover to change her mind and cheat by choosing the columns on their own. This would break _soundness_. From the Prover's point of view, this selection is random. Can we get this randomness somewhere else? Without having the Verifier generate it?

Enter the _Fiat Shamir Transform_. The key idea is to replace the randomness the Verifier is using with a deterministic hash function. Because hash functions are pseudo-random [^25], we can use this to generate a random number, that is then used to randomly select two columns.

At a high level, instead of this:

$$
\begin{array}{c}
\textbf{A Sigma Protocol} \\[10pt]
\text{Prover} \xrightarrow{\text{1. Commitment}} \text{Verifier} \\[10pt]
\text{Prover} \xleftarrow{\text{2. Challenge}} \text{Verifier} \\[10pt]
\text{Prover} \xrightarrow{\text{3. Response}} \text{Verifier} \\[15pt]
\end{array}
$$

We do this:

$$
\begin{array}{c}
\textbf{A Non-interactive Protocol} \\[10pt]
\text{Prover} \xrightarrow{\text{\{Commitment, Challenge, and Response\}}} \text{Verifier} \\[15pt]
\end{array}
$$

The challenge should be produced with a hash, and include commitments as well as some public information. It is something the Prover and Verifier silently agree on, not something the Prover can decide on their own. In fact, we don't even need to send the challenge, since it can be calculated by both parties. The Prover creates commitments, computes the challenges and responses - all locally - and sends this to the Verifier. The Verifier then notes the commitments, recomputes the challenge on their own, and verifies responses and commitments.

How is the challenge computed? Why does this work? As input to our hash, we use some public information, and this acts as a "random seed" [^26] that neither the Prover or public controls the output for. This means we don't have to communicate this information, but can just compute this source of randomness on their own. Here's what the challenge might look like in practice:

$$
\text{challenge} = \text{hash}(com_1, com_2, com_3, \text{<public info>})
$$

By adding some public information `<public info>`, such as name of the circuit (e.g. `zkboo-example`) and public input (e.g. e's value `5`) the Prover herself doesn't control all the input to the hash function. It is also crucial that we include all commitments as input to this hash function, so the Prover can't change her mind about what they committed to. Since hash functions like SHA256 are deterministic, the Verifier will re-create the same challenge, assuming they have access to all its input.

In our case, the Verifier is choosing two columns $(i,j)$ out of 3. There are three possibilities, so we can simply take our random hash and perform $\mod 3$ on it to get a column selection deterministically.

If we only do one round, it is quite easy for the Prover to just cheat by guessing what columns will be chosen, create commitments and compute the challenge. If the challenge results in them "guessing correctly", then they can create a fake proof. If they don't, they can tweak the inputs to create slightly different commitments, and hope they get lucky next hash run. After all, this is all done locally, so the Verifier is not aware of this.

This is why it is crucial we run multiple rounds of the protocol. And specifically, we need to use each previous round as input to the next rounds challenge. Only then can we achieve the same soundness guarantees [^27].

To ensure soundness, the challenge for each round must depend on all previous commitments. This prevents the Prover from "backtracking" to generate favorable outcomes. We compute the challenge for round $k$ as follows:

$$
\text{challenge}_k = \text{hash}(com_{1,1}, com_{1,2}, com_{1,3}, \dots, com_{k,3}, \text{<public info>}, k) \mod 3
$$

Where $com_{k,i}$ is the commitment for the $k-th$ round of share $i$, and `<public info>` is a placeholder for some predetermined shared public knowledge. By adding $k$ we ensure each round has a unique challenge, even if commitments and public info is repeated. Public info acts as a fixed source of randomness, which means neither Prover nor Verifier controls the hash output. Finally we take $\mod 3$ to make it correspond with a column choice $(i, j)$.

The Prover sends commitments and responses for all rounds. All of this information makes up the proof $\Pi$. The Verifier recomputes the challenges for each round, verifies the responses and commitments, and either accepts or rejects the proof.

$$
\begin{array}{c}
\text{Prover} \xrightarrow{\Pi = \{\text{Commitments: } \{com_{k,1}, com_{k,2}, com_{k,3}\}, \text{Responses: } \{(c_{k,i_k}, \dots)\}} \text{Verifier} \\[15pt]
\end{array}
$$

Why does this work? We are using the _binding_ property of commitments to ensure that the Prover can't change earlier inputs once challenge is generated. All challenges depends on previous commitments, and because we run the protocol $k$ rounds we guarantee soundness with very high probability.

This is great, and we now just need a single message to convince a Verifier. There's still a problem though, in that this requires quite a lot of data. Notice how each proof requires $3 \cdot k$ commitments, as well as $n \cdot k$ responses, where n is the number of variables and $k$ is the number of rounds. If we have a significant number of variables, and if $k$ is roughly 100, that results in quite a big proof.

Unfortunately, with our current tools we won't be able to make this proof more _succinct_. For that, we'll need to add some more tools to our toolbox. But that's for another time. We'll touch on this towards the end of the article.

If you are interested in how we jump from boolean circuits to arithmetic circuits, see Appendix B. Next let's see at how ZKBoo fits into the wider ZKP landscape.

### Exercises

1. In a sigma protocol with 3 shares, where two shares are revealed, what is the probability of a cheating Prover to convince a Verifier in a single round? How does running multiple rounds help?
2. If the Prover knew in advance which columns a Verifier would choose, how could they cheat?
3. In Fiat-Shamir, why does hashing all commitments before generating the challenge make it harder to cheat?

## zkSNARKs

_Explains the connection with the above ZKP to zkSNARKs (Zero-Knowledge Succinct Non-Interactive ARguments of Knowledge). We break down each property and see how it relates to ZKBoo._

You might've noticed we called ZKBoo a ZKP (Zero Knowledge Proof) and not a zkSNARK, which is a term you might have heard before. While not everyone is using terms correctly [^28], it is useful to understand what each of these properties refer to.

Colloquially, we call ZKPs "proofs". Technically speaking, they are ARguments of Knowledge. The distinction has to do with the nature of soundness. We saw previously how we got completeness, soundness and zero-knowledge with sigma protocols. Together, the completeness and soundness properties give us "ARguments of Knowledge". In practice, we rely on _computational soundness_, which technically makes it an argument of knowledge and not a proof. [^29]

The Zero-Knowledge property we have gone over; we don't reveal anything about our witness to the Verifier. Curiously, a lot of "ZK" projects and "zkSNARKs" don't actually provide the "zero knowledge" property in practice. A more accurate term to use then would probably be _verifiable computation_ and (S)NARKs, but that sounds less sexy.

The non-interactive property (the "N" in zkSNARks) we went over. It turns out we can take basically any ZKP and make it non-interactive using the Fiat-Shamir transform. It is common to start by defining an interactive sigma protocol, and then later on make it non-interactive using Fiat-Shamir.

Finally, the property that we haven't talked about so far is _succinctness_. This means two things: (a) the proof is short, and (b) the proof is fast to verify. Unfortunately, this is a property that ZKBoo is missing. To get that property, we are going to need some more advanced mathematical tools. In particular, we will need polynomials and elliptic curve cryptography. We'll look into this more in a future article.

For more (still informal) mathematical details see Appendix C.

Let's look a little bit more at succinctness and ZKBoo to better understand what is going on.

### On succinctness

Why is ZKBoo not succinct? When we talk about succinctness we refer to two separate properties:

- Succinct proof size: the proof is short
- Succinct verification time: the proof is fast to verify

Usually these properties are found together, but we analyze them separately [^30].

Let's focus on how big the proof is first. We previously noted that each proof requires some commitments and responses proportional to $n$, where n is the number of constraints, or the size of the circuit, $|C|$. When we say a proof is short, we care primarily about how the size changes as a function of the number of constraints. By size we mean how many pieces of data have to be sent, which in practice correlates with the total bytes needed to represent a proof.

We often use _Big-Oh_ (also written _Big-O_) notation to describe how well a function performs as the number of elements it operates on increases [^31]. In ZKBoo's case, the proof size grows linearly with the number of constraints, or $O(n)$ in Big-Oh notation. For example, if the circuit has $n = 1000$ constraints, the proof needs on the order of 1000 commitments and responses.

With Big-Oh notation, we can talk about order of approximation without getting bogged down in details [^32]. Here's an illustration of some common classes of complexity:

![Big Oh Complexity](../assets/03_bigoh.png 'Big Oh Complexity')

For a proof to be succinct it needs to ideally be "sublinear". What does sublinear mean? Anything that is strictly "below" $O(n)$ in the chart above . For example, $O(\log n)$ (logarithmic) or $O(1)$ (constant) [^31], [^33].

Intuitively, this means that as we add more constraints the size of the proof increases by less and less. The best performance is $O(1)$, where the proof size stays the same no matter the number of constraints.

What about time required to verify the proof? The Verifier has to perform consistency checks for all constraints. This is essentially equivalent to re-evaluating the whole circuit. This means verification time is linear, or O$(n)$ where n is the number of constraints $|C|$ . Thus, ZKBoo doesn't have sublinear verification time. Time here corresponds to the number of operations that a Verifier has to perform, and in practice correlates with actual "clock time". Hence, ZKBoo does not have succinct verification time.

We often want succinctness, since it means we can prove arbitrary computation in a small space (and quickly). Why doesn't ZKBoo give us this and what can be done about this?

Fundamentally, the problem is that the tools we are using are too primitive. With our current commitment scheme and secret sharing, we have to represent and evaluate all the constraints. Instead, what we can do is to use _polynomials_ to compress our constraints into a smaller space. This leads to the idea of _polynomial commitment schemes_. But that's a story for another time.

### Next

_Hints at what is next, with polynomials, succinctness, PCS, IOP, comparison; either for a big coffee break or next article._

We've seen how to make a non-interactive ZKP end-to-end with ZKBoo. This gives us an excellent foundation for understanding the wider zkSNARKs landscape.

Here are some things to look forward to next:

- Understanding importance of polynomials, how they enable succinctness
- Generalizing commitments to polynomial commitment schemes (PCS)
- Generalizing sigma protocol to polynomial interactive oracle proof (IOP)
- Understanding PCS + Poly-IOPs framework for modern ZKP systems
- Different PCS: KZG/FRI/IPA
- Understanding different domains: server-side vs client side proving
- Grok dimensions: field size, post-quantum, setups, security assumptions
- How public blockchains can be used to verify proofs
- Why STARKs are SNARKs
- Structured vs unstructured circuits
- Other novel ZKPs

We won't go as deep on those topics, but we'll give you enough resources to feel confident to (a) either learn more or to (b) choose a zkSNARK for your specific demands.

### Exercises

4. What properties do we get from ZKBoo?
5. Why is ZKBoo not succinct? Intuitively speaking.

### Problems

These are optional problems that will take a bit more effort.

6. Implement multiple rounds in SageMath (see Appendix A)
7. Implement Fiat-Shamir in SageMath (see Appendix A)
8. Find a few proof systems you've heard about. Identify how they are similar and different from each other. Compare and contrast with ZKBoo.

### Conclusion

_Re-cap of what we went over._

In this article we started from a basic understanding of ZKPs and a minimal math background. We then introduced key concepts such as circuits, functional completeness, commitments, secret sharing and sigma protocols.

We then took those key concepts and looked at how to use them to make a ZKBoo ZKP. We looked at a set of constraints and saw how we could prove them, starting from a simple addition constraint. We saw how to make it work for multiple constraints, and how we leverage randomness in multiplication constraints. We analyzed the security of the protocol and improved its soundness by running it multiple times. Then we made the whole thing non-interactive using Fiat-Shamir.

After that, we dove a bit deeper into some specific topics. We saw how to generalize boolean circuits to arithmetic circuits using finite fields, and we went over the properties of zkSNARKs and how they apply to ZKBoo. We developed an intuition for why ZKBoo doesn't achieve succinctness. And finally, we hinted at some more advanced topics that we can explore next.

If you want to deepen your understanding, a good idea is to look at the code snippets (Appendix A) and see how you can extend or modify it. If something was confusing, feel free to reach out! Good luck on your ZK journey and see you soon.

## Acknowledgements

Thanks to Hanno Cornelius, dmpierre, Aayush Gupta, Adrian Li, Chih-Cheng Liang, and r4bbit for reading drafts and providing feedback on this.

### Images

- _Big O cheatsheet_ - Eric Rowell, Public Domain, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Big-O_Cheatsheet.png)

## Appendix A: ZKBoo Code

_What follows is a code examples of implementing ZKBoo concisely in SageMath._

There's a code repo available here: https://github.com/oskarth/zkintro-math

It shows an implementation of various constructs specified in the article above. While not required, it can be useful to map the math equations to actual code. It is implemented in SageMath, which is a piece of math software on top of Python. It reads basically as pseudo-code, and it allows us to concisely express math as code.

In the repo we have the following examples:

- `commitments_shares.sage` - basic commitments and secret sharing
- `zkboo_add.sage` - basic addition constraint in ZKBoo
- `zkboo_mul.sage` - basic addition and multiplication constraint in ZKBoo

Extending the above to support multiple rounds and Fiat-Shamir transform is currently left as an exercise for the reader.

In total, the ZKBoo protocol can comfortably be expressed in under 100 lines of code [^34]. Once a mathematical prototype in Sage exists, it is much easier to then "port" this to something like Python, JavaScript, Rust, or Go for real-world usage.

The following code snippet (`zkboo_mul.sage`) shows functional completeness for one round of interactive ZKBoo in 60 lines of code with comments. It can be extended to use multiple rounds and made non-interactive with Fiat-Shamir in less than 100 lines of code.

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

## Appendix B: Arithmetic Circuits

_This section explains how to generalize the boolean circuits above to arithmetic circuits._

In mathematics, there's a field called _abstract algebra_. It deals with different algebraic structures and operations on top of them. For example, we have things like the _set of natural numbers_ or the _set of integers_:

$$
\begin{aligned}
\mathbb{N} &= \{1, 2, 3, \dots\} \\
\mathbb{Z} &= \{\dots, -2, -1 ,0, 1, 2, \dots\}
\end{aligned}
$$

We combine these sets with some operations, such as _addition_ or _multiplication_, that work in a particular way. With this we can talk about structures like _sets_, _groups_, _rings_, and _fields_. The particular definitions of these structures aren't that important right now. The key idea is that each structure adds more capabilities:

$$
Set \subset Group \subset Ring \subset Field
$$

Fields in particular allow for _division_ (except by zero). This is because there exists a multiplicative inverse for every element in a field. Notably, this is not true for the set of integers with addition and multiplication, written $(\mathbb{Z}, +, \cdot)$ [^35].

For example, the multiplicative inverse of $3$ is $\frac{1}{3}$ (since $3 \cdot \frac{1}{3} = 1$), which doesn't exist in $\mathbb{Z}$, because it isn't an integer [^36]. If we were to talk about the set of real numbers, $\mathbb{R}$ it would be fine because $0.33...$ is in it, so $(\mathbb{R}, +, \cdot)$ is a field.

Computers however work on hardware and we operate on finite numbers. So when it comes to to cryptography, we are are interested in _finite fields_. That is, a field with a finite set of members. For example:

$$
\mathbb{F}_5 = \{{0, 1, 2, 3, 4}\}
$$

A lot of cryptographic protocols require division and well-defined modular arithmetic. It turns out that we can construct a finite field by simply restricting it $\mod p$, where $p$ is a prime number [^37]. We write this either as $\mathbb{F}_p$ or $\mathbb{GF}(p)$. The $\mathbb{GF}$ stands for Galois Field, which is another name for finite fields [^38].

In the example above, if we exclude $0$ (since division by $0$ is not allowed; indicated by $^*$), we have:

$$
\mathbb{F}^*_5 = \mathbb{GF}^*(5) = \{{1,2,3,4}\}
$$

We can see that each element has a multiplicative inverse in the set. For example, $2 \cdot 3 \mod 5 \equiv 1$.

In ZKBoo above, we are using $\mathbb{GF}(2)$, the simplest finite field, for boolean circuits. Arithmetic circuits generalize this to $\mathbb{GF}(p)$, where $p$ is a prime number. This means all operations, addition and multiplication, are performed $\mod p$, ensuring values stay within that field. This allows us to work with numbers larger than 0 and 1. In this field, addition and multiplication work well, so we can perform well-defined modular arithmetic. We can use integers as we expect to, as long as they are bounded by (less than) a specific prime number. In practice, we often use very large prime numbers [^39]. This means we can express very large numbers and arithmetic around it in a well-defined manner.

## Appendix C: zkSNARKs math definitions

Let's make the section on zkSNARKs above a little bit precise, while still keeping it mathematically informal [^40]. Feel free to skip this appendix if you are satisfied by the main text.

**Completeness** - for all $x, w$ in $C(x,w)$ the probability that the Verifier V accepts Prover's proof $P(x,w)$ is 1. That is:

$$
\forall x, w: C(x,w) = 0 \implies Pr[V(x, P(x, w)) = \text{accept }] = 1
$$

**Soundness** - V accepts proof $\pi$ $\implies$ P "knows" $w$ s.t. $C(x,w) = 0$, and if proof $\pi$ is false, $Pr[\text{V accepts } \pi] \leq \text{negligble probability, e.g }2^{-80}$ [^41]

**Zero-Knowledge** - $C(x, \pi$) with proof $\pi$ reveals nothing about $w$

**Succinctness** - proof $\pi$ is "short" and and $V(x, \pi)$ is "fast" to verify.

Short has different definitions, but usually it means $\text{len}(\pi) = \text{sublinear}(|w|)$, where $|w|$ is the size of the witness [^33].

Fast to verify means $\text{time}(V) = O_{\lambda}((|x|, \text{sublinear}(|C|))$, where $O_{\lambda}$ means "order of" in Big-Oh notation [^31], and $|C|$ is the size of the circuit.

Sometimes quasi-linear, e.g. $O(n \log n)$, is accepted as being "succinct enough".

**Non-interactive** - It is enough for Prover to send $\pi$ to Verifier to convince them, the Verifier can verify proof with $x$ and $\pi$. [^42]

## References

[^1]: STEM graduate means someone who studied Science, Technology, Engineering or Mathematics at a University or equivalent.
[^2]: For example by using a search engine, LLM (Large Language Model, e.g. using AI tools such as ChatGPT), or a friend. For example, you could ask a LLM to ELI5 (Explain Like I'm Five) a specific concept.
[^3]: Credit to Aayush Gupta for the idea of using ZKBoo to explain ZKPs, based on his [previous experience (video)](https://www.youtube.com/watch?v=CGWjjEiLN9w). You can also read the [original paper](https://eprint.iacr.org/2016/163.pdf), though it is a bit difficult to penetrate. Geometry Research also has a [post](https://geometry.xyz/notebook/paper-speedrun-zkboo) explaining the protocol, but it requires more background knowledge to understand.
[^4]: [SageMath](https://www.sagemath.org/) is a math system built on top of Python that allows us to focus on the essentials. It reads like pseudo code, naturally translating mathematical symbols into code.
[^5]: If $a, b$ are large prime numbers, then it is very hard to get these from the public output $e$.
[^6]: Assuming intermediate variables are set, but this is an implementation detail; as a system of equations it is just another unknown variable that gets determined by the other constraints. For example, we could equally well write the set of constraints above as $c+d=e; a \cdot b = c$.
[^7]: Intermediate variables are also sometimes called internal variables, and are more of an implementation detail. It is worth noting that these are only known to the Prover, as they might leak information about the private inputs.
[^8]: There are different ways of expressing these set of equations, such as R1CS, Plonkish, etc. We call this _arithmetization_.
[^9]: While not identical, [functional completeness](https://en.wikipedia.org/wiki/Functional_completeness) is related to the concept of [Turing completeness](https://en.wikipedia.org/wiki/Turing_completeness).
[^10]: See the book _Elements of Computing Systems (Nisan, 2005_) and the accompanying course [From Nand to Tetris](https://www.nand2tetris.org). There's also a book called _But How Do It Know? (Scott, 2009)_ that explains how computers work starting from boolean algebra.
[^11]: Integers bounded by $\mod{p}$ for some prime number $p$. See Appendix B for more details.
[^12]: See [Programming ZKPs: From Zero to Hero](https://zkintro.com/articles/programming-zkps-from-zero-to-hero). This is not a requirement, but it might make the connection between math and code more clear.
[^13]: See [cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) for more details. There are many different such hash functions, but SHA256 is a commonly used one.
[^14]: Technically speaking, given only $x_2$ and $x_3$ both $x$ and $x_1$ remain undetermined, meaning we have two [degrees of freedom](https://en.wikipedia.org/wiki/Degrees_of_freedom). The equation is [underdetermined](https://en.wikipedia.org/wiki/Underdetermined_system), because there are more unknowns than known values.
[^15]: [Multi-party computation](https://en.wikipedia.org/wiki/Secure_multi-party_computation) is in fact a separate area from ZK. One useful mental model is that MPC deals with shared secrets among multiple participants, whereas ZK deals with one person's secrets.
[^16]: Alternatively, in $x = x_1 + x_2 + x_3$, if you know $x$ and two of the other parts you can reconstruct the third part, since $x - x_1 - x_2 = x_3$. In the puzzle metaphor, this would correspond to having two out of three puzzle pieces and knowing what the final picture should look like, even though one piece is missing.
[^17]: You might have to squint to see it; the top and bottom arrow heads form the top and bottom part of the Sigma, and the middle arrow-head the middle part.
[^18]: Probably the most canonical example of a [sigma protocol](https://en.wikipedia.org/wiki/Proof_of_knowledge#Sigma_protocols) is proving knowledge of the [discrete log](https://en.wikipedia.org/wiki/Discrete_logarithm). While it is "simpler", it requires a bit more math background to understand. It also doesn't get us closer to understanding ZKBoo, so we are omitting this example.
[^19]: Most sigma protocols have all three properties, but some don't have the zero knowledge property.
[^20]: Two reasons for this: ZKBoo arrived later than other protocols, and proofs are not succinct. We'll see more on this at the end of the article.
[^21]: We'll look more at the notion of _soundness_ soon.
[^22]: With all calculations done $\mod p$. See Appendix B for details.
[^23]: In the multiplication constraint example, since only one column is effectively checked, this means the probability for cheating, assuming multiplication constraints only, is $\frac{2}{3}$. Intuitively, most real-world examples would have a mix of addition and multiplication, and it is enough for one consistency check to fail to be caught. See the original paper for more precise soundness analysis.
[^24]: In practice, we often talk about soundness error in terms of _bits of security_ a protocol has. This indicates how hard it is to break a protocol and thus how secure it is. For ZKBoo, if we want to have 80 bits of security, we have to do 137 rounds. This can be calculated using $n = \frac{\sigma}{\log_2(3) - 1}$. See the paper for details.
[^25]: That is, they appear statistically random despite being generated by a deterministic process. See [pseudorandomness](https://en.wikipedia.org/wiki/Pseudorandomness).
[^26]: See [random seed](https://en.wikipedia.org/wiki/Random_seed).
[^27]: There are many ways to trip up on Fiat-Shamir in practice, see [Fiat-Shamir in the Wild (paper)](https://orbilu.uni.lu/handle/10993/62161), and [How to Prove False Statements (paper)](https://eprint.iacr.org/2025/118).
[^28]: Of the "technically correct, the best kind of correct" variety. For example, a lot of "ZK" projects don't actually use the zero-knowledge property!
[^29]: Computational soundness means a scheme is secure against an adversary with limited computational resources. A statistically sound proof would hold up against an "unbounded" adversary. The latter is rarer in real-world cryptography. This can get quite complex in the academic literature, with different notions of soundness - computational, statistical, simulated, extractability etc. The subtleties of these distinctions are out of scope of this article, and not something most people have to care about, unless you want to become a full-time cryptographer.
[^30]: While less common, there are proof systems that is only succinct in one of these dimensions. E.g. Bulletproofs have succinct proofs but linear verification time.
[^31]: This is a term from computational complexity theory. We talk about how fast or slow something is as a function of its input. We might say O(1) means it is "constant", or O(n) means it is "linear", etc. Sublinear means less than linear, e.g. $\sqrt{n}$. See [Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) and [Big O Notation Tutorial](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/) for more details.
[^32]: E.g. it doesn't matter if it is we have to do $2 \cdot n$ operations or $20 \cdot n$ operations, these functions are both $O(n)$, or _on the order of $n$_.
[^33]: In practice a lot of proofs are logarithmic, $O(\log n)$. Sometimes quasi-linear, $O(n \log n)$ can also be fine and are still considered "succinct enough". Best case is $O(1)$, but it often comes with some other trade-offs. Examples of proof systems that are succinct are Groth16 and Plonk. Constants matter too, especially when it comes to on-chain verification. But this is out of scope of this article. See e.g. rationale for why Groth16 or KZG commitments are often used in Ethereum.
[^34]: Expressing the core algorithms, not with complete error handling or a great API, performance etc.
[^35]: $(\mathbb{Z}, +, \cdot)$ is a _ring_; more precisely it is an _commutative (or abelian) ring_ since multiplication is commutative ($a \cdot b = b \cdot a$).
[^36]: We call $1$ here the identity element $e$. It exists for both addition (usually 0), and multiplication (usually 1). See [definition of a field](<https://en.wikipedia.org/wiki/Field_(mathematics)#Definition>) for more.
[^37]: And what's called prime extension fields, like $p^n$.
[^38]: In applied cryptography and computer science, the $\mathbb{GF}(p)$ notation is more common, whereas in pure mathematics $\mathbb{F}_p$ is more common. The name Galois Field in honor of the french mathematician Galois who discovered them. He laid the foundations for abstract algebra, and he died in a duel at age 20.
[^39]: E.g. $2^{255} - 19$. The precise choice of prime number is a deeper topic, with notions such as _pairing-friendliness_, especially when it comes to cryptographic systems. See for example why BN254 was chosen in Zcash.
[^40]: In this explanation we skip the notion of a preprocessing setup step $\text{Setup}(C) \rightarrow (pp, vp)$, with Prover parameters ($pp$) and Verifier parameters ($vp)$. Usually this is included in definitions, but we don't need this in ZKBoo.
[^41]: We won't go into the precise details of what "knowing" witness here means, because it requires understanding notions such as adaptive knowledge soundness and extractors, which aren't necessary for having a conceptual grasp of the notion of statistical soundness. If you want to understand more, Thaler's book or Boneh's classes are good resources. Also see footnote 29.
[^42]: As well as some other pre-determined information, such as the Fiat-Shamir challenge algorithm, and possibly some "verification keys" (though not in the case of ZKBoo).
