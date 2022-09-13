---
title: "LearningTypescript - O'Reilly - 1st Edition"
date: "2022-08-23"
urls:
  - https://enki.fra1.digitaloceanspaces.com/Learning%20TypeScript%20-%20O%27Reilly%20-%201st%20Edition.pdf
---

# LearningTypescript - O'Reilly - 1st Edition

## Chapter 2 - The Type System

### Modules

The JavaScript programming language did not include a specification for how files can share code between each other until relatively recently in its history. ECMAScript 2015 added “ECMAScript modules,” or ESM, to standardize import and export syntax between files.

Wheather a file exports anything or not it is either a _module_ or a _script_

- **Module** - A file with a top-level export or import
- **Script** - Any file that is not a module

TypeScript is able to work with those modern module files as well as older files. Anything declared in a module file will be available only in that file unless an explicit export statement in that file exports it. A variable declared in one module with the same name as a variable declared in another file won't be considered a naming conflict (unless one file imports the other file's variable).

If a file is a script, TypeScript will consider it to be globally scoped, meaning all scripts have access to its contents. That means variables declared in a script file cannot have the same name as variables declared in other script files.
The following a.ts and b.ts files are considered scripts because they do not have module-style export or import statements. That means their variables of the same name conflict with each other as if they were declared in the same file:

```typescript
// a.ts
const shared = "Cher";
// ~~~~~~
// Cannot redeclare block-scoped variable 'shared'.
// b.ts
const shared = "Cher";
// ~~~~~~
// Cannot redeclare block-scoped variable 'shared'.
```

If you see these “Cannot redeclare...” errors in a TypeScript file, it may be because you have yet to add an export or import statement to the file. **Per the ECMAScript specification, if you need a file to be a module without an export or import state‐ ment, you can add an export {}; somewhere in the file to force it to be a module:**

**_TypeScript will not recognize the types of imports and exports in TypeScript files written using older module systems such as CommonJS. TypeScript will generally see values returned from CommonJS-style require functions to be typed as any._**

## Chapter 3 - Unions and Literals

- **Unions** - Expanding a value's allowed type to be two or more possible types
- **Narrowing** - Reducing a value's allowed type to not be one or more possible types

### Unions

TypeScript represents union types using the `|` (pipe) operator between the possible values.

```typescript
let thinker: string | null = null;
if (Math.random() > 0.5) {
  thinker = "Susanne Langer"; // Ok
}
```

_When a value is known to be a union type, TypeScript will only allow you to access member properties that exist on all possible types in the union. It will give you a type-checking error if you try to access a type that doesn't exist on all possible types._

### Narrowing

Narrowing is when TypeScript infers from your code that a value is of a more specific type than what it was defined, declared, or previously inferred as. A logical check that can be used to narrow types is called a `type guard`.

#### Assignment Narrowing

Assignment narrowing comes into play when a variable is given an explicit union type annotation and an initial value too. TypeScript will understand that while the variable may later receive a value of any of the union typed values, it starts off as only the type of its initial value.
In the following snippet, inventor is declared as type `number | string`, but Type‐ Script knows it's immediately narrowed to a string from its initial value:

```typescript
let inventor: number | string = "Hedy Lamarr";
inventor.toUpperCase(); // Ok: string
inventor.toFixed();
// ~~~~~~~
// Error: Property 'toFixed' does not exist on type 'string'.
```

#### Conditional Checks

A common way to get TypeScript to narrow a variable's value is to write an if statement checking the variable for being equal to a known value. TypeScript is smart enough to understand that inside the body of that if statement, the variable must be the same type as the known value:

```typescript
// Type of scientist: number | string
let scientist = Math.random() > 0.5 ? "Rosalind Franklin" : 51;
if (scientist === "Rosalind Franklin") {
  // Type of scientist: string
  scientist.toUpperCase(); // Ok
}
// Type of scientist: number | string
scientist.toUpperCase();
//        ~~~~~~~~~~~
// Error: Property 'toUpperCase' does not exist on type 'string | number'. // Property 'toUpperCase' does not exist on type 'number'.
```

#### Typeof Checks

Similar to the scientist example, checking if typeof researcher is "string" indi‐ cates to TypeScript that the type of researcher must be string:

```typescript
let researcher = Math.random() > 0.5 ? "Rosalind Franklin" : 51;
if (typeof researcher === "string") {
  researcher.toUpperCase(); // Ok: string
}
```

Those code snippets can be rewritten with a ternary statement, which is also supported for type narrowing:

```typescript
typeof researcher === "string"
  ? researcher.toUpperCase() // Ok: string
  : researcher.toFixed(); // Ok: number
```

### Literal Types

If you declare a variable as const and directly give it a literal value, TypeScript will infer the variable to be that literal value as a type.

Other than the boolean, null, and undefined types, all other primitives such as number and string have a infinite number of literal types. The common types you'll find in typical TypeScript code are just those:

- **boolean**: just `true` | `false`
- **null** and **undefined**: both just have one literal value, themselves
- **number**: `0` | `1` | `2` | ... | `0.1` | `0.2` | ...
- **string**: `""` | `"a"` | `"b"` | `"c"` | ... | `"aa"` | `"ab"` | `"ac"` | ...

Union type annotations can mix and match between literals and primitives. A repre‐ sentation of a lifespan, for example, might be represented by any number or one of a couple known edge cases:

```typescript
let lifespan: number | "ongoing" | "uncertain";
lifespan = 89; // Ok
lifespan = "ongoing"; // Ok
lifespan = true;
// Error: Type 'true' is not assignable to // type 'number | "ongoing" | "uncertain"'
```

### Strict Null Checking

In languages without strict null checking, code like this example that assign null to a string is allowed:

```typescript
const firstName: string = null;
```

If you've previously worked in a typed language such as C++ or Java that suffers from the billion-dollar mistake, it may be surprising to you that some languages don't allow such a thing.
The TypeScript compiler contains a multitude of options that allow changing how it runs. One of the most useful opt-in options, `strictNullChecks`, toggles whether strict null checking is enabled. Roughly speaking, disabling strictNullChecks adds `| null | undefined` to every type in your code, thereby allowing any variable to receive `null` or `undefined`.

With the strictNullChecks option set to false, the following code is considered totally type safe. That's wrong, though; `nameMaybe` might be `undefined` when `.toLowerCase` is accessed from it:

```typescript
let nameMaybe = Math.random() > 0.5 ? "Tony Hoare" : undefined;
nameMaybe.toLowerCase();
// Potential runtime error: Cannot read property 'toLowerCase' of undefined.
```

With strict null checking enabled, TypeScript sees the potential crash in the code snippet:

```typescript
let nameMaybe = Math.random() > 0.5 ? "Tony Hoare" : undefined;
nameMaybe.toLowerCase();
// Error: Object is possibly 'undefined'.
```

Without strict null checking enabled, it's much harder to know whether your code is safe from errors due to accidentally null or undefined values.
**TypeScript best practice is generally to enable strict null checking. Doing so helps prevent crashes and eliminates the billion-dollar mistake.**

#### Truthiness Narrowing

Truthiness, or being _truthy_, is whether a value would be considered true when evaluated in a Boolean context, such as an `&&` operator or `if` statement. All values in JavaScript are truthy except for those defined as falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.

TypeScript can also narrow a variable's type from a truthiness check if only some of its potential values may be truthy.

```typescript
let geneticist = Math.random() > 0.5 ? "Barbara McClintock" : undefined;
if (geneticist) {
  geneticist.toUpperCase(); // Ok: string
}
geneticist.toUpperCase();
// Error: Object is possibly 'undefined'.
```

Logical operators that perform truthiness checking work as well, namely `&&` and `?.`:

```typescript
geneticist && geneticist.toUpperCase(); // Ok: string | undefined
geneticist?.toUpperCase(); // Ok: string | undefined
```

Unfortunately, truthiness checking doesn't go the other way. If all we know about a `string | undefined` value is that it's _falsy_, that doesn't tell us whether it's an empty string or undefined.

```typescript
let biologist = Math.random() > 0.5 && "Rachel Carson";
if (biologist) {
  biologist; // Type: string
} else {
  biologist; // Type: false | string
}
```

#### Variables Without Initial Values

Variables declared without an initial value default to `undefined` in JavaScript. That presents an edge case in the type system: _what if you declare a variable to be a type that doesn't include `undefined`, then try to use it before assigning a value?_
TypeScript is smart enough to understand that the variable is `undefined` until a value is assigned.

```typescript
let mathematician: string;
mathematician?.length;
// Error: Variable 'mathematician' is used before being assigned.
mathematician = "Mark Goldberg";
mathematician.length; // Ok
```

Note that this reporting doesn't apply if the variable's type includes `undefined`. Adding `| undefined` to a variable's type indicates to TypeScript that it doesn't need to be defined before use, as `undefined` is a valid type for its value.

```typescript
let mathematician: string | undefined;
mathematician?.length; // Ok
mathematician = "Mark Goldberg";
mathematician.length; // Ok
```

### Type Aliases

Most union types you'll see in code will generally only have two or three constituents. However, you may sometimes find a use for longer union types that are inconvenient to type out repeatedly.
Each of these variables can be one of four possible types:

```typescript
let rawDataFirst: boolean | number | string | null | undefined;
let rawDataSecond: boolean | number | string | null | undefined;
let rawDataThird: boolean | number | string | null | undefined;
```

TypeScript includes type aliases for assigning easier names to reused types. A type alias starts with the `type` keyword, a new name, `=`, and then any type. By convention, type aliases are given names in PascalCase:

```typescript
type MyName = ...;
```

Type aliases act as a copy-and-paste in the type system. **When TypeScript sees a type alias, it acts as if you'd typed out the actual type the alias was referring to.** The previous variables' type annotations could be rewritten to use a type alias for the long union type:

```typescript
type RawData = boolean | number | string | null | undefined;
let rawDataFirst: RawData;
let rawDataSecond: RawData;
let rawDataThird: RawData;
```

**Type aliases, like type annotations, are not compiled to the output JavaScript.** They exist purely in the TypeScript type system.
The previous code snippet would compile to roughly this JavaScript:

```typescript
let rawDataFirst;
let rawDataSecond;
let rawDataThird;
```

Because type aliases are purely in the type system, you cannot reference them in runtime code. TypeScript will let you know with a type error if you are trying to access something that won't exist at runtime:

```typescript
type SomeType = string | undefined;
console.log(SomeType);
//          ~~~~~~~~
// Error: 'SomeType' only refers to a type, but is being used as a value here.
```

**Type aliases don't have to be declared in order of usage. You can have a type alias
declared earlier in a file reference an alias declared later in the file.**

```typescript
type IdMaybe = Id | undefined | null; // Ok
type Id = number | string;
```

## Chapter 4 - Objects

### Object Types

Object types are a core concept for how TypeScript understands JavaScript code. Every value other than null and undefined has a set of members in its backing type shape, and so TypeScript must understand the object type for every value in order to type check it.

**Most TypeScript projects prefer using the interface keyword to describe object types. Aliased object types and interfaces are _almost_ identical.**

### Structural Typing

TypeScript's type system is _structurally typed_: meaning any value that happens to satisfy a type is allowed to be used as a value of that type. In other words, when you declare that a parameter or variable is of a particular object type, you're telling TypeScript that whatever object(s) you use, they need to have those properties.

```typescript
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

// Ok: `hasBoth` contains a `firstName` property of type `string`
let withFirstName: WithFirstName = hasBoth;

// Ok: `hasBoth` contains a `lastName` property of type `string`
let withLastName: WithLastName = hasBoth;
```

Structural typing not the same as duck typing, which comes from the phrase “If it looks like a duck and quacks like a duck, it's probably a duck.”

- Structural typing is when there is a static system checking the type - in TypeScript's case, the type checker.
- Duck typing is when nothing checks object types until they're used at runtime.

**_In summary: JavaScript is duck typed whereas TypeScript is structurally typed._**

#### Excess Property Checking

Typescript will report a type error if a variable is declared with an object type and its initial value has more fields than its type describes. Therefore, declaring a variable to be of an object type is a way of getting the type checker to make sure it has only the expected fields on that type.

```typescript
type Poet = {
  born: number;
  name: string;
};

// Ok: all fields match what's expected in Poet
const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou",
};

const extraProperty: Poet = {
  activity: "walking",
  born: 1935,
  name: "Mary Oliver",
};
// Error: Type '{ activity: string; born: number; name: string; }'
// is not assignable to type 'Poet'.
//   Object literal may only specify known properties,
//   and 'activity' does not exist in type 'Poet'.
```

**Note that excess property checks only trigger for object literals being created in locations that are declared to be an object type. Providing an existing object literal bypasses excess property checks.**

```typescript
const existingObject = {
  activity: "walking",
  born: 1935,
  name: "Mary Oliver",
};

const extraPropertyButOk: Poet = existingObject; // Ok
```

Excess property checks will trigger anywhere a new object is being created in a location that expects it to match an object type - which includes array members, class fields, and function parameters. Banning excess properties is another way TypeScript helps make sure your code is clean and does what you expect. _Excess properties not declared in their object types are often either mistyped property names or unused code._

#### Optional Properties

Object type properties don't all have to be required in the object. You can include a `?` before the `:` in a type property's type annotation to indicate that it's an optional property.

```typescript
type Book = {
  author?: string;
  pages: number;
};

// Ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  author: "Rita Dove",
};
// Error: Property 'pages' is missing in type
// '{ author: string; }' but required in type 'Book'.
```

**Keep in mind there is a difference between optional properties and properties whose type happens to include `undefined` in a type union. A property declared as optional with `?` is allowed to not exist. A property declared as required and `| undefined` must exist, even if the value is `undefined`.**

```typescript
type Writers = {
  author: string | undefined;
  editor?: string;
};

// Ok: author is provided as undefined
const hasRequired: Writers = {
  author: undefined,
};
const missingRequired: Writers = {};
//    ~~~~~~~~~~~~~~~
// Error: Property 'author' is missing in type
// '{}' but required in type 'Writers'.
```

### Unions of Object Types

#### Inferred Object-Type Unions

If a variable is given an initial value that could be one of multiple object types, TypeScript will infer its type to be a union of object types. That union type will have a constituent for each of the possible object shapes. Each of the possible properties on the type will be present in each of those constituents, though they'll be `?` optional types on any type that doesn't have an initial value for them.

```typescript
const poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };

// Type:
// {
//   name: string;
//   pages: number;
//   rhymes?: undefined;
// }
// |
// {
//   name: string;
//   pages?: undefined;
//   rhymes: boolean;
// }

poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // booleans | undefined
```

#### Explicit Object-Type Unions

```typescript
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;
const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };

poem.name; // Ok

poem.pages;
//   ~~~~~
// Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.

poem.rhymes;
//   ~~~~~~
// Property 'rhymes' does not exist on type 'Poem'.
// Property 'rhymes' does not exist on type 'PoemWithPages'.
```

