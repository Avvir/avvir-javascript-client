declare const Config: {
    useAcceptanceConfiguration: () => void;
    useProductionConfiguration: () => void;
    useLocalProductionConfiguration: () => void;
    useLocalConfiguration: () => void;
    getConfiguration: () => {
        [key: string]: any;
    };
    sharedErrorHandler: ({ error }: any) => never;
};
export default Config;
