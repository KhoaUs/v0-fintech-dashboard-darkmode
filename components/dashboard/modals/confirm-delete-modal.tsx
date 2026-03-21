"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle } from "lucide-react"

interface ConfirmDeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  itemName?: string
  onConfirm: () => void
  destructive?: boolean
}

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  destructive = true,
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${destructive ? "bg-rose-100 dark:bg-rose-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
              <AlertTriangle className={`h-5 w-5 ${destructive ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`} />
            </div>
            <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="mt-2">
            {description}
            {itemName && (
              <span className="mt-2 block rounded bg-muted px-3 py-2 font-medium text-foreground">
                {itemName}
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={destructive ? "bg-rose-600 hover:bg-rose-700" : "bg-amber-600 hover:bg-amber-700"}
          >
            {destructive ? "Delete" : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
