# Data SaaS Platform

A powerful data visualization and analysis platform built with modern web technologies.



## User Stories

### Data Analysts
- "As a data analyst, I want to quickly visualize my dataset using different chart types so that I can identify patterns and trends."
- "As an analyst, I want to apply data transformations like aggregation and filtering so that I can focus on specific aspects of my data."
- "As an analyst, I need to export high-quality charts for my presentations and reports."

### Business Users
- "As a business user, I want to create professional-looking charts without coding so that I can share insights with my team."
- "As a manager, I want to share interactive dashboards with my team so we can collaborate on data analysis."
- "As a stakeholder, I want to access real-time data visualizations so I can make informed decisions quickly."

### Data Scientists
- "As a data scientist, I want to perform advanced statistical analysis and visualize the results."
- "As a researcher, I need to create publication-quality charts with customizable styling options."
- "As a data scientist, I want to automate chart generation through an API for my machine learning pipeline."

### System Administrators
- "As an admin, I want to manage user access and permissions to different data sources."
- "As a system admin, I need to monitor API usage and implement rate limiting."
- "As an admin, I want to ensure data security and compliance with privacy regulations."

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**:
  - TailwindCSS for utility-first styling
  - HeadlessUI for accessible components
  - Heroicons for consistent iconography
- **State Management**: React Context + Hooks
- **Data Visualization**:
  - Plotly.js for interactive charts
  - D3.js for custom visualizations
- **Type Safety**: TypeScript 5

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Database**:
  - PostgreSQL with Prisma ORM
  - Redis for caching
- **Real-time**: Pusher for live updates
- **File Storage**: AWS S3

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**:
  - ESLint for linting
  - Prettier for code formatting
  - Jest for testing
- **API Documentation**: Swagger/OpenAPI

### DevOps & Infrastructure
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel
- **Monitoring**:
  - Sentry for error tracking
  - Vercel Analytics for performance
- **Security**:
  - Rate limiting
  - CORS protection
  - Input validation
  - XSS prevention

## Documentation

For detailed documentation, please refer to:
- [Setup Guide](docs/SETUP.md) - Complete setup and configuration instructions
- [API Documentation](docs/API.md) - API endpoints and usage
- [Component Documentation](docs/COMPONENTS.md) - React component documentation and best practices

## Features

### Data Visualization
- **Rich Chart Types**: Support for 25+ chart types including:
  - Basic: Scatter, Bar, Line, Area
  - Statistical: Box, Violin, Histogram
  - Distributions: Heatmap, Contour
  - 3D: Scatter, Surface, Line, Mesh
  - Financial: Candlestick, OHLC, Waterfall
  - Advanced: Radar, Parallel Coordinates, Sunburst
  - And more!

- **Chart Customization**:
  - Theme selection (default, dark, minimal, vibrant)
  - Custom colors and styling
  - Axis labels and titles
  - Legend positioning
  - Marker size and opacity
  - Chart orientation

### Data Transformation
- Aggregation (sum, average, min, max, count)
- Sorting (ascending/descending)
- Data point limiting
- Column selection
- Real-time updates

### Export Options
- **Chart Export**:
  - High-quality PNG (2x scale)
  - SVG for vector graphics
  - PDF with auto-orientation
  
- **Data Export**:
  - CSV with proper escaping
  - Excel with basic styling
  
### Sharing
- Shareable chart links
- Collaborative viewing
- Real-time updates

### User Profile Management
- Edit profile information (name, email)
- Upload profile pictures (stored in S3)
- Change password with security verification
- Real-time validation and error handling

### Chat Management
- Create and manage chat conversations
- Delete unwanted chat threads
- Persistent chat history

### Settings
- Customize application preferences
- Manage notification settings
- Configure theme and display options

## Configuration

The application requires several environment variables to be set. Create a `.env.local` file with the following:

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# AWS S3
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=

# Optional: OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

See the [Setup Guide](docs/SETUP.md) for detailed configuration instructions.

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/VyuduInc/data-saas.git
cd data-saas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Creating a Chart

1. Import your data (CSV, JSON, or Excel)
2. Select a chart type from the available options
3. Customize the appearance using the Chart Editor:
   - Style tab: Change themes, colors, and layout
   - Data tab: Apply transformations and select columns
   - Export tab: Download or share your visualization

### Example

```typescript
import { ChartEditor } from '@/components/charts/ChartEditor';

function MyChart() {
  const [config, setConfig] = useState<ChartConfig>({
    type: 'line',
    title: 'My Chart',
    data: myData,
    options: {
      theme: 'default',
      showLegend: true
    }
  });

  return (
    <ChartEditor
      config={config}
      onConfigChange={setConfig}
      data={myData}
    />
  );
}
```

## Dependencies

- Next.js
- React
- Plotly.js
- XLSX
- file-saver
- jsPDF
- TailwindCSS
- TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Last Updated

2024-12-13
