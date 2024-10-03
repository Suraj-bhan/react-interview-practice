// Interface definition
interface DragAndDropData {
    [key: string]: {
      title: string;
      task: string[];
    };
  }
  
  // Data for drag and drop
  export const dragAndDropData: DragAndDropData = {
    todo: {
      title: "To Do",
      task: [
        "Research for the project", 
        "Design the mockups", 
        "Set up the project structure"
      ],
    },
    inprogress: {
      title: "In Progress",
      task: [
        "Implement authentication", 
        "Develop feature A", 
        "Work on responsive design"
      ],
    },
    inreview: {
      title: "In Review",
      task: [
        "Code Setup", 
        "Mongo database", 
        "Drag and drop design"
      ],
    },
    readyToDeploy: {
      title: "Ready to Deploy",
      task: [
        "Code Setup", 
        "Mongo database", 
        "Drag and drop design"
      ],
    },
    complete: {
      title: "Complete",
      task: [
        "Fix critical bugs", 
        "Deploy to production", 
        "Write project documentation"
      ],
    },
  };
  