# Description

Consider a valid password when it has the following standards:

- Nine or more characters
- At least 1 digit
- At least 1 lowercase letter
- At least 1 capital letter
- At least 1 special character
  - Consider the following characters as special: !@#$%^&\\*()-+
- Do not have repeated characters within the set

Example:

```c#
IsValid("") // false
IsValid("aa") // false
IsValid("ab") // false
IsValid("AAAbbbCc") // false
IsValid("AbTp9!foo") // false
IsValid("AbTp9!foA") // false
IsValid("AbTp9 fok") // false
IsValid("AbTp9!fok") // true
```

> **_Additional note:_** Blank spaces should not be considered as valid characters.

## Problem

Build an application that exposes a web api that validates that a password is valid.  

Input: A password (string).  
Output: A boolean indicating whether the password is valid.  

## Usage

The project is built based on the microservice architecture, use the docker-compose to run the application quickly and with a minimum of configuration.

Run:

`docker-composer up --build`

The API will be open on port 3333.

It contains only one route:

`POST /password-validator/validate `

That receives a JSON with the attribute ` password`.

For example:

```

POST /password-validator/validate

{
   "password": "Senha inválida"
}

```

And it returns only ` true` or ` false`.

## The solution

The given problem is relatively simple and can be solved with just one regex, for example. A simple request with the password and matching that password with a regex solves the problem. However, this simplicity brings some future problems, such as:

- **Maintenance**: the code would be very plastered, without a defined architecture. Regex is also not so simple to deal with and the more complex it is, the more difficult to understand and maintain;
- **Extensibility**: adding or removing rules for password validation would become a problem, as it would have to rewrite the regex;
- **Responsibility**: the code would have a single point taking care of everything. It would be difficult to test, maintain, have low cohesion and tight coupling.

So, even though it is a simple problem, I chose to use concepts of OOP, SOLID, the Builder design pattern and a clean architecture, separating the business from the implementation and the use of frameworks, and divided the project into the following folder structures:

```

- src
  - @types
  - builders (password builders for adding rules)
  - container (responsible for the dependency injection)
  - domain (responsible for entities, values objects and interfaces of the domain)
  - errors (error helper)
  - infra (where is the entire infrastructure layer)
  - rules (password rules)
  - services

```

The main idea is, at any time, in a simple way, to be able to extend the validation rules with little effort, which in addition to facilitating maintenance, facilitates testing and makes the code more understandable and robust. Note that I still used regex (see the `ManagePasswordRules.ts` file), but in an isolated and simple way in each rule.

## Tests

Unit and integration tests were implemented using Jest. To run them, run `npm run test`.
