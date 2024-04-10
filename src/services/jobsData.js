const jobsData = [
    {
        title: "Field Service Mechanic A",
        locations: ['Toronto, ON', 'Ottawa, ON', 'Calgary, AB'],
        experience: "3+ years",
        responsibilities: [
            'Performing maintenance and repairs on industrial machinery and equipment.',
            'Troubleshooting mechanical issues and implementing solutions to ensure optimal performance.',
            'Conducting routine inspections and preventive maintenance tasks.',
            'Documenting work performed and maintaining accurate records.',
            'Ensuring compliance with safety regulations and company policies.',
        ],
        positionName: "Field Service Mechanic A"
    },
    {
        title: "Yard Technician",
        locations: ['Mississauga, ON', 'Edmonton, AB', 'Winnipeg, MB'],
        experience: "1+ years",
        responsibilities: [
            'Organizing and maintaining equipment inventory in the yard.',
            'Assisting with equipment loading and unloading operations.',
            'Performing basic equipment maintenance tasks as needed.',
            'Coordinating equipment logistics for delivery and pickup.',
            'Ensuring cleanliness and organization of the yard area.',
        ],
        positionName: "Yard Technician"
    },
    {
        title: "Diesel Technician",
        locations: ['Hamilton, ON', 'Regina, SK', 'Halifax, NS'],
        experience: "2+ years",
        responsibilities: [
            'Diagnosing and repairing diesel engines and related components.',
            'Performing scheduled maintenance tasks and inspections.',
            'Ensuring compliance with safety regulations and procedures.',
            'Maintaining accurate service records and documentation.',
            'Collaborating with other technicians and service personnel.',
        ],
        positionName: "Diesel Technician"
    },
    {
        title: "Floor Care Specialist",
        locations: ['London, ON', 'Victoria, BC', 'Québec City, QC'],
        experience: "1+ years",
        responsibilities: [
            'Cleaning and maintaining various types of floors using specialized equipment and techniques.',
            'Inspecting floors for damage and performing repairs as necessary.',
            'Following safety protocols and maintaining a clean work environment.',
            'Training and supervising junior floor care technicians.',
            'Coordinating floor care schedules and assignments.',
        ],
        positionName: "Floor Care Specialist"
    },
    {
        title: "Mechanic",
        locations: ['Brampton, ON', 'Saskatoon, SK', 'Charlottetown, PE'],
        experience: "3+ years",
        responsibilities: [
            'Performing mechanical repairs and maintenance on heavy equipment and machinery.',
            'Diagnosing equipment issues and implementing effective solutions.',
            'Conducting routine inspections and preventive maintenance tasks.',
            'Troubleshooting electrical and hydraulic systems.',
            'Maintaining accurate service records and documentation.',
        ],
        positionName: "Mechanic"
    },
    {
        title: "Equipment Coordinator",
        locations: ['Thunder Bay, ON', 'Red Deer, AB', 'Fredericton, NB'],
        experience: "2+ years",
        responsibilities: [
            'Coordinating equipment rentals, deliveries, and pickups.',
            'Managing equipment inventory and availability.',
            'Ensuring accurate billing and invoicing for rental transactions.',
            'Providing customer support and resolving rental-related issues.',
            'Collaborating with sales and operations teams.',
        ],
        positionName: "Equipment Coordinator"
    },
    {
        title: "Truck Driver",
        locations: ['Barrie, ON', 'Fort McMurray, AB', 'Saint John, NB'],
        experience: "1+ years",
        responsibilities: [
            'Operating and maintaining commercial trucks to transport goods and materials.',
            'Adhering to safety regulations and traffic laws while driving.',
            'Inspecting trucks and cargo for safety and compliance.',
            'Maintaining accurate driving logs and records.',
            'Communicating effectively with dispatchers and clients.',
        ],
        positionName: "Truck Driver"
    },
    {
        title: "Tractor Trailer Driver",
        locations: ['Kingston, ON', 'Yellowknife, NT', 'Corner Brook, NL'],
        experience: "2+ years",
        responsibilities: [
            'Driving tractor-trailer combinations to transport goods over long distances.',
            'Loading and unloading cargo using appropriate equipment.',
            'Following safety protocols and securing cargo properly.',
            'Completing required documentation and logbooks.',
            'Maintaining the cleanliness and maintenance of the vehicle.',
        ],
        positionName: "Tractor Trailer Driver"
    },
    {
        title: "Crane Truck Driver",
        locations: ['Oakville, ON', 'Whitehorse, YT', 'Sydney, NS'],
        experience: "3+ years",
        responsibilities: [
            'Operating crane trucks to lift and move heavy materials and equipment.',
            'Inspecting crane equipment and performing maintenance tasks.',
            'Adhering to safety regulations and protocols during crane operations.',
            'Communicating with team members to ensure safe and efficient work.',
            'Reporting any equipment issues or safety concerns.',
        ],
        positionName: "Crane Truck Driver"
    },
    {
        title: "Rental Agent",
        locations: ['Richmond Hill, ON', 'Prince Albert, SK', 'Gander, NL'],
        experience: "1+ years",
        responsibilities: [
            'Assisting customers with equipment rental inquiries and reservations.',
            'Providing information about available equipment and rental rates.',
            'Processing rental agreements and payments accurately.',
            'Coordinating equipment logistics for customer pickup and return.',
            'Resolving customer complaints and addressing service issues.',
        ],
        positionName: "Rental Agent"
    },
    {
        title: "Field Operations Specialist",
        locations: ['Kitchener, ON', 'Lethbridge, AB', 'Moncton, NB'],
        experience: "2+ years",
        responsibilities: [
            'Overseeing field operations and ensuring operational efficiency.',
            'Coordinating field service technicians and equipment deployments.',
            'Managing scheduling, logistics, and customer service.',
            'Implementing process improvements and quality standards.',
            'Analyzing data and generating reports on field operations.',
        ],
        positionName: "Field Operations Specialist"
    },
    {
        title: "Supervisor - Payroll and Timekeeping",
        locations: ['Peterborough, ON', 'Fort St. John, BC', 'Fredericton, NB'],
        experience: "3+ years",
        responsibilities: [
            'Supervising payroll and timekeeping activities for employees.',
            'Ensuring accurate and timely processing of payroll transactions.',
            'Reviewing and verifying timecards, attendance records, and wage calculations.',
            'Handling payroll inquiries and resolving payroll-related issues.',
            'Preparing payroll reports and analyzing payroll data for accuracy and compliance.',
        ],
        positionName: "Supervisor - Payroll and Timekeeping"
    },
    {
        title: "Inventory Control Specialist",
        locations: ['Oshawa, ON', 'Fort Nelson, BC', 'Saint John, NB'],
        experience: "2+ years",
        responsibilities: [
            'Managing inventory levels and stock replenishment processes.',
            'Implementing inventory control policies and procedures.',
            'Conducting regular audits to ensure inventory accuracy and integrity.',
            'Coordinating with purchasing and warehouse teams for inventory management.',
            'Analyzing inventory data and optimizing inventory turnover rates.',
        ],
        positionName: "Inventory Control Specialist"
    },
    {
        title: "District Sales Manager",
        locations: ['London, ON', 'Kamloops, BC', 'Halifax, NS'],
        experience: "4+ years",
        responsibilities: [
            'Developing and implementing sales strategies to achieve district sales targets.',
            'Leading and coaching a team of sales representatives.',
            'Building and maintaining strong relationships with key customers.',
            'Analyzing market trends and identifying business opportunities.',
            'Preparing sales forecasts, budgets, and reports.',
        ],
        positionName: "District Sales Manager"
    },
    {
        title: "Territory Sales Representative",
        locations: ['Windsor, ON', 'Kelowna, BC', 'Charlottetown, PE'],
        experience: "1+ years",
        responsibilities: [
            'Prospecting and acquiring new customers within assigned territory.',
            'Presenting and promoting company products and services to potential clients.',
            'Negotiating contracts and closing sales deals.',
            'Providing product demonstrations and training to customers.',
            'Maintaining relationships with existing clients and addressing their needs.',
        ],
        positionName: "Territory Sales Representative"
    }
];
export default jobsData; 