Restricting access to potentially nonexistent members of objects can be a good thing for code safety. **If a value might be one of multiple types, properties that don't exist on all of those types aren't guaranteed to exist on the object.**

#### Narrowing Object Types

If the type checker sees that an area of code can only be run if a union typed value contains a certain property, it will narrow the value's type to only the constituents that contain that property. _In other words, TypeScript's type narrowing will apply to objects if you check their shape in code._

```typescript
if ("pages" in poem) {
  poem.pages; // Ok: poem is narrowed to PoemWithPages
} else {
  poem.rhymes; // Ok: poem is narrowed to PoemWithRhymes
}
```

TypeScript won't allow truthiness existence checks like if (poem.pages). Attempting to access a property of an object that might not exist is considered a type error, even if used in a way that seems to behave like a type guard:

```typescript
if (poem.pages) {
  /* ... */
}
// ~~~~~
// Property 'pages' does not exist on type 'PoemWithPages | PoemWithRhymes'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
```

#### Discriminated Unions

Another popular form of union typed objects in JavaScript and TypeScript is to have a property on the object indicate what shape the object is. This kind of type shape is called a _discriminated union_, and the property whose value indicates the object's type is a _discriminant_.

```typescript
type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
  type: "rhymes";
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhymes: true, type: "rhymes" };

if (poem.type === "pages") {
  console.log(`It's got pages: ${poem.pages}`); // Ok
} else {
  console.log(`It rhymes: ${poem.rhymes}`);
}

poem.type; // Type: 'pages' | 'rhymes'

poem.pages;
//   ~~~~~
// Error: Property 'pages' does not exist on type 'Poem'.
// Property 'pages' does not exist on type 'PoemWithRhymes'.
```

### Intersection Types

TypeScript's `|` union types represent the type of a value that could be one of two or more different types. Just as JavaScript's runtime `|` operator acts as a counterpart to its `&` operator, TypeScript allows representing a type that is multiple types at the same time: an `&` intersection type.

```typescript
type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing;
// Equivalent to:
// {
//   genre: string;
//   name: string;
//   pages: number;
// }
```

Intersection types can be combined with union types, which is sometimes useful to describe discriminated unions in one type.

```typescript
type ShortPoem = { author: string } & (
  | { kigo: string; type: "haiku" }
  | { meter: number; type: "villanelle" }
);

// Ok
const morningGlory: ShortPoem = {
  author: "Fukuda Chiyo-ni",
  kigo: "Morning Glory",
  type: "haiku",
};

const oneArt: ShortPoem = {
  author: "Elizabeth Bishop",
  type: "villanelle",
};
// Error: Type '{ author: string; type: "villanelle"; }'
// is not assignable to type 'ShortPoem'.
//   Type '{ author: string; type: "villanelle"; }' is not assignable to
//   type '{ author: string; } & { meter: number; type: "villanelle"; }'.
//     Property 'meter' is missing in type '{ author: string; type: "villanelle"; }'
//     but required in type '{ meter: number; type: "villanelle"; }'.
```

**_Intersection types are a useful concept, but it's easy to use them in ways that confuse either yourself or the TypeScript compiler. It is recommended trying to keep code as simple as possible when using them._**

#### Long assignability errors

**Assignability error messages from TypeScript get much harder to read when you create complex intersection types, such as one combined with a union type.** **_This will be a common theme with TypeScript's type system (and typed programming languages in general): the more complex you get, the harder it will be to understand messages from the type checker._**

#### never

Intersection types are also easy to misuse and create an impossible type with. Primitive types cannot be joined together as constituents in an intersection type because it's impossible for a value to be multiple primitives at the same time. Trying to `&` two primitive types together will result in the `never` type:

```typescript
type NotPossible = number & string; // Type: never
```

**The `never` keyword and type is what programming languages refer to as a _bottom type_, or _empty type_. A bottom type is one that can have no possible values and can't be reached. No types can be provided to a location whose type is a bottom type:**

```typescript
let notNumber: NotPossible = 0;
//  ~~~~~~~~~
// Error: Type 'number' is not assignable to type 'never'.
let notString: never = "";
//  ~~~~~~~~~
// Error: Type 'string' is not assignable to type 'never'.
```

**Most TypeScript projects rarely - if ever - use the never type. It comes up once in a while to represent impossible states in code. Most of the time, though, it's likely to be a mistake from misusing intersection types.**

## Chapter 5 - Functions

### Function Parameters

#### Required Parameters

**Unlike JavaScript, which allows functions to be called with any number of arguments, TypeScript assumes that all parameters declared on a function are required.** If a function is called with a wrong number of arguments, TypeScript will protest in the form of a type error. TypeScript's argument counting will come into play if a function is called with either too few or too many arguments.

```typescript
function singTwo(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

// Logs: "Ball and Chain / undefined"
singTwo("Ball and Chain");
//      ~~~~~~~~~~~~~~~~
// Error: Expected 2 arguments, but got 1.

// Logs: "I Will Survive / Higher Love"
singTwo("I Will Survive", "Higher Love"); // Ok

// Logs: "Go Your Own Way / The Chain"
singTwo("Go Your Own Way", "The Chain", "Dreams");
//                                      ~~~~~~~~
// Error: Expected 2 arguments, but got 3.
```

**Parameter refers to a function's declaration of what it expects to receive as an argument. Argument refers to a value provided to a parameter in a function call.**

#### Optional Parameters

Sometimes function parameters are not necessary to provide, and the intended use of the function is for that undefined value. We wouldn't want TypeScript to report type errors for failing to provide arguments to those optional parameters. TypeScript allows annotating a parameter as optional by adding a `?` before the `:` in its type annotation.

Optional parameters don't need to be provided to function calls. Their types therefore always have `| undefined` added as a union type.

**Optional parameters are not the same as parameters with union types that happen to include `| undefined`. Parameters that aren't marked as optional with a `?` must always be provided, even if the value is explicitly `undefined`.**

**Any optional parameters for a function must be the last parameters. Placing an optional parameter before a required parameter would trigger a TypeScript syntax error:**

```typescript
function announceSinger(singer?: string, song: string) {}
//                                       ~~~~
// Error: A required parameter cannot follow an optional parameter.
```

#### Default Parameters

Optional parameters in JavaScript may be given a default value with an `=` and a value in their declaration. For these optional parameters, because a value is provided by default, their TypeScript type does not implicitly have the `| undefined` union added on inside the function. TypeScript will still allow the function to be called with missing or `undefined` arguments for those parameters.

**If a parameter has a default value and doesn't have a type annotation, TypeScript will infer the parameter's type based on that default value.**

#### Rest Parameters

TypeScript allows declaring the types of rest parameters similarly to regular parameters, except with a `[]` syntax added at the end to indicate it's an array of arguments.

```typescript
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys"); // Ok
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face"); // Ok
singAllTheSongs("Ella Fitzgerald", 2000);
//                                 ~~~~
// Error: Argument of type 'number' is not // assignable to parameter of type 'string'.
```

### Return Types

If a function contains multiple return statements with different values, TypeScript will infer the return type to be a union of all the possible returned types.

#### Explicit Return Types

**_TypeScript will refuse to try to reason through return types of recursive function._**

### Function Types

JavaScript allows us to pass functions around as values. That means we need a way to declare the type of a parameter or variable meant to hold a function.

Function type syntax looks similar to an arrow function, but with a type instead of the body.

```typescript
let nothingInGivesString: () => string;
```

Function types are frequently used to describe callback parameters (parameters meant to be called as functions).

```typescript
const songs = ["Juice", "Shake It Off", "What's Up"];
function runOnSongs(getSongAt: (index: number) => string) {
  for (leti = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}

function getSongAt(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAt); // Ok

function logSong(song: string) {
  return `${song}`;
}
runOnSongs(logSong);
//         ~~~~~~~
// Error: Argument of type '(song: string) => string' is not
// assignable to parameter of type '(index: number) => string'.
//   Types of parameters 'song' and 'index' are incompatible.
//     Type 'number' is not assignable to type 'string'.
```

The error message for runOnSongs(logSong) is an example of an _assignability error_ that includes a few levels of details. When complaining that two function types aren't assignable to each other, TypeScript will typically give three levels of detail, with increasing levels of specificity:

- The first indentation level prints out the two function types.
- The next indentation level specifies which part is mismatched.
- The last indentation level is the precise assignability complaint of the mismatched part.

In the previous code snippet, those levels are:

- `logSongs: (strong: string) => string` is the provided type being assigned to the `getSongAt: (index: number) => string` recipient
- The `song` parameter of `logSong` being assigned to the `index` parameter of `getSongAt`
- `song`'s `number` type is not assignable to `index`'s `string` type

**_TypeScript’s multiline errors can seem daunting at first. Reading through them line-by-line and understanding what each part is conveying goes a long way to comprehending the error._**

#### Function Type Parentheses

```typescript
// Type is a function that returns a union: string | undefined
let returnsStringOrUndefined: () => string | undefined;

// Type is either undefined or a function that returns a string
let maybeReturnsString: (() => string) | undefined;
```

#### Void Returns

Some functions aren’t meant to return any value. They either have no return statements or only have return statements that don’t return a value.
TypeScript allows using a `void` keyword to refer to the return type of such a function that returns nothing.

**The void type is not JavaScript**. It’s a TypeScript keyword used to declare return types of functions. It’s an indication that a function’s returned value isn’t meant to be used, not a value that can itself be returned.

```typescript
function returnsVoid() {
  return;
}

let lazyValue: string | undefined;
lazyValue = returnsVoid();
// Error: Type 'void' is not assignable to type 'string | undefined'.
```

#### Never Returns

Some functions not only don’t return a value, but aren’t meant to return at all. **Never-returning functions are those that always throw an error or run an infinite loop (_hopefully intentionally!_).**

If a function is meant to never return, adding an explicit `: never` type annotation indicates that **any code after a call to that function won’t run**. This fail function only ever throws an error.

```typescript
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}.`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  // Here, param is known to be type string
  param.toUpperCase(); // Ok
}
```

**never is not the same as void. void is for a function that returns nothing. never is for a function that never returns.**

### Function Overloads

**Some JavaScript functions are able to be called with drastically different sets of parameters that can’t be represented just by optional and/or rest parameters. These functions can be described with a TypeScript syntax called _overload signatures_: declaring different versions of the function’s `name`, `parameters`, and `return` types multiple times before one final implementation signature and the body of the function.**

**When determining whether to emit a syntax error for a call to an overloaded function, TypeScript will only look at the function’s overload signatures. The implementa‐ tion signature is only used by the function’s internal logic.**

```typescript
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

createDate(554356800); // Ok
createDate(7, 27, 1987); // Ok
createDate(4, 1);
// Error: No overload expects 2 arguments, but overloads
// do exist that expect either 1 or 3 arguments.
```

**Overload signatures, as with other type system syntaxes, are erased when compiling TypeScript to output JavaScript.**
The previous code snippet’s function would compile to roughly the following JavaScript:

```javascript
function createDate(monthOrTimestamp, day, year) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}
```

**_Function overloads are generally used as a last resort for complex, difficult-to-describe function types. It’s generally better to keep functions simple and avoid using function overloads when possible._**

The implementation signature used for an overloaded function’s implementation is what the function’s implementation uses for parameter types and return type. Thus, the return type and each parameter in a function’s overload signatures must be assignable to the parameter at the same index in its implementation signature. In other words, **the implementation signature has to be compatible with all of the overload signatures**.

```typescript
function format(data: string): string; // Ok
function format(data: string, needle: string, haystack: string): string; // Ok

function format(getData: () => string): string;
//       ~~~~~~
// This overload signature is not compatible with its implementation signature.

function format(data: string, needle?: string, haystack?: string) {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
```

## Chapter 6 - Arrays

JavaScript arrays are wildly flexible and can hold any mixture of values inside:

```typescript
const elements = [true, null, undefined, 42];

elements.push("even", ["more"]);
// Value of elements: [true, null, undefined, 42, "even", ["more"]]
```

**In most cases, though, individual JavaScript arrays are intended to hold only one specific type of value.** Adding values of a different type may be confusing to readers, or worse, the result of an error that could cause problems in the program.

#### Evolving Any Arrays

If you don’t include a type annotation on a variable initially set to an empty array, TypeScript will treat the array as **evolving any[]**, meaning it can receive any content. As with evolving any variables, we don’t like evolving any[] arrays. They partially negate the benefits of TypeScript’s type checker by allowing you to add potentially incorrect values.

```typescript
// Type: any[]
let values = [];

// Type: string[]
values.push("");

// Type: (number | string)[]
values[0] = 0;
```

#### Multidimensional Arrays

A 2D array, or an array of arrays, will have two “[]”s:

```typescript
let arrayOfArraysOfNumbers: number[][];

arrayOfArraysOfNumbers = [
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9],
];
```

A 3D array, or an array of arrays of arrays, will have three “[]”s. 4D arrays have four “[]”s. 5D arrays have five “[]”s. And so on...

This arrayOfArraysOfNumbers array is of type `number[][]`, which is also representable by `(number[])[]`:

```typescript
// Type: number[][]
let arrayOfArraysOfNumbers: number[][];
```

#### Caveat: Unsound Members

The TypeScript type system is known to be technically unsound: it can get types mostly right, but sometimes its understanding about the types of values may be incorrect.

This code gives no complaints with the default TypeScript compiler settings:

```typescript
function withElements(elements: string[]) {
  console.log(elements[9001].length); // No type error
}

withElements(["It's", "over"]);
```

We as readers can deduce that it’ll crash at runtime with “Cannot read property 'length' of `undefined”`, but TypeScript intentionally does not make sure retrieved array members exist. It sees `elements[9001]` in the code snippet as being type `string`, not `undefined`.

TypeScript does have a `--noUncheckedIndexedAccess` flag that makes array lookups more restricted and type safe, but it’s quite strict and most projects don’t use it.

### Tuples

Although JavaScript arrays may be any size in theory, it is sometimes useful to use an array of a fixed size - also known as a tuple. **Tuple arrays have a specific known type at each index that may be more specific than a union type of all possible members of the array**.

```typescript
let yearAndWarrior: [number, string];

yearAndWarrior = [530, "Tomyris"]; // Ok

yearAndWarrior = [false, "Tomyris"];
//                ~~~~~
// Error: Type 'boolean' is not assignable to type 'number'.

yearAndWarrior = [530];
// Error: Type '[number]' is not assignable to type '[number, string]'.
// Source has 1 element(s) but target requires 2.
```

#### Tuple Assignability

Tuple types are treated by TypeScript as more specific than variable length array types. That means variable length array types aren’t assignable to tuple types.

```typescript
// Type: (boolean | number)[]
const pairLoose = [false, 123];

const pairTupleLoose: [boolean, number] = pairLoose;
//    ~~~~~~~~~~~~~~
// Error: Type '(number | boolean)[]' is not
// assignable to type '[boolean, number]'.
//   Target requires 2 element(s) but source may have fewer.
```

**TypeScript generally treats created arrays as variable length arrays, not tuples.** If it sees an array being used as a variable’s initial value or the returned value for a function, then it will assume a flexible size array rather than a fixed size tuple.

There are two common ways in TypeScript to indicate that a value should be a more specific tuple type instead of a general array type:

- explicit tuple types
- const assertions.

#### Explicit tuple types

```typescript
// Return type: [string, number]
function firstCharAndSizeExplicit(input: string): [string, number] {
  return [input[0], input.length];
}
```

#### Const asserted tuples

```typescript
// Type: (string | number)[]
const unionArray = [1157, "Tomoe"];

// Type: readonly [1157, "Tomoe"]
const readonlyTuple = [1157, "Tomoe"] as const;
```

```typescript
const pairMutable: [number, string] = [1157, "Tomoe"];
pairMutable[0] = 1247; // Ok

const pairAlsoMutable: [number, string] = [1157, "Tomoe"] as const;
//    ~~~~~~~~~~~~~~~
// Error: The type 'readonly [1157, "Tomoe"]' is 'readonly'
// and cannot be assigned to the mutable type '[number, string]'.

const pairConst = [1157, "Tomoe"] as const;
pairConst[0] = 1247;
//        ~
// Error: Cannot assign to '0' because it is a read-only property.
```

**In practice, read-only tuples are convenient for function returns. Returned values from functions that return a tuple are often destructured immediately anyway, so the tuple being read-only does not get in the way of using the function.**

## Chapter 7 - Interfaces

Interfaces are another way to declare an object shape with an associated name.
Interfaces are in many ways similar to aliased object types but are generally preferred for their more readable error messages, speedier compiler performance, and better interoperability with classes.

**TypeScript developers who prefer semicolons generally put them after type aliases and not after interfaces. This preference mirrors the difference between declaring a variable with a `;` versus declaring a class or function without.**

There are a few key differences between interfaces and type aliases:

- Interfaces can “merge” together to be augmented - a feature particularly useful when working with third-party code such as built-in globals or npm packages.

- Interfaces can be used to type check the structure of class declarations while type aliases cannot.

- Interfaces are generally speedier for the TypeScript type checker to work with: they declare a named type that can be cached more easily internally, rather than a dynamic copy-and-paste of a new object literal the way type aliases do.

- Because interfaces are considered named objects rather than an alias for an unnamed object literal, their error messages are more likely to be readable in hard edge cases.

**Generally it is recommended to use interfaces whenever possible (i.e., until you need features such as union types from type aliases).**

#### Read-Only Properties

TypeScript allows you to add a `readonly` modifier before a property name to indicate that once set, that property should not be set to a different value.

```typescript
interface Page {
  readonly text: string;
}

function read(page: Page) {
  // Ok: reading the text property doesn't attempt to modify it console.log(page.text);

  page.text += "!";
  //   ~~~~
  // Error: Cannot assign to 'text'
  // because it is a read-only property.
}
```

#### Functions and Methods

TypeScript provides two ways of declaring interface members as functions:

- **Method syntax:** declaring that a member of the interface is a function intended to
  be called as a member of the object, like `member(): void`
- **Property syntax:** declaring that a member of the interface is equal to a standalone function, like `member: () => void`

Both forms can receive the ? optional modifier to indicate they don’t need to be
provided:

```typescript
interface OptionalReadonlyFunctions {
  optionalProperty?: () => string;
  optionalMethod?(): string;
}
```

The general style guide recommended is:

- Use a method function if you know the underlying function may refer to this, most commonly for instances of classes

- Use a property function otherwise.

#### Call Signatures

Interfaces and object types can declare call signatures, which is a type system description of how a **value may be called like a function**.

```typescript
interface FunctionWithCount {
  count: number;
  (): void;
}

function keepsTrackOfCalls() {
  keepsTrackOfCalls.count += 1;
  console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;

let hasCallCount: FunctionWithCount;

hasCallCount = keepsTrackOfCalls; // Ok

function doesNotHaveCount() {
  console.log("No idea!");
}
hasCallCount = doesNotHaveCount;
// Error: Property 'count' is missing in type
// '() => void' but required in type 'FunctionWithCalls'
```

#### Index Signatures

Some JavaScript projects create objects meant to store values under any arbitrary `string` key. For these “container” objects, declaring an interface with a field for every possible key would be impractical or impossible.

```typescript
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

counts.apple = 0;
// Ok counts.banana = 1; // Ok
counts.cherry = false;
// Error: Type 'boolean' is not assignable to type 'number'.
```

**Index signatures are convenient for assigning values to an object but aren’t completely type safe. They indicate that an object should give back a value no matter what property is being accessed.**

```typescript
interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1 January 1818"),
};
publishDates.Frankenstein; // Type: Date
console.log(publishDates.Frankenstein.toString()); // Ok

publishDates.Beloved; // Type: Date, but runtime value of undefined!
console.log(publishDates.Beloved.toString());
// Ok in the type system, but...
// Runtime error: Cannot read property 'toString'
// of undefined (reading publishDates.Beloved)
```

**When possible, if you’re looking to store key-value pairs and the keys aren’t known ahead of time, it is generally safer to use a `Map`. Its `.get` method always returns a type with `| undefined` to indicate that the key might not exist.**

#### Mixing properties and index signatures

One common type system trick with mixed properties and index signatures is to use a more specific property type literal for the named property than an index signature’s primitive.
**As long as the named property’s type is assignable to the index signature’s - which is true for a literal and a primitive, respectively - TypeScript will allow it.**

```typescript
interface ChapterStarts {
  preface: 0;
  [i: string]: number;
}

const correctPreface: ChapterStarts = {
  preface: 0,
  night: 1,
  shopping: 5,
};

const wrongPreface: ChapterStarts = {
  preface: 1,
  // Error: Type '1' is not assignable to type '0'.
};
```

### Interface Extensions

#### Overridden Properties

Derived interfaces may _override_, or replace, properties from their base interface by declaring the property again with a different type. **TypeScript’s type checker will enforce that an overridden property must be assignable to its base property. It does so to ensure that instances of the derived interface type stay assignable to the base interface type.**

### Interface Merging

One of the important features of interfaces is their ability to merge with each other. Interface merging means if two interfaces are declared in the same scope with the same name, they’ll join into one bigger interface under that name with all declared fields.

```typescript

interface Merged {
  fromFirst: string;
}

interface Merged {
  Interface Merging
  fromSecond: number;
}

// Equivalent to:
// interface Merged {
//   fromFirst: string;
//   fromSecond: number;
// }
```

Interface merging isn’t a feature used very often in day-to-day TypeScript development. **It is recommended to avoid it when possible, as it can be difficult to understand code where an interface is declared in multiple places.**

However, interface merging is particularly useful for augmenting interfaces from external packages or built-in global interfaces such as `Window`.

```typescript
interface Window {
  myEnvironmentVariable: string;
}
window.myEnvironmentVariable; // Type: string
```

#### Member Naming Conflicts

Note that merged interfaces may not declare the same name of a property multiple times with different types. If a property is already declared in an interface, a later merged interface must use the same type.

```typescript
interface MergedProperties {
  same: (input: boolean) => string;
  different: (input: string) => string;
}

interface MergedProperties {
  same: (input: boolean) => string; // Ok
  different: (input: number) => string;
  // Error: Subsequent property declarations must have the same type.
  // Property 'different' must be of type '(input: string) => string',
  // but here has type '(input: number) => string'.
}
```

Merged interfaces may, however, define a method with the same name and a different signature. Doing so creates a function overload for the method.

```typescript
interface MergedMethods {
  different(input: string): string;
}

interface MergedMethods {
  different(input: number): string; // Ok
}
```

## Chapter 8 - Classes

### Class Methods

```typescript
class Greeted {
  constructor(message: string) {
    console.log(`As I always say: ${message}!`);
  }
}

new Greeted("take chances, make mistakes, get messy");

new Greeted();
// Error: Expected 1 arguments, but got 0.
```

### Class Properties

To read from or write to a property on a class in TypeScript, it must be explicitly declared in the class. Class properties are declared using the same syntax as interfaces: their name followed optionally by a type annotation.

**TypeScript will not attempt to deduce what members may exist on a class from their assignments in a constructor.**

```typescript
class FieldTrip {
  destination: string;
  constructor(destination: string) {
    this.destination = destination;
    // Ok console.log(`We're going to ${this.destination}!`);
    this.nonexistent = destination;
    //   ~~~~~~~~~~~
    // Error: Property 'nonexistent' does not exist on type 'FieldTrip'.
  }
}
```

### Function Properties

JavaScript contains two syntaxes for declaring a member on a class to be a callable function: method and property.

- The **method** approach assigns a function to the class prototype, so all class instances use the same function definition.

```typescript
class WithMethod {
  myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // true
```

- The property approach is to declare a property whose value happens to be a function. This creates a new function per instance of the class, which can be useful with `() =>` arrow functions whose `this` scope should always point to the class instance (at the time and memory cost of creating a new function per class instance).

```typescript
class WithProperty {
  myProperty: () => {};
}

new WithMethod().myProperty === new WithMethod().myProperty; // false
```

### Initialization Checking

**With strict compiler settings enabled, TypeScript will check that each property declared whose type does not include undefined is assigned a value in the constructor.** This strict initialization checking is useful because it prevents code from accidentally forgetting to assign a value to a class property.

```typescript
class WithValue {
  immediate = 0; // Ok
  later: number; // Ok (set in the constructor)
  mayBeUndefined: number | undefined; // Ok (allowed to be undefined)

