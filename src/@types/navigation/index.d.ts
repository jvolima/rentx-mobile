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

interface SignUpSecondStepProps {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUpFirstStep: undefined;
      SignUpSecondStep: SignUpSecondStepProps;
      Home: undefined;
      CarDetails: CarDetailsProps;
      Scheduling: SchedulingProps;
      SchedulingDetails: SchedulingDetails;
      SchedulingComplete: undefined;
      MyCars: undefined;
    }
  }
}