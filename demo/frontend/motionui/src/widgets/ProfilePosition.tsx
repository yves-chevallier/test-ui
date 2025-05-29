import {
  type LucideIcon,
  LocateFixed,
  ArrowLeftToLine,
  ArrowRightToLine,
  Minus,
  Plus,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Square,
  AlertOctagon,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input'; // à adapter si tu utilises un autre champ texte
import { Button } from '@/components/ui/button';

export function ProfilePosition() {
  return (
    <div className="p-4 h-full w-full flex flex-col gap-6 items-center justify-center">
      {/* Ligne 1 : Position cible + boutons min/max/incr/decr */}
      <div className="flex flex-row gap-2 items-end w-full justify-center">
        {/* Champ position cible */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground mb-1">Target Position</span>
          <Input type="number" className="w-28" defaultValue={0} />
        </div>

        {/* Boutons groupés */}
        <div className="flex gap-1 ml-2">
          <Button variant="ghost" size="icon" title="Min">
            <ArrowLeftToLine className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="-10">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="-1">
            <Minus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="+1">
            <Plus className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="+10">
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" title="Max">
            <ArrowRightToLine className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Ligne 2 : Cruise, Acceleration, Deceleration */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <div className="flex items-center gap-3">
          <span className="w-32 text-xs text-muted-foreground">Cruise Velocity</span>
          <Slider className="flex-1" defaultValue={[50]} max={100} step={1} />
          <Input type="number" className="w-20" defaultValue={50} />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-32 text-xs text-muted-foreground">Acceleration</span>
          <Slider className="flex-1" defaultValue={[25]} max={100} step={1} />
          <Input type="number" className="w-20" defaultValue={25} />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-32 text-xs text-muted-foreground">Deceleration</span>
          <Slider className="flex-1" defaultValue={[25]} max={100} step={1} />
          <Input type="number" className="w-20" defaultValue={25} />
        </div>
      </div>

      {/* Ligne 3 : Boutons de commande */}
      <div className="flex flex-row gap-2 mt-2">
        <Button variant="default" size="icon" title="Move">
          <Play className="w-6 h-6" />
        </Button>
        <Button variant="secondary" size="icon" title="Pause">
          <Pause className="w-6 h-6" />
        </Button>
        <Button variant="destructive" size="icon" title="Stop">
          <Square className="w-6 h-6" />
        </Button>
        <Button variant="destructive" size="icon" title="Halt">
          <AlertOctagon className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}

// Métadonnées pour intégration automatique
export const widgetMeta = {
  id: 'ProfilePosition',
  title: 'Profile Position',
  icon: LocateFixed as LucideIcon,
  component: ProfilePosition,
};
