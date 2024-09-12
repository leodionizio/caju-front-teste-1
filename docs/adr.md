# Arquitetural Decision Record (ADR)

**Data:** 11 de setembro de 2024

## Contexto

Decidi utilziar algumas bibliotecas de terceiros para algumas funcionalidades com o objetivo de agilizar o desenvolvimento e poder dedicar mais tempo em outras partes como testes, deploy, monitoramento e usabilidade.


## Decisão
As seguintes bibliotecas foram escolhidas:

1. **lodash.debounce**: para realizar `debounce` no campo de busca por cpf na tela inicial.

2. **@fnando/cpf**: Para validação e formatação de CPF.

3. **@react-input/mask**: Adicionar máscara nos inputs de maneira fácil e compatível com o react 18.

4. **react-hook-form**: Gerenciamento de formulários, pois é uma biblioteca bem completa, possibilitando trabalhar com componentes controlados e validações.

5. **@dvcode/react-loading-overlay**: Para aplicar o loader global da aplicação.

6. **Clarity**: Obter insights, mapas de calor, dentre outras várias funcionalidades que ele oferecepara monitoramento da experiencia dos usuários na aplicação.

7. **LogRocket**: Para monitoria de erros de código, essa ferramenta grava a tela antes do usuário tomar o erro, além de possuir várias outras informações sobre a página.

7. **Cypress**: Para gerar os testes e2e dos cenários da aplicação.

## Motivação
Optei pelo uso das bibliotecas para poupar um pouco de tempo e poder me dedicar mais em tarefas mais complexas.

## CSS e Styled Components
Decidi não utilizar uma biblioteca de estilização como material ui, ant design, bootstrap, etc para aproveitar a oportunidade para praticar e me desenvolver um pouco mais no css. 

## Consequências
O uso dessas bibliotecas simplificou o desenvolvimento, reduziu o tempo necessário para resolver tarefas comuns e me possibilitou tempo para me dedicar em tarefas mais complexas.
