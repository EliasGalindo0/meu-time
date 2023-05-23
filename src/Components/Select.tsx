import { FunctionComponent } from "react";

interface SelectOptions {
  variant: "select";
}

interface SelectProps {
  value?: string[];
  type: SelectOptions;
}

const Select: FunctionComponent<SelectProps> = () => {
  return (
    <input type="select"></input>
  )
};

export default Select;