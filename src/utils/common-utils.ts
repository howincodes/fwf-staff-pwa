// File: utils/common-utils.js

import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import moment from 'moment';


const successToast = (message: string, duration?: number): void => {

    toast({
      // title: "Success",
      description: message,
      duration: duration ? duration : 2000,
    });
  };
  
  const errorToast = (message: string, duration?: number): void => {

    toast({
      // title: "Error",
      description: message,
      duration: duration ? duration : 2000,
      variant: "destructive",
    });
  };
const truncateText = (text:string, length:number) => {
    if (!text || text?.length === 0) {
        return "";
    }

    if (text?.length > length) {
        return text.substring(0, length) + "...";
    }

    return text;
};
// Function to get a human-readable time ago string


// Function to group notifications by date
const groupNotificationsByDate = (notifications:string) => {
    const grouped = {
        Today: [],
        Yesterday: [],
        Earlier: []
    };

    notifications.data?.map((notification) => {
        const sentDate = new Date(notification.sent_at);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        let key;
        if (format(sentDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
            key = 'Today';
        } else if (format(sentDate, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
            key = 'Yesterday';
        } else {
            key = 'Earlier';
        }

        grouped[key].push(notification);
    });

    return Object.keys(grouped).reduce((obj, key) => {
        if (grouped[key].length > 0) {
            obj[key] = grouped[key];
        }
        return obj;
    }, {});
};



const getTimeAgo = (createdDateTime) => {
    const date = moment.utc(createdDateTime);
    const now = moment();
    const secondsDifference = now.diff(date, 'seconds');
    const minutesDifference = now.diff(date, 'minutes');
    const hoursDifference = now.diff(date, 'hours');
    const daysDifference = now.diff(date, 'days');
    const monthsDifference = now.diff(date, 'months');
    const yearsDifference = now.diff(date, 'years');

    let displayTime;

    if (secondsDifference < 60) {
        displayTime = `${secondsDifference} sec ago`;
    } else if (minutesDifference < 60) {
        displayTime = `${minutesDifference} min ago`;
    } else if (hoursDifference < 24) {
        displayTime = `${hoursDifference} hr ago`;
    } else if (daysDifference < 30) {
        displayTime = `${daysDifference} day ago`;
    } else if (monthsDifference < 12) {
        displayTime = `${monthsDifference} mon ago`;
    } else {
        displayTime = `${yearsDifference} yr ago`;
    }

    return displayTime;
};

export const getFirstWord = (str) => {
    if (!str) {
        return '';
    }

    return str.split(' ')[0];
};

export const normalizePhone = (phone:string) => {
    //remove space and plus
    return phone.replace(/\s/g, '').replace('+', '');
}

export const isRtl = () => {
    return document.documentElement.dir === 'rtl' || document.body.style.direction === 'rtl';
};

export { successToast, errorToast, truncateText, getTimeAgo, groupNotificationsByDate }
