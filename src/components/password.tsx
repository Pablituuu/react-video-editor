import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

import { Control, Path } from "react-hook-form";
import { FieldValues } from "react-hook-form";

export interface CommonReactHookFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, any>;
}

interface PasswordProps
  extends React.InputHTMLAttributes<
    HTMLInputElement & CommonReactHookFormProps<FieldValues>
  > {}

function Password(props: PasswordProps) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id="password"
        autoComplete="current-password"
        className="block w-full bg-brand-dark-input rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-zinc-800 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
        {...props}
        type={show ? "text" : "password"}
      />
      <div className="absolute right-3 top-[30%]">
        {!show && (
          <EyeIcon
            onClick={() => setShow(true)}
            className="text-gray-400 cursor-pointer h-4"
          />
        )}
        {show && (
          <EyeOffIcon
            onClick={() => setShow(false)}
            className="text-gray-400 cursor-pointer h-4"
          />
        )}
      </div>
    </div>
  );
}

export default Password;
