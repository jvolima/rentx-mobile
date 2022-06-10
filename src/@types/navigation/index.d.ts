import { CarDTO } from "../../dtos/CarDTO";

interface CarDetailsProps {
  car: CarDTO;
}

interface SchedulingProps {
  car: CarDTO;
}

interface SchedulingDetails {
  car: CarDTO;
  dates: string[];
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: CarDetailsProps;
      Scheduling: SchedulingProps;
      SchedulingDetails: SchedulingDetails;
      SchedulingComplete: undefined;
      MyCars: undefined;
    }
  }
}