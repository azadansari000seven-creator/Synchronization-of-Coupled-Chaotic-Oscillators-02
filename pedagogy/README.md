## Pedagogy

**Experiment:** Synchronization of Coupled Chaotic Oscillators  
**Discipline:** Physical Sciences  
**Lab:** Nonlinear Dynamics and Chaos Lab

### 1. Focus area

Reinforce nonlinear dynamics and synchronization concepts through a guided numerical experiment.

### 2. Learning objectives and cognitive level

| No. | Learning objective | Cognitive level | Action verb |
|---:|---|---|---|
| 1 | Describe how the coupling term changes the state equations of two oscillators. | Understand | Explain |
| 2 | Compare uncoupled and coupled trajectories using time signals and phase portraits. | Analyze | Compare |
| 3 | Use sustained low synchronization error as evidence when drawing a conclusion. | Evaluate | Justify |
| 4 | Investigate how initial difference affects the observed transient. | Analyze | Investigate |

### 3. Instructional strategy

**Strategy:** Guided inquiry and parameter exploration  
**Assessment method:** Pre-test, simulation observations, observation table, analysis questions, and post-test.

Students first predict what will happen when coupling is absent. They then vary one control at a time, record the RMS error, and use the signal and phase plots to check whether their prediction is supported. The procedure emphasizes evidence over memorizing a presumed threshold.

### 4. Tasks and assessment questions

| No. | Learning objective | Student task | Assessment question |
|---:|---|---|---|
| 1 | Explain the coupling term. | Set κ to zero, then increase it. | Which term allows oscillator 1 to respond to oscillator 2? |
| 2 | Compare trajectories. | Observe signal and phase plots at several κ values. | How does the relationship between x₁ and x₂ change? |
| 3 | Justify a conclusion. | Record error readings at multiple times and settings. | What sustained evidence supports or weakens a synchronization claim? |
| 4 | Investigate initial conditions. | Increase the initial difference and repeat a coupling setting. | How does the initial difference affect the observed transient? |

### 5. Simulator interactions

| No. | Student action | Simulator response | Purpose |
|---:|---|---|---|
| 1 | Set coupling strength κ to zero. | The coupling terms vanish while both Rössler systems continue evolving. | Establish an uncoupled comparison. |
| 2 | Increase κ with the range control. | The model uses the new coupling value and updates all plots. | Explore the effect of coupling. |
| 3 | Change initial difference. | The model restarts with a different initial x separation. | Compare sensitivity to starting states. |
| 4 | Pause, run, or reset. | The simulation stops, resumes, or restarts. | Inspect the plots and repeat observations. |
| 5 | Read RMS error and elapsed time. | Live values summarize the recent x difference and model time. | Quantify and report observations. |
