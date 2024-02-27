const Q = require('q');

function waitFor(listenable, condition) {
  const deferred = Q.defer();

  const stopListening = listenable.listen((state) => {
    const shouldStopWaiting = !condition || (condition && condition(state));

    if (shouldStopWaiting) {
      stopListening();
      deferred.resolve(state);
    }
  });

  return deferred.promise;
}

waitFor.aMoment = function(ms = 10) {
  return new Promise((resolver) => {
    setTimeout(resolver, ms);
  });
};

waitFor.untilAssertPass = function(assertFn, doneCallback) {
  let waitTime = 0;
  let result = false;
  let err = undefined;

  const MAX_WAIT_TIME = 200;
  const INTERVAL_TIME = 10;

  const intervalToken = setInterval(() => {
    waitTime += INTERVAL_TIME;

    try {
      if (result || waitTime >= MAX_WAIT_TIME) {
        clearInterval(intervalToken);
        doneCallback(err);
      }

      assertFn();
      result = true;
      err = undefined;
    } catch (e) {
      err = e;
    }
  }, INTERVAL_TIME);
};

module.exports = waitFor;
