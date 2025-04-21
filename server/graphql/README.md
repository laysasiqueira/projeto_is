📝 Descrição do Projeto: Sistema de Gestão de Tarefas Multitecnologia 🎯 Objetivo Desenvolver um sistema cliente-servidor que permita a criação, visualização, atualização e eliminação de tarefas, utilizando múltiplas tecnologias de serviços web (SOAP, REST, GraphQL, gRPC), com suporte a importação/exportação de dados nos formatos JSON e XML.

🧩 Funcionalidades Principais (CRUD) Cada tarefa terá os seguintes atributos:

id (string): identificador único

titulo (string): nome da tarefa

descricao (string): detalhe da tarefa

prioridade (string): baixa, média ou alta

estado (string): pendente, em progresso ou concluída

data_criacao (string): data da criação (ISO format)

🔌 Serviços Web Implementados

SOAP Endpoints para criar, ler, atualizar e apagar tarefas
Validação dos dados via XSD

Exportação e importação de tarefas em XML

REST Endpoints RESTful com suporte a:
/tarefas (GET, POST)

/tarefas/{id} (GET, PUT, DELETE)

Validação dos dados via JSON Schema

Consultas com JSONPath

Exportação e importação em JSON

GraphQL Suporte a:
queries: listar tarefas por estado, prioridade, etc.

mutations: criar/atualizar/apagar tarefas

gRPC Serviços unários: obter tarefas, criar, atualizar, apagar
Serviços streaming: obter todas as tarefas em tempo real

🗂️ Armazenamento de Dados Dados persistidos num ficheiro único em JSON

Conversão dinâmica para XML quando necessário

Sem uso de base de dados (seguindo o enunciado)

🔁 Exportação/Importação Exportar todas as tarefas para JSON ou XML

Importar ficheiros com múltiplas tarefas para o sistema

🧪 Testabilidade Todos os endpoints testados e documentados via Postman

Instruções incluídas no README.md

🔧 Tecnologias Utilizadas Python (exemplo) para servidor e cliente

zeep (SOAP), requests (REST), ariadne ou graphene (GraphQL), grpcio (gRPC)

Docker (opcional, mas recomendado)

Serviços separados ou num único container

Orquestração via docker-compose.yml

Este projeto foi realizado para a unidade curricular de Integração de Sistemas. Envolve o uso de tecnologias e padrões de serviços web com foco em integração multiformato e multitecnologia.

Nome: Laysa Siqueira

Curso: Licenciatura em Informática

Ano letivo: 2024/2025