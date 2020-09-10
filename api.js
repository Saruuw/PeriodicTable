var api = (function () {
  async function fetchData(path) {
    let promise = await fetch(path);
    let data = promise.json();
    return data;
  }

  return {
    fetchData: fetchData,
  };
})();
