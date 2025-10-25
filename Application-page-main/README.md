# Application Console

A comprehensive, reusable application management console built with React and AWS Cloudscape Design System. This application can handle both organization and event applications with a scalable, maintainable architecture.

## Features

### 🎯 Core Functionality
- **Dual Application Types**: Supports both organization and event applications
- **Comprehensive Table View**: Sortable, filterable, and paginated application listing
- **Detailed Application View**: Complete application details with tabbed interface
- **Status Management**: Approve/reject applications with reason tracking
- **Comment System**: Add and view comments on applications
- **File Management**: Upload and download files for each application
- **Responsive Design**: Mobile-friendly interface using Cloudscape Design System

### 🏗️ Architecture
- **Reusable Components**: Built for scalability and maintainability
- **Mock API Layer**: Simulated API calls with realistic data structure
- **Type-based Routing**: URL parameters for different application types
- **State Management**: React hooks for efficient state handling
- **Error Handling**: Comprehensive error states and loading indicators

## Technology Stack

- **React 18** - Modern React with hooks
- **AWS Cloudscape Design System** - Professional UI components
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── Pages/
│   ├── ApplicationConsole.jsx    # Main application listing page
│   └── ApplicationDetails.jsx    # Detailed application view
├── data/
│   └── Mock.js                   # Mock API and sample data
├── App.jsx                       # Main app component with routing
├── main.jsx                      # Entry point with theming
└── index.css                     # Global styles
```

## Usage

### Application Console
- **Switch Types**: Use the dropdown to switch between organization and event applications
- **Search**: Filter applications by name, applicant, or ID
- **View Details**: Click on an application ID or use the "View Selected" button
- **Pagination**: Navigate through large lists of applications

### Application Details
- **Details Tab**: View application information and form responses
- **Comments Tab**: Add comments and view comment history
- **Files Tab**: Upload and download files
- **Status Management**: Approve or reject applications with optional reasons

## API Contract

The application follows a defined API contract structure:

### Application Object
```javascript
{
  id: string,
  name: string,
  status: 'pending' | 'approved' | 'rejected',
  submittedAt: string (ISO date),
  type: 'organization' | 'event',
  applicantEmail: string,
  applicantName: string,
  organizationName: string,
  formResponse: object,
  comments: array,
  files: array,
  createdAt: string (ISO date),
  updatedAt: string (ISO date)
}
```

### Mock API Functions
- `getOrganizationApplications()` - Get pending organization applications
- `getEventApplications()` - Get all event applications
- `getApplicationById(id)` - Get specific application details
- `updateApplicationStatus(id, status, comment)` - Update application status
- `addComment(id, comment)` - Add comment to application
- `uploadFile(id, file)` - Upload file for application
- `downloadFile(fileId)` - Download file

## Customization

### Adding New Application Types
1. Add new data structure to `Mock.js`
2. Update the API functions
3. Modify the type switching logic in `ApplicationConsole.jsx`

### Styling
- Global styles: `src/index.css`
- Cloudscape theming: `src/main.jsx`
- Component-specific styles use Cloudscape Design System tokens

### Form Response Rendering
The application automatically renders form responses as key-value pairs. For more sophisticated rendering:
1. Modify the `renderFormResponse()` function in `ApplicationDetails.jsx`
2. Add type-specific rendering logic

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration included
- Prettier recommended for code formatting
- Follow React best practices and hooks patterns

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

3. Configure your web server to serve `index.html` for all routes (SPA routing)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- AWS Cloudscape Design System for the excellent component library
- React team for the amazing framework
- Vite team for the fast build tool