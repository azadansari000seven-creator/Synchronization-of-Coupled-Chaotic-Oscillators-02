## Storyboard

**Experiment:** Synchronization of Coupled Chaotic Oscillators

### 1. Story outline

Two identical chaotic oscillators start from slightly different states. The learner first watches them evolve independently, then gradually couples them and checks whether their signals move together. The experiment uses three views of the same numerical model: x signals over time, the absolute x difference, and x-y phase portraits.

The learner repeats observations with a larger initial difference, records the recent RMS error, and writes a conclusion supported by the plots. The activity avoids promising that any one coupling strength must synchronize the systems; the result is tied to the selected model and initial conditions.

### 2. Story

The learner arrives at a simulation containing two colored oscillators and adjustable controls. They begin with no coupling, watch the traces separate, and then raise the coupling strength in steps. The plots update as the systems run. The learner uses the error plot to decide whether the x signals stay close, then changes the starting difference and repeats the observation.

#### 2.1 Visual stage

The page begins with the experiment title and a short instruction. A control panel contains coupling strength, initial difference, run/pause, and reset controls. Beside it are a wide time-signal plot, a synchronization-error plot, a phase portrait, and live readouts. A short four-step investigation guide and expandable equation panel appear below the plots.

#### 2.2 User objectives and goals

The learner should explain the role of coupling, compare uncoupled and coupled motion, identify sustained agreement from the signal and error plots, and describe how a changed initial difference affects observations.

#### 2.3 Pathway activities

1. Read the aim and theory, then complete the pre-test.
2. Open the simulation and inspect the default run.
3. Set coupling to zero and record the recent RMS error.
4. Increase coupling gradually, comparing traces and phase portraits at each step.
5. Increase the initial difference and repeat a selected setting.
6. Complete the observation table and analysis questions.
7. Complete the post-test and summarize the evidence.

#### 2.4 Challenges and questions

- Does any nonzero coupling make the signals synchronize?
- Is a single low error value enough to claim synchronization?
- Does a larger initial difference change the transient before the error becomes small?
- Can the phase portrait support the same conclusion as the time plot?

#### 2.5 Possible pitfalls

The learner may mistake a brief error dip for sustained synchronization, confuse coupling strength with error, or compare runs without resetting after changing the initial difference. The procedure prompts them to wait, compare multiple plots, and repeat measurements.

#### 2.6 Conclusion

The learner writes whether the x signals became close for the tested settings and cites the observed traces and RMS error. The conclusion should mention the model and settings and should not claim a universal threshold.

#### 2.7 Equations and formulas

The equations, error definition, parameters, and numerical method are provided on the theory page and in the expandable section of the simulation.

### 3. Flowchart

See [`flowchart/README.md`](flowchart/README.md) for the experiment logic.

### 4. Mind map

See [`mindmap/README.md`](mindmap/README.md) for the experiment concept map.

### 5. Storyboard scenes

See the scene list below. Visual storyboard images can be added after instructor review.

| Scene | Action | On-screen result | Learner decision |
|---:|---|---|---|
| 1 | Open the experiment and read the aim. | Title, model description, and learning pages. | Identify the question being investigated. |
| 2 | Set κ to zero. | Two traces and a nonzero error evolve. | Describe uncoupled behavior. |
| 3 | Increase κ in steps. | Plots and RMS error update. | Record evidence at each setting. |
| 4 | Change initial difference. | Simulation restarts from different x states. | Compare the transient and error. |
| 5 | Complete analysis and post-test. | Learner reports a model-based conclusion. | Support the conclusion with observations. |
