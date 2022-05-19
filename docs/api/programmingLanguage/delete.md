[Go back](../README.md)

# Delete Programming Language

Used to delete a Programming Language.

**URL** : `/api/programmingLanguage/`

**Method** : `DELETE`

**Auth required** : `true`

**Data constraints**

```json
{
	"programmingLanguageID": "[programmingLanguageID]"
}
```

**Data example**

```json
{
	"programmingLanguageID": "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"message": "Language deleted"
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
