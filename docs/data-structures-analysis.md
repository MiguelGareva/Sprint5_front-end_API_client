# API Data Structures Analysis

## Main Data Structures

After analyzing the API documentation, the following main data structures have been identified:

### User
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
```

### Trainer
```typescript
interface Trainer {
  id: number;
  user_id: number;
  name: string;
  email: string;
  points: number;
  created_at: string;
  updated_at: string;
}
```

### Trainer with Pokémon
```typescript
interface TrainerWithPokemons extends Trainer {
  pokemons: Pokemon[];
}
```

### Trainer Ranking
```typescript
interface TrainerRanking {
  id: number;
  name: string;
  points: number;
  rank: number;
}
```

### Pokémon
```typescript
interface Pokemon {
  id: number;
  name: string;
  type: string;
  level: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  trainer_id: number | null;
  trainer?: {
    id: number;
    name: string;
  } | null;
  created_at: string;
  updated_at: string;
}
```

### Battle
```typescript
interface Battle {
  id: number;
  trainer1_id: number;
  trainer2_id: number;
  winner_id: number | null;
  points_awarded: number;
  date: string;
  created_at: string;
  updated_at: string;
}
```

### Battle with Trainers
```typescript
interface BattleWithTrainers extends Battle {
  trainer1: Trainer;
  trainer2: Trainer;
  winner: Trainer | null;
}
```

### Pagination
```typescript
interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginatedResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
```

## API Responses

Most responses follow these patterns:

### Success Response
```typescript
// For individual elements
{
  data: T;  // T can be Trainer, Pokemon, etc.
}

// For paginated lists
{
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
```

### Error Response
```typescript
{
  message: string;
}
```

### Validation Error
```typescript
{
  message: string;
  errors: {
    [field: string]: string[];
  }
}
```

## Important Observations

1. The API uses a RESTful approach with clearly defined resources.
2. All dates are formatted in ISO 8601 format (date-time).
3. IDs are numeric (64-bit integers).
4. Many endpoints include nested information (for example, a pokémon may include data about its trainer).
5. The API provides specific endpoints for common operations (like transferring pokémon or simulating battles).