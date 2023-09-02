export const save = (key, value) => {
    localStorage.setItem(key, btoa(JSON.stringify(value)));
};

export const load = (key) => {
    return JSON.parse(atob(localStorage.getItem(key)));
};

export const keyExists = (key) => localStorage.getItem(key) !== null;