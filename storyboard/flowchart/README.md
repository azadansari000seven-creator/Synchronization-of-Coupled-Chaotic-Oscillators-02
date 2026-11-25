### Experiment flow

```mermaid
flowchart TD
    A[Read aim and theory] --> B[Complete pre-test]
    B --> C[Start simulation]
    C --> D[Set coupling kappa to zero]
    D --> E[Observe x signals, error, and phase portrait]
    E --> F[Record recent RMS error]
    F --> G{More coupling settings?}
    G -- Yes --> H[Increase coupling and wait]
    H --> E
    G -- No --> I[Change initial difference]
    I --> J[Repeat selected setting]
    J --> K[Analyze observations]
    K --> L[Complete post-test and conclusion]
```

The simulator runs two Rössler systems with a fixed fourth-order Runge–Kutta step. Changing the initial-difference control resets both systems; changing coupling applies the new value to the continuing state.
