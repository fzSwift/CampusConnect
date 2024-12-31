# CampusConnect Documentation

## Project Overview
CampusConnect is a web application designed to help students and staff manage and participate in campus events. The application is built using React for the frontend and Node.js/Express for the backend, with MongoDB as the database.

https://campus-connect-one-omega.vercel.app/



## Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Styling: CSS Modules
- Font: Poppins (Google Fonts)

## Project Structure

### Frontend (/frontend) 

### Key Components

1. Header Component
- Navigation menu
- Authentication status
- User role-based display
- Responsive design

2. Dashboard Components
- UserDashboard: Personal event management
- AdminDashboard: System-wide management
- Event statistics
- User information

3. Event Management
- EventList: Display all events
- CreateEvent: Event creation form
- EditEvent: Event modification
- Calendar view

4. Authentication
- Login component
- Register component
- JWT-based auth system
- Protected routes

## Styling Guidelines

1. Colors
- Primary: #1a1a1a
- Secondary: #ffffff
- Text: #000000
- Buttons: Various contextual colors

2. Typography
- Font Family: 'Poppins', sans-serif
- Weights: 300, 400, 500, 600, 700
- Responsive text sizing

3. Layout
- Responsive grid system
- Mobile-first approach
- Flexbox for component layouts

## Features

1. User Features
- View and RSVP to events
- Personal dashboard
- Event calendar view
- Profile management

2. Admin Features
- Create/Edit/Delete events
- User management
- System statistics
- Administrative controls

3. Event Features
- Event creation
- RSVP management
- Calendar integration
- Event categories

## API Endpoints

1. Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/verify

2. Events
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id
- POST /api/events/rsvp/:id

3. Users
- GET /api/users/:id
- PUT /api/users/:id
- GET /api/users/events

## State Management
- Local component state using useState
- Custom hooks for API calls
- JWT storage in localStorage

## Responsive Design
- Mobile-first approach
- Breakpoints:
  * Mobile: < 768px
  * Tablet: 768px - 1024px
  * Desktop: > 1024px

## Performance Considerations
1. Image Optimization
- Compressed images
- Lazy loading
- Appropriate sizing

2. Code Splitting
- React.lazy for component loading
- Route-based code splitting

3. Caching
- API response caching
- Static asset caching

## Security Measures
1. Authentication
- JWT token validation
- Protected routes
- Role-based access control

2. Data Protection
- Input validation
- XSS protection
- CSRF protection

## Development Guidelines

1. Code Style
- Use functional components
- Implement proper error handling
- Follow React best practices
- Use meaningful variable names

2. CSS Guidelines
- Use CSS modules
- Follow BEM naming convention
- Maintain consistent spacing
- Use CSS variables for theming

3. Component Structure
- Single responsibility principle
- Reusable components
- Proper prop validation
- Clear component documentation

## Testing
- Unit tests for components
- Integration tests for API
- End-to-end testing
- Performance testing

## Deployment
1. Build Process
- npm run build
- Environment variable configuration
- Build optimization

2. Hosting
- Static hosting for frontend
- Node.js hosting for backend
- Database hosting

## Maintenance
1. Regular Updates
- Security patches
- Dependency updates
- Feature enhancements

2. Monitoring
- Error tracking
- Performance monitoring
- Usage analytics

## Support
For technical support or questions:
- GitHub Issues
- Documentation updates
- Code review process

## Version Control
- Git branching strategy
- Pull request guidelines
- Version tagging

## Future Enhancements
1. Planned Features
- Real-time notifications
- Advanced search
- Social sharing
- Mobile app version

2. Technical Improvements
- Performance optimization
- Additional testing
- Enhanced security
- API expansion

## Contributing
Guidelines for contributing to the project:
1. Fork the repository
2. Create feature branch
3. Submit pull request
4. Follow code style guidelines


## Login 
You Can Login in as  User by default 
admin user: Ben@gmail.com
admin password: 123456
