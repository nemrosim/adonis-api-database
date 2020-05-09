# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Controllers

```
# HTTP Controller
> adonis make:controller User --type http

# WS Controller
> adonis make:controller User --type ws

# Will use an Admin subfolder
> adonis make:controller Admin/User

```

## Validators
```
adonis make:validator StoreUser
```

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
