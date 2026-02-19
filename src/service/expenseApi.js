import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

export const getGroupExpenses = (groupId) =>
    axios.get(`${serverEndpoint}/api/expenses/group/${groupId}`, {
        withCredentials: true,
    });

export const addExpense = (data) =>
    axios.post(`${serverEndpoint}/api/expenses`, data, {
        withCredentials: true,
    });

export const getGroupSummary = (groupId) =>
    axios.get(`${serverEndpoint}/api/expenses/group/${groupId}/summary`, {
        withCredentials: true,
    });

export const settleGroup = (groupId) =>
    axios.post(
        `${serverEndpoint}/api/expenses/group/${groupId}/settle`,
        {},
        { withCredentials: true }
    );
export const getRecentExpenses = () =>
    axios.get(`${serverEndpoint}/api/expenses/recent`, {
        withCredentials: true,
    });