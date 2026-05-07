export function shouldStop({
  iter,
  maxIter,
  error,
  tolerance
}) {

  if (
    tolerance !== null &&
    error !== null &&
    error <= tolerance
  ) {
    return {
      stop: true,
      reason: "Tolerance reached"
    };
  }

  if (
    maxIter !== null &&
    iter >= maxIter
  ) {
    return {
      stop: true,
      reason: "Maximum iteration reached"
    };
  }

  return {
    stop: false,
    reason: null
  };
}