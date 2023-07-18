import * as numberInput from "@zag-js/number-input";
import { useMachine, normalizeProps } from "@zag-js/react";
import "./App.css";
import { useId, useState } from "react";

type NumberInputProps = {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  onChange?: numberInput.Context["onChange"];
  onInvalid?: numberInput.Context["onInvalid"];
};

export function NumberInput({
  initial,
  max,
  min,
  step = 1,
  onChange,
  onInvalid,
}: NumberInputProps) {
  const [state, send] = useMachine(
    numberInput.machine({
      id: useId(),
      min,
      max,
      step,
      value: initial?.toString(),
      onChange,
      onInvalid,
    })
  );

  const api = numberInput.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      <label {...api.labelProps}>Enter number:</label>
      <div>
        <button {...api.decrementTriggerProps}>-</button>
        <input {...api.inputProps} />
        <button {...api.incrementTriggerProps}>+</button>
      </div>

      <div {...api.scrubberProps} />

      <button data-part="clear-button" onClick={() => api.setToMin()}>
        Clear
      </button>
    </div>
  );
}

function App() {
  const [val, setValue] = useState(1);

  return (
    <main>
      <h1>Hello Zag!</h1>
      <NumberInput
        min={0}
        max={10000}
        initial={1}
        step={10}
        onChange={(details) => {
          setValue(details.valueAsNumber);
        }}
        onInvalid={() => alert("Incorrect value")}
      />
      <p>Current value is {val}</p>
    </main>
  );
}

export default App;
