/*
  What is lambda calculus?

  λ-calculus is a formal system in mathematical logic and computer science for expressing
  computation based on function abstraction and function application using variable binding and substitution.

  Despite looking simple, the lambda calculus is considered Turing complete (meaning it can compute as any classical computer).

*/


// type definition

// Discriminated union to represent the three types of lambda terms -> variable, abstraction and application.

type LambdaTerm =
  | { kind: 'variable'; name: string }
  | { kind: 'abstraction'; param: string; body: LambdaTerm } // yes its weird at first glance
  | { kind: 'application'; func: LambdaTerm; arg: LambdaTerm }


const Var = (name: string): LambdaTerm => ({ kind: 'variable', name })
const Abs = (param: string, body: LambdaTerm): LambdaTerm => ({ kind: 'abstraction', param, body })
const App = (func: LambdaTerm, arg: LambdaTerm): LambdaTerm => ({ kind: 'application', func, arg })


// core logic
// TODO: too tired now its 4:48 am


