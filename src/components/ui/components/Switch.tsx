import { Switch } from "@/components/ui/switch";

export function SwitchTab({ id }: { id: string }) {
  return (
    <div className="row-flex-start space-x-2">
      <Switch id={id} className="" />
    </div>
  );
}
