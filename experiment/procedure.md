## Procedure

### Before you start

Read the theory page. The simulator models two identical Rössler oscillators, initially separated in their x values. The parameter `κ` controls the strength of symmetric coupling.

### Steps to perform the simulation

1. Open the **Simulation** page. The oscillators begin running automatically.
2. Set **Coupling strength κ** to `0`. Observe the x₁ and x₂ traces, the error plot, and the phase portrait for several seconds.
3. Record the recent RMS error in your notebook. Describe whether the signals remain close.
4. Increase κ in small steps, for example `0.1`, `0.3`, `0.6`, and `1.0`. Allow the moving plot to update at each setting, then record the RMS error.
5. Look for two pieces of evidence: whether the x traces overlap over time and whether the error remains small. Also compare the phase portraits.
6. Increase **Initial difference** and repeat the measurements. Changing this control restarts the simulation from a new initial state.
7. Repeat a setting if needed. Use **Pause** to inspect a plot and **Run** to continue. Use **Reset** to restart with the selected settings.
8. In your conclusion, state how coupling affected the motion and cite measurements or plot features. Do not infer synchronization from one brief low-error interval.

### Observation table

| Coupling strength κ | Initial difference | Recent RMS error | Do x traces stay close? | Observation |
|---:|---:|---:|---|---|
| 0.0 | 0.20 |  |  |  |
| 0.1 | 0.20 |  |  |  |
| 0.3 | 0.20 |  |  |  |
| 0.6 | 0.20 |  |  |  |
| 1.0 | 0.20 |  |  |  |
| 0.6 | 0.60 |  |  |  |

### Analysis questions

1. How did the two signals behave at zero coupling?
2. What changed in the error plot as coupling increased?
3. Which observations support your conclusion that the x signals synchronized or did not synchronize?
4. Did increasing the initial difference change the time needed for the error to become small?
5. Why is one low error reading not enough to establish sustained synchronization?

### Expected learning outcome

Learners should observe that coupling can reduce the difference between chaotic oscillators, and should use sustained agreement in the signals and error plot as evidence rather than assuming that every nonzero coupling value guarantees synchronization.
