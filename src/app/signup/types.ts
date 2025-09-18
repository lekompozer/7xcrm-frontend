export interface SignupData {
    signupMethod: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    company: string;
    phoneNumber: string;
    selectedPlan: string;
    businessGoals: string[];
}

export interface SignupStep1Props {
    onNext: (stepData: Partial<SignupData>) => void;
    initialData: SignupData;
}

export interface SignupStep2Props {
    onPrevious: () => void;
    onComplete: (stepData: Partial<SignupData>) => void;
    initialData: SignupData;
}
