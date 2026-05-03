import * as Notifications from 'expo-notifications';

// Ask user for permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

// Send an instant notification (no trigger)
export const sendBookmarkNotification = async (): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Great Progress 🎉',
      body: 'You have bookmarked 5+ courses!',
    },
    trigger: null, // fires immediately
  });
};

// Schedule a notification after 24 hours
export const scheduleReminderNotification = async (): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Keep Learning 📚',
      body: 'You haven’t opened the app in 24 hours.',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 24, // 24 hours
      repeats: false, // set true if you want daily reminders
    },
  });
};