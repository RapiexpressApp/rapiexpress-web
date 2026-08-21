export type NotificationKind = 'paquete' | 'pago' | 'sistema'

export interface AppNotification {
  id: string
  kind: NotificationKind
  title: string
  description: string
  date: string
  unread: boolean
}
