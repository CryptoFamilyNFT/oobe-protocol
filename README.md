# OOBE Protocol SDK

🛸　**.**　　•.  　🌎　°　.•　🌓　•　　.°•　　•　🚀 ✯.    •.    .  •. 
　.　•　★　*　°　  　.　#O　🛰 #O　°·　#B　•.  #E    ๏     .•   🪐  .
.　•　•　° ★　•  ☄.       ๏       •.      .  •.      .     •.      .
▁▂▃▄▅▆▇▇▆▅▄▃▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂

## Overview
The OOBE Protocol SDK is a framework designed to build and manage Solana-based AI agents. It supports advanced features for conversational memory, parallel function calls, smart tool selection, and message history tracking using databases like MongoDB or Redis. This SDK is the core component for developing AI agents on the Solana blockchain, combining the power of AI with blockchain technology.

### Features
- **AI Agent Persona**: Manage different AI agent personas with conversational memory and smart tool usage.
- **Solana Integration**: Leverage the Solana blockchain for decentralized applications.
- **Parallel Function Calls**: Execute multiple functions simultaneously for increased efficiency.
- **Message History**: Track and store message history to build intelligent agents with memory.
- **Database Support**: Integrates with MongoDB and Redis for memory management.

---

## Installation

### Prerequisites

- Node.js (>= 14.0)
- TypeScript
- Solana Web3.js
- MongoDB or Redis (optional, for memory management)
- Git (for version control)

### Steps to Set Up

1. **Clone the Repository**

   First, clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/oobe-protocol.git


2. **Change to the project directory:**
   
   Navigate to the Project Directory

   ```bash
   cd oobe-protocol

3. **Install Dependencies**
Install all required dependencies using npm or yarn:

   ```npm install```

   or

   ```yarn install```

4. **Set Up Solana Configuration** (optional)

If you have Solana CLI installed can follow the instructions here to  configure your Solana environment:

```solana config set --url https://api.mainnet-beta.solana.com```

5. **Configure MongoDB or Redis**

If you plan to use MongoDB or Redis for memory management, make sure you have the respective services running and set up the configuration in the ```./packages/core/src/config/default.ts``` file.

6. **Start the Application**

You can now start your development server or run your application using:

```npm start```

## Usage

### Creating a Solana Agent

To create a Solana Agent, follow these steps:

1. **Import SolanaWeb3 in your TypeScript project:**

    ```typescript
    import { Connection, PublicKey } from '@solana/web3.js';
    ```

2. **Connect to Solana Network:**

    Set up a connection to the Solana blockchain using the `Connection` class:

    ```typescript
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    ```

3. **Create an Agent with Memory:**

    Use the provided SDK functions to create an AI agent with memory and other features:

    ```typescript
    //soon
    ```

4. **Execute Commands:**

    Interact with the agent by calling different functions based on your needs:

    ```typescript
    //soon
    ```

5. **Monitor Transactions:**

    The SDK allows you to monitor transactions on Solana and track movements of whales (large accounts):

    ```typescript
    //soon
    ```

6. **Example Output:**

    The SDK will return transaction data, including signatures, transaction details, and more, which can be used to track whale movements and optimize mev strategies on wallet integration user.

### Git Integration

1. **Initialize Git:**

    To initialize the Git repository for your project:

    Navigate to your project directory:

    ```sh
    cd /path/to/your/project
    ```

    Initialize Git:

    ```sh
    git init
    ```

    Add all files to the repository:

    ```sh
    git add .
    ```

    Commit the changes:

    ```sh
    git commit -m "Initial commit"
    ```

2. **Add a Remote Repository:**

    Create a repository on GitHub or GitLab.

    Link the remote repository:

    ```sh
    git remote add origin https://github.com/yourusername/your-repo.git
    ```

    Push the changes to GitHub:

    ```sh
    git push -u origin master
    ```

### Contributing

We welcome contributions to the OOBE Protocol SDK. If you would like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push to your forked repository.
5. Create a pull request.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements

- Solana Web3.js
- MongoDB
- Redis
- TypeScript


@oobe-protocol