  unused: number;
  // Error: Property 'unused' has no initializer
  // and is not definitely assigned in the constructor.

  constructor() {
    this.later = 1;
  }
}
```

Configure strict property initialization checking with TypeScript’s `strictPropertyInitialization`.

#### Definitely assigned properties

Although strict initialization checking is useful most of the time, you may come across some cases where a class property is intentionally able to be unassigned after the class constructor. If you are absolutely sure a property should not have strict initialization checking applied to it, you can add a `!` after its name to disable the check. Doing so asserts to TypeScript that the property will be assigned a value other than undefined before its first usage.

```typescript
class ActivitiesQueue {
  pending!: string[]; // Ok

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activities = new ActivitiesQueue();

activities.initialize(["eat", "sleep", "learn"]);
activities.next();
```

**Needing to disable strict initialization checking on a class property is often a sign of code being set up in a way that doesn’t lend itself well to type checking. Instead of adding a ! assertion and reducing type safety for the property, consider refactoring the class to no longer need the assertion.**

### Classes as Types

Classes are relatively unique in the type system in that a class declaration creates both a runtime value - the class itself - as well as a type that can be used in type annotations.

**Interestingly, TypeScript will consider any object type that happens to include all the same members of a class to be assignable to the class. This is because TypeScript’s _structural_ typing cares only about the shape of objects, not how they’re declared.**

**In most real-world code, developers don’t pass object values in places that ask for class types. This structural checking behavior may seem unexpected but doesn’t come up very often.**

### Classes and Interfaces

**Interfaces meant to be implemented by classes are a typical reason to use the method syntax for declaring an interface member as a function.**

### Extending a class

Any method or property declared on a base class will be available on the subclass, also known as the derived class.

**Per TypeScript’s structural typing, if all the members on a subclass already exist on its base class with the same type, then instances of the base class are still allowed to be used in place of the subclass.**

```typescript
class PastGrades {
  grades: number[] = [];
}

class LabeledPastGrades extends PastGrades {
  label?: string;
}

let subClass: LabeledPastGrades;

subClass = new LabeledPastGrades(); // Ok
subClass = new PastGrades(); // Ok
```

**In most real-world code, subclasses generally add new required type information on top of their base class. This structural checking behavior may seem unexpected but doesn’t come up very often.**

#### Overridden Constructors

Subclasses are not required by TypeScript to define their own constructor. Subclasses without their own constructor implicitly use the constructor from their base class.

If a subclass does declare its own constructor, then it must call its base class constructor via the super keyword. Subclass constructors may declare any parameters regardless of what their base class requires. TypeScript’s type checker will make sure that the call to the base class constructor uses the correct parameters.

#### Overridden Methods and Properties

Subclasses may redeclare new methods or properties with the same names as the base class, as long as the method on the subclass method is assignable to the method on the base class.

**Since subclasses can be used wherever the original class is used, the types of the new methods or properties must be usable in place of the original methods or properties.**

### Abstract Classes

It can sometimes be useful to create a base class that doesn’t itself declare the implementation of some methods, but instead expects a subclass to provide them. Marking a class as abstract is done by adding TypeScript’s `abstract` keyword in front of the class name and in front of any method intended to be abstract. Those abstract method declarations skip providing a body in the abstract base class; instead, they are declared the same way an interface would be.

An abstract class cannot be instantiated directly, as it doesn’t have definitions for some methods that its implementation may assume do exist. Only nonabstract (“concrete”) classes can be instantiated.

### Member Visibility

JavaScript includes the ability to start the name of a class member with `#` to mark it as a “private” class member. Private class members may only be accessed by instances of that class. **JavaScript runtimes enforce that privacy by throwing an error if an area of code outside the class tries to access the private method or property.**

Type‐ Script’s member visibilities are achieved by adding one of the following keywords before the declaration name of a class member:

- **public** (default) - Allowed to be accessed by anybody, anywhere
- **protected** - Allowed to be accessed only by the class itself and its subclasses
- **private** - Allowed to be accessed only by the class itself

These keywords exist purely within the type system. They’re removed along with all other type system syntax when the code is compiled to JavaScript.

```typescript
class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

class Subclass extends Base {
  examples() {
    this.isPublicImplicit; // Ok
    this.isPublicExplicit; // Ok
    this.isProtected; // Ok

    this.isPrivate;
    // Error: Property 'isPrivate' is private
    // and only accessible within class 'Base'.

    this.#truePrivate;
    // Property '#truePrivate' is not accessible outside
    // class 'Base' because it has a private identifier.
  }
}

new Subclass().isPublicImplicit; // Ok
new Subclass().isPublicExplicit; // Ok

new Subclass().isProtected;
// ~~~~~~~~~~~
// Error: Property 'isProtected' is protected
// and only accessible within class 'Base' and its subclasses.

new Subclass().isPrivate;
// ~~~~~~~~~~~
// Error: Property 'isPrivate' is private
// and only accessible within class 'Base'.
```

Note that it is not permitted to mix TypeScript’s old member visibility keyword with JavaScript’s new `#` private fields. Private fields are always private by default, so there’s no need to additionally mark them with the private keyword.

### Static Field Modifiers

JavaScript allows declaring members on a class itself - rather than its instances - using the `static` keyword. TypeScript supports using the `static` keyword on its own and/or with `readonly` and/or with one of the visibility keywords. When combined, the visibility keyword comes first, then `static`, then `readonly`.

```typescript
class Question {
  protected static readonly answer: "bash";
  protected static readonly prompt =
    "What's an ogre's favorite programming language?";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.prompt); // Ok

    if (answer === Question.answer) {
      console.log("You got it!");
    } else {
      console.log("Try again...");
    }
  }
}

Question.answer;
//       ~~~~~~
// Error: Property 'answer' is protected and only
// accessible within class 'HasStatic' and its subclasses.
```

## Chapter 9 - Type Modifiers

### Top Types

`Bottom type `is a type that can have no possible values and can’t be reached.
A `top type`, or `universal type,` is a type that can represent any possible value in a system.

#### any

`any` is generally used when a location is allowed to accept data of any type, such as the parameters to console.log:

```typescript
let anyValue: any;

anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok

console.log(anyValue); // Ok
```

The problem with any is that it explicitly tells TypeScript not to perform type checking on that value’s assignability or members. That lack of safety is useful if you’d like to quickly bypass TypeScript’s type checker, but **the disabling of type checking reduces TypeScript’s usefulness for that value**.

**If you want to indicate that a value can be anything, the unknown type is much safer.**

#### unknown

The `unknown` type in TypeScript is its true top type. `unknown` is similar to any in that all objects may be passed to locations of type `unknown`. The key difference with `unknown` is that TypeScript is much more restrictive about values of type `unknown`:

- TypeScript does not allow directly accessing properties of `unknown` typed values.

- `unknown` is not assignable to types that are not a top type (`any` or `unknown`).

```typescript
function greetComedian(name: unknown) {
  console.log(`Announcing ${name.toUpperCase()}!`);
  //                        ~~~~
  // Error: Object is of type 'unknown'.
}
```

The only way TypeScript will allow code to access members on a name of type unknown is if the value’s type is narrowed, such as using `instanceof` or `typeof`, or with a type assertion.

```typescript
function greetComedianSafety(name: unknown) {
  if (typeof value === "string") {
    console.log(`Announcing ${name.toUpperCase()}!`); // Ok
  } else {
    console.log("Well, I'm off.");
  }
}

greetComedianSafety("Betty White"); // Logs: 4
greetComedianSafety({}); // Does not log
```

**_Those two restrictions make `unknown` a much safer type to use than `any`. You should generally prefer using unknown instead of `any` when possible._**

### Type Predicates

**Type predicated are best avoided.**

### Type Operators

#### keyof

JavaScript objects can have members retrieved using dynamic values, which are commonly (but not necessarily) string typed. Representing these keys in the type system can be tricky. Using a catchall primitive such as string would allow invalid keys for the container value.

That’s why TypeScript when using stricter configuration settings would report an error on the `ratings[key]``;

```typescript
interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: string): number {
  return ratings[key];
  //     ~~~~~~~~~~~
  // Error: Element implicitly has an 'any' type because expression
  // of type 'string' can't be used to index type 'Ratings'.
  //   No index signature with a parameter of
  //   type 'string' was found on type 'Ratings'.
}
```

Another option would be to use a type union of literals for the allowed keys.
That would be more accurate in properly restricting to only the keys that exist on the container value:

```typescript
function getRating(ratings: Ratings, key: "audience" | "critic"): number {
  return ratings[key]; // Ok
}

const ratings: Ratings = {
  audience: 66,
  critic: 84,
};

getRating(ratings, "audience"); // Ok
getRating(ratings, "not valid");
//                 ~~~~~~~~~~~
// Error: Argument of type '"not valid"' is not
// assignable to parameter of type '"audience" | "critic"'.
```

However, what if the interface has dozens or more members?
TypeScript instead provides a keyof operator that takes in an existing type and gives back a union of all the keys allowed on that type.

```typescript
function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key]; // Ok
}

