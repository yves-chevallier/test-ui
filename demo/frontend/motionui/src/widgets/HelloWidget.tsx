// src/widgets/HelloWidget.tsx

import { defineWidget } from './WidgetBase';
import { type LucideIcon, Activity } from 'lucide-react';
import { type WidgetComponentProps } from '@/widgets/WidgetBase';
import { useEffect } from 'react';
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

const statusword = [
  {
    status: true,
    name: 'Ready to switch on',
  },
  {
    status: false,
    name: 'Switched On',
  },
  {
    status: false,
    name: 'Fault',
  },
  {
    status: false,
    name: 'Voltage Enabled',
  },
  {
    status: false,
    name: 'Quick Stop',
  },
  {
    status: false,
    name: 'Switch On Disabled',
  },
  {
    status: false,
    name: 'Warning',
  },
  {
    status: false,
    name: 'Target Reached',
  },
  {
    status: false,
    name: 'Remote',
  },
  {
    status: false,
    name: 'Internal Limits Active',
  },
];

const modeSpecific = {
  profilePosition: [
    {
      status: true,
      bit: 13,
      name: 'Following Error',
    },
    {
      status: false,
      bit: 12,
      name: 'Set-point acknowledge',
    },
  ],
  profileVelocity: [
    {
      status: true,
      bit: 12,
      name: 'Speed bit',
    },
  ],
  homing: [
    {
      status: true,
      bit: 12,
      name: 'Homing attained',
    },
    {
      status: false,
      bit: 13,
      name: 'Homing error',
    },
  ],
};

export const HelloWidget: React.FC<WidgetComponentProps> = ({ api }) => {
  useEffect(() => {
    api.onMount = () => console.log('Mounted HelloWidget');
    api.onUnmount = () => console.log('Unmounted HelloWidget');
  }, []);
  return (
    <div className="p-4 text-white h-full w-full flex flex-col items-center justify-center space-y-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Statusword</CardTitle>
          <CardDescription>CANopen drive status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {statusword.map(word => (
                <TableRow key={word.name}>
                  <TableCell>
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${word.status ? 'bg-green-400' : 'bg-red-400'}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{word.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Mode Specific</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {modeSpecific.profilePosition.map(word => (
                <TableRow key={word.name}>
                  <TableCell>
                    <span
                      className={`inline-block h-3 w-3 rounded-full ${word.status ? 'bg-green-400' : 'bg-red-400'}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{word.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export const widgetMeta = defineWidget({
  id: 'HelloWidget',
  title: 'Status',
  icon: Activity as LucideIcon,
  component: HelloWidget,
});
