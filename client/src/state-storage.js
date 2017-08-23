
export const loadState = () => {
  try {
    const serializedState = window.sessionStorage.getItem('state');
    if (serializedState !== null) {
      return JSON.parse(serializedState);
    }
    return undefined;
  } catch (err) {
    console.log('not able to load state', err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    window.sessionStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('not able to save state', err);
  }
};