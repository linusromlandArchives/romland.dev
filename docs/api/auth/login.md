# Login

Used to authenticate a user and generate a token.

**URL** : `/api/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
	"username": "[valid username]",
	"password": "[password in plain text]"
}
```

**Data example**

```json
{
	"username": "adminUsernames",
	"password": "adminPassword"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"user": "USER_OBJECT",
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
	"success": false,
	"error": "Username or password is incorrect",
}
```
