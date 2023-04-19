export const getVehicle = (vehicles: any[], id: string) => {
    const vehicle = vehicles.find(v => v.id === id);
    return vehicle;
}