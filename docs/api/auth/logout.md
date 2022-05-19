[Go back](../README.md)

# Logout user

Used to logout a user.

**URL** : `/api/auth/logout/`

**Method** : `GET`

**Auth required** : `true`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"message": "Logout Successful"
}
```

### Unknown error.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
	"success": false,
	"error": "",
	"message": "Logout Failed"
}
```

**_Note:_** The error message is not specified in the documentation.
