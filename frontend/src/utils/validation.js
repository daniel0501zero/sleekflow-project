export const validateTodo = (formData) => {
  const errors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Task name is required';
  } else if (formData.name.length < 3) {
    errors.name = 'Task name must be at least 3 characters';
  } else if (formData.name.length > 100) {
    errors.name = 'Task name cannot exceed 100 characters';
  }

  // Status validation
  const validStatuses = ['Not Started', 'In Progress', 'Completed'];
  if (!validStatuses.includes(formData.status)) {
    errors.status = 'Please select a valid status';
  }

  // Due date validation
  if (formData.dueTime) {
    const dueTime = new Date(formData.dueTime);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueTime < today) {
      errors.dueTime = 'Due date cannot be in the past';
    }
    
    // Check if date is too far in future (1 year max)
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    if (dueTime > oneYearFromNow) {
      errors.dueTime = 'Due date cannot be more than 1 year in the future';
    }
  }

  // Description validation
  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  return errors;
};

export const validateOnBlur = (name, value, formData) => {
  const errors = {};
  
  switch (name) {
    case 'name':
      if (!value.trim()) {
        errors.name = 'Task name is required';
      } else if (value.length < 3) {
        errors.name = 'Task name must be at least 3 characters';
      }
      break;
      
    case 'dueTime':
      if (value) {
        const dueTime = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (dueTime < today) {
          errors.dueTime = 'Due date cannot be in the past';
        }
      }
      break;
      
    case 'description':
      if (value && value.length > 500) {
        errors.description = 'Description cannot exceed 500 characters';
      }
      break;
  }
  
  return errors;
};