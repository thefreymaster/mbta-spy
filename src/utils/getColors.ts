export const getNavigationBackgroundColor = ({
  colorScheme,
  colors,
}: {
  colorScheme: "light" | "dark";
  colors: any;
}) => {
  if (colorScheme === "dark") {
    return colors.gray[9];
  }
  return colors.gray[4];
};

export const getNavigationButtonBackgroundColor = ({
  colorScheme,
  colors,
}: {
  colorScheme: "light" | "dark";
  colors: any;
}) => {};

export const getNavigationColor = ({
  colorScheme,
  colors,
}: {
  colorScheme: "light" | "dark";
  colors: any;
}) => {};

export const getColor = ({
  theme,
  active,
  colorScheme,
}: {
  theme: any;
  active: boolean;
  colorScheme: "light" | "dark";
}) => {
  if (active) {
    if (colorScheme === "dark") {
      return theme.colors.gray[0];
    }
    return theme.colors.gray[9];
  }
  if (colorScheme === "dark") {
    return theme.colors.gray[1];
  }
  return theme.colors.gray[7];
};

export const getBackgroundColor = ({
  theme,
  active,
  colorScheme,
}: {
  theme: any;
  active: boolean;
  colorScheme: "light" | "dark";
}) => {
  if (active) {
    if (colorScheme === "dark") {
      return theme.colors.gray[8];
    }
    return theme.colors.gray[1];
  }
  if (colorScheme === "dark") {
    return theme.colors.gray[9];
  }
  return theme.colors.gray[4];
};
