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

E em seguida acesse a API pelo endereço: `http://localhost:3333`.

## Detalhes de implementação

O problema dado é relativamente simples, podendo ser resolvido com apenas uma regex, por exemplo. Uma simples requisição com a senha e dando um match nessa senha com uma regex resolve o problema. Porém, essa simplicidade traz alguns problemas futuros, como por exemplo:

- Manutenção: o código ficaria muito engessado, sem uma arquitetura definida. Regex também não é tão simples de lidar e quanto mais complexo, mais difícil de entender e dar manutenção;
- Extensabilidade: adicionar ou remover regras para validação da senha se tornaria um problema, pois teria que reescrever a regex;
- Responsabilidade: o código ficaria com um único ponto cuidando de tudo. Se tornaria difícil de testar, manter, teria baixa coesão e alto acoplamento.

Sendo assim, mesmo sendo um problema simples, optei por utilizar conceitos de OOP, SOLID, o padrão de projeto Builder e uma arquitetura limpa, separando o negócio da implementação e uso de frameworks, e dividi o projeto nas seguintes estruturas de pastas:

- src
  - @types
  - builders (builders do password para adição das regras)
  - container (responsável pela injeção de dependência)
  - domain (responsável pelos entities, values objects e interfaces do domínio)
  - errors (helper de erro)
  - infra (onde fica toda a camada de infraestrutura)
  - rules (regras do password)
  - services (serviços)

A ideia principal é, a qualquer momento, de maneira simples, poder extender as regras de validação com pouco esforço, que além de facilitar a manutenção, facilita os testes e torna o código mais entendível e robusto. Note que ainda sim fiz uso de regex (veja o arquivo `ManagePasswordRules.ts`), porém de forma isolada e simples em cada regra.

## Testes

Foi implementado testes de unidade e integração, utilizando o Jest. Para rodá-los, execute `npm run test`.

## Pontos que daremos maior atenção

- Testes de unidade / integração
- Abstração, acoplamento, extensibilidade e coesão
- Design de API
- Clean Code
- SOLID
- Documentação da solução no _README_

## Pontos que não iremos avaliar

- docker file
- scripts ci/cd
- coleções do postman ou ferramentas para execução

### Sobre a documentação

Nesta etapa do processo seletivo queremos entender as decisões por trás do código, portanto é fundamental que o _README_ tenha algumas informações referentes a sua solução.

Algumas dicas do que esperamos ver são:

- Instruções básicas de como executar o projeto;
- Detalhes sobre a sua solução, gostariamos de saber qual foi seu racional nas decisões;
- Caso algo não esteja claro e você precisou assumir alguma premissa, quais foram e o que te motivou a tomar essas decisões.

## Como esperamos receber sua solução

Esta etapa é eliminatória, e por isso esperamos que o código reflita essa importância.

Se tiver algum imprevisto, dúvida ou problema, por favor entre em contato com a gente, estamos aqui para ajudar.

Nos envie o link de um repo público com a sua solução.
