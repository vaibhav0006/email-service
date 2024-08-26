# Email Sending Service

## Features
- **Basic Queue System** for managing email delivery.
- **Rate Limiting** to prevent sending too many emails in a short period.
- **Idempotency** to avoid sending duplicate emails.
- **Status Tracking** to monitor the delivery status of emails.
- **Simple Logging** for easy monitoring and debugging.


## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/email-service.git
    cd email-service
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configuration:**

    Configure any necessary environment variables in the `config.js` file located in `src/`. If there are no external configurations, this step might not be necessary.

### Running the Application

To start the service:

```bash
npm start
```

### Running the test

```bash
npm test

```
By default, the server runs on http://localhost:3000.


