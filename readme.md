# To Do List

Aplicativo criado para listagem de tarefas [Back-end apenas] para o processo seletivo da Codex.

O aplicativo conta com Criação, Login, Atualização e Remoção de usuário do banco de dados e com Criação, Listagem, Remoção e Atualização dos objectos Todo, que comportam as tarefas registradas pelo usuário.

# Baixar

Rode o comando:

```
git clone https://github.com/Adriano-Porto/to-do-list.git
```

```
cd to-do-list
```

Para acessar o código da aplicação
Baixe as depedências do código com:
```
npm install
```
E incialize a aplicação com:
```
npm start
```
Caso não funcione, execute o comando
```
npm install express-async-errors bcrypt
```

# Tecnologias Utilizadas

Foi utilizado Node.js 18.15.0 como ambiente de execução dessa aplicação, junto com Express para as rotas REST, MongoDB como banco de dados, PrismaORM para iteragir com o banco de dados e Bcrypt para criptografia de senhas.

# Rotas

Porta padrão do projeto: 8080

## Rotas de Usuário

### POST Criação de Usuário:

    Rota: /user/create  
    Estrutura:  
    
    {
        "name": "teste",  
        "password": "teste",  
        "email": "teste@teste.com",  
        "gender": "male",  
        "photo": "www.photo.com",  
        "age": "21"  
    }

### GET Logar Usuário

    Rota: /user/login  
    Estrutura:  
    
    {
        "email": "teste@teste.com",
        "password": "teste"
    }

### PATCH Atualizar Usuário

    Rota: /user/edit
    Estrutura:
    {
	"userId": "6505f947822c71b698fd7c0c",
	"password": "teste75",
	"editObj": {
		"password": "abcdefg",
		"age": "120",
		"gender": "teste"
        }
    }
    Onde as propriedades de editObj são as que serão alteradas do objeto Usuário, essas propriedades podem ser: name, password, email, gender, photo e age.

### DELETE Remover Usuário

    Rota: /user/delete
    Estrutura:
    {
	    "userId": "65065d9e3003b29c4c330ef7",
        "password": "teste75"
    }
    
    Essa rota remove o Usuário e todos os "Todos" relacionados a ele
    
## Todo

### POST Criar Todo:

    Rota: /todo/create  
    Estrutura:  

    {
        "userId": "64fb5dcd8cf24a08b1cd4876",
        "title": "Teste",
        "created_at": "2023-09-08T18:10:00.544Z",
        "end_at": "2023-09-09T18:10:00.000Z",
        "completed": false
    }

### GET Listagem por userId:

    Rota: /todo/list
    Estrutura:
    
    {
	    "userId": "64fb5dcd8cf24a08b1cd4876"
        "completed": false 
    }
    
    O elemento "completed" pode ser omitido para retornar os Todos que foram completados e que não o foram

### DELETE Remover Todo:

    Rota: /todo/delete
    Estrutura:
    {
	    "id": "65065d9e3003b29c4c330ef7"
    }

### PATCH Atualizar Todo:

    Rota: /todo/edit
    Estrutura:
    {
	"id": "65065d9e3003b29c4c330ef7",
	"editObj": {
		"title": "this title was edited"
	    }
    }
    
    Mais uma vez o editObj contém as variáveis para serem editadas, essas podem ser title, created_at, end_at e completed