# MeCV.ai v.01
## [Backdrop Build v.5](https://backdropbuild.com/builds/mecvai)

## Overview

The GitHub Repo Evaluator is a web application that allows users to evaluate a GitHub repository based on the code patterns present in the repository. The application can detect the programming language used and classify the repository as beginner, intermediate, or advanced. It also highlights the specific features or patterns used in the code.

## Features

- **Language Detection**: Automatically detects the programming language used in the repository.
- **Proficiency Classification**: Classifies the repository as beginner, intermediate, or advanced based on the code patterns.
- **Feature Highlighting**: Displays specific features or patterns used in the code.
- **User-Friendly Interface**: Simple and intuitive interface for entering GitHub repository details and viewing results.

## Technologies Used

- **Next.js**: Framework for building the web application.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: Promise-based HTTP client for making API requests.
- **GitHub API**: Used to fetch repository content and details.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A GitHub personal access token with appropriate permissions.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/github-repo-evaluator.git
cd github-repo-evaluator
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your GitHub personal access token:

```plaintext
GITHUB_TOKEN=your_github_personal_access_token
```

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000` to see the application.

### Deployment

To deploy the application to Netlify:

1. Create a new site on Netlify.
2. Connect your GitHub repository to the Netlify site.
3. Set the build command to `npm run build` and the publish directory to `.next`.
4. Add the environment variable `GITHUB_TOKEN` with your GitHub personal access token.
5. Deploy the site.

## Usage

1. Enter the GitHub username and repository name in the provided fields.
2. Optionally, select the programming language (if known). If not selected, the application will auto-detect the language.
3. Click the "Evaluate" button.
4. The results will display the detected language, proficiency classification, and features used in the repository.

## Example

![Example Screenshot](screenshot.png)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [GitHub API](https://docs.github.com/en/rest)
```
