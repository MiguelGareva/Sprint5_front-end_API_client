# Pokémon API Analysis

## Available Endpoints

After reviewing the API documentation, the following endpoint groups have been identified:

### Authentication
- `POST /register` - Register a new trainer
- `POST /login` - Log in and obtain token
- `POST /logout` - Log out (revoke token)
- `GET /user` - Get authenticated user data

### Trainers
- `GET /trainers` - Get list of trainers (paginated)
- `POST /trainers` - Create a new trainer
- `GET /trainers/{id}` - Get details of a specific trainer
- `PUT /trainers/{id}` - Update trainer information
- `DELETE /trainers/{id}` - Delete a trainer
- `POST /trainers/{trainer}/points` - Update trainer points (admin only)

### Pokémon
- `GET /pokemons` - Get list of pokémon (with optional filters)
- `POST /pokemons` - Create a new pokémon
- `GET /pokemons/{id}` - Get details of a specific pokémon
- `PUT /pokemons/{id}` - Update pokémon information
- `GET /pokemon-list-available` - Get available pokémon (unassigned)
- `POST /pokemons/{id}/trainers/{trainer_id}` - Assign pokémon to a trainer
- `DELETE /pokemons/{id}/trainers/{trainer_id}` - Release pokémon from a trainer
- `POST /pokemons/{pokemon}/transfer/{trainer}` - Transfer pokémon to another trainer

### Battles
- `GET /battles` - Get list of battles (paginated)
- `POST /battles` - Create a new battle
- `GET /battles/{id}` - Get details of a specific battle
- `DELETE /battles/{id}` - Delete a battle
- `POST /battles/simulate` - Simulate a battle without saving results

### Rankings
- `GET /trainers/ranking` - Get trainer rankings (public endpoint)
- `GET /trainers/top/{count}` - Get the top N trainers
- `GET /trainers/{trainer}/similar/{range}` - Get trainers with similar points
- `GET /trainers/stats/monthly` - Get monthly ranking statistics

## Authentication

The API uses OAuth2 with Laravel Passport. To access protected endpoints, you need to include a bearer token in the authorization header:

```
Authorization: Bearer YOUR_TOKEN
```

## Roles and Permissions

The API implements role-based access control with the following profiles:
- **admin**: Full system access
- **trainer**: Limited access to their own resources
- **guest**: Access only to public information

## Pagination

Many endpoints that return lists implement pagination with the following parameters:
- `page`: Page number (default: 1)
- `per_page`: Number of items per page (default: 15)

Paginated responses include:
- `data`: Array with items
- `links`: Navigation links (first, last, prev, next)
- `meta`: Pagination metadata (current_page, last_page, total, etc.)