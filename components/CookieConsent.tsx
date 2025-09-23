import React, { useState, useEffect } from 'react';

function getCookie(name: string): string | null {
    const cookieString = document.cookie;
    if (cookieString === "") {
        return null;
    }

    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }

    return null;
}

function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = getCookie('gdprConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        setCookie('gdprConsent', 'true', 365);
        setShowBanner(false);
        window.location.reload();
    };

    const handleDecline = () => {
        setCookie('gdprConsent', 'false', 365);
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
            <p className="text-sm">
                We use cookies to enhance your experience. By clicking "Accept", you agree to our use of cookies.
            </p>
            <div>
                <button onClick={handleAccept} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                    Accept
                </button>
                <button onClick={handleDecline} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Decline
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
