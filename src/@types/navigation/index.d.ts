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

interface ConfirmationProps {
  title: string;
  message: string;
  nextScreenRoute: 'SignIn' | 'SignUpFirstStep' | 'SignUpSecondStep' | 'Home' | 'CarDetails' | 'Scheduling' | 'SchedulingDetails' | 'Confirmation' | 'MyCars'
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
      Confirmation: ConfirmationProps;
      MyCars: undefined;
    }
  }
}