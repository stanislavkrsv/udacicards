import { AsyncStorage }  from 'react-native'
import { Notifications , Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data)=> {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then((status)=> {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: getTomorrowNotificationTime,
                  repeat: 'day'
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
  })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
  return {
    title: 'Pump up your memory',
    body: "🤖 Don't forget about daily Quiz",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'hight',
      sticky: false,
      vibrate: true
    }
  }
}


function getTomorrowNotificationTime() {
  let notificationHours = 20
  let notificationMinutes = 0
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(notificationHours)
  tomorrow.setMinutes(notificationMinutes)
  return tomorrow
}