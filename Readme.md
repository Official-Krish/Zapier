# Zapier Automation Processor

This project is a custom automation processor inspired by Zapier, designed to handle complex workflows efficiently using Kafka, Prisma, and TypeScript.

## 📁 Project Structure

  - **primary-backend**: Contains the main backend code of the project.
  - **frontend**: Contains the frontend code of the project.
  - **hooks**: Logic for handling various hooks in the automation process.
  - **processor**: Contains the processing logic for different tasks.
  - **worker**: Background tasks and job runners.

## 🛠️ Technologies Used

- **KafkaJS**: A modern Kafka client for Node.js.
- **Prisma**: An ORM for database management and migrations.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Node.js**: JavaScript runtime built on Chrome's V8 engine.

## ⚙️ System Architecture

1. **zapier.com FE**: The frontend where users create and manage zaps (automation workflows).
2. **zapier.com BE**: The backend service that interacts with the frontend and handles API requests.
3. **Database (DB)**: Stores triggers and outbox data that need to be processed.
4. **Kafka**: Acts as a message broker to decouple the processing logic.
5. **Worker**: Consumes messages from Kafka and processes them, updating the DB as needed.
6. **Processor**: Handles the actual processing of each zap.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.x or later)
- Kafka (locally or through Docker)
- Prisma (installed globally or through npm)

<h3>Installation</h3>
<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/Official-Krish/Zapier
</code></pre>
    </li>
    <li>Install dependencies:
        <pre><code>npm install</code></pre>
    </li>
    <li>Set up your environment variables:
        <p>Create a <code>.env</code> file in the root directory with the following content:</p>
        <pre><code>DATABASE_URL=your_database_url
KAFKA_BROKERS=localhost:9092
TOPIC_NAME=zapier-events
</code></pre>
    </li>
    <li>Run Prisma migrations to set up the database schema:
        <pre><code>npx prisma migrate dev</code></pre>
    </li>
    <li>Start the Kafka consumer:
        <pre><code>npm run start</code></pre>
    </li>
</ol>

<h3>Usage</h3>
<ul>
    <li><strong>Create a Zap</strong>: Use the frontend to create automation workflows.</li>
    <li><strong>Process Events</strong>: The worker will consume and process events as they are published to Kafka.</li>
</ul>

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/[feature-title]`).
3. Make your changes and commit them (`git commit -am 'Add brief meaningful commit message'`).
4. Push to the branch (`git push origin feature/[feature-title]`).
5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