const ratings: Ratings = {
  audience: 66,
  critic: 84,
};

getCountKeyof(ratings, "audience"); // Ok

getCountKeyof(ratings, "not valid");
//                     ~~~~~~~~~~~
// Error: Argument of type '"not valid"' is not
// assignable to parameter of type 'keyof Ratings'.
```

#### typeof

Although the `typeof` type operator visually looks like the runtime `typeof` operator used to return a string description of a value’s type, the two are different. They only coincidentally use the same word.
**Remember: the JavaScript operator is a runtime operator that returns the string name of a type. The TypeScript version, because it’s a type operator, can only be used in types and won’t appear in compiled code.**

#### keyof typeof

`typeof` retrieves the type of a value, and `keyof` retrieves the allowed keys on a type.
TypeScript allows the two keywords to be chained together to succinctly retrieve the allowed keys on a value’s type.
Putting them together, the `typeof` type operator becomes wonderfully useful for working with `keyof` type operations.

```typescript
const ratings = { imdb: 8.4, metacritic: 82 };

function logRating(key: keyof typeof ratings) {
  console.log(ratings[key]);
}

logRating("imdb"); // Ok

logRating("invalid");
//        ~~~~~~~~~
// Error: Argument of type '"missing"' is not assignable // to parameter of type '"imdb" | "metacritic"'.
```

### Type Assertions

```typescript
const rawData = `["grace", "frankie"]`;

// Type: any
JSON.parse(rawData);

// Type: string[]
JSON.parse(rawData) as string[];

// Type: [string, string]
JSON.parse(rawData) as [string, string];

// Type: ["grace", "frankie"]
JSON.parse(rawData) as ["grace", "frankie"];
```

**If you’re working with older libraries or code, you may see a different casting syntax that looks like `<type>item` instead of `item as type`. Because this syntax is incompatible with JSX syntax and therefore does not work in `.tsx` files, it is discouraged.**

**TypeScript best practice is generally to avoid using type assertions when possible. It’s best for your code to be fully typed and to not need to interfere with TypeScript’s understanding of its types using assertions. But occasionally there will be cases where type assertions are useful, even necessary.**

#### Asserting Caught Error Types

Error handling is another place where type assertions may come in handy. It is generally impossible to know what type a caught error in a catch block will be because the code in the try block may unexpectedly throw any object different from what you expect.
Furthermore, although **JavaScript best practice is to always throw an instance of the `Error` class**, some projects instead throw `string` literals or other surprising values.

If you are absolutely confident that an area of code will only throw an instance of the `Error` class, you can use a type assertion to treat a caught assertion as an `Error`.

```typescript
try {
  // (code that may throw an error)
} catch (error) {
  console.warn("Oh no!", (error as Error).message);
}
```

It is generally safer to use a form of type narrowing such as an `instanceof` check to ensure the thrown error is the expected error type.

```typescript
try {
  // (code that may throw an error)
} catch (error) {
  console.warn("Oh no!", error instanceof Error ? error.message : error);
}
```

#### Non-Null Assertions

```typescript
// Inferred type: Date | undefined
let maybeDate = Math.random() > 0.5 ? undefined : new Date();

// Asserted type: Date
maybeDate as Date;

// Asserted type: Date
maybeDate!;
```

#### Type Assertion Caveats

**Type assertions should generally be used sparingly, and only when you’re absolutely certain it is safe to do so.**

Type assertions are meant to be only a small escape hatch, for situations where some value’s type is slightly incorrect. TypeScript will only allow type assertions between two types if one of the types is assignable to the other. If the type assertion is between two completely unrelated types, then TypeScript will notice and report a type error.

```typescript
let myValue = "Stella!" as number;
//  ~~~~~~~~~~~~~~~~~~~
// Error: Conversion of type 'string' to type 'number'
// may be a mistake because neither type sufficiently
// overlaps with the other. If this was intentional,
// convert the expression to 'unknown' first.
```

If you absolutely must switch a value from one type to a totally unrelated type, you can use a double type assertion. First cast the value to a top type `any` or `unknown` - and then cast that result to the unrelated type:

```typescript
let myValueDouble = "1337" as unknown as number; // Ok, but... eww.
```

**`as unknown as...` double type assertions are dangerous and almost always a sign of something incorrect in the types of the surrounding code. Using them as an escape hatch from the type system means the type system may not be able to save you when changes to surrounding code would cause an issue with previously working code.**

### Const Assertions

Const assertions can generally be used to indicate that any value - array, primitive, value, you name it - should be treated as the constant, immutable version of itself. Specifically, `as const` applies the following three rules to whatever type it receives:

- **Arrays** are treated as `readonly tuples`, not mutable `arrays`.
- **Literals** are treated as `literals`, not their general primitive equivalents.
- **Properties on objects** are considered `readonly`.

## Generics

### Generic Functions

A function may be made generic by placing an alias for a type parameter, wrapped in angle brackets, immediately before the parameters parentheses. That type parameter will then be available for usage in parameter type annotations, return type annotations, and type annotations inside the function’s body.

```typescript
function identityWithoutGenerics(input: any) {
  return input;
}
let value = identityWithoutGenerics(42); // Type of value: any

// ...

function identity<T>(input: T) {
  return input;
}

const numeric = identity("me"); // Type: "me"
const stringy = identity(123); // Type: 123
```

**The syntax for generic arrow functions has some restrictions in `.tsx` files, as it conflicts with `JSX` syntax.**

Adding type parameters to functions in this way allows them to be reused with different inputs while still maintaining type safety and avoiding `any` types.

### Explicit Generic Call Types

Most of the time when calling generic functions, TypeScript will be able to infer type arguments based on how the function is being called.

Unfortunately, as with class members and variable types, sometimes there isn’t enough information from a function’s call to inform TypeScript what its type argument should resolve to. This will commonly happen if a generic construct is provided another generic construct whose type arguments aren’t known.

**TypeScript will default to assuming the `unknown` type for any type argument it cannot infer.**

```typescript
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// Type: (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// Type: (input: unknown) => void
logWrapper((input) => {
  console.log(input.length);
  //                ~~~~~~
  // Error: Property 'length' does not exist on type 'unknown'.
});
```

### Multiple Function Type Parameters

Functions may define any number of type parameters, separated by commas.

```typescript
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // Type of value: readonly [boolean, string]
```

Note that if a function declares multiple type parameters, calls to that function must explicitly declare either none of the generic types or all of them. **TypeScript does not yet support inferring only some of the types of a generic call.**

```typescript
function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

// Ok: neither type argument provided
makePair("abc", 123); // Type: { key: string; value: number }

// Ok: both type arguments provided
makePair<string, number>("abc", 123); // Type: { key: string; value: number }

makePair<"abc", 123>("abc", 123); // Type: { key: "abc"; value: 123 }

makePair<string>("abc", 123);
//       ~~~~~~
// Error: Expected 2 type arguments, but got 1.
```

**Try not to use more than one or two type parameters in any generic construct. As with runtime function parameters, the more you use, the harder it is to read and understand the code.**

### Generic Interfaces

```typescript
interface Box<T> {
  inside: T;
}

let stringyBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

let incorrectBox: Box<number> = {
  inside: false,
  // Error: Type 'boolean' is not assignable to type 'number'.
};
```

### Inferred Generic Interface Types

```typescript
interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// Inferred Value type argument: Date
let lastDate = getLast({
  value: new Date("09-13-1993"),
});

// Inferred Value type argument: string
let lastFruit = getLast({
  next: {
    value: "banana",
  },
  value: "apple",
});

// Inferred Value type argument: number
let lastMismatch = getLast({
  next: {
    value: 123,
  },
  value: false,
  //       ~~~~~
  // Error: type 'boolean' is not assignable to type 'number'.
});
```

If an interface declares type parameters, any type annotations referring to that interface must provide corresponding type arguments.

```typescript
interface CrateLike<T> {
  contents: T;
}

let missingGeneric: CrateLike = {
  //                  ~~~~~~~~~
  // Error: Generic type 'Crate<T>' requires 1 type argument(s). inside: "??"
};
```

### Generic Classes

#### Extending Generic Classes

```typescript
class Quote<T> {
  lines: T;
  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quote<string[]> {
  speak() {
    console.log(this.lines.join("\n"));
  }
}

new Quote("The only real failure is the failure to try.").lines; // Type: string
new Quote([4, 8, 15, 16, 23, 42]).lines; // Type: number[]

new SpokenQuote(["Greed is so destructive.", "It destroys everything"]).lines; // Type: string[]

new SpokenQuote([4, 8, 15, 16, 23, 42]);
//              ~~~~~~~~~~~~~~~~~~~~~~
// Error: Argument of type 'number' is not // assignable to parameter of type 'string'.
```

Generic derived classes can alternately pass their own type argument through to their base class.

```typescript
class AttributedQuote<Value> extends Quote<Value> {
  speaker: string;
  constructor(value: Value, speaker: string) {
    super(value);
    this.speaker = speaker;
  }
}

// Type: AttributedQuote<string>
// (extending Quote<string>)
new AttributedQuote(
  "The road to success is always under construction.",
  "Lily Tomlin"
);
```

#### Static Class Generics

Static members of a class are separate from instance members and aren’t associated with any particular instance of the class. They don’t have access to any class instances or type information specific to any class instances. **As a result, while static class methods can declare their own type parameters, they can’t access any type parameters declared on a class.**

```typescript
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }

  static staticLog<OnStatic>(value: OnStatic) {
    let fromInstance: OnInstance;
    //                ~~~~~~~~~~
    // Error: Static members cannot reference class type arguments.

    console.log(value);
    return value;
  }
}

const logger = new BothLogger<number[]>();

logger.instanceLog([1, 2, 3]); // Type: number[]

// Inferred OnStatic type argument: boolean[]
BothLogger.staticLog([false, true]);

// Explicit OnStatic type argument: string
BothLogger.staticLog<string>("You can't change the music of your soul.");
```

### Generic Type Aliases

```typescript
type Nullish<T> = T | null | undefined;
```

Generic type aliases are commonly used with functions to describe the type of a generic function:

```typescript
type CreatesValue<Input, Output> = (input: Input) => Output; // Type: (input: string) => number

let creator: CreatesValue<string, number>;
creator = (text) => text.length; // Ok

creator = (text) => text.toUpperCase();
//                ~~~~~~~~~~~~~~~~~~
// Error: Type 'string' is not assignable to type 'number'.
```

#### Generic Discriminated Unions

```typescript
type Result<Data> = FailureResult | SuccessfulResult<Data>;

interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    // Type of result: SuccessfulResult<string>
    console.log(`We did it! ${result.data}`);
  } else {
    // Type of result: FailureResult
    console.error(`Awww... ${result.error}`);
  }

  result.data;
  //     ~~~~
  // Error: Property 'data' does not exist on type 'Result<string>'. // Property 'data' does not exist on type 'FailureResult'.
}
```

**Put together, generic types and discriminated types provide a wonderful way to model reusable types like `Result`.**

### Generic Defaults

```typescript
interface Quote<T = string> {
  value: T;
}

