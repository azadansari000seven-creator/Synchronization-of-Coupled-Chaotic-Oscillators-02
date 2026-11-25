## 1. Chaotic oscillators

A nonlinear dynamical system evolves according to rules that depend on its current state. A chaotic system is deterministic, but its long-term trajectory can be very sensitive to small differences in initial conditions. This makes two similar oscillators drift apart when they evolve independently.

This experiment uses the Rössler oscillator, a three-variable continuous-time model. For suitable parameter values, its trajectory is bounded and aperiodic.

## 2. The Rössler model

For oscillator *i*, with state `(xᵢ, yᵢ, zᵢ)`, the equations are:

```text
dxᵢ/dt = −yᵢ − zᵢ
dyᵢ/dt =  xᵢ + a yᵢ
dzᵢ/dt =  b + zᵢ(xᵢ − c)
```

The simulation uses `a = 0.2`, `b = 0.2`, and `c = 5.7`. These are model parameters; they are not physical units.

## 3. Coupling two oscillators

The simulation couples the two systems symmetrically through the x variable:

```text
dx₁/dt = −y₁ − z₁ + κ(x₂ − x₁)     dx₂/dt = −y₂ − z₂ + κ(x₁ − x₂)
dy₁/dt =  x₁ + a y₁                 dy₂/dt =  x₂ + a y₂
dz₁/dt =  b + z₁(x₁ − c)            dz₂/dt =  b + z₂(x₂ − c)
```

Here, `κ` (kappa) is the coupling strength. When `κ = 0`, neither oscillator is influenced by the other. When `κ > 0`, the x coupling terms nudge the oscillators toward each other's x values. Coupling does not guarantee synchronization at every strength or for every model; the outcome must be observed.

## 4. What synchronization means here

Complete synchronization means the corresponding state variables of the two systems evolve together. In this activity, students focus on the x signals. Their absolute difference is

```text
eₓ(t) = |x₁(t) − x₂(t)|
```

The simulator displays this error and the root-mean-square (RMS) error over the most recent 100 samples:

```text
RMS(eₓ) = sqrt(mean(eₓ²))
```

A small, sustained error together with overlapping x traces is evidence that the x signals are synchronized over the displayed interval. A short dip by itself is not enough to establish sustained synchronization. The phase portrait provides a second visual comparison.

## 5. Numerical method and interpretation

The equations are integrated with a fixed-step, fourth-order Runge–Kutta method using a time step of `0.025` model time units. The displayed plots show a moving time window. The simulation is an idealized numerical model: it does not include component tolerances, measurement noise, or an electronic circuit implementation.

## 6. Learning checks

Students should be able to explain the role of `κ`, distinguish uncoupled from coupled behavior, read the synchronization error, and support a conclusion with more than one observation from the plots.
