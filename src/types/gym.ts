export interface Gym {
  id: string;
  name: string;
  location: string;
}

export interface GymGroup {
  name: string;
  locations: Gym[];
}

export const organizeGymsByBrand = (gyms: Gym[]): GymGroup[] => {
  const groupedGyms = gyms.reduce((acc: { [key: string]: Gym[] }, gym) => {
    const brand = gym.name.split(' - ')[0];
    if (!acc[brand]) {
      acc[brand] = [];
    }
    acc[brand].push(gym);
    return acc;
  }, {});

  return Object.entries(groupedGyms).map(([name, locations]) => ({
    name,
    locations: locations.sort((a, b) => a.location.localeCompare(b.location))
  }));
};