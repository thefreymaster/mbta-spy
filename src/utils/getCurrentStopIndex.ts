export const getCurrentStopIndex = (currentStopId: string, stops: any[]) => {
  if (!stops) {
    return -1;
  }
  let index;
  stops?.map((stop: any, stopIndex: number) =>
    stop?.relationships?.child_stops?.data?.map((childStop: any) => {
      if (childStop?.id === currentStopId) {
        index = stopIndex;
      }
    })
  );
  return index;
};
