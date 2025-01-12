# React-TypeScript Front-end Project Demo

## Overview

First, a warm welcome and thank your for taking the time to review my project.

This is a frontend demo project developed using the React framework and TypeScript, showcasing my understanding of React and related frontend technologies. I hope it helps you gain a quick insight into my skills.

The project simulates a commercial park management system, or more specifically, a property management system. It includes features such as tenant management, maintenance requests, financial management, equipment tracking, and daily operations.

If this happens to align with your current requirements, that's fantastic! If not, I'm confident that the technologies and approaches demonstrated here can be applied to any project you need.

Feel free to explore my app, and I'm happy to discuss further if you'd like to learn more!

**StaticWeb:** <https://lively-coast-0d2577600.4.azurestaticapps.net>

| Username | Password      |
| -------- | ------------- |
| user     | user123123    |
| manager  | manager123123 |
| admin    | admin123123   |

PS: Regarding TypeScript, I believe it is designed to enhance development efficiency by adding types to areas such as front-end and back-end data interactions or other error-prone parts, rather than enforcing type definitions for everything. If all values and components are strictly typed, it could actually increase development costs instead.

**NOTE: **

**1. This demo is also a record of my own learning, so the comments in the code contain many of my personal notes and do not reflect the commenting style typically used in a real work environment.**

**2. The project uses the Ant Design UI component library. If your team uses others libraries such as Material-UI, Chakra UI or React Bootstrap, etc. I am confident that I can quickly adapt to and utilise them with the same logic.**

**3. The project uses Mock.js to simulate backend APIs, and all data is randomly generated without persistence. As a result, during operation such as deleting users or pagination, you will only see changes in the data rather than real effects (since all data is regenerated each time).**

**4. When demonstrating the functionality of sending request to the backend in the project, the same logic is demonstrate only once, while other cases use static mock data. This simplifies the process and reduces the need for unnecessary work in coding mock APIs.**

**5. I will periodically review and continue developing this project, so some pages contain unused references (please just ignore them).**

## Project Highlights: 

- **User Access Management:**Implemented user permission control and dynamic management.
- **Higher-Order Components**:Created higher-order components for button access control.
- **Performance Optimization**:Optimized performance with lazy loading, useMemo, and useCallback.
- **Excel Export Plugin**: Developed a plugin for exporting Excel files locally with cross-page data selection.
- **List Caching**: Implemented intelligent list caching with conditional adjustments.
- **Reusable Components**: Built reusablecomponents to enhance development efficiency.
- **Data Visualization**: Integrated EChartsto deliver interactive and visually appealing analytics.
- **Advanced Techniques**: Addressed projectchallenges using recursion and higher-order components.



## Project Structure

### api

This folder is used to centralise the management of request methods, making the code clearer and aligns with enterprise-level development practices.

In this way, all requests in the project can directly call these methods. If needed, you can simply pass in the parameters without having to write a complete axios request.

### assets

Static files, such as images.

### components

This is the shared layout component of the page, such as the sidebar, header, etc.

### mock

Simulate backend APIs and generate random data.

The username and password validation here, as well as the simulated token and data, are implemented in the simplest way, merely to mimic the backend. This is not the actual API logic.

### page

This is where all the page components, styles and related files are stored. The styles use SASS, allowing for modular styling to avoid style conflicts and making component management more efficient.

-dashboard: index page

-home: layout page

-login: login page component and style file

-users: Components and interfaces related to tenant management.



### router

The `router` folder manages the application's routing configuration, defining the paths and associated components for different views. It utilises `react-router-dom` for routing and supports features such as lazy loading and route protection to optimise performance and enhance security.

This folder includes:

- **Definition of fixed routes:** Handles main navigation routes like home, login, and error pages.
- **Dynamic route mapping:** Maps additional paths to their respective components dynamically for better scalability.

### store

This section contains Redux-related content, manages slices for different modules, and registers them in Redux.

### utils

Used to store custom utilities and plugins. This file includes a custom-wrapped Axios request utility, a tool for generating route trees, a higher-order component for button control, and a utility for exporting Excel files, etc.