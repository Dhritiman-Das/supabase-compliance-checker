# Supabase Compliance Checker

A full-stack application built with Next.js and Node.js to verify and ensure compliance of Supabase configurations. It checks whether critical features like Multi-Factor Authentication (MFA), Row Level Security (RLS), and Point in Time Recovery (PITR) are enabled. The app logs results, provides auto-fix options, and offers AI-powered chat support for troubleshooting.

## Features

- **Supabase Authentication**: Securely authenticate with your Supabase account.
- **MFA Check**: Verify whether Multi-Factor Authentication (MFA) is enabled for all users.
- **RLS Check**: Ensure Row Level Security (RLS) is enabled on all Supabase tables.
- **PITR Check**: Check if Point in Time Recovery (PITR) is enabled for all projects.
- **Evidence Logging**: Collect and log compliance statuses (passing or failing) with timestamps.
- **Auto-fix Options**: Provide commands to automatically resolve compliance issues.
- **AI Chat Support**: Use AI-powered chat to guide users in solving problems.

## Bonus Features

- Automatically fix issues like enabling MFA, RLS, and PITR with one-click solutions.
- AI chat integration for more advanced troubleshooting using Perplexity/Claude/OpenAI.

## Setup

### Prerequisites
- Node.js
- Supabase account
- API Keys and Project details from Supabase

### Install Dependencies
Clone the repository and install the dependencies:
```bash
git clone https://github.com/Dhritiman-Das/supabase-compliance-checker.git
cd supabase-compliance-checker
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory with the following details:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

### Run the Application
Start the development server:
```bash
npm run dev
```
The app should now be running at `http://localhost:3000`.

## Usage

1. **Login**: Authenticate with your Supabase account using the app.
2. **Run Compliance Checks**: Click the appropriate buttons to check for MFA, RLS, and PITR compliance.
3. **View Results**: The app will list users, tables, and projects, and display their compliance status.
4. **Auto-fix**: Use the auto-fix option to resolve compliance issues (e.g., enabling MFA or RLS).
5. **Logs**: Check the log for timestamps and any actions taken.

## AI Chat Support

This feature provides AI-driven suggestions and guidance for solving compliance issues. It uses either Perplexity, Claude, or OpenAI, depending on your setup.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.
