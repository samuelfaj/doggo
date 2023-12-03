
# Estrutura do Projeto

Este documento descreve a estrutura de pastas do projeto, fornecendo orientações sobre como os arquivos devem ser organizados e o propósito de cada diretório.

## Diretórios e Seus Propósitos

### `/configs`
Contém arquivos de configuração globais do projeto, como configurações de banco de dados, variáveis de ambiente e outras configurações essenciais.

### `/definitions`
Agrupa definições centrais utilizadas em todo o projeto:

- **`/abstracts`**: Classes abstratas que servem como base para outras classes.
- **`/dtos`** (Data Transfer Objects): Objetos usados para transferir dados entre camadas, especialmente entre a camada de rede e a de serviço.
- **`/enums`**: Enumerações que definem conjuntos de valores nomeados para uso consistente em todo o projeto.
- **`/interfaces`**: Interfaces que definem contratos para classes ou objetos, garantindo a consistência na implementação.
- **`/types`**: Tipos personalizados e aliases de tipos para uso em todo o projeto.

### `/exceptions`
Contém classes ou métodos de exceção personalizados, utilizados para gerenciar erros e comportamentos excepcionais.

### `/http`
Este diretório lida com tudo relacionado ao protocolo HTTP:

- **`/controllers`**: Controladores que lidam com solicitações HTTP, executam a lógica do negócio e retornam respostas.
- **`/middlewares`**: Middlewares HTTP para processamento de requisições, como autenticação, logging, etc.
- **`/resources`**: Se necessário, inclua representações de recursos, como transformadores de dados ou serializadores.
- **`/routes`**: Definições de rotas que mapeiam URLs para controladores específicos.

### `/models`
Define os modelos de dados, geralmente correspondendo a entidades no banco de dados. Inclui a lógica para consultar e manipular esses dados.

### `/services`
Contém a lógica de negócios e as regras do aplicativo. Os serviços interagem com modelos e realizam operações de negócios, como criação, modificação e consulta de dados.

### `/utils`
Armazena utilitários e funções auxiliares que são reutilizáveis e não se enquadram em outras categorias. Pode incluir funções para data e hora, manipulação de strings, etc

### `Orientações Gerais para Desenvolvedores`

- Coloque os arquivos no diretório correspondente à sua responsabilidade principal.
- Mantenha a consistência na nomenclatura dos arquivos e diretórios.
- Documente claramente qualquer lógica complexa ou não óbvia em comentários no código.
- Revise periodicamente a estrutura do projeto para garantir que ela permaneça limpa e gerenciável.
