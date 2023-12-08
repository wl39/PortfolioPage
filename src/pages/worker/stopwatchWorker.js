// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  onmessage = (message) => {
    let counter = message.data.elapsedTime;

    if (message.data.intervalID) {
      clearInterval(message.data.intervalID);
      return;
    }

    const interval = setInterval(() => {
      counter++;
      postMessage({
        elapsedTime: counter,
        intervalID: interval,
      });
    }, 10);
  };
};
