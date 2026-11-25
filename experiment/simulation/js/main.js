(() => {
  'use strict';

  const PARAMS = { a: 0.2, b: 0.2, c: 5.7 };
  const DT = 0.025;
  const WINDOW = 440;
  const WARMUP_STEPS = 1200;
  const COLORS = {
    first: '#78ad45', second: '#e98259', grid: '#e8eee8',
    label: '#84938a', background: '#ffffff'
  };

  const byId = id => document.getElementById(id);
  const controls = { coupling: byId('coupling'), difference: byId('difference') };
  const canvases = { time: byId('timePlot'), error: byId('errorPlot'), phase: byId('phasePlot') };
  let state = [0.1, 0, 0, 0.3, 0, 0];
  let samples = [];
  let elapsed = 0;
  let isRunning = true;
  let frame = 0;
  let previousFrameTime = 0;
  let timeAccumulator = 0;

  function derivative(values, k) {
    const [x1, y1, z1, x2, y2, z2] = values;
    const { a, b, c } = PARAMS;
    return [
      -y1 - z1 + k * (x2 - x1),
      x1 + a * y1,
      b + z1 * (x1 - c),
      -y2 - z2 + k * (x1 - x2),
      x2 + a * y2,
      b + z2 * (x2 - c)
    ];
  }

  function offset(values, slope, scale) {
    return values.map((value, index) => value + slope[index] * scale);
  }

  function rk4(values, k) {
    const k1 = derivative(values, k);
    const k2 = derivative(offset(values, k1, DT / 2), k);
    const k3 = derivative(offset(values, k2, DT / 2), k);
    const k4 = derivative(offset(values, k3, DT), k);
    return values.map((value, index) => value + DT * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index]) / 6);
  }

  function advance(record = true) {
    state = rk4(state, Number(controls.coupling.value));
    elapsed += DT;
    if (record) {
      samples.push({ t: elapsed, x1: state[0], y1: state[1], x2: state[3], y2: state[4], error: Math.abs(state[0] - state[3]) });
      if (samples.length > WINDOW) samples.shift();
    }
  }

  function restartModel() {
    const separation = Number(controls.difference.value);
    state = [0.1, 0, 0, 0.1 + separation, 0, 0];
    samples = [];
    elapsed = 0;
    timeAccumulator = 0;
    for (let i = 0; i < WARMUP_STEPS; i += 1) advance(false);
    for (let i = 0; i < WINDOW; i += 1) advance(true);
    render();
  }

  function prepareCanvas(canvas) {
    const bounds = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const context = canvas.getContext('2d');
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, bounds.width, bounds.height);
    return { context, width: bounds.width, height: bounds.height };
  }

  function drawGrid(context, width, height, pad, min, max, showLabels = true) {
    const box = { left: pad.left, right: width - pad.right, top: pad.top, bottom: height - pad.bottom };
    context.strokeStyle = COLORS.grid;
    context.fillStyle = COLORS.label;
    context.lineWidth = 1;
    context.font = '9px ui-monospace, monospace';
    for (let row = 0; row <= 4; row += 1) {
      const y = box.top + (box.bottom - box.top) * row / 4;
      context.beginPath();
      context.moveTo(box.left, y);
      context.lineTo(box.right, y);
      context.stroke();
      if (showLabels) {
        const value = max - (max - min) * row / 4;
        context.fillText(value.toFixed(max - min < 10 ? 1 : 0), 2, y + 3);
      }
    }
    return box;
  }

  function drawLine(context, points, xFor, yFor, color, lineWidth = 1.7) {
    if (points.length < 2) return;
    context.beginPath();
    points.forEach((point, index) => {
      const x = xFor(point);
      const y = yFor(point);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();
  }

  function drawSignals() {
    const { context, width, height } = prepareCanvas(canvases.time);
    const pad = { left: 34, right: 9, top: 8, bottom: 7 };
    const values = samples.flatMap(sample => [sample.x1, sample.x2]);
    let min = Math.min(-10, ...values);
    let max = Math.max(10, ...values);
    const extra = (max - min) * 0.04;
    min -= extra;
    max += extra;
    const box = drawGrid(context, width, height, pad, min, max);
    const x = index => box.left + (box.right - box.left) * index / Math.max(1, samples.length - 1);
    const y = value => box.bottom - (value - min) / (max - min) * (box.bottom - box.top);
    drawLine(context, samples.map((sample, index) => ({ index, value: sample.x1 })), point => x(point.index), point => y(point.value), COLORS.first);
    drawLine(context, samples.map((sample, index) => ({ index, value: sample.x2 })), point => x(point.index), point => y(point.value), COLORS.second);
  }

  function drawError() {
    const { context, width, height } = prepareCanvas(canvases.error);
    const pad = { left: 34, right: 9, top: 8, bottom: 7 };
    const peak = Math.max(0.5, ...samples.map(sample => sample.error));
    const max = Math.min(20, Math.max(0.5, peak * 1.08));
    const box = drawGrid(context, width, height, pad, 0, max);
    drawLine(context, samples.map((sample, index) => ({ index, value: sample.error })),
      point => box.left + (box.right - box.left) * point.index / Math.max(1, samples.length - 1),
      point => box.bottom - point.value / max * (box.bottom - box.top), COLORS.first, 1.8);
  }

  function drawPhase() {
    const { context, width, height } = prepareCanvas(canvases.phase);
    const pad = { left: 33, right: 9, top: 8, bottom: 7 };
    const minX = -12, maxX = 12, minY = -14, maxY = 14;
    const box = drawGrid(context, width, height, pad, minY, maxY);
    const x = value => box.left + (value - minX) / (maxX - minX) * (box.right - box.left);
    const y = value => box.bottom - (value - minY) / (maxY - minY) * (box.bottom - box.top);
    drawLine(context, samples, point => x(point.x1), point => y(point.y1), COLORS.first, 1.35);
    drawLine(context, samples, point => x(point.x2), point => y(point.y2), COLORS.second, 1.35);
  }

  function updateMeasurements() {
    const recent = samples.slice(-100);
    const rms = Math.sqrt(recent.reduce((sum, sample) => sum + sample.error ** 2, 0) / Math.max(1, recent.length));
    byId('rmsValue').textContent = rms.toFixed(3);
    byId('elapsedValue').textContent = elapsed.toFixed(1);

    const lowError = Number(controls.coupling.value) > 0 && rms < 0.15;
    byId('syncStatus').textContent = lowError ? 'Low synchronization error' : 'Signals remain different';
    byId('syncDetail').textContent = lowError
      ? 'The recent x-signal difference is small; check that it remains low.'
      : 'Increase κ and compare the recent error with the signal plot.';
    byId('statusLight').classList.toggle('synced', lowError);
  }

  function render() {
    drawSignals();
    drawError();
    drawPhase();
    updateMeasurements();
  }

  function animate(now) {
    if (!isRunning) return;
    if (!previousFrameTime) previousFrameTime = now;
    timeAccumulator += Math.min(100, now - previousFrameTime) / 1000;
    previousFrameTime = now;
    const batchDuration = DT * 8;
    while (timeAccumulator >= batchDuration) {
      for (let step = 0; step < 8; step += 1) advance();
      timeAccumulator -= batchDuration;
    }
    render();
    frame = window.requestAnimationFrame(animate);
  }

  function setRunning(value) {
    isRunning = value;
    byId('runBtn').innerHTML = isRunning ? 'Ⅱ &nbsp; Pause' : '▶ &nbsp; Run';
    byId('runBtn').setAttribute('aria-pressed', String(isRunning));
    previousFrameTime = 0;
    if (isRunning) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(animate);
    }
  }

  controls.coupling.addEventListener('input', () => {
    byId('kValue').value = Number(controls.coupling.value).toFixed(2);
    render();
  });
  controls.difference.addEventListener('input', () => {
    byId('dValue').value = Number(controls.difference.value).toFixed(2);
    restartModel();
  });
  byId('runBtn').addEventListener('click', () => setRunning(!isRunning));
  byId('resetBtn').addEventListener('click', () => {
    restartModel();
    setRunning(true);
  });
  window.addEventListener('resize', render);

  byId('kValue').value = Number(controls.coupling.value).toFixed(2);
  byId('dValue').value = Number(controls.difference.value).toFixed(2);
  restartModel();
  frame = window.requestAnimationFrame(animate);
})();
