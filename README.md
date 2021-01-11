# Descrição

Considere uma senha sendo válida quando a mesma possuir as seguintes definições:

- Nove ou mais caracteres
- Ao menos 1 dígito
- Ao menos 1 letra minúscula
- Ao menos 1 letra maiúscula
- Ao menos 1 caractere especial
  - Considere como especial os seguintes caracteres: !@#$%^&\*()-+
- Não possuir caracteres repetidos dentro do conjunto

Exemplo:

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

> **_Nota:_** Espaços em branco não devem ser considerados como caracteres válidos.

## Problema

Construa uma aplicação que exponha uma api web que valide se uma senha é válida.

Input: Uma senha (string).  
Output: Um boolean indicando se a senha é válida.

Embora nossas aplicações sejam escritas em Kotlin e C# (.net core), você não precisa escrever sua solução usando elas. Use a linguagem de programação que considera ter mais conhecimento.

## Uso

O projeto está construido com base na arquitetura de microsserviço, utilize o docker-compose para subir a aplicação de forma rápida e com o mínimo de configuração.

Execute:

`docker-composer up --build`

A API estará aberta na porta 3333.

Ela contém apenas uma rota: 

``POST /password-validator/validate ``  

Que recebe um JSON com o atributo ``password``.

Por exemplo:

```

POST /password-validator/validate

{
   "password": "Senha inválida"
}

```

E retorna apenas ``true`` ou ``false``.

## Detalhes de implementação

O problema dado é relativamente simples, podendo ser resolvido com apenas uma regex, por exemplo. Uma simples requisição com a senha e dando um match nessa senha com uma regex resolve o problema. Porém, essa simplicidade traz alguns problemas futuros, como por exemplo:

- Manutenção: o código ficaria muito engessado, sem uma arquitetura definida. Regex também não é tão simples de lidar e quanto mais complexo, mais difícil de entender e dar manutenção;
- Extensabilidade: adicionar ou remover regras para validação da senha se tornaria um problema, pois teria que reescrever a regex;
- Responsabilidade: o código ficaria com um único ponto cuidando de tudo. Se tornaria difícil de testar, manter, teria baixa coesão e alto acoplamento.

Sendo assim, mesmo sendo um problema simples, optei por utilizar conceitos de OOP, SOLID, o padrão de projeto Builder e uma arquitetura limpa, separando o negócio da implementação e uso de frameworks, e dividi o projeto nas seguintes estruturas de pastas:

```
- src
  - @types
  - builders (builders do password para adição das regras)
  - container (responsável pela injeção de dependência)
  - domain (responsável pelos entities, values objects e interfaces do domínio)
  - errors (helper de erro)
  - infra (onde fica toda a camada de infraestrutura)
  - rules (regras do password)
  - services (serviços)

```

A ideia principal é, a qualquer momento, de maneira simples, poder extender as regras de validação com pouco esforço, que além de facilitar a manutenção, facilita os testes e torna o código mais entendível e robusto. Note que ainda sim fiz uso de regex (veja o arquivo `ManagePasswordRules.ts`), porém de forma isolada e simples em cada regra.

## Testes

Foi implementado testes de unidade e integração, utilizando o Jest. Para rodá-los, execute `npm run test`.
