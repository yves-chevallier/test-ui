// src/widgets/HelloWidget.tsx

import { defineWidget } from './WidgetBase';
import { type LucideIcon, Activity } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const HelloWidget: React.FC = () => {
  return (
    <div className="p-4 text-white h-full w-full flex flex-col items-center justify-center space-y-4">
      <div>Bonjour depuis React + Dockview</div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const widgetMeta = defineWidget({
  id: 'HelloWidget',
  title: 'Status',
  icon: Activity as LucideIcon,
  component: HelloWidget,
});
