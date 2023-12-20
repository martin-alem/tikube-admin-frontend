import { JSX, useState } from "react";
import { Switch } from "@headlessui/react";
import { IToggleProp } from "../../utils/types.ts";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Toggle({ label, onChange }: IToggleProp): JSX.Element {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={(value: boolean) => {
          setEnabled(value);
          onChange(value);
        }}
        className={classNames(
          enabled ? "bg-tk-primary" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-tk-primary focus:ring-offset-2",
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          )}
        />
      </Switch>
      {label ? (
        <Switch.Label as="span" className="ml-3 text-sm">
          <span className="font-medium text-gray-900">{label}</span>
        </Switch.Label>
      ) : null}
    </Switch.Group>
  );
}