let explicit: Quote<number> = {
  value: 123,
};

let implicit: Quote = {
  value: "Be yourself. The world worships the original.",
};

let mismatch: Quote = {
  value: 123,
  //     ~~~
  // Error: Type 'number' is not assignable to type 'string'.
};
```

**Type parameters can default to earlier type parameters in the same declaration too.** Since each type parameter introduces a new type for the declaration, they are available as defaults for later type parameters in that declaration.

```typescript
interface KeyValuePair<Key, Value = Key> {
  key: Key;
  value: Value;
}

// Type: KeyValuePair<string, number>
let allExplicit: KeyValuePair<string, number> = {
  key: "rating",
  value: 10,
};

// Type: KeyValuePair<string>
let oneDefaulting: KeyValuePair<string> = {
  key: "rating",
  value: "ten",
};

let firstMissing: KeyValuePair = {
  //                ~~~~~~~~~~~~
  // Error: Generic type 'KeyValuePair<Key, Value>' // requires between 1 and 2 type arguments.
  key: "rating",
  value: 10,
};
```

**Keep in mind that all default `type parameters` must come last in their declaration list, similar to default `function parameters`.**

### Constrained Generic Types

TypeScript allows for a type parameter to declare itself as needing to extend a type: meaning it’s only allowed to alias types that are assignable to that type.

```typescript
interface WithLength {
  length: number;
}
function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}

logWithLength("No one can figure out your worth but you."); // Type: string
logWithLength([false, true]); // Type: boolean[]
logWithLength({ length: 123 }); // Type: { length: number }

logWithLength(new Date());
//            ~~~~~~~~~~
// Error: Argument of type 'Date' is not
// assignable to parameter of type 'WithLength'.
//   Property 'length' is missing in type
//   'Date' but required in type 'WithLength'.
```

#### keyof and Constrained Type Parameters

**Using extends and keyof together allows a type parameter to be constrained to the keys of a previous type parameter.** It is also the only way to specify the key of a generic type.

```typescript
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const favorite = get(roles, "favorite"); // Type: string
const others = get(roles, "others"); // Type: string[]

const missing = get(roles, "extras");
//                         ~~~~~~~~
// Error: Argument of type '"extras"' is not assignable
// to parameter of type '"favorite" | "others"'.
```

```typescript
function get<T>(container: T, key: keyof T) {
  return container[key];
}

const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading", "Nomadland"],
};

const found = get(roles, "favorite"); // Type: string | string[]
```

### Promises

The Promise constructor is typed in TypeScript as taking in a single parameter. That parameter’s type relies on a type parameter declared on the generic `Promise` class. A reduced form would look roughly like this:

```typescript
class PromiseLike<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (reason: unknown) => void
    ) => void
  ) {
    /* ... */
  }
}
```

### Async Functions

**_Any function declared in JavaScript with the `async` keyword returns a `Promise`._**

**If a value returned by an async function in JavaScript isn’t a `Thenable` (an `object` with a `.then()` method; in practice almost always a `Promise`), it will be wrapped in a `Promise` as if `Promise.resolve` was called on it. TypeScript recognizes this and will infer the return type of an async function to always be a `Promise` for whatever value is returned.**

Any manually declared return type on an `async` function therefore must always be a `Promise` type, even if the function doesn’t explicitly mention `Promises` in its implementation:

```typescript
// Ok
async function givesPromiseForString(): Promise<string> {
  return "Done!";
}

async function givesString(): string {
  //                            ~~~~~~
  // Error: The return type of an async function
  // or method must be the global Promise<T> type. return "Done!";
}
```

### Using Generics Right

**TypeScript best practice is generally to use generics only when necessary, and to be clear about what they’re used for when they are.**
However, types for utility libraries, particularly general-use modules, may sometimes need to heavily use them.

#### The Golden Rule of Generics

**One quick test that can help show whether a type parameter is necessary for a function is it should be used at least twice.** Generics describe relationships between types, so if a generic type parameter only appears in one place, it can’t possibly be defining a relationship between multiple types.

For example, this `logInput` function uses its `Input` type parameter exactly once, to declare its `input` parameter:

```typescript
function logInput<Input extends string>(input: Input) {
  console.log("Hi!", input);
}
```

`logInput` doesn’t do anything with its type parameter such as returning or declaring more parameters. There is therefore not much use to declaring that `Input` type parameter. We can rewrite `logInput` without it:

```typescript
function logInput(input: string) {
  console.log("Hi!", input);
}
```

### Generic Naming Conventions

**The standard naming convention for type parameters in many languages, TypeScript included, is to default to calling a first type argument “T” (for “type” or “template”) and if subsequent type parameters exist, calling them “U,” “V,” and so on.**

**When the intent of a generic isn’t clear from a single-letter T, it’s best to use descriptive generic type names that indicate what the type is used for:**

```typescript
// What on earth are L and V?!
function labelBox<L, V>(l: L, v: V) {
  /* ... */
}

// Much more clear.
function labelBox<Label, Value>(label: Label, value: Value) {
  /* ... */
}
```

**Whenever a construct has multiple type parameters, or the purpose of a single type argument isn’t immediately clear, consider using fully written names for readability instead of single-letter abbreviations.**

## Chapter 11 - Declaration Files

TypeScript allows declaring type shapes separately from their implementation. Type declarations are typically written in files whose names end with the `.d.ts` extension, known as `declaration` files. Declaration files are generally either written within a project, built and distributed with a project’s compiled npm package, or shared as a standalone “typings” package.

**A `.d.ts` declaration file generally works similarly to a `.ts` file, except with the notable constraint of not being allowed to include runtime code.**

_Declaration files create what’s known as an `ambient` context, meaning an area of code where you can only declare types, not values._

### Declaring Runtime Values

Although definition files may not create runtime values such as functions or variables, they are able to declare that those constructs exist with the `declare` keyword. Doing so tells the type system that some external influencesuch as a `<script>` tag in a web page has created the value under that name with a particular type.

**Declaring a variable with `declare` uses the same syntax as a normal variable declaration, except an initial value is not allowed.**

```typescript
// types.d.ts
declare let declared: string; // Ok

declare let initializer: string = "Wanda";
//                                 ~~~~~~~
// Error: Initializers are not allowed in ambient contexts.
```

Functions and classes are also declared similarly to their normal forms, but without the bodies of functions or methods.

```typescript
// fairies.d.ts
declare function canGrantWish(wish: string): boolean; // Ok

declare function grantWish(wish: string) {
  //                                     ~
  // Error: An implementation cannot be declared in ambient contexts.
  return true;
};

class Fairy {
  canGrantWish(wish: string): boolean; // Ok
  grantWish(wish: string) {
    //                    ~
    // Error: An implementation cannot be declared in ambient contexts. return true;
  }
}
```

Although type declarations using the `declare` keyword are most common in `.d.ts` definition files, the `declare` keyword can be used outside of declaration files as well. A **module** or **script** file can use `declare` as well. **This can be useful when a globally available variable is only meant to be used in that file.**

While type shapes such as **interfaces** are allowed with or without a declare in `.d.ts` definition files, runtime constructs such as **functions** or **variables** will trigger a type complaint without a declare:

```typescript
// index.d.ts
interface Writer {} // Ok declare interface Writer {} // Ok

declare const fullName: string; // Ok: type is the primitive string
declare const firstName: "Liz"; // Ok: type is the literal "value"

const lastName = "Lemon";
// Error: Top-level declarations in .d.ts files must
// start with either a 'declare' or 'export' modifier.
```

### Global Values

**Because TypeScript files that have no import or export statements are treated as scripts rather than modules, constructs - including types - declared in them are available globally.**

**Definition files without any imports or exports can take advantage of that behavior to declare types globally. Global definition files are particularly useful for declaring global types or variables available across all files in an application.**

```typescript
// globals.d.ts
declare const version: string;

// version.ts
export function logVersion() {
  console.log(`Version: ${version}`); // Ok
}
```

**If you find that you can’t automatically access global types declared in a .d.ts file, double-check that the .d.ts file isn’t importing and exporting anything. _Even a single export will cause the whole file to no longer be available globally!_**

### Global Interface Merging

Because interfaces merge with other interfaces of the same name, declaring an interface in a global script context - such as a `.d.ts` declaration file without any `import` or `export` statements - augments that interface globally.

```typescript
<script type="text/javascript">window.myVersion = "3.1.1";</script>;

// types/window.d.ts
interface Window {
  myVersion: string;
}

// index.ts
export function logWindowVersion() {
  console.log(`Window version is: ${window.myVersion}`);
  window.alert("Built-in window types still work! Hooray!");
}
```

### Global Augmentations

It’s not always feasible to refrain from import or export statements in a `.d.ts` file that needs to also augment the global scope, such as when your global definitions are simplified greatly by importing a type defined elsewhere. Sometimes types declared in a module file are meant to be consumed globally.

For those cases, TypeScript allows a syntax to declare `global` a block of code. Doing so marks the contents of that block as being in a global context even though their surroundings are not:

```typescript
// types.d.ts
// (module context)

declare global {
  // (global context)
}

// (module context)
```

### Built-In Declarations

Global objects such as `Array`, `Function`, `Map`, and `Set` are examples of constructs that the type system needs to know about but aren’t declared in your code. They’re provided by whatever runtime(s) your code is meant to run in: Deno, Node, a web browser, etc.

#### Library Declarations

**Built-in global objects such as `Array` and `Function` that exist in all JavaScript runtimes are declared in files with names like `lib.[target].d.ts`. `target` is the minimum support version of JavaScript targeted by your project, such as ES5, ES2020, or ESNext.**

The built-in library definition files, or “lib files,” are fairly large because they represent the entirety of JavaScript’s built-in APIs.

Lib files are distributed as part of the TypeScript npm package. You can find them inside the package at paths like `node_modules/typescript/lib/lib.es5.d.ts`. For IDEs such as VS Code that use their own packaged TypeScript versions to type check code, you can find the lib file being used by right-clicking on a built-in method such as an array’s `forEach` in your code and selecting an option like _Go to Definition_.

##### Library targets

TypeScript by default will include the appropriate lib file based on the target setting provided to the tsc CLI and/or in your project’s `tsconfig.json` (**by default, "es5"**). Successive lib files for newer versions of JavaScript build on each other using interface merging.

**TypeScript projects will include the lib files for all version targets of JavaScript up through their minimum target. For example, a project with a target of `"es2016"` would include `lib.es5.d.ts`, `lib.es2015.d.ts`, and `lib.es2016.d.ts`.**

**Language features available only in newer versions of JavaScript than your target will not be available in the type system. For example, if your target is `"es5"`, language features from `ES2015` or later such as `String.prototype.startsWith` will not be recognized.**

#### DOM Declarations

Outside of the JavaScript language itself, the most commonly referenced area of type declarations is for web browsers. Web browser types, generally referred to as “DOM” types, cover APIs such as `localStorage` and type shapes such as `HTMLElement` available primarily in web browsers. DOM types are stored in a `lib.dom.d.ts` file alongside the other `lib.*.d.ts` declaration files.

**TypeScript includes DOM types by default in projects that don’t override the `lib` compiler option.** That can sometimes be confusing for developers working on projects meant to be run in nonbrowser environments such as Node, as they shouldn’t be able to access the global APIs such as `document` and `localStorage` that the type system would then claim to exist.

### Module Declarations

One more important feature of declaration files is their ability to describe the shapes of modules. The `declare` keyword can be used before a string name of a module to inform the type system of the contents of that module.

```typescript
// modules.d.ts
declare module "my-example-lib" {
  export const value: string;
}

// index.ts
import { value } from "my-example-lib";

console.log(value); // Ok
```

**You shouldn’t have to use `declare module` often, if ever, in your own code.**

#### Wildcard Module Declarations

**A common use of module declarations is to tell web applications that a particular non-JavaScript/TypeScript file extension is available to import into code.** Module declarations may contain a single \* wildcard to indicate that any module matching that pattern looks the same.

For example, many web projects such as those preconfigured in popular React starters such as `create-react-app` and `create-next-app` support CSS modules to import styles from CSS files as objects that can be used at runtime.

```typescript
// styles.d.ts
declare module "*.module.css" {
  const styles: { [i: string]: string };
  export default styles;
}

// component.ts
import styles from "./styles.module.css";

styles.anyClassName; // Type: string
```

### Package Types

**Projects written in TypeScript still generally distribute packages containing compiled `.js` outputs. They typically use `.d.ts` files to declare the backing TypeScript type system shapes behind those JavaScript files.**

#### declaration

TypeScript provides a `declaration` option to create `.d.ts` outputs for input files alongside JavaScript outputs.

For example, given the following `index.ts` source file:

```typescript
// index.ts
export const greet = (text: string) => {
  console.log(`Hello, ${text}!`);
};
```

Using `declaration`, a `module` of `"es2015"`, and a target of `"es2015"`, the following outputs would be generated:

```typescript
// index.d.ts
export declare const greet: (text: string) => void;

// index.js
export const greet = (text) => {
  console.log(`Hello, ${text}!`);
};
```

**Auto-generated `.d.ts` files are the best way for a project to create type definitions to be used by consumers. It’s generally recommended that most packages written in TypeScript that produce `.js` file outputs should also bundle `.d.ts` alongside those files.**

#### Dependency Package Types

TypeScript is able to detect and utilize `.d.ts` files bundled inside a project’s `node_modules` dependencies. Those files will inform the type system about the type shapes exported by that package as if they were written inside the same project or declared with a `declare` module block.

A typical npm module that comes with its own `.d.ts` declaration files might have a file structure something like:

```
lib/
    index.js
    index.d.ts
