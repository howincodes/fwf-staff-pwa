import React, { ReactNode } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import HowinMapsProvider from "./context/howin-maps-provider";

interface HowinMapsWrapperProps {
    apiKey: string;
    children: ReactNode;
}

const HowinMapsWrapper: React.FC<HowinMapsWrapperProps> = ({ apiKey, children }) => (
    <APIProvider apiKey={apiKey}>
        <HowinMapsProvider>{children}</HowinMapsProvider>
    </APIProvider>
);

export default HowinMapsWrapper;
