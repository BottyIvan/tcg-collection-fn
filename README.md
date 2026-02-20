# TCG Collection Firebase Functions

A Firebase Cloud Functions project for retrieving Trading Card Game (TCG) brand information and detailed card data through RESTful API endpoints.

## 📋 Overview

This project provides serverless HTTP endpoints to interact with TCG services, enabling retrieval of supported brands and detailed card information across multiple trading card game collections. Built with TypeScript and Firebase Cloud Functions for scalability and reliability.

## ✨ Features

- 🎴 Retrieve supported TCG brands with implemented adapters
- 🔍 Fetch detailed card information by brand, set, and card ID
- 📦 TypeScript with strict type checking and interfaces
- ⚡ Firebase Cloud Functions for serverless deployment
- 🔧 Environment-based configuration
- 🛠️ Local development with Firebase emulator
- 🎯 Brand-specific adapters for card normalization (Pokémon, Digimon, Dragon Ball)
- 🌐 Integration with ApiTCG service

## 🎮 Supported Brands

- **Pokémon**
- **Digimon**
- **Dragon Ball Fusion**
- One Piece
- Magic: The Gathering
- Union Arena
- Gundam
- Riftbound
- Star Wars Unlimited

## 📁 Project Structure

```
tcg-collection-fn/
├── functions/
│   ├── src/
│   │   ├── adapters/          # Brand-specific data adapters
│   │   ├── config/            # TCG configuration
│   │   ├── enum/              # Enumerations (brands, etc.)
│   │   ├── interface/         # TypeScript interfaces
│   │   ├── requests/          # API request handlers
│   │   └── services/          # Core services (API, normalizer)
│   ├── lib/                   # Compiled JavaScript output
│   └── package.json
├── firebase.json              # Firebase configuration
└── README.md
```

## 🚀 Prerequisites

- **Node.js** 24+ (LTS recommended)
- **npm** or **yarn**
- **Firebase CLI** (`npm install -g firebase-tools`)
- **Firebase Project** (create one at [Firebase Console](https://console.firebase.google.com/))

### Environment Variables

> [!IMPORTANT]
> Obtain your API key from [ApiTCG](https://docs.apitcg.com/). Required for direct ApiTCG endpoint access. The service is currently under development with potentially limited functionality.

Create a `.env` file in the `functions/` directory:

```env
TCG_SERVICE_BASE_URL=https://api.apitcg.com
TCG_SERVICE_API_KEY=your_api_key_here
```

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd tcg-collection-fn
   ```

2. **Install dependencies**

   ```bash
   cd functions
   npm install
   ```

3. **Configure Firebase**

   ```bash
   firebase login
   firebase use --add  # Select your Firebase project
   ```

4. **Set environment variables**
   ```bash
   firebase functions:config:set tcg.service_base_url="https://api.apitcg.com" tcg.service_api_key="your_api_key"
   ```

## 🛠️ Development

### Available Commands

| Command               | Description                           |
| --------------------- | ------------------------------------- |
| `npm run build`       | Compile TypeScript to JavaScript      |
| `npm run build:watch` | Watch mode for TypeScript compilation |
| `npm run serve`       | Run Firebase emulator locally         |
| `npm run deploy`      | Deploy functions to Firebase          |
| `npm run lint`        | Run ESLint on source files            |
| `npm run logs`        | View function logs from Firebase      |

### Local Development

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start the emulator**

   ```bash
   npm run serve
   ```

3. **Access the endpoints**
   - Base URL: `http://localhost:5001/<project-id>/<region>/`
   - Example: `http://localhost:5001/my-project/us-central1/helloWorld`

## 📚 API Reference

### GET `/helloWorld`

Simple health check endpoint that returns a greeting message.

**Response:**

```
Hello from Firebase!
```

**Status Codes:**

- `200` - Success

---

### GET `/brandList`

Retrieves all currently supported TCG brands with implemented adapters.

**Response:**

```json
["pokemon", "digimon", "dragonball"]
```

**Status Codes:**

- `200` - Success

---

### POST `/getCardDetails`

Fetch detailed information for a specific card by brand, set, and card identifiers.

**Request Body:**

```json
{
  "brand": "pokemon",
  "setId": "base1",
  "name": "Pikachu",
  "cardId": "58"
}
```

**Parameters:**

| Parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| `brand`   | string | Yes      | TCG brand identifier   |
| `setId`   | string | Yes      | Set identifier         |
| `name`    | string | Yes      | Card name              |
| `cardId`  | string | Yes      | Unique card identifier |

**Response:**

```json
{
  "id": "base1-58",
  "name": "Pikachu",
  "brand": "pokemon",
  "set": "Base Set",
  "normalizedData": {
    "hp": "40",
    "type": "Lightning",
    "attacks": [...]
  },
  "imageUrl": "https://...",
  "marketPrice": {
    "low": 1.50,
    "mid": 3.00,
    "high": 5.00
  }
}
```

**Status Codes:**

- `200` - Success
- `400` - Invalid request (missing required parameters)
- `404` - Card not found
- `500` - Internal server error

## 🔌 Data Provider

Card and brand data is sourced from the [ApiTCG service](https://docs.apitcg.com/api-reference/cards). This service provides comprehensive TCG data across multiple brands with standardized APIs.

## 🚢 Deployment

Deploy to Firebase:

```bash
npm run build
npm run deploy
```

Or deploy specific functions:

```bash
firebase deploy --only functions:helloWorld
firebase deploy --only functions:brandList
firebase deploy --only functions:getCardDetails
```

## 🧪 Testing

Test endpoints locally with `curl`:

```bash
# Health check
curl http://localhost:5001/<project-id>/<region>/helloWorld

# Get brand list
curl http://localhost:5001/<project-id>/<region>/brandList

# Get card details
curl -X POST http://localhost:5001/<project-id>/<region>/getCardDetails \
  -H "Content-Type: application/json" \
  -d '{"brand":"pokemon","setId":"base1","name":"Pikachu","cardId":"58"}'
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

**Firebase CLI not found**

```bash
npm install -g firebase-tools
```

**Environment variables not loading**

- Ensure `.env` file exists in `functions/` directory
- For deployed functions, use `firebase functions:config:set`

**TypeScript compilation errors**

```bash
npm run build
# Check tsconfig.json for strict mode settings
```

## 📞 Support

For issues or questions:

- Open an issue on GitHub
- Check [Firebase Documentation](https://firebase.google.com/docs/functions)
- Review [ApiTCG Documentation](https://docs.apitcg.com/)
