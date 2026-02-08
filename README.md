# TCG Collection Firebase Functions

A Firebase Cloud Functions project for managing Trading Card Game (TCG) collections with API endpoints for brand and card data retrieval.

## Overview

This project provides serverless HTTP endpoints to interact with a TCG service, enabling efficient management and querying of trading card game collections across multiple brands.

## Features

- Retrieve all available TCG brands
- Search and filter cards by brand and custom parameters
- TypeScript with strict type checking
- Firebase Cloud Functions integration
- Environment-based configuration
- Local development with Firebase emulator

## Prerequisites

- Node.js 24+
- Firebase CLI
- Environment variables: `TCG_SERVICE_BASE_URL`, `TCG_SERVICE_API_KEY`

## Installation

```bash
cd functions
npm install
```

## Commands

| Command               | Description                           |
| --------------------- | ------------------------------------- |
| `npm run build`       | Compile TypeScript to JavaScript      |
| `npm run build:watch` | Watch mode for TypeScript compilation |
| `npm run serve`       | Run Firebase emulator locally         |
| `npm run deploy`      | Deploy functions to Firebase          |
| `npm run lint`        | Run ESLint                            |
| `npm run logs`        | View function logs                    |

## Supported Brands

One Piece, Pokémon, Dragon Ball Fusion, Digimon, Magic, Union Arena, Gundam, Riftbound, Star Wars Unlimited

## API Endpoints

### GET `/brandList`

Returns all available brands.

### POST `/cardList`

Fetch cards by brand with optional query filters.

**Request:**

```json
{
  "brand": "pokemon",
  "name": "pikachu"
}
```

## Data Provider

Card and brand data is sourced from the [ApiTCG service](https://docs.apitcg.com/api-reference/cards).
