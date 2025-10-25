// Mock API responses following the contract structure
export const orgApplications = [
  {
    id: "org-101",
    name: "ABC Foundation",
    status: "pending",
    submittedAt: "2025-01-13T10:30:00Z",
    type: "organization",
    applicantEmail: "contact@abcfoundation.org",
    applicantName: "John Smith",
    organizationName: "ABC Foundation",
    formResponse: {
      mission: "To provide quality education for underprivileged children",
      location: "Bhopal, Madhya Pradesh",
      establishedYear: "2015",
      registrationNumber: "REG123456789",
      contactPerson: "John Smith",
      phoneNumber: "+91-9876543210",
      email: "contact@abcfoundation.org",
      website: "https://abcfoundation.org",
      targetAudience: "Children aged 6-18",
      expectedParticipants: 500,
      budget: 50000,
      previousExperience: "Organized 3 successful education camps",
      additionalInfo: "We have a dedicated team of 20 volunteers"
    },
    comments: [
      {
        id: "comment-1",
        text: "Application looks comprehensive, need to verify registration details",
        author: "Admin User",
        timestamp: "2025-01-13T14:20:00Z"
      }
    ],
    files: [
      {
        id: "file-1",
        name: "registration_certificate.pdf",
        size: 245760,
        uploadedAt: "2025-01-13T10:35:00Z",
        type: "application/pdf"
      }
    ],
    createdAt: "2025-01-13T10:30:00Z",
    updatedAt: "2025-01-13T14:20:00Z"
  },
  {
    id: "org-102",
    name: "Green Earth Initiative",
    status: "approved",
    submittedAt: "2025-01-10T09:15:00Z",
    type: "organization",
    applicantEmail: "info@greenearth.org",
    applicantName: "Sarah Johnson",
    organizationName: "Green Earth Initiative",
    formResponse: {
      mission: "Environmental conservation and sustainability education",
      location: "Mumbai, Maharashtra",
      establishedYear: "2018",
      registrationNumber: "REG987654321",
      contactPerson: "Sarah Johnson",
      phoneNumber: "+91-9876543211",
      email: "info@greenearth.org",
      website: "https://greenearth.org",
      targetAudience: "General public and students",
      expectedParticipants: 1000,
      budget: 75000,
      previousExperience: "Organized 5 environmental awareness campaigns",
      additionalInfo: "Partnered with 10+ schools and colleges"
    },
    comments: [
      {
        id: "comment-2",
        text: "Excellent proposal, approved for funding",
        author: "Review Committee",
        timestamp: "2025-01-11T16:45:00Z"
      }
    ],
    files: [
      {
        id: "file-2",
        name: "project_proposal.pdf",
        size: 512000,
        uploadedAt: "2025-01-10T09:20:00Z",
        type: "application/pdf"
      },
      {
        id: "file-3",
        name: "budget_breakdown.xlsx",
        size: 128000,
        uploadedAt: "2025-01-10T09:25:00Z",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    ],
    createdAt: "2025-01-10T09:15:00Z",
    updatedAt: "2025-01-11T16:45:00Z"
  }
];

export const eventApplications = [
  {
    id: "evt-201",
    name: "TechFest 2025",
    status: "pending",
    submittedAt: "2025-01-12T14:30:00Z",
    type: "event",
    applicantEmail: "organizer@techfest2025.com",
    applicantName: "Mike Chen",
    organizationName: "TechFest Organizing Committee",
    formResponse: {
      eventName: "TechFest 2025",
      theme: "AI and Machine Learning Innovation",
      location: "Delhi, India",
      eventDate: "2025-03-15",
      duration: "3 days",
      expectedParticipants: 2000,
      targetAudience: "Students, professionals, and tech enthusiasts",
      eventType: "Conference and Hackathon",
      budget: 200000,
      sponsors: ["TechCorp", "InnovateLabs", "FutureTech"],
      speakers: ["Dr. AI Expert", "Prof. ML Specialist", "Industry Leader"],
      agenda: "Day 1: Keynotes, Day 2: Workshops, Day 3: Hackathon",
      technicalRequirements: "High-speed internet, projection systems, laptops",
      accommodation: "Partner hotels for outstation participants",
      catering: "Breakfast, lunch, and dinner for all participants",
      marketing: "Social media, tech blogs, university partnerships",
      previousExperience: "Organized 2 successful tech conferences",
      additionalInfo: "Focus on practical AI applications and real-world projects"
    },
    comments: [
      {
        id: "comment-3",
        text: "Great event concept, reviewing technical requirements",
        author: "Event Coordinator",
        timestamp: "2025-01-12T16:00:00Z"
      }
    ],
    files: [
      {
        id: "file-4",
        name: "event_proposal.pdf",
        size: 1024000,
        uploadedAt: "2025-01-12T14:35:00Z",
        type: "application/pdf"
      },
      {
        id: "file-5",
        name: "venue_agreement.pdf",
        size: 768000,
        uploadedAt: "2025-01-12T14:40:00Z",
        type: "application/pdf"
      }
    ],
    createdAt: "2025-01-12T14:30:00Z",
    updatedAt: "2025-01-12T16:00:00Z"
  },
  {
    id: "evt-202",
    name: "Cultural Heritage Festival",
    status: "rejected",
    submittedAt: "2025-01-08T11:20:00Z",
    type: "event",
    applicantEmail: "heritage@culturefest.org",
    applicantName: "Priya Sharma",
    organizationName: "Cultural Heritage Society",
    formResponse: {
      eventName: "Cultural Heritage Festival",
      theme: "Preserving Traditional Arts and Crafts",
      location: "Jaipur, Rajasthan",
      eventDate: "2025-02-20",
      duration: "2 days",
      expectedParticipants: 500,
      targetAudience: "Artists, students, cultural enthusiasts",
      eventType: "Exhibition and Workshop",
      budget: 75000,
      sponsors: ["Heritage Foundation", "Art Council"],
      speakers: ["Master Craftsman", "Cultural Historian", "Art Curator"],
      agenda: "Day 1: Exhibition, Day 2: Workshops and demonstrations",
      technicalRequirements: "Display stands, audio system, lighting",
      accommodation: "Local guesthouses",
      catering: "Traditional Rajasthani cuisine",
      marketing: "Cultural magazines, art galleries, social media",
      previousExperience: "Organized 1 cultural event",
      additionalInfo: "Focus on traditional pottery, textiles, and folk music"
    },
    comments: [
      {
        id: "comment-4",
        text: "Budget exceeds available funding for this category",
        author: "Funding Committee",
        timestamp: "2025-01-09T10:30:00Z"
      },
      {
        id: "comment-5",
        text: "Consider reducing scope or finding additional sponsors",
        author: "Review Committee",
        timestamp: "2025-01-09T11:15:00Z"
      }
    ],
    files: [
      {
        id: "file-6",
        name: "cultural_proposal.pdf",
        size: 640000,
        uploadedAt: "2025-01-08T11:25:00Z",
        type: "application/pdf"
      }
    ],
    createdAt: "2025-01-08T11:20:00Z",
    updatedAt: "2025-01-09T11:15:00Z"
  }
];

// API simulation functions
export const mockAPI = {
  // Get organization applications (pending)
  getOrganizationApplications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: orgApplications.filter(app => app.status === 'pending'),
          total: orgApplications.filter(app => app.status === 'pending').length
        });
      }, 500);
    });
  },

  // Get event applications
  getEventApplications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: eventApplications,
          total: eventApplications.length
        });
      }, 500);
    });
  },

  // Get application by ID
  getApplicationById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const allApplications = [...orgApplications, ...eventApplications];
        const application = allApplications.find(app => app.id === id);
        if (application) {
          resolve({ data: application });
        } else {
          reject(new Error('Application not found'));
        }
      }, 300);
    });
  },

  // Update application status
  updateApplicationStatus: async (id, status, comment) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would make an API call
        console.log(`Updating application ${id} to ${status} with comment: ${comment}`);
        resolve({ success: true });
      }, 1000);
    });
  },

  // Add comment to application
  addComment: async (id, comment) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Adding comment to application ${id}: ${comment}`);
        resolve({ success: true });
      }, 500);
    });
  },

  // Upload file
  uploadFile: async (id, file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Uploading file ${file.name} for application ${id}`);
        resolve({ 
          success: true, 
          fileId: `file-${Date.now()}`,
          fileName: file.name,
          fileSize: file.size
        });
      }, 1000);
    });
  },

  // Download file
  downloadFile: async (fileId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Downloading file ${fileId}`);
        resolve({ success: true });
      }, 500);
    });
  }
};
