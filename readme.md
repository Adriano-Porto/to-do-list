## Back-End

### Rotas

Porta Padrão: 3000

#### Usuário
Criação:
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

Logar:
    Rota: /user/login  
    Estrutura:  
    
    {
        "email": "teste@teste.com",
        "password": "teste"
    }

#### Todo
Criação:
    Rota: /todo/create  
    Estrutura:  

    {
        "userId": "64fb5dcd8cf24a08b1cd4876",
        "title": "Teste",
        "created_at": "2023-09-08T18:10:00.544Z",
        "end_at": "2023-09-09T18:10:00.000Z",
        "completed": false
    }

Listagem por userId:
    Rota: /todo/list
    Estrutura:
    
    {
	    "userId": "64fb5dcd8cf24a08b1cd4876"
        "completed": false 
    }
    
    obs: "completed" vai fornecer apenas os que satisfaçam os valores de completed, pode ser omitido.

