---
title: "Designing APIs with Swagger and OpenAPI"
date: "2022-09-05"
urls:
  - https://enki.fra1.digitaloceanspaces.com/Designing%20APIs%20with%20Swagger%20and%20OpenAPI.pdf
---

# Designing APIs with Swagger and OpenAPI

## 1 - Introducing APIs and OpenAPI

- OpenAPI is a specification for describing HTTP-based APIs, most notably RESTful APIs.
- Swagger is a term that refers to a set of tools by SmartBear. It used to refer to the OpenAPI specification itself and is sometimes still used that way.
- Describing APIs by writing a definition (a YAML file) allows you to leverage tools to automate a lot of API-related processes.
- OpenAPI is useful for consumers, producers, and API designers. Each can benefit from knowing and utilizing tools that consume OpenAPI definitions.

#### Example OpenAPI document:

```yaml
openapi: 3.0.0
info:
  title: Dog API
  version: 1.0.0
servers:
  - url: https://dog.ceo/api
paths:
  /breed/{breedName}/images:
    get:
      description: Get images of dog breeds
      parameters:
        - in: path
          name: breedName
          schema:
            type: string
            example: hound
          required: true
      responses:
        "200":
          description: A list of dog images
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: success
                  message:
                    type: array
                    items:
                      type: string
```

This is what we know based now:

- The API is hosted at https://dog.ceo/api.
- There is a GET operation with the path `/breed/{breedName}/images`.
- This path has a part called `breedName`, and it is a required string.
- A successful response will give us a JSON array where each item is an object containing message and status fields.
- The message field is an array of strings that are URLs of dog images.

> HTTP requests can be written by hand using tools such as telnet for HTTP and OpenSSL for HTTPS.

The difference between formal and informal descriptions is whether they follow strict rules (a specification). A formal description can be more readily consumed by software, whereas informal descriptions cannot.
OpenAPI is a formal specification for describing HTTP-based APIs. An OpenAPI definition is a YAML (or JSON) file that describes an HTTP API.

**OpenAPI only supports the "JSON schema" flavor of YAML, which means it only supports the data types that JSON supports, and nothing more.**

The smallest valid OpenAPI definition includes the following fields:

- `openapi` (version of the specification),
- `info` (metadata of the API), and
- `paths` (where our operations are defined).

The `info` field has two child fields:

- `title` (human-friendly name of the API) and
- `version` (ersion of the API definition)

```yaml
openapi: 3.0.0
info:
  version: v1
  title: FarmStall API

paths: {}
```

## 5 - HTTP responses

When describing a response in OpenAPI, you’ll need at least a status code and a description.
If there is a response body, it must include at least one media type (such as `application/json`).

### Status code categories

| Range | Category      | Notes                                                                                |
| ----- | ------------- | ------------------------------------------------------------------------------------ |
| 1xx   | Informational | The most common is when a websocket connection is upgraded.                          |
| 2xx   | Success       | This indicates some form of success, like the general 200 or the 201 for "created."  |
| 3xx   | Redirects     | The resource has a different location/URI.                                           |
| 4xx   | Client error  | The client did something wrong, like misspell a resource or provide invalid details. |
| 5xx   | Server error  | The server hit an error that isn’t a fault of the client.                            |

## 7 - Authentication and authorization

> Authentication is about proving you are who you say you are, which could be done with a username and password.

> Authorization is about being allowed access to particular actions or resources, such as getting user details or creating a new review.

```yaml
openapi: 3.0.0
  #...
  paths:
    /reviews:
      post:
        #...
        security:
          - MyUserToken: []
#...
components:
  securitySchemes:
    MyUserToken:
      type: apiKey
      in: header
      name: Authorization
```

The `security` field declares which security schemes apply for this operation. **The semantics of OpenAPI are a logical OR, meaning that as long as one of the listed securities is applied, it is considered acceptable.**

Only one of the security schema requirements (under the `security` keyword) needs to be satisfied, and an empty object indicates no requirements:

```yaml
paths:
  /reviews:
    post:
      #...
      security:
        - {}
        - MyUserToken: []
```

OpenAPI 3.0.x supports four categories of securities:

- `apiKey`
- `http`
- `oauth2`
- ``

