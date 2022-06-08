import { CarDTO } from "../../dtos/CarDTO";

interface CarDetailsProps {
  car: CarDTO;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      CarDetails: CarDetailsProps;
      Scheduling: undefined;
      SchedulingDetails: undefined;
      SchedulingComplete: undefined;
    }
  }
}