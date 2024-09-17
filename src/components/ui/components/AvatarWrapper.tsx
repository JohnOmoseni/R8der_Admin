import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  fallback?: string;
  containerClassName?: string;
};

function AvatarWrapper({ src, fallback, containerClassName }: AvatarProps) {
  return (
    <Avatar
      className={cn(
        "icon blend-image bg-background-100 transition-all hover:scale-95 active:scale-105",
        containerClassName,
      )}
    >
      <AvatarImage src={src ?? "/images/profile.png"} />
      <AvatarFallback>{fallback ?? "QA"}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarWrapper;
