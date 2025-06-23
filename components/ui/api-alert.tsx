"use client";
import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API copied to clipboard");
  };
  return (
    <Alert className="flex flex-col">
      <div className="flex flex-row space-x-3">
        <Server className="size-4" />
        <AlertTitle className="flex items-center gap-x-2">
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </div>
      <div>
        <AlertDescription className="mt-4 flex items-center justify-between">
          <code className="rounde relative text-ellipsis bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold md:text-base">
            {description}
          </code>
          <Button
            variant="outline"
            onClick={() => onCopy(description)}
            size="sm"
          >
            <Copy className="size-4" />
          </Button>
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default ApiAlert;
