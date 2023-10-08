// @ts-nocheck
export function convertLowerCaseToPascalCase(text: string): string {
    return text?
        .split(" ")
        .map((str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase())
        .join(" ");
}

export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
