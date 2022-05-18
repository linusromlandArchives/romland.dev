# Romland.Dev API Documentation

## Base URL

The base URL for the API is `http://romland.dev/`.
All endpoints are relative to this base URL.

## Default Endpoint Response

All endpoints return a JSON response with the following structure:

```
{
	"success": true,
	"error": "",
	"data": ["DATA_TO_BE_RETURNED"]
}
```

Here, _`success`_ is either `true` or `false`.
<br>
If _`success`_ is `true`, `error` is empty and the request was successful. Data is returned in `data`.
<br>
If _`success`_ is `false`, `error` contains the error message. Data is not returned.

_Note:_ The data returned is not guaranteed to be returned with the key `data`. Check the endpoint documentation for more information.

## Open Endpoints

Open endpoints require no Authentication.

-   [Project](project/getAllProjects.md) : `GET /api/project/`
-   [Login](auth/login.md) : `GET /api/auth/login/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token is automatically set when a user logs in.

### User related

Each endpoint manipulates or displays information related to the user whose token is provided with the request:

-   [User Information](user/get.md) : `GET /api/auth/`
-   [Logout](auth/logout.md) : `POST /api/auth/logout/`

### Project related

Endpoints for viewing and manipulating the project that the authenticated user
has permissions to access.

-   [Create Project](project/create.md) : `POST /api/project/`