package.json
```

#### Exposing Package Types

If your project is meant to be distributed on npm and provide types for consumers, add a `"types"` field in the package’s `package.json` file to point to the root declaration file. The types field works similarly to the main field - and often will look the same but with the `.d.ts` extension instead of `.js`.

**If the types field does not exist in a package’s package.json, TypeScript will assume a default value of `./index.d.ts`. This mirrors the default npm behavior of assuming an `./index.js` file as the main entry point for a package if not specified.**

### DefinitelyTyped

The TypeScript team and community created a giant repository called **DefinitelyTyped** to house community-authored definitions for packages.

DT packages are published on npm under the `@types` scope with the same name as the package they provide types for. For example, as of 2022, `@types/react` provides type definitions for the `react` package.

**@types are generally installed as either `dependencies` or `devDependencies`, though the distinction between those two has become blurred in recent years. In general, if your project is meant to be distributed as an npm package, it should use `dependencies` so consumers of the package also bring in the type definitions used within. If your project is a standalone application such as one built and run on a server, it should use `devDependencies` to convey that the types are just a development-time tool.**

**As these files are authored by the community, they may lag behind the parent project or have small inaccuracies. If your project compiles successfully yet you get runtime errors when calling libraries, investigate if the signatures of the APIs you are accessing have changed. This is less common, but still not unheard of, for mature projects with stable API surfaces.**

#### Type Availability

Most popular JavaScript packages either ship with their own typings or have typings available via DefinitelyTyped.

If you’d like to get types for a package that doesn’t yet have types available, your three most common options would be:

- Send a pull request to DefinitelyTyped to create its `@types/` package.
- Use the `declare module` syntax introduced earlier to write the types within your
  project.
- Disable `noImplicitAny` which is **strongly warned against**

See (typescriptlang.org/dt/search))[https://www.typescriptlang.org/dt/search] to display whether a package has types bundled or via a separate @types/ package.

## Chapter 12 - Using IDE Features

In VS Code

### Finding Definitions

- Go to Definition
- Go to Type Definition

**Go to Type Definition** is a specialized version of **Go to Definition** that goes to the definition of whatever type a value is.

### Finding References

- **Go to References** / **Find All References** finds places it’s used in the project.

#### Finding Implementations

- **Go to Implementations** / **Find all Implementations** are specialized versions of **Go To / Find All References** made for interfaces and abstract class methods.

### Writing Code

IDE language services such as VS Code’s TypeScript service run in the background of your editor and react to actions taken in files. They see edits to files as you type them - even before changes are saved to files. Doing so enables a slew of features that help automate common tasks when writing TypeScript code.

- **Completing Names**
- **Automatic Imports**
- **Automatic Import Updates**

### Code actions

- **Renaming**
- **Removing unused code**

### Working Effectively with Errors

#### Language Service Errors

**Note that VS Code will only list problems for files that are currently open. If you want a real-time updated list of all TypeScript compiler problems, you’ll need to run the TypeScript compiler in a terminal.**

- **Problems tab**
- **Running a terminal compiler** `tsc -w`
- **Understanding types**

## Chapter 13 - Configuration Options

### `tsc` Options

- `--pretty` - Pretty Mode - Defaults to `true`
- `--watch` - Watch Mode

### TSConfig Files

The existence of a `tsconfig.json` indicates that the directory is the root of a TypeScript project. Running `tsc` in a directory will read in any configuration options in that `tsconfig.json` file.

You can also pass `-p/--project` to `tsc` with a path to a directory containing a `tsconfig.json` or any file to have tsc use that instead:

```bash
tsc -p path/to/tsconfig.json
```

#### `tsc --init`

I recommend using `tsc --init` to create your configuration file on your first few TypeScript projects. Its default values are applicable to most projects, and its documentation comments are helpful in understanding them.

### CLI Versus Configuration

Most options available in both the CLI and in TSConfig files fall into one of two categories:

- Compiler - How each included file is compiled and/or type checked by TypeScript
- File - Which files will or will not have TypeScript run on them

If a setting is provided to the tsc CLI, such as a one-off change for a CI or production build, it will generally override any value specified in a TSConfig file. **Because IDEs generally read from the `tsconfig.json` in a directory for TypeScript settings, it’s recommended to put most configuration options in a `tsconfig.json` file.**

### File Inclusions

By default, tsc will run on all nonhidden `.ts` files (those whose names do not start with a `.`) in the current directory and any child directories, ignoring hidden directories and directories named `node_modules`.

#### include

The most common way to include files is with a top-level `"include"` property in a `tsconfig.json`. It allows an array of strings that describes what directories and/or files to include in TypeScript compilation.

For example, this configuration file recursively includes all TypeScript source files in a `src/` directory relative to the `tsconfig.json`:

```json
{
  "include": ["src"]
}
```

#### exclude

By default, exclude contains `["node_modules", "bower_components", "jspm_pack ages"]` to avoid running the TypeScript compiler on compiled third-party library files.

_If you’re writing your own exclude list, you typically won’t need to re-add `"bower_components"` or `"jspm_packages"`. Most JavaScript projects that install node modules to a folder within the project only install to `"node_modules"`._

**Keep in mind, exclude only acts to remove files from the starting list in `include`. TypeScript will run on any file imported by any included file, even if the imported file is explicitly listed in `exclude`.**

### Alternative Extensions

TypeScript is by default able to read in any file whose extension is `.ts`. However, some projects require being able to read in files with different extensions, such as JSON modules or JSX syntax for UI libraries such as React.

#### JSX Syntax

In order to use JSX syntax in a file, you must do two things:

- Enable the `"jsx"` compiler option in your configuration options
- Name that file with a `.tsx` extension

##### Generic arrow functions in `.tsx` files

To work around this syntax ambiguity, you can add an `= unknown` constraint to the type argument. Type arguments default to the unknown type so this doesn’t change code behavior at all. It just indicates to TypeScript to read a type argument, not a JSX element:

```typescript
const identity = <T = unknown>(input: T) => input; // Ok
```

#### `resolveJsonModule`

**TypeScript will allow reading in `.json` files if the `resolveJsonModule` compiler option is set to `true`. When it is, `.json` files may be imported from as if they were `.ts` files exporting an `object`. TypeScript will infer the type of that `object` as if it were a `const` variable.**

_For JSON files that contain other literal types, such as `arrays` or `numbers`, you’ll have to use the `* as` import syntax._

### Emit

#### `outDir`

By default, TypeScript places output files alongside their corresponding source files.

TypeScript’s `outDir` compiler option allows specifying a different root directory for outputs. **Output files are kept in the same relative directory structure as input files.**

A `rootDir` compiler option does exist to explicitly specify that root directory, but it’s rarely necessary or used with values other than `.` or `src`.

#### `target`

TypeScript is able to produce output JavaScript that can run in environments as old as ES3 (circa 1999!).

Although target defaults to `"es3"` for backward compatibility reasons when not specified and `tsc --init` defaults to specifying `"es2016"`, it’s generally advisable to use the newest JavaScript syntax possible per your target platform(s).

As of 2022, all releases within the last year of browsers serving > 0.1% of worldwide users support at least all of ECMAScript 2019 and nearly all of ECMAScript 2020–2021, while the LTS-supported versions of Node.js support all of ECMAScript 2021. There’s very little reason not to have a target at least as high as `"es2019"`.

#### Emitting Declarations

Most packages use TypeScript’s `declaration` compiler option to emit `.d.ts` output files from source files:

`.d.ts` output files are emitted under the same output rules as `.js` files, including respecting `outDir`.

##### `emitDeclarationOnly`

This is useful for projects that use an external tool to generate output JavaScript (babel, for example) but still want to use TypeScript to generate output definition files.

If `emitDeclarationOnly` is enabled, either `declaration` or the `composite` compiler option must be enabled.

#### Source Maps

**Source maps are descriptions of how the contents of output files match up to original source files.** They allow developer tools such as debuggers to display original source code when navigating through the output file. They’re particularly useful for visual debuggers such as those used in browser developer tools and IDEs to let you see original source file contents while debugging. TypeScript includes the ability to output source maps alongside output files.

##### `sourceMap`

TypeScript’s sourceMap compiler option enables outputting `.js.map` or `.jsx.map `sourcemaps alongside `.js` or `.jsx` output files. Sourcemap files are otherwise given the same name as their corresponding output JavaScript file and placed in the same directory.

##### `declarationMap`

TypeScript is also able to generate source maps for `.d.ts` declaration files. Its declarationMap compiler option directs it to generate a `.d.ts.map` source map for each `.d.ts` that maps back to the original source file.**Declaration maps enable IDEs such as VS Code to go to the original source file when using editor features such as Go to Definition.**

##### `noEmit`

For projects that completely rely on other tools to compile source files to output JavaScript, TypeScript can be told to skip emitting files altogether. **Enabling the noEmit compiler option directs TypeScript to act purely as a type checker.**

### Type checking

#### `lib`

To start, which global APIs TypeScript assumes to be present in the runtime environment is configurable with the `lib` compiler option. It takes in an array of strings that defaults to your target compiler option, as well as `dom` to indicate including browser types.

**Most of the time, the only reason to customize `lib` would be to remove the `dom` inclusion for a project that doesn’t run in the browser**

**Alternately, for a project that uses polyfills to support newer JavaScript APIs, `lib` can include dom and any ECMAScript version:**

```json
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}
```

**Be wary of modifying lib without providing all the right runtime polyfills.** A project with a `lib` set to `"es2021"` running on a platform that only supports up through ES2020 might have no type-checking errors but still experience runtime errors attempting to use APIs defined in ES2021 or later, such as `String.replaceAll`.

#### `skipLibCheck`

TypeScript provides a `skipLibCheck` compiler option that indicates to skip type checking in declaration files not explicitly included in your source code. **This can be useful for applications that rely on many dependencies that may rely on different, conflicting definitions of shared libraries.**

`skipLibCheck` speeds up TypeScript performance by allowing it to skip some type checking. For this reason, **it is generally a good idea to enable it on most projects.**

#### Strict Mode

Each strictness compiler option defaults to `false`, and when enabled, directs the type checker to turn on some additional checks.

You can enable all strict mode checks by enabling the `strict` compiler option:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

##### `noImplicitAny`

If TypeScript cannot infer the type of a parameter or property, then it will fall back to assuming the `any` type. **It is generally best practice to not allow these implicit any types in code as the any type is allowed to bypass much of TypeScript’s type checking.**

##### `strictBindCallApply`

When TypeScript was first released, it didn’t have rich enough type system features to be able to represent the built-in `Function.apply`, `Function.bind`, or `Function.call` function utilities. Those functions by default had to take in `any` for their list of arguments. That’s not very type safe!

**TypeScript best practice is to enable `strictBindCallApply`.**

##### `strictFunctionTypes`

A function type is no longer considered assignable to another function type if its parameters are subtypes of that other type’s parameters.

##### `strictNullChecks`

Disabling TypeScript’s `strictNullChecks` flag roughly adds `null | undefined` to every type in your code, thereby allowing any variable to receive `null` or `undefined`.

**TypeScript best practice is to enable strictNullChecks. Doing so helps prevent crashes and eliminates the billion-dollar mistake.**

##### `strictPropertyInitialization`

Is making sure that each property on a class is definitely assigned in the class constructor.

**TypeScript best practice is generally to enable `strictPropertyInitialization`.**

##### `useUnknownInCatchVariables`

There’s no guarantee a thrown error is an instance of the Error `class`: code can always throw `"something-else"`.

As a result, TypeScript’s default behavior for errors is to give them type `any`, as they could be anything.

**TypeScript best practice is generally to enable `useUnknownInCatchVariables`.**

### Modules

JavaScript’s various systems for exporting and importing module contents - `AMD`, `CommonJS`, `ECMAScript`, and so on - are one of the most convoluted module systems in any modern programming language. **JavaScript is relatively unusual in that the way files import each other’s contents is often driven by user-written frameworks such as Webpack.**

#### `module`

When writing source code with ECMAScript modules, TypeScript may transpile the `export` and `import` statements to a different module system based on the `module` value.

For example, directing that a project written in ECMAScript be output as CommonJS modules:

```json
{
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

Would transpile:

```typescript
import { value } from "my-example-lib";

export const logValue = () => console.log(value);
```

as:

```javascript
const my_example_lib = require("my-example-lib");

exports.logValue = () => console.log(my_example_lib.value);
```

**If your target compiler option is `"es3"` or `"es5"`, module’s default value will be `"commonjs"`. Otherwise, module will default to `"es2015"` to specify outputting ECMAScript modules.**

#### `moduleResolution`

_Module resolution_ is the process by which the imported path in an import is mapped to a module.

You’ll typically want to provide it one of two logic strategies:

- `node`: The behavior used by CommonJS resolvers such as traditional Node.js
- `nodenext`: Aligning to the behavior specified for ECMAScript modules

**`moduleResolution` does not change how TypeScript emits code at all. It’s only used to describe the runtime environment your code is meant to be run in.**

**For backward compatibility reasons, TypeScript keeps the default `moduleResolution` value to a `classic` value that was used for projects years ago. You almost certainly do not want the `classic` strategy in any modern project.**

#### Interoperability with CommonJS

When working with JavaScript modules, there is a difference between the “default” export of a module and its “namespace” output. The default export of a module is the `.default` property on its exported `object`. The namespace export of a module is the exported `object` itself.

TypeScript’s type system builds its understanding of file imports and exports in terms of ECMAScript modules. **If your project depends on npm packages as most do, however, it’s likely some of those dependencies are still published as CommonJS modules. Furthermore, although some packages that comply with ECMAScript modules rules avoid including a default export, many developers prefer the more succinct default-style imports over namespace-style imports.**

##### `esModuleInterop`

The `esModuleInterop` configuration option adds a small amount of logic to JavaScript code emitted by TypeScript when module is not an ECMAScript module format such as `"es2015"` or `"esnext"`. That logic allows ECMAScript modules to import from modules even if they don’t happen to adhere to ECMAScript modules’ rules around default or namespace imports.

**One common reason to enable `esModuleInterop` is for packages such as `"react"` that do not ship a default export.**

**Note that `esModuleInterop` only directly changes how emitted JavaScript code works with imports.**

##### `allowSyntheticDefaultImports`

The `allowSyntheticDefaultImports` compiler option informs the type system that ECMAScript modules may default import from files that are otherwise incompatible CommonJS namespace exports.

It defaults to `true` only if either of the following is true:

- `module` is `"system"` (an older, rarely used module format).
- `esModuleInterop` is `true` and `module` is not an ECMAScript modules format
  such as `"es2015"` or `"esnext"`.

In other words, if esModuleInterop is true but module is "esnext", TypeScript will assume output compiled JavaScript code is not using import interoperability helpers. It would report a type error for a default import from packages such as "react":

```typescript
import React from "react";
// Module '"file:///node_modules/@types/react/index"' can only be
// default-imported using the 'allowSyntheticDefaultImports' flag`.
``;
```

#### `isolatedModules`

External transpilers such as Babel that only operate on one file at a time cannot use type system information to emit JavaScript. As a result, TypeScript syntax features that rely on type information to emit JavaScript aren’t generally supported in those transpilers. Enabling the `isolatedModules` compiler tells TypeScript to report an error on any instance of a syntax that is likely to cause issues in those transpilers:

- Const enums
- Script (nonmodule) files
- Standalone type exports

**I generally recommend enabling `isolatedModules` if your project uses a tool other than TypeScript to transpile to JavaScript.**

### Javascript

#### `allowJs`

The `allowJs` compiler option allows constructs declared in JavaScript files to factor into type checking TypeScript files When combined with the `jsx` compiler option, `.jsx` files are also allowed.

#### `checkJs`

TypeScript can do more than just factor JavaScript files into type checking TypeScript files: it can type check JavaScript files too.

The checkJs compiler option serves two purposes:

- Defaulting `allowJs` to `true` if it wasn’t already
- Enabling the type checker on `.js` and `.jsx` files

Enabling checkJs will make TypeScript treat JavaScript files as if they were TypeScript files that don’t have any TypeScript-specific syntax. **Type mismatches, misspelled variable names, and so on will all cause type errors as they normally would in a TypeScript file**

##### @ts-check

**Alternately, checkJs can be enabled on a file-by-file basis by including a `// @ts-check` comment on top of the file.** Doing so enables the checkJs option for just that JavaScript file:

```javascript
// index.js
// @ts-check
let myQuote = "Each person must live their life as a model for others.";

console.log(quote);
// ~~~~~~~
// Error: Cannot find name 'quote'. Did you mean 'myQuote'?
```

### JSDoc Support

When `allowJs` and/or `checkJs` are enabled, TypeScript will recognize any JSDoc definitions in code.

The full list of supported JSDoc syntax is available on (here)[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html].

### Configuration Extensions

#### `extends`

A TSConfig may extend from another TSConfig with the extends configuration option. `extends` takes in a path to another TSConfig file and indicates that all settings from that file should be copied over.

When an `extends` value is an absolute path, it indicates to extend the TSConfig from an npm module.

### Configuration Bases

Instead of creating your own configuration from scratch or the `--init` suggestions, you can start with a premade “base” TSConfig file tailored to a particular runtime environment.

For example, to install the recommended TSConfig base for deno:

```bash
npm install --save-dev @tsconfig/deno
# or
yarn add --dev @tsconfig/deno
```

And, then:

```json
{
  "extends": "@tsconfig/deno/tsconfig.json"
}
```

The full list of TSConfig bases is documented (here)[https://github.com/tsconfig/bases].

### Project References

It can be useful in larger projects to use different configuration files for different areas of a project. TypeScript allows defining a system of “project references” where multiple projects can be built together. Setting up project references is a little more work than using a single TSConfig file but comes with several key benefits:

- You can specify different compiler options for certain areas of code.
- TypeScript will be able to cache build outputs for individual projects, often resulting in significantly faster build times for large projects.
- Project references enforce a “dependency tree” (only allowing certain projects to import files from certain other projects), which can help structure discrete areas of code.

#### `composite`

TypeScript allows a project to opt into the composite configuration option to indicate that its file system inputs and outputs obey constraints that make it easier for build tools to determine whether its build outputs are up-to-date compared to its build inputs. When composite is true:

- The `rootDir` setting, if not already explicitly set, defaults to the directory containing the TSConfig file.
- All implementation files must be matched by an include pattern or listed in the files array.
- `declaration` must be turned on.

**`composite` is generally most useful in combination with the `references` configuration option.**

#### `references`

A TypeScript project can indicate it relies on the outputs generated by a composite TypeScript project with a z setting in its TSConfig. Importing modules from a referenced project will be seen in the type system as importing from its output `.d.ts` declaration files.

For example:

```json
// shell/tsconfig.json
{
  "references": [{ "path": "../core" }]
}
```

**The references configuration option will not be copied from base TSConfigs to derived TSConfigs via extends.**

#### Build Mode

Once an area of code has been set up to use project references, it will be possible to use `tsc` in its alternate “build” mode via the `-b/--b` CLI flag. Build mode enhances `tsc` into something of a project build coordinator.**It lets `tsc` rebuild only the projects that have been changed since the last build, based on when their contents and their file outputs were last generated.**

More precisely, TypeScript’s build mode will do the following when given a TSConfig:

1. Find that TSConfig’s referenced projects.
2. Detect if they are up-to-date.
3. Build out-of-date projects in the correct order.
4. Build the provided TSConfig if it or any of its dependencies have changed.

The ability of TypeScript’s build mode to skip rebuilding up-to-date projects can significantly improve build performance.

##### Coordinator configurations

A common handy pattern for setting up TypeScript project references in a repository is to set up a root-level `tsconfig.json` with an empty `files` array and `references` to all the project references in the repository. That root TSConfig won’t direct TypeScript to build any files itself. Instead it will act purely to tell TypeScript to build referenced projects as needed.

This `tsconfig.json` indicates to build the `packages/core` and `packages/shell` projects in a repository:

```json
// tsconfig.json
{
  "files": [],
  "references": [{ "path": "./packages/core" }, { "path": "./packages/shell" }]
}
```

##### Build-mode options

Build mode supports a few build-specific CLI options:

- `--clean`: deletes the outputs of the specified projects (may be combined with
  `--dry`)
- `--dry`: shows what would be done but doesn’t actually build anything
- `--forc`e: acts as if all projects are out of date
- `-w/--watch`: similar to the typical TypeScript watch mode

## Chapter 14 - Syntax Extensions

Early TypeScript designers introduced three syntax extensions to JavaScript in the TypeScript language:

- **Classes**, which aligned with JavaScript classes as the spec was ratified
- **Enums**, a straightforward syntactic sugar akin to a plain object of keys and values
- **Namespaces**, a solution predating modern modules to structure and arrange code

TypeScript **classes** ended up looking and behaving almost identical to JavaScript classes (phew!) with the exception of `useDefineForClassFields` behavior and parameter properties.

**Enums** are still used in some projects because they are occasionally useful. Virtually no new projects use **namespaces** anymore.

TypeScript includes a shorthand syntax for declaring “parameter properties”: properties that are assigned to a member property of the same type at the beginning of a class constructor. Placing `readonly` and/or one of the privacy modifiers: `public`, `protected`, or `private in front of the parameter to a constructor indicates to TypeScript to also declare a property of that same name and type.

```typescript
class Engineer {
  constructor(readonly area: string) {
    console.log(`I work in the ${area} area.`);
  }
}

// Type: string
new Engineer("mechanical").area;
```

### Experimental Decorators

Many other languages that contain classes allow annotating, or decorating, those classes and/or their members with some kind of runtime logic to modify them. Decorator functions are a **proposal for JavaScript** to allow annotating classes and members by placing a `@` and the name of a function first.

```typescript
@myDecorator
class MyClass {
  /* ... */
}
```

**Each usage of a decorator will execute once, as soon as the entity it’s decorating is created.** Each kind of decorator—**accessor**, **class**, **method**, **parameter**, and **property—** receives a different set of arguments describing the entity it’s decorating.

```typescript
function logOnCall(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  console.log("[logOnCall] I am decorating", target.constructor.name);

  descriptor.value = function (...args: unknown[]) {
    console.log(`[descriptor.value] Calling '${key}' with:`, ...args);
    return original.call(this, ...args);
  };
}
class Greeter {
  @logOnCall
  greet(message: string) {
    console.log(`[greet] Hello, ${message}!`);
  }
}

new Greeter().greet("you");
// Output log:
// "[logOnCall] I am decorating", "Greeter"
// "[descriptor.value] Calling 'greet' with:", "you"
// "[greet] Hello, you!"
```

### Enums

Most programming languages contain the concept of an “enum,” or enumerated type, to represent a set of related values. Enums can be thought of as a set of literal values stored in an object with a friendly name for each value.

JavaScript does not include an enum syntax because traditional objects can be used in place of them. For example, while HTTP status codes can be stored and used as numbers, many developers find it more readable to store them in an object that keys them by their friendly name:

```typescript
const StatusCodes = {
  InternalServerError: 500,
  NotFound: 404,
  Ok: 200,
  // ...
} as const;

StatusCodes.InternalServerError; // 500
```

The tricky thing with enum-like objects in TypeScript is that there isn’t a great type system way to represent that a value must be one of their values. One common method is to use the `keyof` and `typeof` type modifiers:

```typescript
// Type: 200 | 404 | 500
type StatusCodeValue = typeof StatusCodes[keyof typeof StatusCodes];

let statusCodeValue: StatusCodeValue;

statusCodeValue = 200; // Ok

statusCodeValue = -1;
// Error: Type '-1' is not assignable to type 'StatusCodeValue'.
```

TypeScript provides an `enum` syntax for creating an object with literal values of type `number` or `string`:

```typescript
enum StatusCode {
  InternalServerError = 500,
  NotFound = 404,
  Ok = 200,
}

StatusCode.InternalServerError; // 500
```

**TypeScript allows any `number` to be assigned to a numeric `enum` value as a convenience at the cost of a little type safety.**

Enums are quite useful for explicitly declaring known sets of values. **Enums are used extensively in both the TypeScript and VS Code source repositories!**

#### Automatic Numeric Values

Enum members don’t need to have an explicit initial value. When values are omitted, TypeScript will start the first value off with 0 and increment each subsequent value by 1. Allowing TypeScript to choose the values for enum members is a good option when the value doesn’t matter beyond being unique and associated with the key name.

```typescript
enum VisualTheme {
  Dark, // 0
  Light, // 1
  System, // 2
}
```

**In enums with numeric values, any members missing an explicit value will be 1
greater than the previous value.**

#### String-Valued Enums

One downside of string member values is that they cannot be computed automatically by TypeScript. Only enum members that follow a member with a numeric value are allowed to be computed automatically.

#### Const Enums

Because enums create a runtime object, using them produces more code than the common alternative strategy of unions of literal values. **TypeScript allows declaring enums with the `const` modifier in front of them to tell TypeScript to omit their objects definition and property lookups from compiled JavaScript code.**

```typescript
const enum DisplayHint {
  Opaque = 0,
  Semitransparent,
  Transparent,
}

let displayHint = DisplayHint.Transparent;
```

compiles to:

```javascript
let displayHint = 2; /* DisplayHint.Transparent */
```

### Namespaces

**Unless you are authoring DefinitelyTyped type definitions for an existing package, do not use namespaces. Namespaces do not match up to modern JavaScript module semantics. Their automatic member assignments can make code confusing to read.**

A `namespace` is a globally available object with “exported” contents available to call as members of that object. Namespaces are defined with the `namespace` keyword followed by a `{}` block of code. Everything in that namespace block is evaluated inside a function closure.

```typescript
namespace Randomized {
  const value = Math.random();
  console.log(`My value is ${value}`);
}
```

compiles to:

```javascript
var Randomized;
(function (Randomized) {
  const value = Math.random();
  console.log(`My value is ${value}`);
})(Randomized || (Randomized = {}));
```

#### Namespace Exports

The key feature of namespaces that made them useful was that a `namespace` could “export” contents by making them a member of the `namespace` object. Other areas of code can then refer to that member by name.

```typescript
namespace Settings {
  export const name = "My Application";
  export const version = "1.2.3";

  export function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  }

  console.log("Initializing", describe());
  console.log("Initialized", Settings.describe());
}
```

compiles to:

```javascript
var Settings;
(function (Settings) {
  Settings.name = "My Application";
  Settings.version = "1.2.3";

  function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  }
  Settings.describe = describe;

  console.log("Initializing", describe());
})(Settings || (Settings = {}));

