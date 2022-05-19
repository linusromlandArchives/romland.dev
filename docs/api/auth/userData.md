[Go back](../README.md)

# Get User Information

Used to retrieve all information about the authenticated user.

**URL** : `/api/auth/`

**Method** : `GET`

**Auth required** : `true`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"user": {
		"userID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx",
		"username": "admin",
		"createdAt": "1970-01-01T00:00:00.000Z",
		"updatedAt": "1970-01-01T00:00:00.000Z"
	}
}
```

## Error Response

### If user is not authorized.

**Code** : `401 Unauthorized`

**Content** :

```json
{
	"success": false,
	"error": "Unauthorized",
	"user": null
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
