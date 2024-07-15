import React from 'react';
import ReactDOM from 'react-dom';
import './Alert.css';

const Notify = {
    success: (message) => showNotification(message, 'success'),
    fail: (message) => showNotification(message, 'fail'),
    warning: (message) => showNotification(message, 'warning'),
    info: (message) => showNotification(message, 'info'),
};

const showNotification = (message, type) => {
    const notification = (
        <div className={`alert ${type}`}>
            <span>{message}</span>
            <button className="close-btn" onClick={() => closeNotification(notificationContainer)}>✖</button>
        </div>
    );

    const notificationContainer = document.createElement('div');
    document.body.appendChild(notificationContainer);

    ReactDOM.render(notification, notificationContainer);

    const timeoutId = setTimeout(() => {
        closeNotification(notificationContainer);
    }, 3000);

    const closeNotification = (container) => {
        clearTimeout(timeoutId);
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
    };
};

export default Notify;