console.log("Initialized", Settings.describe());
```

Or:

```typescript
// settings/constants.ts
namespace Settings {
  export const name = "My Application";
  export const version = "1.2.3";
}

// settings/describe.ts
namespace Settings {
  export function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  }

  console.log("Initializing", describe());
}

// index.ts
console.log("Initialized", Settings.describe());
```

compiles to:

```javascript
// settings/constants.ts
var Settings;
(function (Settings) {
  Settings.name = "My Application";
  Settings.version = "1.2.3";
})(Settings || (Settings = {}));

// settings/describe.ts
(function (Settings) {
  function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  }
  Settings.describe = describe;

  console.log("Initialized", describe());
})(Settings || (Settings = {}));

console.log("Initialized", Settings.describe());
```

In both the single-file and multiple-file declaration forms, the output object at runtime is one with three keys. Roughly:

```javascript
const Settings = {
  describe: function describe() {
    return `${Settings.name} at version ${Settings.version}`;
  },

  name: "My Application",
  version: "1.2.3",
};
```

The key difference with using a namespace is that it can be split across different files and members can still refer to each other under the namespace’s name.

#### Nested Namespaces

Namespaces can be “nested” to indefinite levels by either exporting a namespace from within another namespace or putting one or more . periods inside a name.

```typescript
namespace Root.Nested {
  export const value1 = true;
}
```

is same as:

```typescript
namespace Root {
  export namespace Nested {
    export const value2 = true;
  }
}
```

They both compile to structurally identical code:

```javascript
(function (Root) {
  let Nested;
  (function (Nested) {
    Nested.value2 = true;
  })(Nested || (Nested = {}));
})(Root || (Root = {}));
```

#### Namespaces in Type Definitions

Many JavaScript libraries - particularly older web application staples such as `jQuery` - are set up to be included in web browsers with a traditional, non-module `<script>` tag. Their typings need to indicate that they create a global variable available to all code - structure perfectly captured by namespaces.

Additionally, many browser-capable JavaScript libraries are set up both to be imported in more modern module systems and also to create a global namespace. TypeScript allows a module type definition to include an `export as namespace`, followed by a global name, to indicate the module is also available globally under that name.

```typescript
// node_modules/@types/my-example-lib/index.d.ts
export const value: number;
export as namespace libExample;
```

The type system would know that both `import("my-example-lib")` and `window.libExample` would give back the module, with a `value` property of type `number`:

```typescript
// src/index.ts
import * as libExample from "my-example-lib"; // Ok
const value = window.libExample.value; // Ok
```

#### Prefer Modules Over Namespaces

```typescript
// settings/constants.ts
export const name = "My Application";
export const version = "1.2.3";

// settings/describe.ts
import { name, version } from "./constants";

export function describe() {
  return `${Settings.name} at version ${Settings.version}`;
}

console.log("Initializing", describe());

// index.ts
import { describe } from "./settings/describe";
```

**TypeScript code structured with namespaces can’t be easily tree-shaken** (have unused files removed) in modern builders such as Webpack because namespaces create implicit, rather than explicitly declared, ties between files the way ECMAScript modules do. It is generally strongly preferred to write runtime code using ECMAScript modules and not TypeScript namespaces.

### Type-Only Imports and Exports

**TypeScript’s transpiler will remove values used only in the type system from imports and exports in files because they aren’t used in runtime JavaScript.**

```typescript
// index.ts
const action = { area: "people", name: "Bella Abzug", role: "politician" };

type ActivistArea = "nature" | "people";

export { action, ActivistArea };
```

compiles to:

```javascript
const action = { area: "people", name: "Bella Abzug", role: "politician" };

export { action };
```

Knowing to remove re-exported types such as that ActivistArea requires knowledge of the TypeScript type system. Transpilers such as Babel that act on a single file at a time don’t have access to the TypeScript type system to know whether each name is only used in the type system.

TypeScript allows adding the `type` modifier in front of individual imported names or the entire object in `export` and `import` declarations. Doing so indicates they’re only meant to be used in the type system.

```typescript
// index.ts
import { type TypeOne, value } from "my-example-types";
import type { TypeTwo } from "my-example-types";
import type DefaultType from "my-example-types";

