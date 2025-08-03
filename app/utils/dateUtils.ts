// Date and time utilities for deadline handling

// Format a date for display
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format time for display
export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format date and time together
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return `${formatDate(dateObj)} at ${formatTime(dateObj)}`;
};

// Calculate time remaining until deadline
export const getTimeRemaining = (
  deadline: string
): {
  total: number; // milliseconds
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOverdue: boolean;
} => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const total = deadlineDate.getTime() - now.getTime();

  const isOverdue = total < 0;
  const absTotal = Math.abs(total);

  const days = Math.floor(absTotal / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (absTotal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((absTotal % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absTotal % (1000 * 60)) / 1000);

  return {
    total: total,
    days,
    hours,
    minutes,
    seconds,
    isOverdue,
  };
};

// Format time remaining as a human-readable string
export const formatTimeRemaining = (deadline: string): string => {
  const timeRemaining = getTimeRemaining(deadline);

  if (timeRemaining.isOverdue) {
    return 'Overdue';
  }

  if (timeRemaining.days > 0) {
    return `${timeRemaining.days}d ${timeRemaining.hours}h`;
  }

  if (timeRemaining.hours > 0) {
    return `${timeRemaining.hours}h ${timeRemaining.minutes}m`;
  }

  if (timeRemaining.minutes > 0) {
    return `${timeRemaining.minutes}m ${timeRemaining.seconds}s`;
  }

  return `${timeRemaining.seconds}s`;
};

// Get urgency level based on time remaining
export const getUrgencyLevel = (
  deadline: string
): 'low' | 'medium' | 'high' | 'critical' => {
  const timeRemaining = getTimeRemaining(deadline);

  if (timeRemaining.isOverdue) {
    return 'critical';
  }

  const totalHours = timeRemaining.total / (1000 * 60 * 60);

  if (totalHours <= 1) {
    return 'critical';
  }

  if (totalHours <= 6) {
    return 'high';
  }

  if (totalHours <= 24) {
    return 'medium';
  }

  return 'low';
};

// Create a deadline date from now
export const createDeadline = (hoursFromNow: number): string => {
  const deadline = new Date();
  deadline.setHours(deadline.getHours() + hoursFromNow);
  return deadline.toISOString();
};

// Create a deadline date for a specific time today
export const createDeadlineForTime = (
  hour: number,
  minute: number = 0
): string => {
  const deadline = new Date();
  deadline.setHours(hour, minute, 0, 0);

  // If the time has already passed today, set it for tomorrow
  if (deadline <= new Date()) {
    deadline.setDate(deadline.getDate() + 1);
  }

  return deadline.toISOString();
};

// Check if a date is today
export const isToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

// Check if a date is tomorrow
export const isTomorrow = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    dateObj.getDate() === tomorrow.getDate() &&
    dateObj.getMonth() === tomorrow.getMonth() &&
    dateObj.getFullYear() === tomorrow.getFullYear()
  );
};

// Get relative time string (e.g., "2 hours ago", "in 3 days")
export const getRelativeTimeString = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();

  const isPast = diff > 0;
  const absDiff = Math.abs(diff);

  const minutes = Math.floor(absDiff / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return isPast
      ? `${days} day${days > 1 ? 's' : ''} ago`
      : `in ${days} day${days > 1 ? 's' : ''}`;
  }

  if (hours > 0) {
    return isPast
      ? `${hours} hour${hours > 1 ? 's' : ''} ago`
      : `in ${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (minutes > 0) {
    return isPast
      ? `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      : `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  return isPast ? 'just now' : 'now';
};
