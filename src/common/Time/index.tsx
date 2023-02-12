export const Time = ({ children }: { children: string }) => {
  try {
    return (
      <>
        {new Date(children).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </>
    );
  } catch {
    return null;
  }
};