export { type TypeOne, value };
export type { DefaultType, TypeTwo };
```

compiles to:

```javascript
// index.js
import { value } from "my-example-types";
export { value };
```

```typescript
import { ClassOne, type ClassTwo } from "my-example-types";

new ClassOne(); // Ok

new ClassTwo();
//  ~~~~~~~~
// Error: 'ClassTwo' cannot be used as a value
// because it was imported using 'import type'.
```

## Chapter 15 - Type Operations

### Mapped Types

TypeScript provides syntax for creating a new type based on the properties of another type: in other words, mapping from one type to another. **A mapped type in TypeScript is a type that takes in another type and performs some operation on each property of that type.**

```typescript
type NewType = {
  [K in OriginalType]: NewProperty;
};
```

#### Changing Modifiers

Mapped types can also change the access control modifiers - `readonly` and `?` optionality - on the original type’s members.

```typescript
interface Environmentalist {
  area: string;
  name: string;
}

type ReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]: Environmentalist[K];
};
// Equivalent to:
// {
//   readonly area: string;
//   readonly name: string;
// }

type OptionalReadonlyEnvironmentalist = {
  [K in keyof ReadonlyEnvironmentalist]?: ReadonlyEnvironmentalist[K];
};
// Equivalent to:
// {
//   readonly area?: string;
//   readonly name?: string;
// }
```

Removing modifiers is done by adding a `-` before the modifier in a new type. Instead of writing `readonly` or `?`, you can write `-readonly` or `-?`, respectively.
This Conservationist type contains `?` optional and/or `readonly` members that are made writable in WritableConservationist and then also required in RequiredWritableConservationist:

```typescript
interface Conservationist {
  name: string;
  catchphrase?: string;
  readonly born: number;
  readonly died?: number;
}

type WritableConservationist = {
  -readonly [K in keyof Conservationist]: Conservationist[K];
};
// Equivalent to:
// {
//   name: string;
//   catchphrase?: string;
//   born: number;
//   died?: number;
// }

type RequiredWritableConservationist = {
  [K in keyof WritableConservationist]-?: WritableConservationist[K];
};
// Equivalent to:
// {
//   name: string;
//   catchphrase: string;
//   born: number;
//   died: number;
// }
```

#### Generic Mapped Types

Generic mapped types are frequently useful for representing how data morphs as it flows through an application. For example, it may be desirable for an area of the application to be able to take in values of existing types but not be allowed to modify the data.

```typescript
type MakeReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Species {
  genus: string;
  name: string;
}

type ReadonlySpecies = MakeReadonly<Species>;
// Equivalent to:
// {
//   readonly genus: string;
//   readonly name: string;
// }
```

Another transform developers commonly need to represent is a function that takes in any amount of an interface and returns a fully filled-out instance of that interface.

```typescript
interface GenusData {
  family: string;
  name: string;
}

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
// Equivalent to:
// {
//   family?: string;
//   name?: string;
// }

/**
 * Spreads any {overrides} on top of default values for GenusData.
 */
function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
  return {
    family: "unknown",
    name: "unknown",
    ...overrides,
  };
}
```

Some operations done by generic mapped types are so useful that TypeScript provides utility types for them out-of-the-box. Making all properties optional, for example, is achievable using the built-in `Partial<T>` type. **You can find a list of those built-in types on (here)[https://www.typescriptlang.org/docs/handbook/utility-types.html].**

### Conditional Types

TypeScript’s type system is an example of a logic programming language. It allows creating new constructs (types) based on logically checking previous types. It does so with the concept of a **conditional type: a type that resolves to one of two possible types, based on an existing type**.

```typescript
type CheckStringAgainstNumber = string extends number ? true : false;
```

#### Generic Conditional Types

```typescript
type CallableSetting<T> = T extends () => any ? T : () => T;

// Type: () => number[]
type GetNumbersSetting = CallableSetting<() => number[]>;

// Type: () => string
type StringSetting = CallableSetting<string>;
```

One pattern used by JavaScript libraries that lends itself well to conditional generic types is to change the return type of a function based on an options object provided to the function.

```typescript
interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> =
  Options["throwIfNotFound"] extends true ? string : string | undefined;

declare function retrieve<Options extends QueryOptions>(
  key: string,
  options?: Options
): Promise<QueryResult<Options>>;

// Returned type: string | undefined
await retrieve("Biruté Galdikas");

// Returned type: string | undefined
await retrieve("Jane Goodall", { throwIfNotFound: Math.random() > 0.5 });

// Returned type: string
await retrieve("Dian Fossey", { throwIfNotFound: true });
```

#### Type Distributivity

Conditional types distribute over unions, meaning their resultant type will be a union of applying that conditional type to each of the constituents (types in the union type). In other words, `ConditionalType<T | U>` is the same as `Conditional<T> | Conditional<U>`.

```typescript
type ArrayifyUnlessString<T> = T extends string ? T : T[];

// Type: string | number[]
type HalfArrayified = ArrayifyUnlessString<string | number>;
```

#### Inferred Types

Accessing members of provided types works well for information stored as a member of a type, but it can’t capture other information such as function parameters or return types. Conditional types are able to access arbitrary portions of their condition by using an `infer` keyword within their extends clause. Placing the `infer` keyword and a new name for a type within an extends clause means that new type will be available inside the conditional type’s true case.

```typescript
type ArrayItems<T> = T extends (infer Item)[] ? Item : T;

// Type: string
type StringItem = ArrayItems<string>;

// Type: string
type StringArrayItem = ArrayItems<string[]>;

// Type: string[]
type String2DItem = ArrayItems<string[][]>;
```

Inferred types can work to create recursive conditional types too.

```typescript
type ArrayItemsRecursive<T> = T extends (infer Item)[]
  ? ArrayItemsRecursive<Item>
  : T;

// Type: string
type StringItem = ArrayItemsRecursive<string>;

// Type: string
type StringArrayItem = ArrayItemsRecursive<string[]>;

// Type: string
type String2DItem = ArrayItemsRecursive<string[][]>;
```

#### Mapped Conditional Types

Mapped types apply a change to every member of an existing type. Conditional types apply a change to a single existing type. Put together, they allow for applying conditional logic to each member of a generic template type.

```typescript
type MakeAllMembersFunctions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K];
};

type MemberFunctions = MakeAllMembersFunctions<{
  alreadyFunction: () => string;
  notYetFunction: number;
}>;
// Type: // {
//   alreadyFunction: () => string,
//   notYetFunction: () => number,
// }
```

Mapped conditional types are a convenient way to modify all properties of an existing type using some logical check.

### `never`

#### `never` and Intersections and Unions

Another way of describing the `never` bottom type is that it’s a type that can’t exist. That gives `never` some interesting behaviors with & intersection and | union types:

- `never` in an `&` intersection type reduces the intersection type to just `never`.
- `never` in a `|` union type is ignored.

```typescript
type NeverIntersection = never & string; // Type: never
type NeverUnion = never | string; // Type: string
```

In particular, the behavior of being ignored in union types makes never useful for
filtering out values from conditional and mapped types.

#### `never` and Conditional Types

Generic conditional types commonly use `never` to filter out types from unions. Because `never` is ignored in unions, the result of a generic conditional on a union of types will only be those that are not `never`.

```typescript
type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>;
// Equivalent to: "red" | "blue"
```

`never` is also commonly combined with inferred conditional types when making type utilities for generic types. Type inferences with `infer` have to be in the true case of a conditional type, so if the false case is `never` meant to be used, `never` is a suitable type to put there.

```typescript
type FirstParameter<T extends (...args: any[]) => any> = T extends (
  arg: infer Arg
) => any
  ? Arg
  : never;

type GetsString = FirstParameter<(arg0: string) => void>;
// Type: string
```

#### `never` and Mapped Types

The `never` behavior in unions makes it useful for filtering out members in mapped types too. It’s possible to filter out keys of an object using the following three type system features:

- `never` is ignored in unions.
- Mapped types can map members of types.
- Conditional types can be used to turn types into `never` if a condition is met.

Putting the three of those together, we can create a mapped type that changes each member of the original type either to the original key or to `never`. Asking for the members of that type with `[keyof T]`, then, produces a union of all those mapped type results, filtering out `never`.

```typescript
type OnlyStringProperties<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface AllEventData {
  participants: string[];
  location: string;
  name: string;
  year: number;
}

type OnlyStringEventData = OnlyStringProperties<AllEventData>;
// Equivalent to: "location" | "name"
```

### Template Literal Types

Sometimes, you may want to indicate that a string matches some string pattern: part of the string is known, but part of it is not. Enter _template literal types_, a TypeScript syntax for indicating that a string type adheres to a pattern. They look like template literal strings—hence their name—but with primitive types or unions of primitive types interpolated.

```typescript
type Greeting = `Hello${string}`;

let matches: Greeting = "Hello, world!"; // Ok

let outOfOrder: Greeting = "World! Hello!";
//  ~~~~~~~~~~
// Error: Type '"World! Hello!"' is not assignable to type '`Hello ${string}`'.

let missingAltogether: Greeting = "hi";
//  ~~~~~~~~~~~~~~~~~
// Error: Type '"hi"' is not assignable to type '`Hello ${string}`'.
```

```typescript
type Brightness = "dark" | "light";
type Color = "blue" | "red";

type BrightnessAndColor = `${Brightness}-${Color}`;
// Equivalent to: "dark-red" | "light-red" | "dark-blue" | "light-blue"

let colorOk: BrightnessAndColor = "dark-blue"; // Ok

let colorWrongStart: BrightnessAndColor = "medium-blue";
//  ~~~~~~~~~~~~~~~
// Error: Type '"medium-blue"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.

let colorWrongEnd: BrightnessAndColor = "light-green";
//  ~~~~~~~~~~~~~
// Error: Type '"light-green"' is not assignable to type
// '"dark-blue" | "dark-red" | "light-blue" | "light-red"'.
```

TypeScript allows template literal types to contain any primitives (other than **`symbol`**) or a union thereof: `string`, `number`, `bigint`, `boolean`, `null`, or `undefined`.

```typescript
type ExtolNumber = `much ${number} wow`;
function extol(extolee: ExtolNumber) {
  /* ... */
}

extol("much 0 wow"); // Ok
extol("much -7 wow"); // Ok
extol("much 9.001 wow"); // Ok

extol("much false wow");
//    ~~~~~~~~~~~~~~~~
// Error: Argument of type '"much false wow"' is not
// assignable to parameter of type '`much ${number} wow`'.
```

#### Intrinsic String Manipulation Types

To assist in working with string types, TypeScript provides a small set of intrinsic (meaning: they’re built into TypeScript) generic utility types that take in a string and apply some operation to the string. As of TypeScript 4.7.2, there are four:

- `Uppercase`: Converts a string literal type to uppercase.
- `Lowercase`: Converts a string literal type to lowercase.
- `Capitalize`: Converts a first character of string literal type to uppercase.
- `Uncapitalize`: Converts a first character of string literal type to lowercase.

Each of these can be used as a generic type that takes in a string. For example, using Capitalize to capitalize the first letter in a string:

```typescript
type FormalGreeting = Capitalize<"hello.">; // Type: "Hello."
```

#### Template Literal Keys

Template literal types are a half-way point between the primitive string and string literals, which means they’re still strings. They can be used in any other place where you’d be able to use string literals.

```typescript
type DataKey = "location" | "name" | "year";

type ExistenceChecks = {
  [K in `check${Capitalize<DataKey>}`]: () => boolean;
};
// Equivalent to:
// {
//   checkLocation: () => boolean;
//   checkName: () => boolean;
//   checkYear: () => boolean;
// }

function checkExistence(checks: ExistenceChecks) {
  checks.checkLocation(); // Type:
  boolean checks.checkName(); // Type: boolean
  checks.checkWrong();
  //     ~~~~~~~~~~
  // Error: Property 'checkWrong' does not exist on type 'ExistenceChecks'.
}
```

#### Remapping Mapped Type Keys

TypeScript allows you to create new keys for members of mapped types based on the original members using template literal types. Placing the `as` keyword followed by a template literal type for the index signature in a mapped typed changes the resultant type’s keys to match the template literal type. Doing so allows the mapped type to have a different key for each mapped property while still referring to the original value.

```typescript
interface DataEntry<T> {
  key: T;
  value: string;
}

type DataKey = "location" | "name" | "year";

type DataEntryGetters = {
  [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
// Equivalent to:
// {
//   getLocation: () => DataEntry<"location">;
//   getName: () => DataEntry<"name">;
//   getYear: () => DataEntry<"year">;
// }
```

```typescript
const config = { location: "unknown", name: "anonymous", year: 0 };

type LazyValues = {
  [K in keyof typeof config as `${K}Lazy`]: () => Promise<typeof config[K]>;
};
// Equivalent to:
// {
//   location: Promise<string>;
//   name: Promise<string>;
//   year: Promise<number>;
// }

async function withLazyValues(configGetter: LazyValues) {
  await configGetter.locationLazy; // Resultant type: string

  await configGetter.missingLazy();
  //                 ~~~~~~~~~~~
  // Error: Property 'missingLazy' does not exist on type 'LazyValues'.
}
```

Note that in JavaScript, object keys may be type string or Symbol—and Symbol keys aren’t usable as template literal types because they’re not primitives. If you try to use a remapped template literal type key in a generic type, TypeScript will issue a complaint that symbol can’t be used in a template literal type:

```typescript
type TurnIntoGettersDirect<T> = {
  [K in keyof T as `get${K}`]: () => T[K];
  // ~
  // Error: Type 'keyof T' is not assignable to type
  // 'string | number | bigint | boolean | null | undefined'.
};
// Type 'string | number | symbol' is not assignable to type
// 'string | number | bigint | boolean | null | undefined'.
//   Type 'symbol' is not assignable to type
//   'string | number | bigint | boolean | null | undefined'.
```

To get around that restriction, you can use a string & intersection type to enforce that only types that can be strings are used. Because string & symbol results in never, the whole template string will reduce to never and TypeScript will ignore it:

```typescript
const someSymbol = Symbol("");

interface HasStringAndSymbol {
  StringKey: string;
  [someSymbol]: number;
}

type TurnIntoGetters<T> = {
  [K in keyof T as `get${string & K}`]: () => T[K];
};

type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;
// Equivalent to:
// {
//   getStringKey: () => string;
// }
```

### Type Operations and Complexity

**If you do find a need to use type operations, please—for the sake of any developer who has to read your code, including a future you—try to keep them to a minimum if possible. Use readable names that help readers understand the code as they read it. Leave descriptive comments for anything you think future readers might struggle with.**
