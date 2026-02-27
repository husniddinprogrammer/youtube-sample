// Performance logging utilities
export const logVideoRenderTime = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log(`🎬 VideoGrid Performance Metrics:`);
  console.log(`├─ Component: ${id}`);
  console.log(`├─ Phase: ${phase}`);
  console.log(`├─ Actual Duration: ${actualDuration.toFixed(2)}ms`);
  console.log(`├─ Base Duration: ${baseDuration.toFixed(2)}ms`);
  console.log(`├─ Start Time: ${startTime.toFixed(2)}ms`);
  console.log(`└─ Commit Time: ${commitTime.toFixed(2)}ms`);
  
  // Log performance warnings
  if (actualDuration > 100) {
    console.warn(`⚠️  Slow render detected: ${actualDuration.toFixed(2)}ms for ${id}`);
  }
  
  if (actualDuration > baseDuration * 2) {
    console.warn(`⚠️  Render significantly slower than baseline: ${((actualDuration / baseDuration) * 100).toFixed(1)}% of expected`);
  }
};

export const logVideoCardRenderTime = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  const videoId = id.split('-')[1] || 'unknown';
  console.log(`📹 VideoCard Performance (Video #${videoId}):`);
  console.log(`├─ Phase: ${phase}`);
  console.log(`├─ Render Time: ${actualDuration.toFixed(2)}ms`);
  console.log(`└─ Timestamp: ${new Date().toISOString()}`);
  
  // Track slow video cards
  if (actualDuration > 50) {
    console.warn(`🐌 Slow VideoCard #${videoId}: ${actualDuration.toFixed(2)}ms`);
  }
};

export const logAppPerformance = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
  console.log(`🚀 App Performance Metrics:`);
  console.log(`├─ Phase: ${phase}`);
  console.log(`├─ Total Render Time: ${actualDuration.toFixed(2)}ms`);
  console.log(`├─ Expected Time: ${baseDuration.toFixed(2)}ms`);
  console.log(`└─ Performance Ratio: ${(actualDuration / baseDuration).toFixed(2)}x`);
  
  // Critical performance warnings
  if (actualDuration > 500) {
    console.error(`🔥 Critical: App render took ${actualDuration.toFixed(2)}ms`);
  }
};

export const startPerformanceTimer = (label) => {
  console.log(`⏱️  Starting timer: ${label}`);
  return performance.now();
};

export const endPerformanceTimer = (startTime, label) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`⏱️  ${label} completed in ${duration.toFixed(2)}ms`);
  return duration;
};
