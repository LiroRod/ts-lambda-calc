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


/*
  Checks if a variable name occus gree in a given term
  this is needed to prevent variable capture during substitution.
*/

function isFree(varName: string, term: LambdaTerm): boolean {
  switch (term.kind) {
    case 'variable':
      return term.name === varName;
    case 'abstraction': // here we check if the bound variable is the same as varName, varName is no longer free within the body.
      if (term.param === varName) {
        return false
      }
      return isFree(varName, term.body);
    case 'application': // rec check the func and the arg
      return isFree(varName, term.func) || isFree(varName, term.arg);
  }
}

/*
  Generates a new variable name on an existing name, avoiding a set of used names.
  Simple stategy: append primes (').
*/

function freshVar(varName: string, usedNames: Set<string>): string {
  let newName = varName;
  while (usedNames.has(newName)) {
    newName += "'"
  }
  return newName;
}
