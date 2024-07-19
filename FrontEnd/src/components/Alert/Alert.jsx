import React, { useState, useEffect } from 'react';
import './Alert.css';
import { createRoot } from 'react-dom/client';

const Notify = {
    success: (message) => showNotification("https://www.svgrepo.com/show/111210/success.svg", "Success", message, 'success', 'green'),
    fail: (message) => showNotification("https://www.svgrepo.com/show/13658/error.svg", "Failed", message, 'fail', 'red'),
    warning: (message) => showNotification("https://www.svgrepo.com/show/97426/warning.svg", "Warning", message, 'warning', 'orange'),
    info: (message) => showNotification("https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_informations.svg/800px-Logo_informations.svg.png", "Info", message, 'info', 'blue'),
};

const showNotification = (icon, title, message, type, color) => {
    const notificationContainer = document.createElement('div');
    document.body.appendChild(notificationContainer);

    const Notification = () => {
        const [closing, setClosing] = useState(false);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                setClosing(true);
                setTimeout(() => closeNotification(), 1000); // Matches the animation duration
            }, 3000);

            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.animation = 'progress 3s linear forwards';
                progressBar.style.backgroundColor = color;
            }

            return () => {
                clearTimeout(timeoutId);
            };
        }, []);

        const closeNotification = () => {
            root.unmount();
            notificationContainer.remove();
        };

        const handleClose = () => {
            setClosing(true);
            setTimeout(() => closeNotification(), 1000); // Matches the animation duration
        };

        return (
            <div className={`alert ${type} ${closing ? 'closing' : ''}`}>
                <img src={icon} alt="" />
                <div className='message'>
                    <span className='title'>{title}</span>
                    <br />
                    <span className='inner-message'>{message}</span>
                </div>
                <button className="close-btn" onClick={handleClose}>✖</button>
                <div className="progress-bar"></div>
            </div>
        );
    };

    const root = createRoot(notificationContainer);
    root.render(<Notification />);
};

export default Notify;
