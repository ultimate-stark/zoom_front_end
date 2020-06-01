export interface Theme {
  name: string;
  properties: Object;
}

export const dark: Theme = {
  name: "dark",
  properties: {
    // Colors
    "--mainColor": "#3c3c3c",
    "--secColor": "#686868",
    "--inputFocusColor": "#c4c4c4",
    // Rgba Colors
    "--rgbaInputFocusColor": "rgba(196, 196, 196, 0.3)",
    "--rgbaSecColor": "rgba(104, 104, 104, 0.6)",
    "--rgbaMainColor": "rgba(60, 60, 60, 1)"
  }
}

export const blue: Theme = {
  name: "blue",
  properties: {
    // Colors
    "--mainColor": "#6fa1fc",
    "--secColor": "#9fb4d9",
    "--inputFocusColor": "#b2cbfa",
    // Rgba Colors
    "--rgbaInputFocusColor": "rgba(178, 203, 250, 0.3)",
    "--rgbaSecColor": "rgba(159, 180, 217, 0.6)",
    "--rgbaMainColor": "rgba(111, 161, 252, 1)",
  }
}

export const green: Theme = {
  name: "green",
  properties: {
    // Colors
    "--mainColor": "#40b440",
    "--secColor": "#78be78",
    "--inputFocusColor": "#b5dfb5",
    // Rgba Colors
    "--rgbaInputFocusColor": "rgba(181, 223, 181, 0.3)",
    "--rgbaSecColor": "rgba(120, 190, 120, 0.6)",
    "--rgbaMainColor": "rgba(64, 180, 64, 1)"
  }
}

export const purple: Theme = {
  name: "purple",
  properties: {
    // Colors
    "--mainColor": "#a344a3",
    "--secColor": "#c67ec6",
    "--inputFocusColor": "#fabcfa",
    // Rgba Colors
    "--rgbaInputFocusColor": "rgba(250, 188, 250, 0.3)",
    "--rgbaSecColor": "rgba(198, 126, 198, 0.6)",
    "--rgbaMainColor": "rgba(163, 68, 163, 1)"
  }
}
