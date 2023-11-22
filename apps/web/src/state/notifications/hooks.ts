import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { NotificationDetails } from './reducer'

export function useAllNotifications(subscription: string | undefined): NotificationDetails[] {
  const state: {
    [subscriptionId: string]: {
      notifications: { [notificationId: string]: NotificationDetails }
      unread: { [notificationId: string]: boolean }
      importantAlertsOnly: boolean
    }
  } = useSelector<AppState, AppState['notifications']>((s) => s.notifications)

  if (!subscription) return []
  if (!state[subscription]?.notifications) return []

  const notifications = Object.values(state[subscription].notifications)
  return notifications
}

export function useHasUnreadNotifications(subscription: string | undefined): boolean {
  const state: {
    [subscriptionId: string]: {
      notifications: { [notificationId: string]: NotificationDetails }
      unread: { [notificationId: string]: boolean }
      importantAlertsOnly: boolean
    }
  } = useSelector<AppState, AppState['notifications']>((s) => s.notifications)

  if (!subscription) return false
  if (!state[subscription]?.unread) return false

  const unreadNotifications = Object.values(state[subscription].unread).filter((unread) => !unread)
  return unreadNotifications.length > 0
}

export function useHasUnreadNotification(subscription: string | undefined, notificationId: number): boolean {
  const state: {
    [subscriptionId: string]: {
      notifications: { [notificationId: string]: NotificationDetails }
      unread: { [notificationId: string]: boolean }
      importantAlertsOnly: boolean
    }
  } = useSelector<AppState, AppState['notifications']>((s) => s.notifications)
  if (!subscription) return false
  if (!state[subscription]?.unread) return false
  const unreadNotifications = state[subscription].unread
  return unreadNotifications[notificationId]
}

export function useImportantNotificationsOnly(subscription: string | undefined): boolean {
  const state: {
    [subscriptionId: string]: {
      notifications: { [notificationId: string]: NotificationDetails }
      unread: { [notificationId: string]: boolean }
      importantAlertsOnly: boolean
    }
  } = useSelector<AppState, AppState['notifications']>((s) => s.notifications)

  if (!subscription) return false
  if (!state[subscription]?.importantAlertsOnly) return false

  return state[subscription].importantAlertsOnly
}
