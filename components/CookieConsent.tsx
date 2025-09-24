import React, { useState, useEffect } from 'react';

// This interface now matches the gtag consent types
export interface GtagConsent {
    analytics_storage: 'granted' | 'denied';
    ad_storage: 'granted' | 'denied';
    ad_user_data: 'granted' | 'denied';
    ad_personalization: 'granted' | 'denied';
}

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const CookieConsent: React.FC = () => {
    const [view, setView] = useState<'hidden' | 'banner' | 'customize'>('hidden');

    // State to manage the granular consent choices
    const [prefs, setPrefs] = useState<GtagConsent>({
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
    });

    useEffect(() => {
        // Define gtag and dataLayer on window
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
            window.dataLayer.push(args);
        };

        // Set default consent to 'denied' for all types
        window.gtag("consent", "default", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied",
        });

        // Check localStorage for a previous consent decision
        const consent = localStorage.getItem("gtag_consent");
        if (!consent) {
            // If no consent is stored, show the banner
            setView('banner');
        } else {
            // If consent is stored, parse it and update gtag
            try {
                const savedPrefs: GtagConsent = JSON.parse(consent);
                window.gtag("consent", "update", savedPrefs);
            } catch {
                // If parsing fails, show the banner
                setView('banner');
            }
        }
    }, []);

    const handleToggle = (key: keyof GtagConsent) => {
        setPrefs(currentPrefs => ({
            ...currentPrefs,
            [key]: currentPrefs[key] === 'granted' ? 'denied' : 'granted'
        }));
    };

    const savePreferences = (preferences: GtagConsent) => {
        window.gtag("consent", "update", preferences);
        localStorage.setItem('gtag_consent', JSON.stringify(preferences));
        setView('hidden');
        // Reloading might still be useful to ensure all scripts load correctly based on new consent
        window.location.reload();
    };

    const handleAcceptAll = () => {
        const allGranted: GtagConsent = {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
        };
        savePreferences(allGranted);
    };

    const handleDeclineAll = () => {
        const allDenied: GtagConsent = {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        };
        savePreferences(allDenied);
    };

    const handleSave = () => {
        savePreferences(prefs);
    };

    if (view === 'hidden') {
        return null;
    }

    if (view === 'customize') {
        return (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">We value your privacy</h2>
                    <p className="text-sm mb-6">We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. You can customize your consent below.</p>

                    <div className="space-y-4">
                        <CookieOption label="Necessary Cookies" description="These cookies are essential for the website to function and cannot be switched off in our systems." enabled={true} onToggle={() => { }} disabled={true} />
                        <CookieOption label="Analytics Storage" description="Enables storage, such as cookies, related to analytics (e.g., visit duration)." enabled={prefs.analytics_storage === 'granted'} onToggle={() => handleToggle('analytics_storage')} />
                        <CookieOption label="Ad Storage" description="Enables storage, such as cookies, related to advertising." enabled={prefs.ad_storage === 'granted'} onToggle={() => handleToggle('ad_storage')} />
                        <CookieOption label="Ad User Data" description="Sets consent for sending user data to Google for advertising purposes." enabled={prefs.ad_user_data === 'granted'} onToggle={() => handleToggle('ad_user_data')} />
                        <CookieOption label="Ad Personalization" description="Sets consent for personalized advertising." enabled={prefs.ad_personalization === 'granted'} onToggle={() => handleToggle('ad_personalization')} />
                    </div>

                    <div className="flex justify-end items-center mt-6 space-x-4">
                        <button onClick={handleDeclineAll} className="text-gray-400 hover:text-white px-4 py-2">Decline All</button>
                        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Preferences</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                    <h2 className="text-lg font-bold">We value your privacy</h2>
                    <p className="text-sm">We use cookies to enhance your browsing experience, analyze our traffic, and for personalized advertising. By clicking "Accept All", you consent to our use of cookies.</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <button onClick={handleDeclineAll} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Decline</button>
                    <button onClick={() => setView('customize')} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Customize</button>
                    <button onClick={handleAcceptAll} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Accept All</button>
                </div>
            </div>
        </div>
    );
};

interface CookieOptionProps {
    label: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

const CookieOption: React.FC<CookieOptionProps> = ({ label, description, enabled, onToggle, disabled = false }) => (
    <div>
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">{label}</h3>
            <label className="switch">
                <input type="checkbox" checked={enabled} onChange={onToggle} disabled={disabled} />
                <span className="slider round"></span>
            </label>
        </div>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

export default CookieConsent;