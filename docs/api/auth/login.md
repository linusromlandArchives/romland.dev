[Go back](../README.md)

# Login

Used to authenticate a user and generate a token.

**URL** : `/api/auth/login/`

**Method** : `POST`

**Auth required** : `false`

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
	"username": "admin",
	"password": "12345"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"message": "Login Successful"
}
```

## Error Response

### If `username` and `password` are not provided.

**Code** : `401 Unauthorized`

**Content** :

```json
{
	"success": false,
	"error": "Missing credentials"
}
```

### If `username` or `password` is wrong.

**Code** : `401 Unauthorized`

**Content** :

```json
{
	"success": false,
	"error": "Incorrect username or password."
}
```

### Unknown error.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
	"success": false,
	"error": ""
}
```

**_Note:_** The error message is not specified in the documentation.
