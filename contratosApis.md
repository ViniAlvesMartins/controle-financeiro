# Contratos das APIs

## Endpoint:

### baseUrl: https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1

## Authorizer

### Header : api_key = "aXRhw7o="

## Entidades

- [Categorias](#categorias)
- [Subcategorias](#subcategorias)
- [Lançamentos](#lançamentos)

## Serviço

- [Balanço](#balanço)
- [Autenticação](#autenticação)

## Categorias

- [Criar Categoria](#criar-categoria)
- [Listar Categorias](#listar-categoria)
- [Obter Categoria](#obter-categoria)
- [Atualizar Categoria](#atualizar-categoria)
- [Deletar Categoria](#deletar-categoria)

---

## Criar Categoria

```
POST https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/categories
```

### Body:

```
{
	"name": "Saúde"
}
```

### Responses:

```
status: 200 OK

{
	"data": {
		"categoryId": 1,
		"name": "Saúde"
	}
}
```

```
status: 303 See Other

{
	"data": {
		"code": "valor_existente",
		"message": "Categoria Saúde já existe"
	}
}
```

---

## Listar Categoria

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/categories
```

### QueryParams:

```
"name": "Saúde"
```

### Responses:

```
status: 200 OK

{
	"data": [
		{
			"categoryId": 1,
			"name": "Saúde"
		},
		{
			"categoryId": 2,
			"name": "Alimentação"
		}
	]
}
```

```
status: 400 Bad Request

{
	"data": []
}
```

---

## Obter Categoria

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/categories/{categoryId}
```

### PathParams:

```
"categoryId": 1
```

### Responses:

```
status: 200 OK

{
	"data": {
		"categoryId": 1,
		"name": "Saúde"
	}
}
```

```
status: 400 Bad Request

{
	"data": {}
}
```

```
status: 400 Bad Request

{
	"error": [
		{
			"code": "erro_validacao",
			"message": "O campo 'categoryId' tem que ser do tipo númerico",
			"field": "categoryId"
		}
	]
}
```

---

## Atualizar Categoria

```
PUT https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/categories/{categoryId}
```

### PathParams:

```
"categoryId": "Saúde"
```

### Body:

```
{
	"name": "Hospital"
}
```

### Responses:

```
status: 200 OK

{
	"data": {
		"categoryId": 1,
		"name": "Hospital"
	}
}
```

```
status: 303 See Other

{
	"data": {
		"code": "valor_existente",
		"message": "Categoria Saúde já existe"
	}
}
```

```
status: 400 Bad Request

{
	"error": [
		{
			"code": "erro_validacao",
			"message": "O campo 'categoryId' tem que ser do tipo númerico",
			"field": "categoryId"
		}
	]
}
```

---

## Deletar Categoria

```
DELETE https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/categories/{categoryId}
```

### PathParams:

```
"categoryId": 1
```

### Responses:

```
status: 200 OK

{
	"data": {
		"success": true
	}
}
```

```
status: 400 Bad Request

{
	"data": {
		"code": "valor_inexistente",
		"message": "Categoria com categoriyId: 2 não existe"
	}
}
```

```
status: 400 Bad Request

{
	"error": [
		{
			"code": "erro_validacao",
			"message": "O campo 'categoryId' tem que ser do tipo númerico",
			"field": "categoryId"
		}
	]
}
```

---

## Subcategorias

- [Criar Subcategoria](#criar-subcategoria)
- [Listar Subcategorias](#listar-subcategoria)
- [Obter Subcategoria](#obter-subcategoria)
- [Atualizar Subcategoria](#atualizar-subcategoria)
- [Deletar Subcategoria](#deletar-subcategoria)

---

## Criar Subcategoria

```
POST https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/subcategories
```

### Body:

```
{
	"categoryId": 1,
	"name":  "Farmácia"
}
```

### Responses:

```
status: 200 OK

{
	"data": {
		"subcategoryId":  6,
		"category":  {
			"categoryId":  1,
			"name":  "Saúde"
		},
		"name":  "Farmácia"
	}
}
```

```
status: 303 See Other

{
	"data":  {
		"code":  "valor_existente",
		"message":  "Subcategoria Farmácia já existe para a categoria Saúde"
	}
}
```

```
status: 400 Bad Request
{
	"data":  {
		"code":  "valor_inexistente",
		"message":  "Categoria com categoryId: 1 não existe"
	}
}
```

```
status: 400 Bad Request
{
	"data":  {
		"code":  "erro_validacao",
		"message":  "O campo 'categoryId' tem que ser do tipo númerico",
		"field":  "categoryId"
	}
}
```

---

## Listar Subcategoria

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/subcategories
```

### QueryParams:

```
"name": "Farmácia"
```

### Responses:

```
status: 200 OK

{
	"data":  [
		{
			"subcategoryId":  1,
			"name":  "Farmácia",
			"category":  {
				"categoryId":  1,
				"name":  "Saúde"
			}
		}
	]
}
```

```
status: 400 Bad Request

{
	"data": []
}
```

---

## Obter Subcategoria

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/subcategories/{subcategoryId}
```

### PathParams:

```
"subcategoryId": 1
```

### Responses:

```
status: 200 OK

{
	"data":  {
		"subcategoryId":  1,
		"name":  "Farmácia",
		"category":  {
			"categoryId":  1,
			"name":  "Saúde"
		}
	}
}
```

```
status: 400 Bad Request

{
	"data": {}
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'subcategoryId' tem que ser do tipo númerico",
			"field":  "subcategoryId"
		}
	]
}
```

---

## Atualizar Subcategoria

```
PUT https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/subcategories/{subcategoryId}
```

### PathParams:

```
"subcategoryId": "1"
```

### Body:

```
{
	"name": "Hospital",
	"categoryId": 1
}
```

### Responses:

```
status: 200 OK

{
	"data":  {
		"subcategoryId":  1,
			"category":  {
				"categoryId":  1,
				"name":  "Saúde"
			},
		"name":  "Hospital"
	}
}
```

```
status: 303 See Other

{
	"data":  {
		"code":  "valor_existente",
		"message":  "Subcategoria com categoryId: 1 e name Hospital já existe"
	}
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'subcategoryId' tem que ser do tipo númerico",
			"field":  "subcategoryId"
		}
	]
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'categoryId' tem que ser do tipo númerico",
			"field":  "categoryId"
		}
	]
}
```

---

## Deletar Subcategoria

```
DELETE https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/succategories/{subcategoryId}
```

### PathParams:

```
"subcategoryId": 1
```

### Responses:

```
status: 200 OK

{
	"data":  {
		"success":  true
	}
}
```

```
status: 400 Bad Request

{
	"data": {
		"code":  "valor_inexistente",
		"message":  "Categoria com subcategoriyId: 2 não existe"
	}
}
```

```
status: 400 Bad Request

{
	"data":  {
		"code":  "valor_inexistente",
		"message":  "Existe lançamento para a subcategoryId: 1"
	}
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'subcategoryId' tem que ser do tipo númerico",
			"field":  "subcategoryId"
		}
	]
}
```

## Lançamentos

- [Criar Lançamento](#criar-lançamento)
- [Listar Lançamentos](#listar-lançamento)
- [Obter Lançamento](#obter-lançamento)
- [Atualizar Lançamento](#atualizar-lançamento)
- [Deletar Lançamento](#deletar-lançamento)

---

## Criar Lançamento

```
POST https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/releases
```

### Body:

```
{
  "value": -45.50,
  "date": "2021/08/11",
  "subcategoryId": 1,
  "comment": "compra de remédio"
}
```

### Responses:

```
status: 200 OK

{
  "data": {
    "releaseId": 1,
    "date": "2021-08-11T03:00:00.000Z",
    "value": -45.5,
    "comment": "compra de remédio",
    "subcategory": {
        "subcategoryId": 1,
        "name": "Farmácia",
        "category": {
            "categoryId": 1,
            "name": "Saúde"
        }
    }
  }
}
```

```
status: 400 Bad Request
{
  "error": [
    {
      "code": "erro_validacao",
      "message": "O campo 'valor' é obrigatório",
      "field": "valor"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'subcategoryId' tem que ser do tipo númerico",
      "field": "subcategoryId"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'valor' é obrigatório",
      "field": "valor"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'subcategoryId' tem que ser do tipo númerico",
      "field": "subcategoryId"
    }
  ]
}
```

---

## Listar Lançamento

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/releases
```

### QueryParams:

```
"startDate": "2021/08/05"
"endDate": "2021/08/12"
"subcategoryId": 1
```

### Responses:

```
status: 200 OK

{
	"data":  [
    {
      "releaseId": 1,
      "date": "2021-08-11T03:00:00.000Z",
      "value": -45.5,
      "comment": "compra de remédio",
      "subcategory": {
        "subcategoryId": 1,
        "name": "Farmácia",
        "category": {
          "categoryId": 1,
          "name": "Saúde"
        }
      }
    }
	]
}
```

```
status: 400 Bad Request

{
  "error": [
    {
      "code": "erro_validacao",
      "message": "A 'startDate' deve ser menor que a 'endDate'",
      "field": "endDate"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'endDate' é inválido",
      "field": "endDate"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'startDate' é inválido",
      "field": "startDate"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'subcategoryId' tem que ser do tipo númerico",
      "field": "subcategoryId"
    }
  ]
}
```

---

## Obter Lançamento

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/releases/{releaseId}
```

### PathParams:

```
"releaseId": 1
```

### Responses:

```
status: 200 OK

{
	"data":{
    "releaseId": 1,
    "date": "2021-08-11T03:00:00.000Z",
    "value": -45.5,
    "comment": "compra de remédio",
    "subcategory": {
      "subcategoryId": 1,
      "name": "Farmácia",
      "category": {
        "categoryId": 1,
        "name": "Saúde"
      }
    }
  }
}
```

```
status: 400 Bad Request

{
	"data": {}
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'releaseId' tem que ser do tipo númerico",
			"field":  "releaseId"
		}
	]
}
```

---

## Atualizar Lançamento

```
PUT https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/releases/{releaseId}
```

### PathParams:

```
"releaseId": "1"
```

### Body:

```
{
  "value": 45.50,
  "date": "2021/08/11",
  "subcategoryId": 1,
  "comment": "venda de remédio"
}
```

### Responses:

```
status: 200 OK

{
  "data":{
    "releaseId": 1,
    "date": "2021-08-11T03:00:00.000Z",
    "value": 45.5,
    "comment": "compra de remédio",
    "subcategory": {
	    "subcategoryId": 1,
	    "name": "Farmácia",
	    "category": {
		  "categoryId": 1,
		  "name": "Saúde"
      }
    }
  }
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
			"code":  "erro_validacao",
			"message":  "O campo 'subcategoryId' tem que ser do tipo númerico",
			"field":  "subcategoryId"
		}
	]
}
```

```
status: 400 Bad Request

{
	"error":  [
    {
      "code": "erro_validacao",
      "message": "O campo 'releaseId' tem que ser do tipo númerico",
      "field": "releaseId"
    },

	]
}
```

---

## Deletar Lançamento

```
DELETE https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/releases/{releaseId}
```

### PathParams:

```
"releaseId": 1
```

### Responses:

```
status: 200 OK

{
	"data":  {
		"success":  true
	}
}
```

```
status: 400 Bad Request

{
	"data": {
		"code":  "valor_inexistente",
		"message": "Lançamento com releaseId: 1 não existe"
	}
}
```

```
status: 400 Bad Request

{
	"error":  [
		{
      "code": "erro_validacao",
      "message": "O campo 'releaseId' tem que ser do tipo númerico",
      "field": "releaseId"
		}
	]
}
```

## Balanço

- [Obter Balanços](#obter-balanços)

---

## Obter Balanços

```
GET https://zy92hy747i.execute-api.us-east-2.amazonaws.com/prod/api/v1/balances
```

### QueryParams:

```
"startDate": "2021/08/05"
"endDate": "2021/08/12"
"categoryId": 1
```

### Body:

```
{
  "value": -45.50,
  "date": "2021/08/11",
  "subcategoryId": 1,
  "comment": "compra de remédio"
}
```

### Responses:

```
status: 200 OK

{
  "data": [
    {
      "expense": 0,
      "revenue": 45.5,
      "balance": 45.5,
      "category": {
          "categoryId": 1,
          "name": "Hospital"
      }
    }
  ]
}
```

```
status: 400 Bad Request
{
  "error": [
    {
      "code": "erro_validacao",
      "message": "O campo 'startDate' é inválido",
      "field": "startDate"
    },
    {
      "code": "erro_validacao",
      "message": "O campo 'endDate' é inválido",
      "field": "endDate"
    }
  ]
}
```

---

## Autenticação

```
status: 403 Forbidden
{
	"message": "Missing Authentication Token"
}

```

```
status: 401 Unauthorized
{
	"message": "Unauthorized"
}

```
