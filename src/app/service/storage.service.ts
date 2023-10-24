import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }

    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        const value = localStorage.getItem(key);
        if (value != null && value !== 'undefined') {
            return JSON.parse(value);
        } else {
            return null;
        }
    }

    removeItem(key) {
        localStorage.removeItem(key);
    }


    getToken() {
        if (this.getItem('webToken') !== null) {
            return this.getItem('webToken').token;
        } else {
            return null;
        }
    }

    getUser() {
        return this.getItem('webUser');
    }

    setToken(token: string, user: any) {
        this.setItem('webToken', { token: token });
        this.setItem('webUser', user);
    }

    setAPIVersion(apiVersion: any) {
        this.setItem('traceAPIVersion', apiVersion);
    }

    getAPIVersion() {
        return this.getItem('traceAPIVersion');
    }

    getUserRole() {
        if (this.getItem('webUser') != null) {
            return this.getItem('webUser').role.id;
        } else {
            return 0;
        }
    }

    isSuperAdminUser() {
        if (this.getItem('webUser') != null) {
            return this.getItem('webUser').role.id == 1;
        } else {
            return false;
        }
    }

    isAdminUser() {
        if (this.getItem('webUser') != null) {
            return this.getItem('webUser').role.id == 2;
        } else {
            return false;
        }
    }

    isNoAdminUser() {
        if (this.getItem('webUser') != null) {
            return (this.getItem('webUser').role.id != 1 && this.getItem('webUser').role.id != 2);
        } else {
            return false;
        }
    }

    isAgentUser() {
        if (this.getItem('webUser') != null) {
            return this.getItem('webUser').role.id == 6;
        } else {
            return false;
        }
    }

    logout() {
        this.removeItem('webToken');
        this.removeItem('webUser');
    }
}
