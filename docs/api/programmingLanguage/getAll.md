[Go back](../README.md)

# Get all Programming Languages

Used to retrieve all Programming Languages.

**URL** : `/api/programmingLanguage/`

**Method** : `GET`

**Auth required** : `false`

## Available parameters

All parameters are sent as query string parameters.

-   `ids` - Will only return programming languages with the given ids.

**_Note:_** The `ids` parameter is a comma separated list of unique ids.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"data": []
}
```

**_Note:_** All Programming Languages are returned in the `data` key.

## Error Response

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