- `http` — The `http` type is for the HTTP Basic authentication scheme, which describes how to send a username and password through the Authorization HTTP header. It is specified in [RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617). Just like `apiKey`, `http` doesn’t use scopes.
- `oauth2` — The `oauth2` type is for the OAuth 2.0 protocol, which describes a process for delegated authentication. If you’ve ever been to a website and they asked you to log in with a third-party account (like Google or Facebook), you’ve experienced what’s often called the "OAuth dance." And if the third-party account asked you which information you wanted to share (such as your name and email), those are the _scopes_ that the API providers allow the API consumer to access. You can think of scopes as capabilities that are granted to a user of an API. After "dancing" between two websites, the API provider hands out a bearer access token that the API consumer can send through the Authorization HTTP header. OAuth is specified in [RFC 6749](https://datatracker.ietf.org/ doc/html/rfc6749), and there’s also a great website at [oauth.net](https://oauth.net/).
- `openIdConnect` — The `openIdConnect` type is for the OpenID Connect protocol, which itself is an extension of OAuth 2.0.

### Adding metadata

```yaml
openapi: 3.0.3
info:
  version: v1
  title: FarmStall API
  description: |-

    An API for writing reviews about your favourite (or worst) farm stalls.

    ![Picture of produce](https://farmstall.designapis.com/img/produce-banner.jpg)

    ---

    # Auth

    To create **Reviews** without being _anonymous_. You need to add a **MyUserToken** to the `Authorization` header.

    To get a **MyUserToken**:
    1. Create a **User** with [POST /users](#Users/post_users)
    1. Get a **MyUserToken** by calling [POST /tokens](#Users/post_tokens) with your **User** credentials.

    # Reviews
    Reviews are the heart of this API. <br/>
    Registered **Users** and anonymous users can both write reviews based on their experience at farm stalls. <br/>

    Each review comes with a rating of between one and five stars inclusive.

    - One star being the worst experience
    - Five stars being the best


    ### Example Reviews

      "A wonderful time!" &mdash; Bob McNally
      <br/>
      ![5 stars](https://farmstall.designapis.com/img/rating-5.png)

      "An awful place" &mdash; _Anonymous_
      <br/>
      ![1 star](https://farmstall.designapis.com/img/rating-1.png)

      "A totally average place." &mdash; Jane Fair
      <br/>
      ![3 stars](https://farmstall.designapis.com/img/rating-3.png)

  contact:
    name: Josh Ponelat
    email: jponelat+daso@gmail.com
    url: https://farmstall.designapis.com
  license:
    url: https://www.apache.org/licenses/LICENSE-2.0
    name: Apache 2.0
externalDocs:
  url: https://farmstall.designapis.com
  description: Hosted docs
```

### Referencing common schemas

```yaml
# ...
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        email:
          type: string
        password:
          type: string
        full_name:
          type: string
        roles:
          type: array
          items:
            type: string
```

## 18 - Supporting the unhappy path: Error handling with problem+json

The OpenAPI definition of an API is a contract that both sides, client and server, have to follow. If you look outside the field of technology and into contracts as legal documents, you’ll notice that they don’t just describe the happy path. In fact, the greater part of the legalese in the document usually describes all the potential problems and how to mitigate them. It’s when things go wrong that con- tracts are the most relevant. Error handling is equally important.

The frontend developer is both the first user of the frontend and the first consumer of the backend developer’s API. If something goes wrong while they’re testing the application, they have to ask themselves a few questions:

- Did I do something wrong as a user?
- Is there a bug within my code that I have to fix?
- Is there a bug in the backend API? Does it behave differently from the mock server I used before, and do I have to report that to the backend developer?

Without error handling, it is difficult for the frontend developer to answer these questions, so they get stuck and waste additional time debugging. To solve this problem and get the developer (or any API consumer) unstuck, error handling is already essential during development and shouldn’t be an afterthought.

### Error categories

If we look at interactions with APIs, we can find three general types of errors:

- **Client errors** — The user made a request that the API doesn’t understand or cannot fulfill, such as a call to an undefined API operation, a request for a nonexistent resource, an invalid authentication, or a request body that doesn’t conform to the schema that the operation requires.
- **Server errors** — The user made a perfectly valid API request, but something is wrong with the API itself or its underlying infrastructure. For example, perhaps there is a lack of server-side resources like memory, an unavailable dependency like a database, or a bug in the (server-side) code.
- **Network errors** — The transmission of the API request or API response between client and server failed.

We can identify four major groups of client errors:

- Structurally invalid inputs, such as missing fields or malformed data `400 Bad request`
- Semantically invalid inputs, such as a user trying to register when they’ve already registered `400 Bad request`
- Requests for resources that don’t exist `404 Not found`
- Permission issues (wrong user role or missing access grants) `403 Forbidden`

We can also recognize patterns concerning the type of API operations where these errors occur.

- Invalid input errors can happen in every write operation that requires a request body — operations that use the `POST`, `PUT`, or `PATCH` methods. They also occur in `GET` requests that support query parameters.
- Nonexistent resources are common errors for individual resource endpoints with a path parameter identifying a specific resource, and they affect every operation (`GET`, `PUT`, `DELETE`). They also appear in subresource collection endpoints if the original resource doesn’t exist, but not if the collection is empty.
- Finally, permission issues can arise for every resource, collection, and endpoint, depending on the business logic for the permission system of the application.

| Status | Description        | Occurence                                                          |
| ------ | ------------------ | ------------------------------------------------------------------ |
| 400    | Invalid input      | `POST` and `PUT`; `GET` with query parameters                      |
| 403    | Access forbidden   | Any endpoint with permission-related business logic                |
| 404    | Resource not found | Individual resource endpoints and subresource collection endpoints |

### Requirements for error responses

First of all, an error response should be clearly distinguishable from a successful response. HTTP status codes help make this distinction. **Successful responses (including redirects) have status codes ranging from `200` to `399`, whereas errors have status codes ranging from `400` to `599`.**

Next, both success and error responses should have the same data serialization format.
Using the same format reduces the effort required by the consumer to understand different formats; they can run every response through a JSON parser and then work with the result. Also, malformed JSON can be treated as an unexpected error in the same way as a network error.

Finally, the **data structure (the JSON Schema) should be similar for all error responses**.

Let’s look at a fictitious API with two error responses that demonstrates how _not_ to do it.
The first is a nonexistent resource:

```terminal
$ curl "https://example.com/api/resources/nonExisting"

{
  "error": "Path /resources/nonExisting not found."
}
```

The next is an invalid input:

```terminal
curl -d "email=test@example.com" "https://example.com/api/resources"
{
  "code": "invalid_field",
  "field": "email"
}
```

An error response should have a field with a human-readable error message describing the error in an understandable way.
Optionally, the error message could come in a short version, such as a single sentence, and a longer description with explanations about how to fix the error.

Including a human-readable message is, however, not sufficient for a great error response, because things that are easy for humans to understand are often rather difficult for machines to understand. Which machines could be interested in understanding errors?

- The client-side code, if it doesn’t just want to relay the error message but implement some additional error handling. For example, if a field is missing input, it can highlight the field in the UI by adding a red frame or underlining the input.
- An API gateway or proxy that stands between the client and the server, or an API testing or monitoring system that wants to create and analyze log files to indicate how often particular errors occur in an API.

### The OAS tools format

#### OAS tools error schema

| Field   | Type   | Description                                             |
| ------- | ------ | ------------------------------------------------------- |
| message | string | Human-readable error message describing the full error. |
| errors  | array  | List of errors (see subschema).                         |

#### OAS tools error subschema

| Field     | Type   | Description                                                                                                         |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| path      | string | For input validation errors, identifies where in the JSON request body the error occurred. Otherwise, the URL path. |
| message   | string | Human-readable error message describing the specific error.                                                         |
| errorCode | string | Code indicating error type.                                                                                         |

### The problem+json format

The "Problem Details for HTTP APIs" specification, published in RFC [7807](https://datatracker.ietf.org/doc/html/rfc7807), exists as a minimal but extensible standardized approach toward error responses. It has XML and JSON serialization, though we’ll only consider the JSON version here. The specification suggests setting the `Content-Type` to `application/problem+json` instead of `application/json` for error responses as an additional indicator that it’s an error response and that it’s following a specified standard. Therefore, we’ll call the format problem+json.

The problem is serialized as an object with several well-defined fields:
| Field | Type | Description |
| ------- | ------ | ------------------------------------------------------- |
| type | string | | errors | array | List of errors (see subschema). |
| title | string | A short, human-readable title for the error. |
| status | integer | The HTTP status code. |
| detail | string | A human-readable longer explanation of the error. |
| instance | string | A URI identifying the occurrence of the problem. |

There are a few interesting things to note about the schema:

- It uses URIs for the type and instance fields. One advantage of URIs is that they are globally unique identifiers. The other advantage is that they can be “dereferenced,” which is a fancy way of saying that you can put them in a browser and retrieve a page with information. For example, you could create a URI that identifies a certain problem and, at the same time, links to an API documentation page on your website or developer portal that has additional infor- mation about the type of error.
- The human-readable part of the error comes in two parts:

  - a short `title` and
  - a longer `detail` field.

- The JSON structure contains a copy of the HTTP status code. In most cases, this information is redundant because that code should be identical between the HTTP header and the JSON body. In other cases, however, if someone in between the API and its consumer tampers with the HTTP protocol, you can retrieve the code from the body.

### Adding error responses to OpenAPI

For error handling, we don’t have to design schemas, since we can reuse what’s already out there. For the `problem+json` schema, we can use the official specification as our definition. For the errors thrown by the OAS tools, we can create the schema from what we observed.

```yaml
openapi: 3.0.3
#...
components:
  schemas:
    OASError:
      type: object
      properties:
        message:
          type: string
          description: Human-readable error message
        errors:
          type: array
          items:
            type: object
            properties:
              path:
                type: string
                description: |
                  For input validation errors, identifies where
                  in the JSON request body the error occurred.
              message:
            type: string
                description: Human-readable error message.
              errorCode:
                type: string
                description: Code indicating error type.
    Problem:
      type: object
      properties:
        type:
          type: string
          description: URI indicating error type.
        title:
          type: string
          description: Human-readable error title.
        status:
          type: integer
          description: HTTP status code.
        detail:
          type: string
          description: Human-readable error details.
        instance:
          type: string
          description: URI indicating error instance.
```

We should be good with the following rules:

- All `POST` and `PUT` operations, as well as the parameter-heavy endpoint for job searches, rely on input validation and could therefore potentially throw `400` errors with the OASError schema.
- For operations that contain an `{id}` placeholder, we may find the user trying to request a resource that doesn’t exist. As we handle this in custom code, there might be `404` errors with the Problem schema.
- Similarly, the user may not be allowed to access the resource based on authorization business logic (permissions or roles). Therefore, the same resource endpoints may also throw `403` errors with the Problem schema.
- Every API operation that needs authentication could cause a `401` error with the OASError schema.

```yaml
#...
responses:
  "201":
    description: Created
    headers:
      Location:
        schema:
          type: string
  "400":
    description: Bad request
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/OASError"
  "401":
    description: Unauthorized
    content:
      application/json:
        schema:
          $ref: "#/components/schemas/OASError"
  "403":
    description: Forbidden
    content:
      application/problem+json:
        schema:
          $ref: "#/components/schemas/Problem"
```

### Error-handling guidance

#### Frontend development

First of all, frontend developers integrating an API should be aware that things can go wrong, and that things can fail ungracefully, even if the backend developers have done their homework. The API should return the errors specified in the OpenAPI definition, but frontend developers must implement some generic error handling as well, to fall back on if the error-handling code they wrote doesn’t cover the API responses.

Client errors can come from two different sources:

- The client-side code, which may contain bugs. Fixing those is obviously the responsibility of the frontend developer.
- The end user interacting with the application may provide invalid inputs. Sometimes the client-side code can detect these problems, but other times the application has to rely on the API.

For server errors and network errors, the situation is different. The fault is clearly outside of the client scope, so neither the frontend developer nor the end user can do anything to fix these issues. However, the frontend developer should make sure that their client-side code relays to the user the information that an error has occurred. They need to decide how much information to show to a user. Since server errors can be transient failures, an option to retry the request is helpful.

> The failure of non-essential functionality on the server or network, such as logging or analytics, need not be reported on the client end. These can fail without affecting users, so there is no need to inform them.

#### Backend development

For the backend developer, it’s important to realize that error-handling code can exist in various places throughout the codebase:

- If the framework has built-in functionality for things like input validation, such as our code generated by Swagger Codegen, the error handling happens outside the usual developer’s codebase in a library or dependency.
- When something fails unexpectedly, the code throws an exception or low-level error. If there’s no exception handling, the framework will apply its own error handling or will fail in unexpected ways.
- The developer may have written conditional code, such as if-else blocks, which may indicate success or failure. This code can be adjacent to code that generates the API response, in which case it can similarly generate error responses. Other times the error code is hidden deeper in the architecture, such as in a service class. In this case, it’s the responsibility of those classes to carry the error forward to the code that generates the response.

To summarize, the backend developer has these responsibilities:

- Whenever they check for success or error conditions themselves, they also need to generate error responses. If the code that determines whether a request is successful or not is spread throughout the codebase, a common approach could be to throw a custom exception and then centralize error handling in exception-handling code (a “catch” block).
- Wherever error handling is outside the developer’s control, they should learn about their framework’s default behavior, and whether and where they can change it. If they can’t change it, they should document it for their API consumers, which is what we did with the OAS tools format in PetSitter.
- Since API input is inherently untrusted, developers need to make sure that some component takes care of input validation on the server side—either their framework or custom code. What the client code does is irrelevant at this point.

The question of whether it’s the backend developer’s sole responsibility to write error handlers or whether they get support from their framework does not have a general answer, because different frameworks vary in the depth of their functionality. Generally speaking, a machine-readable API description can help with validation, so a framework that understands OpenAPI can handle some client errors but not all.

## 19 - Improving input validation with advanced JSON Schema

Imagine you have a database that limits a field, such as the user’s full name, to 50 characters. With relational databases, these constraints are common. Now assume an API consumer sends a name with 51 characters. Is that a client error or a server error? If you don’t do anything about it, the database might complain about input that’s too long and that registers as a server error — maybe a `500 Internal server error`.

Did you ever communicate to your users that names should be 50 characters or less? You should have! When you designed your database schema, you made a conscious choice to limit the length of the field. Your API consumers should know that, so that they don’t send you invalid data. With the API design–first approach, in fact, you would have made the decision from the API consumer’s perspective first, and then configured your database accordingly. If the limit is part of the OpenAPI description, your API server will clearly report it as invalid input — a `400 Bad request error` — without you having to write any code for it.

Having the limit in your OpenAPI definition enables even more. Because OpenAPI is a machine - readable definition format, it’s not just the server that can validate the input. Your server does always need to validate, because client - side input is untrusted by definition, but doing some additional input validation on the client side helps, so that invalid data never even goes to the server, and erroneous API calls don’t clog the network.

API gateways and proxies, as well as testing tools, are other parts of your technical stack that can leverage OpenAPI definitions. Any autogenerated code for data models can benefit from refined data types, too, by choosing appropriately sized types for variables or creating constants for enumerations.

### Supported validations

#### Read-only and write-only properties

For every property in an object, JSON Schema provides the `readOnly` field. You can set it to `true` to indicate that the value of a property can be read but not written.

A common use case for read-only fields is an `id` attribute. One thing we can assume in most implementations is that the backend generates the ID to guarantee its uniqueness.

```yaml
SchemaName:
  type: object
  properties:
    id:
      type: integer
      readOnly: true
    # more fields ...
```

In the same fashion, there is the `writeOnly` field. If you set it to `true`, the value for that property can be written but not read.
A typical use case for write-only fields is the `password` attribute.

```yaml
SchemaName:
  type: object
  properties:
    password:
      type: integer
      writeOnly: true
    # more fields ...
```

You can also think of the keywords in the following way:

- `readOnly` - For responses only
- `writeOnly` — For request bodies only

It can be extremely useful and a best practice to use a common schema with `readOnly` and `writeOnly` when the request and response bodies differ only slightly.
When they differ greatly, separate schemas works best.

#### Enforcing number constraints

You can specify `maximum` and `minimum` to define the smallest and largest valid numbers for a field’s value. Is that `maximum` or `minimum` exclusive (<, >) or non-exclusive (?, >=) though? As it turns out, by default the limits are non-exclusive. If you want to make them exclusive, you can add `exclusiveMaximum: true` or `exclusiveMinimum: true` to your schema definition.

There’s another keyword, `multipleOf`, which you can use with integers. It indicates that the number must be a multiple of another number, or, in other words, it must be divisible by that number with modulo 0 and an integer result.

```yaml
SchemaName:
  type: object
  properties:
    my_number:
      type: integer
      multipleOf: 2
      minimum: 2
      maximum: 20
      exclusiveMinimum: true
      exclusiveMaximum: true
```

> A neat trick is to use multiples of decimals when you want to limit the precision of a number. A multipleOf of 0.1 would limit numbers to have a maximum precision of tenths, so 12.3 would be valid but 12.34 would be invalid, because 12.34 is not a multiple of 0.1.

#### Enforcing string formats

There are two constraints for the string format:

- `minLength` and `maxLength` indicate the minimum and maximum number of characters in a string.
- `pattern` is a regular expression for the value of the string.

JSON Schema and OpenAPI provide the `format` keyword and a set of predefined formats with accessible, human-readable names, for common formats that you’ll need to validate in APIs.

| Format    | Purpose                          | OpenAPI standard | JSON Schema standard |
| --------- | -------------------------------- | ---------------- | -------------------- |
| byte      | Base64-encoded data              | Yes              | No                   |
| binary    | Other string-encoded binary data | Yes              | No                   |
| date      | Date (RFC 3339)                  | Yes              | No                   |
| time      | Time (RFC 3339)                  | No               | Yes                  |
| date-time | Date and time (RFC 3339)         | Yes              | Yes                  |
| duration  | Duration                         | No               | Yes                  |
| email     | Email address                    | No               | Yes                  |
| password  | Password—hide from UI            | Yes              | No                   |
| hostname  | Internet hostname                | No               | Yes                  |
| ipv4      | IP V4 address                    | No               | Yes                  |
| ipv6      | IP V6 address                    | No               | Yes                  |
| uri       | URI/URL                          | No               | Yes                  |
| uuid      | UUID                             | No               | Yes                  |

Beyond that, you are allowed to add custom values for format. Not every OpenAPI tool understands those, of course, but as long as your tool chain does, it can be valuable. And formats can be used for more than input validation. An example is `password`. While there are no validations attached to it, Swagger UI hides user input for parameters with this format, and so could other tools that generate user interfaces from OpenAPI definitions.

```yaml
SchemaName:
  type: object
  properties:
    password:
      type: string
      format: password
      minLength: 6
```

#### Enforcing array constraints

- `minItems` and `maxItems` indicate the minimum and maximum number of items in the array.
- `uniqueItems` specifies whether all items in the array must be unique (true) or if it’s acceptable to have duplicates (false).

```yaml
SchemaName:
  type: object
  properties:
    my_numbers:
      type: array
      minItems: 1
      maxItems: 10
      uniqueItems: true
      items:
        type: integer
```

#### Defining enumerations

```yaml
SchemaName:
  type: object
  properties:
    gender:
      type: string
      enum:
        - male
        - female
        - other
```

#### Listing required and optional properties

> By default, JSON Schema assumes all properties of an object are optional.

If they are present, they must conform to the `type`, `format`, and other constraints. However, if they are not present, the schema is still valid. You have to make requirements explicit, and that’s what the required `keyword` is for.

Unlike, for example, the `readOnly` or `format` keywords, which are set for individual properties, requirements are specified in a separate list (an array), and you add this list to the object. To add to the confusion, OpenAPI does use `required: true`, but that’s just for parameters, not schemas.

```yaml
SchemaName:
  type: object
  properties:
    name:
      type: string
    email:
      type: string
      format: email
    phone:
      type: string
    address:
      type: object
      # schema omitted
  required:
    - name
    - email
```

> Let’s quickly consider what happens when we make a field read-only and add it to the list of required fields. One might think that this is an impossible situation for input validation, but the OpenAPI specification has covered this. The required only applies to the response in this case.

## 20 - Versioning an API and handling breaking changes

> We define a breaking change as anything that requires consumers to do something.

If they don’t update their integration after a breaking change, they’ll experience a degraded service due to the API no longer working as expected. It can result in a bad end-user experience or, quite commonly, downtime for the service.

Breaking changes, in other words, break consumer integrations. In the world of APIs, and particularly APIs with JSON (and XML) bodies, a breaking change usually involves one of the following changes:

- Removing a field from a response (consumers will try to read a field and won’t find it)
- Changing a field’s constraints in a request or response
- Adding a required field to a request (API servers will now send a client error in response to what used to be a valid API request)

The following aren’t typically breaking changes, though some consumers may be a little more finicky and consider them breaking:

- Adding a new field to a response (not breaking because API consumers will generally ignore fields they don’t understand or expect)
- Adding an optional field to a request (API requests without an optional field will remain valid)
- Removing a field from a request (the API server will ignore it, but this might change behavior in unexpected ways, so removing a field can sometimes be breaking too)

However, unlike downloadable code libraries, where multiple versions of the libraries can be hosted statically (on services like Maven, npm, or GitHub), serving multiple versions of an API is far more costly in terms of resources, code setup, and maintenance. Due to these costs, API providers generally don’t keep every version around indefinitely; they deprecate and phase out older versions after some time.

Assuming we have multiple versions of the API:

- Using different base paths, such as `/v1/...`, `/v2/...`, etc.
- Using a query parameter, such as `?version=1`, `?version=2`, etc.
- Using a header, such as `Version=1`, `Version=2`, etc.

> Versioning APIs with query parameters and headers is quite similar, in that they can apply to the entire API (all operations) or they can be used for individual operations.

```yaml
openapi: 3.0.3
  info:
    version: 1.0.0
  servers:
    - url: https://petsitter.designapis.com/v1/
  paths:
    # ...
```

```yaml
openapi: 3.0.3
info:
  version: 2.0.0
servers:
  - url: https://petsitter.designapis.com/v2
paths:
  # ...
```

The benefit of this approach is that the existing API remains exactly as is, with no changes to it. The negative is the cost involved. The development team has to effectively manage two separate APIs, the documentation has to include both versions, and we will possibly need a migration guide to get developers from version 1 to version 2. These are nontrivial costs, even if you consider that you can generate your documentation from OpenAPI. The migration guide and putting everything together still requires a human’s technical writing skills.

The only time we’d recommend this approach is if the new version of the API is so radically different that it is practically a new API and you still want this new API to fall under the original name, brand, or domain.

Managing multiple versions of an API, or even of its operations, is a huge overhead and should rarely be your first choice when dealing with a breaking change. Instead, consider the simpler (in almost every way) approach of adding the new feature and deprecating the older feature, which turns it from a breaking change into a non-breaking change.

```yaml
components:
  schemas:
    Job:
      type: object
      properties:
        # ...
        dog:
          allOf:
            - $ref: "#/components/schemas/Dog"
            - description: |
                This is deprecated, prefer to use pets.
                If both exist, dog will be ignored and pets will be used.
              deprecated: true
pets:
  type: array
  items:
    $ref: "#/components/schemas/Pet"
```

> The best way to prepare the schemas in your OpenAPI definitions for resilience against breaking changes is to use the object type wherever you can. Objects are awesome: you can always add more fields without needing to remove older ones, which allows the types of changes that aren’t breaking.

As a simple example, always wrap your arrays inside an object.

A naked array, not wrapped in an object:

```yaml
["one", "two", "three"]
```

Our original array is still here, nested under items:

```yaml
{ "total": 3, "cursor": null, "items": ["one", "two", "three"] }
```

Our root schema has changed from an array to an object — a breaking change.
Even if we may never need pagination, wrapping arrays inside objects allows us the option to add more data to the schema later on.

Going from an array to an object is a breaking change. However, going from an object with just the items field to an object with items, cursor, and total fields isn’t, because API consumers can still read the items and ignore the total field. Note that pagination can still degrade the experience, because older clients who were used to getting all the data will only get the first page and have no way of accessing further pages. That’s still less breaking than getting no items at all because you don’t understand the data type.

## 21 - The API prerelease checklist

There are several challenges involved in releasing an API to the general public. The chief problem is surely that consumers cannot change their code immediately after the API has a breaking change.
Add to that, there isn’t a direct communication channel between the API team and the consumers.

### The checklist

- Working API
- Consistent API
- Security
- Versioning/change strategy
- Documentation
- API roadmap/release plan
- Metrics and monitoring
- Communication channels

#### Getting the API working

1. Unit testing your API

In software we think of units as being functions, and in APIs we can consider an operation (a path and a method) as the unit under test.

To test an operation, you may need to isolate that operation. Consider the data- base queries and third-party API requests that your backend makes when you call your API operation—could those potentially interfere with your testing, and should they be replaced with mock code? Isolation ensures that the unit tests run quickly, as they won’t depend on any external network calls.

Unit testing an API can take the following approach:

- Test by making a request and asserting that the response is correct.
- Test as many edge cases as you have an appetite for.
- Mock or stub out as much as you choose, to best isolate your function.

An example unit test in Node.js using supertest:

```javascript
const app = require("./our-expressjs-server.js");
const request = require("superagent");

describe("POST /foos", function () {
  it("should create a new Foo", function (done) {
    app.mockDb(true);
    request(app)
      .post("/foos")
      .send({ foo: "A Foo" })
      // Expect status code 201
      .expect(201)
      // Expect a JSON response body
      .expect("Content-Type", /json/);
    // Expect the response body to have fooId
  }).expect({ fooId: "abc" }, () => {
    // Should also assert the DB was updated
    expect(app.mockDb.foos).toBe([{ foo: "A Foo" }]);
    // Finish the test
    done();
  });
});
// ...
```

2. End-to-end testing

The first and most straightforward way to test the API is to sit down and use it as your users would. Fortunately, HTTP APIs are incredibly standardized, and most (if not all) HTTP clients have the same behavior. That means you can test it with any HTTP client. Sit down, grab your favorite API client (such as curl, Postman, or Swagger UI) and make some requests against the API.

- [Strest](https://github.com/eykrehbein/strest).
- [Postman’s Newman](https://github.com/postmanlabs/newman)
- [ReadyAPI’s TestEngine](https://github.com/SmartBear/testengine-cli)

#### Documentation

Documentation is your API’s entry point for consumers. From the docs, your consumers should learn the following key information:

- Can I do what I want? (For example, can I list all jobs in the API?)
- How can I gain access? (URL + authentication/authorization)
- What is the request that I want, and what are its details?

An area where OpenAPI comes up short is describing related operations, such as if you need to make several requests in a particular order to achieve a single goal. For those cases, you can use the Markdown description field in your OpenAPI definitions. Or you can create dedicated pages where consumers can more clearly see those flows.

#### Getting your API consistent

Before an API is released, we have full control and can make changes whenever we choose. As soon as the API is released, we have to consider the impact that further changes will have on existing consumers. As such, it pays to make the API as consistent as possible before release, not only as good practice, but also to avoid having to “fix” the API after it’s released.

#### Validation and error reporting

Validation plays a big role in error messages, and there are often small issues with a request that validation can catch. Your error responses should detail exactly why the request failed. The only exception would be related to security, as sometimes it’s unwise to share that information.

#### An API roadmap and exposure index

> Even though you may not need to use authentication for public data, and it’s nice to offer it anonymously, it may still be useful to hand out API keys and require them for requests. If you receive a lot of traffic to your API, it could be useful to find out which consumers cause it, and, if necessary, impose rate limits or add usage plans.

#### Getting a change strategy

We may use SemVer internally and change version numbers to communicate their changelog, but we will not expose version numbers in the URL, as it’s not required for this change strategy.

#### Improving security

- Ensure that your API has access control measures, and run tests that verify that they prevent unauthorized users from doing things they shouldn’t.
- Denial of service (DDoS) attacks can be mitigated with a web application fire-wall (WAF) or some other protection at the edge of your system.
- Keep your development and staging environments secure. There have been recent attacks and several large breaches because of insecure dev/stage environments.
- Avoid leaking information in your error responses. Definitely avoid stack traces in your errors, as they tell a lot about the type of code you’re running.

> Using 404 vs. 403 responses for access denial
> Attackers are good at exploiting systems by testing them—poking and prodding them to discover information. In an age of automation, we have to be careful about what information we expose.
> Consider the following URLs:

- /foos/bobs-thing—Resource exists and only Bob has access
- /foos/franks-thing—Resource exists and only Frank has access
- /foos/does-not-exist—Resource does not exist
  > If a user requests /foos/does-not-exist, the service will return `404 Not Found`.

> If Bob has access to /foos/bobs-thing but not to /foos/franks-thing, what status code should the service respond with when Bob requests /foos/franks-thing? If you responded with 403 (or 401) you wouldn’t be wrong, but there is a problem with returning those status codes. A 403 or 401 response code reveals that /foos/franks-thing exists. Compare that to the 404 Not Found we get if we request /foos/does-not-exist. Instead, we should return a 404 Not Found, so as to protect the information that /foos/franks-thing exists from prying eyes.

> Let’s consider another example: if Bob is allowed to read /foos/bobs-thing with a GET, but is not allowed to update it, what status code should we respond with when Bob tries PUT /foos/bobs-thing? Here, a 403 Forbidden response is perfectly acceptable, as there is no information leak. Bob is allowed to know about the resource, and the status code does not leak any further information. It is, in fact, helpful, as Bob will know that he cannot update the resource and perhaps should seek some higher authority.

#### Monitoring your API

Knowing that your API is alive and well isn’t a given. During working hours, and with an active testing and development team, you will likely discover rather quickly if your API isn’t responding to requests. But over the weekend, you may not discover an outage until many hours or even days have passed. As API providers, we often set up some sort of monitoring to make sure that we’re notified as soon as our API goes down. We generally have a call list of who should be notified and what they’re responsible for.

API monitoring tools basically ping your website at one or more endpoints, and they will send you an email or message as soon as the website stops responding, or if it responds with an error. [PagerDuty](www.pagerduty.com) and [AlertSite](https://smartbear.com/product/alertsite/overview/) are two such tools.

How will you know if you’ve succeeded? Or if you’re failing? Metrics are always the answer. Here are a few metrics we’re particularly fond of:

- Unique users
- User engagement
- Churn rate (those no longer using the API)
- Acquisition rate (new users)

For the technical team, there are other important metrics that will improve the quality of the API:

- CPU usage
- Memory usage
- Mean response time
- Error rate (`400s` and `500s`)

#### Releasing the API

The prerelease API checklist:
| Item | How to deal with it |
| --- | --- |
| Working API | Test it! |
| Consistent API | Have an API design process and think ahead. |
| Security | Use OWASP and be continuously vigilant. |
| Versioning/change strategy | Avoid breaking changes and communicate clearly. |
| Documentation | Provide both reference and additional docs. |
| API roadmap/release plan | Slowly expose your API and provide value. |
| Metrics and monitoring | Provide both business and technical monitoring. |
| Communication channels | Communicate your roadmap and versioning strategy clearly, have all information available, and open feedback channels. |
